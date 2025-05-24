<template>
  <div>
    <!-- Hamburger Button on Mobile -->
    <button
      @click="toggleMobileSidebar"
      class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg focus:outline-none"
    >
      <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>

    <!-- Overlay -->
    <div v-if="isMobileOpen" class="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden" @click="toggleMobileSidebar"></div>

    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 z-40 h-full bg-gray-100 transition-all duration-300 flex flex-col justify-between px-6 py-8 w-64 md:w-16 md:hover:w-72"
      :class="{ 'translate-x-0': isMobileOpen, '-translate-x-full': !isMobileOpen, 'md:translate-x-0': true }"
    >
      <!-- Profile -->
      <div>
        <div class="flex items-center space-x-0 md:space-x-4 mb-12">
          <img
            :src="profilePictureUrl"
            alt="Profile picture"
            class="rounded-full object-cover profile-img"
            @error="handleImageError"
          />
          <div class="profile-text hidden md:block">
            <h1 class="text-black font-semibold text-lg leading-tight">{{ user.nickname }}</h1>
            <p class="text-xs text-gray-700 leading-tight">{{ user.role }}</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="space-y-6">
          <SidebarLink to="/data-marketplace" :icon="FileText" label="Data Marketplace" />
          <SidebarLink to="#" :icon="Barcode" label="Scan AWB" />
          <SidebarLink to="#" :icon="ShoppingCart" label="Belanja Produk" />
          <SidebarLink to="#" :icon="CheckCircle" label="Success" />
          <SidebarLink to="#" :icon="RotateCcw" label="Retur / Cancel" />
          <SidebarLink to="#" :icon="ClipboardList" label="Laporan" />
          <SidebarLink to="#" :icon="Settings" label="Pengaturan" />
        </nav>
      </div>

      <!-- Footer -->
      <div class="flex flex-col items-center space-y-6">
        <button @click="logout" class="logout-btn bg-sky-400 text-white font-semibold text-sm rounded-md px-6 py-2 w-full max-w-[160px]">
          Logout
        </button>
        <img src="https://i.imgur.com/dQV51zd.png" alt="Logo minimized" class="logo-minimized object-contain max-w-[96px]" />
        <img src="https://i.imgur.com/Pgr96A6.png" alt="Logo expanded" class="logo-expanded object-contain w-full max-w-[180px]" />
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SidebarLink from './SidebarLink.vue';
import { FileText, Barcode, ShoppingCart, CheckCircle, RotateCcw, ClipboardList, Settings } from 'lucide-vue-next';

const router = useRouter();
const isMobileOpen = ref(false);

const toggleMobileSidebar = () => {
  isMobileOpen.value = !isMobileOpen.value;
};

const user = ref({
  nickname: 'Pengguna',
  role: 'Role',
  profilePicId: ''
});

const defaultProfilePic = 'https://storage.googleapis.com/a1aa/image/949c4611-7f10-4473-594d-4957a26bc039.jpg';

const profilePictureUrl = computed(() => {
  return user.value.profilePicId
    ? `https://drive.google.com/thumbnail?id=${user.value.profilePicId}&sz=w200-h200`
    : defaultProfilePic;
});

const handleImageError = (e) => {
  e.target.src = defaultProfilePic;
};

const logout = async () => {
  const token = localStorage.getItem('auth_token');
  const userData = JSON.parse(localStorage.getItem('auth_user'));
  const device = navigator.userAgent;

  try {
    const ipRes = await fetch('https://ipapi.co/json');
    const ipData = await ipRes.json();
    const ip = ipData.ip;
    const location = `${ipData.city}, ${ipData.region}, ${ipData.country_name}`;

    await fetch(import.meta.env.VITE_SCRIPT_URL + '?action=logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId: userData.id, device, ip, location })
    });
  } catch (err) {
    console.warn('Logout log failed:', err);
  }

  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  router.push('/');
};

onMounted(() => {
  const userData = JSON.parse(localStorage.getItem('auth_user'));
  if (userData) {
    user.value = {
      nickname: userData.nickname || 'Pengguna',
      role: userData.role || 'Role',
      profilePicId: userData.profilePicId || ''
    };
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');

.profile-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  transition: width 0.3s, height 0.3s;
  margin-left: auto;
  margin-right: auto;
}

aside:hover .profile-img {
  width: 64px;
  height: 64px;
}

.profile-text,
.logo-expanded,
.logout-btn {
  opacity: 0;
  max-width: 0;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.3s ease 0.15s, max-width 0.3s ease 0.15s;
}

aside:hover .profile-text,
aside:hover .logo-expanded,
aside:hover .logout-btn {
  opacity: 1;
  max-width: 1000px;
}

.logo-minimized {
  opacity: 1;
  transition: opacity 0.3s ease;
}

aside:hover .logo-minimized {
  opacity: 0;
}

@media (max-width: 767px) {
  aside {
    width: 18rem !important;
    transform: translateX(-100%);
    padding: 1.5rem;
  }

  aside.translate-x-0 {
    transform: translateX(0);
  }

  .profile-text,
  .logo-expanded,
  .logout-btn {
    opacity: 1 !important;
    max-width: 1000px !important;
  }

  .logo-minimized {
    opacity: 0 !important;
  }

  .profile-img {
    width: 64px;
    height: 64px;
  }
}
</style>
