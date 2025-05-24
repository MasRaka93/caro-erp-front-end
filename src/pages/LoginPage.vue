<template>
  <div class="bg-[#3b8ad1] min-h-screen flex items-center justify-center p-6 font-lexend">
    <div class="max-w-5xl w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-24">
      <!-- Left side -->
      <div class="flex flex-col justify-center text-white max-w-md md:max-w-lg">
        <p class="text-lg mb-2">Selamat Datang,</p>
        <p class="text-lg mb-4">Aplikasi yang dibuat khusus untuk</p>
        <p class="font-extrabold text-xl md:text-2xl mb-12">Pnomsticklite.Corp</p>
        <img src="https://i.imgur.com/pt08ud9.png" alt="CARO ERP Logo" class="w-[260px] h-[260px] md:w-[160px] md:h-[160px] mx-auto md:mx-0" />
      </div>

      <!-- Right side -->
      <div class="bg-[#d9e8f4] rounded-3xl p-8 w-full max-w-md flex flex-col items-center">
        <h2 class="text-2xl font-semibold mb-2">MASUK</h2>
        <p class="mb-8 text-center">CARO.ERP - One PWA for various purpose!</p>

        <form class="w-full flex flex-col gap-6" @submit.prevent="handleLogin">
          <div class="flex flex-col">
            <label for="email" class="text-sm font-medium mb-1">Email / Username</label>
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
            <label for="password" class="text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="border border-black rounded-lg px-4 py-2 placeholder:text-gray-400 focus:outline-none"
              placeholder="Masukkan Password Anda."
              required
            />
          </div>
          <button type="submit" class="bg-[#5bb0ff] text-white font-extrabold rounded-md py-2 mt-2 text-lg">
            Masuk
          </button>
        </form>

        <p class="mt-8 text-xs font-semibold text-center">
          Caro.ERP was built with <span class="text-red-500">❤️</span> by Rakaro Agency!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import UAParser from "ua-parser-js";

export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    this.checkAutoLogin();
  },
  methods: {
    async checkAutoLogin() {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      const parser = new UAParser();
      const ua = parser.getResult();
      const device = `${ua.device.vendor || "Unknown"} - ${ua.browser.name} ${ua.browser.version}`;

      try {
        const response = await fetch(`${import.meta.env.VITE_SCRIPT_URL}?token=${token}&device=${encodeURIComponent(device)}`);
        const result = await response.json();
        console.log("Auto-login check:", result);

        if (result.status === "valid") {
          localStorage.setItem("auth_token", result.token);
          localStorage.setItem("auth_user", JSON.stringify(result.user));
          window.location.href = "/data-marketplace";
        } else {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        }
      } catch (err) {
        console.error("Auto-login check error:", err);
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
      }
    },

    async handleLogin() {
      const parser = new UAParser();
      const ua = parser.getResult();
      const device = `${ua.device.vendor || "Unknown"} - ${ua.browser.name} ${ua.browser.version}`;

      let ip = "Unknown";
      let location = "Unknown";

      try {
        const ipRes = await fetch("https://ipapi.co/json");
        const ipData = await ipRes.json();
        ip = ipData.ip;
        location = `${ipData.city}, ${ipData.region}, ${ipData.country_name}`;
      } catch (err) {
        console.warn("IP/Location fetch failed:", err);
      }

      const scriptUrl = import.meta.env.VITE_SCRIPT_URL;

      try {
        console.log("Sending login request to:", scriptUrl);
        console.log("Email:", this.email);

        const response = await fetch(scriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            device,
            ip,
            location,
          }),
        });

        const result = await response.json();
        console.log("Login result:", result);

        if (result.status === "success") {
          localStorage.setItem("auth_token", result.token);
          localStorage.setItem("auth_user", JSON.stringify(result.user));
          window.location.href = "/data-marketplace";
        } else {
          alert(result.message || "Login gagal.");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Terjadi kesalahan saat login.");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700&display=swap");

.font-lexend {
  font-family: "Lexend", sans-serif;
}
</style>
