<template>
  <div>
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style lang="css">
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

  :root {
    --primary: #007d9c;
  }

  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
  }

  .app-section {
    display: flex;
    height: calc(100vh - 64px);
    justify-content: center;
  }
</style>

<script>
import Header from '@/components/Header';

export default {
  components: {
    Header
  }
}
</script>
