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
            src="https://storage.googleapis.com/a1aa/image/949c4611-7f10-4473-594d-4957a26bc039.jpg"
            alt="Profile picture of user with short black hair, smiling, wearing a blue shirt, on a light gray background"
            class="rounded-full object-cover profile-img"
            id="profileImg"
          />
          <div class="profile-text hidden md:block">
            <h1 class="text-black font-semibold text-lg leading-tight">Pengguna</h1>
            <p class="text-xs text-gray-700 leading-tight">Role</p>
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
        <button id="logoutBtn" class="logout-btn bg-sky-400 text-white font-semibold text-sm rounded-md px-6 py-2 w-full max-w-[160px] mt-6">
          Logout
        </button>
        <img src="https://i.imgur.com/dQV51zd.png" alt="Logo icon of the application, blue and white abstract shape, sized 40 by 40 pixels" class="logo-minimized" />
        <img src="https://i.imgur.com/Pgr96A6.png" alt="Full logo of the application, blue and white text and icon, sized 140 pixels wide with proportional height" class="logo-expanded" />
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');

aside {
  transition: width 0.3s ease;
}

/* Profile image: always 40x40 on minimized, bigger on expanded */
.profile-img {
  width: 40px !important;
  height: 40px !important;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
  transition: width 0.3s ease, height 0.3s ease;
}

aside:hover .profile-img {
  width: 56px !important;
  height: 56px !important;
}

/* Profile text hidden on minimized, visible on expanded hover */
.profile-text {
  opacity: 0;
  max-width: 0;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.3s ease 0.15s, max-width 0.3s ease 0.15s;
}

aside:hover .profile-text {
  opacity: 1;
  max-width: 1000px;
}

/* Navigation label text hidden on minimized */
nav a > span.label-text {
  opacity: 0;
  max-width: 0;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  transition: opacity 0.3s ease 0.15s, max-width 0.3s ease 0.15s;
  vertical-align: middle;
}

/* Show label text on hover expanded */
aside:hover nav a > span.label-text {
  opacity: 1;
  max-width: 1000px;
}

/* Footer logos and logout button */
.logout-btn,
.logo-expanded {
  opacity: 0;
  max-width: 0;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.3s ease 0.15s, max-width 0.3s ease 0.15s;
}

aside:hover .logout-btn,
aside:hover .logo-expanded {
  opacity: 1;
  max-width: 1000px;
}

/* Minimized logo visible */
.logo-minimized {
  opacity: 1;
  width: 40px !important;
  height: 40px !important;
  object-fit: contain;
  transition: opacity 0.3s ease, margin-bottom 0.3s ease;
  margin-bottom: 0.5rem;
}

/* Hide minimized logo on hover expanded */
aside:hover .logo-minimized {
  opacity: 0;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden;
  margin-bottom: 0 !important;
}

/* Expanded logo size smaller than before */
.logo-expanded {
  width: 140px !important;
  height: auto !important;
  object-fit: contain;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

/* Footer container spacing adjustments */
.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem; /* reduce vertical spacing */
}

/* Add margin-top to logout button to separate from menu */
nav a:last-child {
  margin-bottom: 2.5rem; /* increased margin for more space */
}

/* Mobile adjustments */
@media (max-width: 767px) {
  aside {
    width: 18rem !important;
    padding: 1.5rem;
  }

  .profile-text,
  .logo-expanded,
  .logout-btn {
    opacity: 1 !important;
    max-width: 1000px !important;
  }

  .logo-minimized {
    opacity: 0 !important;
    width: 0 !important;
    height: 0 !important;
    overflow: hidden;
    margin-bottom: 0 !important;
  }

  .profile-img {
    width: 40px !important;
    height: 40px !important;
  }

  nav a > span.label-text {
    opacity: 1 !important;
    max-width: 1000px !important;
  }

  nav a:last-child {
    margin-bottom: 2.5rem !important;
  }
}
</style>