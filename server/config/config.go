package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Config represents WebSocket Server
// configuration
type Config struct {
	Host    *string
	Port    *string
	Workers *string
	Queue   *string
	Timeout *string
}

func mustGetEnvVar(key string) *string {
	val := os.Getenv(key)

	if val == "" {
		log.Fatalf("Environment variable \"%s\" is not defined in .env file", key)
	}

	return &val
}

// MustReadConfig reads the .env file from the CWD
// if the .env is not found panics
func MustReadConfig() *Config {
	err := godotenv.Load()

	if err != nil {
		log.Fatal(err)
	}

	var conf *Config = new(Config)

	conf.Host = mustGetEnvVar("HOST")
	conf.Port = mustGetEnvVar("PORT")
	conf.Workers = mustGetEnvVar("WORKERS")
	conf.Queue = mustGetEnvVar("QUEUE")
	conf.Timeout = mustGetEnvVar("TIMEOUT")

	return conf
}
