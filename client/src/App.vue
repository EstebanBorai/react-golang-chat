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
</style>

<script>
import Header from '@/components/Header';

export default {
  components: {
    Header
  }
}
</script>
