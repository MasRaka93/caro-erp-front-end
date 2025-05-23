<template>
  <div
    class="bg-[#3b8ad1] min-h-screen flex items-center justify-center p-6 font-lexend"
  >
    <div
      class="max-w-5xl w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-24"
    >
      <!-- Left side -->
      <div class="flex flex-col justify-center text-white max-w-md md:max-w-lg">
        <p class="text-lg mb-2">Selamat Datang,</p>
        <p class="text-lg mb-4">Aplikasi yang dibuat khusus untuk</p>
        <p class="font-extrabold text-xl md:text-2xl mb-12">
          Pnomsticklite.Corp
        </p>
        <img
          src="https://i.imgur.com/UnFQxHc.png"
          alt="CARO Logo"
          class="w-[120px] h-[120px] md:w-[160px] md:h-[160px] mx-auto md:mx-0"
        />
      </div>

      <!-- Right side -->
      <div
        class="bg-[#d9e8f4] rounded-3xl p-8 w-full max-w-md flex flex-col items-center"
      >
        <h2 class="text-2xl font-semibold mb-2">MASUK</h2>
        <p class="mb-8 text-center">
          CARO.ERP One Web App for various purpose!
        </p>

        <form class="w-full flex flex-col gap-6" @submit.prevent="handleLogin">
          <div class="flex flex-col">
            <label for="email" class="text-sm font-reguler mb-1"
              >Email / Username</label
            >
            <input
              id="email"
              v-model="email"
              type="text"
              class="border border-black rounded-lg px-4 py-2 placeholder:text-gray-400 focus:outline-none"
              placeholder="Masukkan Email atau Username kesini."
              required
            />
          </div>
          <div class="flex flex-col">
            <label for="password" class="text-sm font-reguler mb-1"
              >Password</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              class="border border-black rounded-lg px-4 py-2 placeholder:text-gray-400 focus:outline-none"
              placeholder="Masukkan Password Anda."
              required
            />
          </div>
          <button
            type="submit"
            class="bg-[#5bb0ff] text-white font-extrabold rounded-md py-2 mt-2 text-lg"
          >
            Masuk
          </button>
        </form>

        <p class="mt-8 text-xs font-semibold text-center">
          Caro.CRM was built with <span class="text-red-500">❤️</span> by Rakaro
          Agency!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      const scriptUrl = import.meta.env.VITE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycb.../exec';

      try {
        console.log('Sending login request to:', scriptUrl);
        console.log('Email:', this.email);

        const response = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });

        const result = await response.json();
        console.log('Login result:', result);

        if (result.status === 'success') {
          localStorage.setItem('auth_token', result.token || '');
          localStorage.setItem('auth_user', JSON.stringify(result.user));
          window.location.href = 'https://www.google.com';
        } else {
          alert(result.message || 'Login gagal.');
        }
      } catch (err) {
        console.error('Login error:', err);
        alert('Terjadi kesalahan saat login.');
      }
    },
  },
};
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700&display=swap');

.font-lexend {
  font-family: 'Lexend', sans-serif;
}
</style>
