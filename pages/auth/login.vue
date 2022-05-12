<template>
  <div>
    <div class="container mx-auto px-4 sm:px-8">
      <div class="py-8">
        <div class="flex justify-between items-center">
          <div>
            {{ loggedIn }}
            <h2 class="text-2xl font-semibold leading-tight mb-5">
              Login Account
            </h2>
          </div>
        </div>
        <div class="my-5">
          <label for="email" class="block text-black">Email</label>
          <input
            id="email"
            v-model="email"
            type="text"
            autofocus
            class="rounded border border-gray-400 px-4 py-3 mt-3 focus:outline-none bg-gray-100"
            style="width: 400px"
            placeholder="Email"
          />
        </div>
        <div class="my-5">
          <label for="password" class="block text-black">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="rounded border border-gray-400 px-4 py-3 mt-3 focus:outline-none bg-gray-100"
            style="width: 400px"
            placeholder="Password"
          />
        </div>
        <button
          class="block text-center text-white bg-gray-800 p-3 duration-300 rounded hover:bg-black"
          style="width: 100px"
          @click.prevent="login"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  auth: 'guest',
  data() {
    return {
      email: 'test@example.com',
      password: 'password',
      loggedIn: false,
    }
  },
  mounted() {
    this.loggedIn = this.$auth.loggedIn
  },
  methods: {
    login() {
      this.$toast.show('Logging in...')
      this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then(() => {
          this.$graphql.default.setHeaders({
            authorization: `Bearer ${this.$auth.strategy.token.get()}`,
          })
          this.$toast.success('Successfully login')
          this.$router.push('/');
        })
    },
  },
}
</script>

<style></style>
