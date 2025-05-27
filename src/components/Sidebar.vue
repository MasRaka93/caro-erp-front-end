<template>
  <div>
    <!-- Hamburger Button on Mobile -->
    <button
      @click="toggleSidebar"
      class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg focus:outline-none"
      aria-label="Toggle sidebar"
    >
      <font-awesome-icon icon="bars" />
    </button>
 
 

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 z-40 h-full bg-gray-100 flex flex-col justify-between px-6 py-8 w-64 md:w-16 md:hover:w-72 transition-all duration-300 transform',
        { '-translate-x-full': !isSidebarOpen }
      ]"
      aria-label="Sidebar navigation"
    >
      <!-- Profile section -->
      <div>
        <div class="flex items-center space-x-0 md:space-x-4 mb-12">
          <img
            :src="profilePictureUrl"
            alt="Profile picture"
            class="rounded-full object-cover profile-img w-12 h-12"
            @error="handleImageError"
          />
          <div v-if="expanded" class="profile-text">
            <h1 class="text-black font-semibold text-lg leading-tight">{{ userProfile.nickname }}</h1>
            <p class="text-xs text-gray-700 leading-tight">{{ userProfile.role }}</p>
          </div>
        </div>
 
 

        <!-- Navigation Menu -->
        <nav class="space-y-6" aria-label="Main navigation">
          <SidebarLink to="/data-marketplace" icon="file-alt" label="Data Marketplace" />
          <SidebarLink to="/scan-awb" icon="barcode" label="Scan AWB" />
          <SidebarLink to="/belanja-produk" icon="shopping-cart" label="Belanja Produk" />
          <SidebarLink to="/success" icon="check-circle" label="Success" />
          <SidebarLink to="/retur-cancel" icon="undo-alt" label="Retur / Cancel" />
          <SidebarLink to="/laporan" icon="clipboard-list" label="Laporan" />
          <SidebarLink to="/pengaturan" icon="cog" label="Pengaturan" />
        </nav>
      </div>
 
 

      <!-- Footer -->
      <div class="footer-container">
        <button
          id="logoutBtn"
          class="logout-btn bg-sky-400 text-white font-semibold text-sm rounded-md px-6 py-2 w-full max-w-[160px] mt-6"
          @click="logout"
        >
          Logout
        </button>
        <img src="https://i.imgur.com/dQV51zd.png" alt="Logo icon" class="logo-minimized" />
        <img src="https://i.imgur.com/Pgr96A6.png" alt="Logo full" class="logo-expanded" />
      </div>
    </aside>
  </div>
</template>
 
 

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import SidebarLink from '@/components/SidebarLink.vue';
 
 

export default {
  components: { SidebarLink, FontAwesomeIcon },
  props: {
    isSidebarOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      expanded: false,
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
      this.$emit('toggle');
    },
    closeSidebar() {
      this.$emit('toggle', false);
    },
    onMouseEnter() {
      if (window.innerWidth >= 768) {
        this.expanded = true;
      }
    },
    onMouseLeave() {
      if (window.innerWidth >= 768) {
        this.expanded = false;
      }
    },
    handleImageError(event) {
      event.target.src = this.defaultProfileImage;
    },
    async logout() {
      const token = localStorage.getItem('auth_token');
      const user = JSON.parse(localStorage.getItem('auth_user') || '{}');
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
        alert('Gagal logout, coba lagi.');
      }
    },
  },
};
</script>
 
 

<style scoped>
/* Sidebar Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
 
 

.profile-img {
  width: 48px;
  height: 48px;
}
 
 

.footer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
 
 

/* Logos - show/hide on expand/collapse */
.logo-minimized {
  width: 40px;
  margin-top: 10px;
  display: block;
}
 
 

.logo-expanded {
  width: 120px;
  margin-top: 10px;
  display: none;
}
 
 

aside:hover .logo-expanded,
aside:hover .logo-minimized {
  display: block;
}
 
 

aside:hover .logo-minimized {
  display: none;
}
 
 

/* Logout Button */
.logout-btn {
  cursor: pointer;
}
 
 

/* SidebarLink styling will be from SidebarLink component */
</style>