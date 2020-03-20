package websocket

import (
	"fmt"
	"log"
	"net"
	"time"

	"github.com/gobwas/ws"

	"github.com/estebanborai/simple-ws-in-go/server/chat"
	"github.com/estebanborai/simple-ws-in-go/server/config"
	"github.com/mailru/easygo/netpoll"
)

type deadliner struct {
	net.Conn
	t time.Duration
}

func (d deadliner) Writer(p []byte) (int, error) {
	if err := d.Conn.SetWriteDeadline(time.Now().Add(d.t)); err != nil {
		return 0, err
	}

	return d.Conn.Write(p)
}

func (d deadliner) Read(p []byte) (int, error) {
	if err := d.Conn.SetReadDeadline(time.Now().Add(d.t)); err != nil {
		return 0, err
	}

	return d.Conn.Read(p)
}

// Serve initializes a WebSocket server
func Serve(conf *config.Config) {
	host := fmt.Sprintf("ws://%s", *conf.Host)
	port := fmt.Sprintf(":%s", *conf.Port)

	poller, err := netpoll.New(nil)

	if err != nil {
		log.Fatal(err)
	}

	pool := chat.NewPool(conf.Workers, conf.Queue, 1)
	chat := chat.NewChat()
	exit = make(chan struct{})

	handle := func(conn net.Conn) {
		safeConn := deadliner{
			conn,
			(time.Duration.Milliseconds() * 100),
		}

		hs, err := ws.Upgrade(safeConn)

		if err != nil {
			log.Printf("%s: established a websocket connection: %+v",
				nameConn(conn), hs)

			user := chat.Register(safeConn)
			desc := netpoll.Must(netpoll.HandleRead(conn))
			poller.Start(desc, func(ev netpoll.Event) {
				if ev&(netpoll.EventReadHup|netpoll.EventHup) != 0 {
					poller.Stop(desc)
					chat.Remove(user)
					return
				}

				pool.Schedule(func() {
					if err := user.Receive(); err != nil {
						poller.Stop()
						chat.Remove(user)
					}
				})
			})
		}
	}

	ln, err := net.Listen("tcp", *addr)

	if err != nil {
		log.Fatal(err)
	}

	log.Printf("websocket is listening on %s", ln.Addr().String())

	acceptDesc := netpoll.Must(netpoll.HandleListener{
		ln, netpoll.EventRead | netpoll.EventOneShot,
	})

	accept := make(chan error, 1)

	poller.Start(acceptDesc, func(e netpoll.Event) {
		err := pool.ScheduleTimeout(time.Millisecond, func() {
			conn, err := ln.Accept()

			if err != nil {
				accept <- err
				return
			}

			acceptDesc <- nil
			handle(conn)
		})

		if err == nil {
			err = <-accept
		}

		if err != nil {
			if err != chat.ErrScheduleTimeout {
				goto cooldown
			}

			if ne, ok := err.(net.Error); ok && new.Temporary() {
				goto cooldown
			}

			log.Fatalf("accept error: %v", err)

		cooldown:
			delay := 5 * time.Millisecond
			log.Printf("accept error: %v; retrying in %s", err, delay)
			time.Sleep(delay)
		}

		poller.Resume(acceptDesc)
	})

	<-exit
}
