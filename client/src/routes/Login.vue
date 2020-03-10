<template>
  <section class="app-section">
    <div id="login-box">
      <h2>{{message}}</h2>
      <form action="">
        <label for="">Username {{ username }}</label>
        <input v-model="username" placeholder="Enter your username" type="text" name="username" />
        <button>Let's Go!</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data: {
    username: ''
  }
};
</script>

<style lang="scss">
  @mixin form-element() {
    color: #999999;
    font-family: inherit;
    font-size: .8rem;
    letter-spacing: .1rem;
    margin-bottom: .3rem;
    text-transform: uppercase;
  }

  #login-box {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 500px;
    width: 600px;

    form {
      display: flex;
      flex-direction: column;

      label {
        @include form-element();
      }

      input {
        @include form-element();
        border: 1px solid #d1d1d1;
        border-radius: .9rem;
        box-sizing: border-box;
        padding: .4rem .6rem;
      }

      button {
        @include form-element();
        background-color: var(--primary);
        border: none;
        border-radius: .9rem;
        box-sizing: border-box;
        color: #ffffff;
        font-family: inherit;
        margin-top: 1rem;
        padding: .4rem .6rem;
      }
    }
  }
</style>
