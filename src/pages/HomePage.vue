<template>
  <div class="min-h-screen flex items-center justify-center bg-blue-100">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-4">Selamat Datang di CARO.CRM</h1>
      <p class="text-lg">
        Halaman ini akan menampilkan dashboard atau data penting
      </p>
      <button
        class="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg font-semibold"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    logout() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      this.$router.push({ name: 'Login' });
    },
  },
};
</script>
