<template>
  <div class="flex flex-col h-full p-6 space-y-12">
    <div class="flex flex-col items-center space-y-4">
      <div class="relative">
        <img
          :src="profilePictureUrl"
          alt="Profile picture"
          class="profile-img rounded-full border-2 border-white shadow-md"
          @error="handleImageError"
        />
      </div>
      <div class="text-center">
        <h3 class="font-semibold text-lg text-gray-800">{{ user.nickname }}</h3>
        <p class="text-sm text-gray-500">{{ user.role }}</p>
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
  <div class="flex flex-col items-center space-y-6">
    <button class="logout-btn bg-sky-400 text-white font-semibold text-sm rounded-md px-6 py-2 w-full max-w-[160px]" @click="logout">
      Logout
    </button>
    <img src="https://i.imgur.com/dQV51zd.png" alt="Logo minimized" class="logo-minimized object-contain max-w-[96px]" />
    <img src="https://i.imgur.com/Pgr96A6.png" alt="Logo expanded" class="logo-expanded object-contain w-full max-w-[180px]" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import SidebarLink from './SidebarLink.vue';
import {
  FileText, Barcode, ShoppingCart, CheckCircle,
  RotateCcw, ClipboardList, Settings
} from 'lucide-vue-next';

const user = ref({
  id: '',
  nickname: 'Pengguna',
  role: 'Role',
  profilePicId: ''
});

const defaultProfilePic = 'https://storage.googleapis.com/a1aa/image/949c4611-7f10-4473-594d-4957a26bc039.jpg';

const profilePictureUrl = computed(() => {
  if (user.value.profilePicId) {
    return `https://drive.google.com/thumbnail?id=${user.value.profilePicId}&sz=w200-h200`;
  }
  return defaultProfilePic;
});

const handleImageError = (e) => {
  e.target.src = defaultProfilePic;
};

onMounted(() => {
  try {
    const userData = JSON.parse(localStorage.getItem('auth_user')) || {};
    user.value = {
      id: userData.id || '',
      nickname: userData.nickname || 'Pengguna',
      role: userData.role || 'Role',
      profilePicId: userData.profilePicId || ''
    };
  } catch (err) {
    console.error('Failed to load user from localStorage:', err);
  }
});

const logout = async () => {
  const token = localStorage.getItem('auth_token');
  const parser = new UAParser();
  const ua = parser.getResult();
  const device = `${ua.device.vendor || 'Unknown'} - ${ua.browser.name} ${ua.browser.version}`;

  try {
    await fetch(`${import.meta.env.VITE_SCRIPT_URL}?action=logout&token=${token}&device=${encodeURIComponent(device)}`, {
      method: 'GET'
    });
  } catch (err) {
    console.warn('Logout log failed:', err);
  }

  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  window.location.href = '/';
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');

body {
  font-family: 'Lexend', sans-serif;
}

.profile-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  transition: width 0.3s ease, height 0.3s ease;
  margin-left: auto;
  margin-right: auto;
}

.logo-minimized {
  transition: opacity 0.15s ease, max-width 0.15s ease;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.logo-expanded {
  opacity: 0;
  max-width: 0;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.3s ease 0.15s, max-width 0.3s ease 0.15s;
  display: inline-block;
}

.logout-btn {
  width: 160px;
}
</style>
