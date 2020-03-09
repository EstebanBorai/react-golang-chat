<template>
  <header>
    <div id="branding">
      <img
        alt="Go's Logo"
        src="https://pkg.go.dev/static/img/go-logo-white.svg"
        width="82"
        height="32"
      />
      <h1>simple-ws-in-go</h1>
    </div>
    <!-- <ul>
      <li>
        <router-link to="/">
          Home
        </router-link>
      </li>
    </ul> -->
  </header>
</template>

<style lang="scss" scoped>
  header {
    align-items: center;
    background-color: #007d9c;
    box-sizing: border-box;
    color: #ffffff;
    display: flex;
    height: 64px;
    justify-content: space-between;
    padding: 0 1rem;
    width: 100%;
  }

  #branding {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  header h1 {
    font-size: 1.3rem;
  }

  header img {
    margin-right: 1.5rem;
  }
</style>
