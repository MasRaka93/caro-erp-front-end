<template>
  <div>
    <!-- Hamburger Button on Mobile -->
    <button
      @click="toggleSidebar"
      class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg focus:outline-none"
      aria-label="Toggle sidebar"
    >
      <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>

    <!-- Overlay -->
    <div
      id="overlay"
      class="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
      v-show="isSidebarOpen"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      id="sidebar"
      class="fixed top-0 left-0 z-40 h-full bg-gray-100 flex flex-col justify-between px-6 py-8 w-64 md:w-16 md:hover:w-72 transition-all duration-300 transform"
      :class="{'-translate-x-full': !isSidebarOpen, 'translate-x-0': isSidebarOpen}"
      aria-label="Sidebar navigation"
    >
      <!-- Profile -->
      <div>
        <div class="flex items-center space-x-0 md:space-x-4 mb-12">
          <img
            :src="profilePictureUrl"
            alt="Profile picture"
            class="rounded-full object-cover profile-img"
            id="profileImg"
            @error="handleImageError"
          />
          <div class="profile-text hidden md:block md:group-hover:block">
            <h1 class="text-black font-semibold text-lg leading-tight">{{ userProfile.nickname }}</h1>
            <p class="text-xs text-gray-700 leading-tight">{{ userProfile.role }}</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="space-y-6" aria-label="Main navigation">
          <a href="/data-marketplace" class="flex items-center space-x-3 text-gray-700 hover:text-sky-600 transition-colors duration-200">
            <i class="fas fa-file-alt fa-lg w-6 text-center"></i>
            <span class="label-text">Data Marketplace</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-gray-700 hover:text-sky-600 transition-colors duration-200">
            <i class="fas fa-barcode fa-lg w-6 text-center"></i>
            <span class="label-text">Scan AWB</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-gray-700 hover:text-sky-600 transition-colors duration-200">
            <i class="fas fa-shopping-cart fa-lg w-6 text-center"></i>
            <span class="label-text">Belanja Produk</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-gray-700 hover:text-sky-600 transition-colors duration-200">
            <i class="fas fa-check-circle fa-lg w-6 text-center"></i>
            <span class="label-text">Success</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-gray-700 hover:text-sky-600 transition-colors duration-200">
            <i class="fas fa-undo-alt fa-lg w-6 text-center"></i>
            <span class="label-text">Retur / Cancel</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-gray-700 hover:text-sky-600 transition-colors duration-200">
            <i class="fas fa-clipboard-list fa-lg w-6 text-center"></i>
            <span class="label-text">Laporan</span>
          </a>
          <a href="#" class="flex items-center space-x-3 text-gray-700 hover:text-sky-600 transition-colors duration-200">
            <i class="fas fa-cog fa-lg w-6 text-center"></i>
            <span class="label-text">Pengaturan</span>
          </a>
        </nav>
      </div>

      <!-- Footer -->
      <div class="footer-container">
        <button id="logoutBtn" class="logout-btn bg-sky-400 text-white font-semibold text-sm rounded-md px-6 py-2 w-full max-w-[160px] mt-6" @click="logout">
          Logout
        </button>
        <img src="https://i.imgur.com/dQV51zd.png" alt="Logo icon" class="logo-minimized" />
        <img src="https://i.imgur.com/Pgr96A6.png" alt="Logo full" class="logo-expanded" />
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      userProfile: {
        nickname: '',
        role: '',
        profilePicId: '',
      },
      defaultProfileImage: 'https://storage.googleapis.com/a1aa/image/949c4611-7f10-4473-594d-4957a26bc039.jpg',
    };
  },
  computed: {
    profilePictureUrl() {
      return this.userProfile.profilePicId
        ? `https://drive.google.com/thumbnail?id=${this.userProfile.profilePicId}&sz=w200-h200`
        : this.defaultProfileImage;
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('auth_user'));
    if (user) {
      this.userProfile.nickname = user.nickname || 'Pengguna';
      this.userProfile.role = user.role || 'Role';
      this.userProfile.profilePicId = user.profilePicId || '';
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    handleImageError(event) {
      event.target.src = this.defaultProfileImage;
    },
    async logout() {
      const token = localStorage.getItem('auth_token');
      const user = JSON.parse(localStorage.getItem('auth_user'));
      const device = navigator.userAgent;

      try {
        const ipData = await fetch('https://ipapi.co/json').then(res => res.json());
        const ip = ipData.ip || 'Unknown';
        const location = `${ipData.city}, ${ipData.region}, ${ipData.country_name}`;

        await fetch(`${import.meta.env.VITE_SCRIPT_URL}?action=logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            userId: user.id,
            device,
            ip,
            location,
          }),
        });

        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        this.$router.push('/');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    },
  },
};
</script>

<style scoped>
/* Tidak diubah. Semua style tetap seperti yang kamu desain. */
</style>