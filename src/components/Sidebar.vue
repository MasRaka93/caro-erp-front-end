<template>
  <aside
    id="sidebar"
    :class="[isMobile ? (isOpen ? 'open' : '') : '']"
    @mouseenter="!isMobile && expandSidebar()"
    @mouseleave="!isMobile && collapseSidebar()"
    class="fixed top-0 left-0 z-40 h-screen flex flex-col justify-between bg-gray-100 transition-all duration-300"
  >
    <div class="p-6 flex flex-col space-y-12">
      <!-- Profile -->
      <div class="flex items-center space-x-0 md:space-x-4">
        <img
          :src="profilePictureUrl"
          alt="Profile image"
          class="profile-img rounded-full object-cover"
          @error="handleImageError"
        />
        <div class="profile-text">
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

    <div class="flex flex-col items-center space-y-6 p-6">
      <button
        class="logout-btn bg-sky-400 text-white font-semibold text-sm rounded-md px-6 py-2 w-full max-w-[160px]"
        @click="handleLogout"
      >
        Logout
      </button>
      <img src="https://i.imgur.com/dQV51zd.png" alt="Logo minimized" class="logo-minimized object-contain" />
      <img src="https://i.imgur.com/Pgr96A6.png" alt="Logo expanded" class="logo-expanded object-contain" />
    </div>
  </aside>

  <!-- Hamburger & Overlay for Mobile -->
  <button
    id="hamburgerBtn"
    v-if="isMobile"
    @click="toggleSidebar"
    class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
    :class="{ open: isOpen }"
    aria-label="Toggle menu"
  >
    <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  </button>
  <div id="overlay" v-if="isMobile && isOpen" @click="toggleSidebar" class="fixed inset-0 bg-black bg-opacity-30 z-30"></div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import SidebarLink from './SidebarLink.vue';
import { FileText, Barcode, ShoppingCart, CheckCircle, RotateCcw, ClipboardList, Settings } from 'lucide-vue-next';

const isOpen = ref(false);
const isMobile = ref(false);

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

function expandSidebar() {
  document.getElementById('sidebar').style.width = '18rem';
}
function collapseSidebar() {
  document.getElementById('sidebar').style.width = '4rem';
}
function toggleSidebar() {
  isOpen.value = !isOpen.value;
}

function handleLogout() {
  const userData = JSON.parse(localStorage.getItem('auth_user'));
  const token = localStorage.getItem('auth_token');
  const device = navigator.userAgent;

  fetch(import.meta.env.VITE_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, device, action: 'logout', userId: userData?.id || '' })
  });

  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
  window.location.href = '/';
}

onMounted(() => {
  const w = window.innerWidth;
  isMobile.value = w < 768;

  const saved = JSON.parse(localStorage.getItem('auth_user'));
  if (saved) {
    user.value.nickname = saved.nickname || 'Pengguna';
    user.value.role = saved.role || 'Role';
    user.value.profilePicId = saved.profilePicId || '';
  }
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');

body {
  font-family: 'Lexend', sans-serif;
}

#sidebar {
  transition: width 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: #f3f4f6; /* Tailwind gray-100 */
  height: 100vh;
}

#sidebar .profile-text,
#sidebar .logout-btn,
#sidebar .logo-expanded {
  opacity: 0;
  max-width: 0;
  white-space: nowrap;
  overflow: hidden;
  transition: opacity 0.3s ease 0.15s, max-width 0.3s ease 0.15s;
  display: inline-block;
}

#sidebar:hover .profile-text,
#sidebar.open .profile-text,
#sidebar:hover .logo-expanded,
#sidebar.open .logo-expanded,
#sidebar:hover .logout-btn,
#sidebar.open .logout-btn {
  opacity: 1;
  max-width: 1000px;
}

#sidebar .logo-minimized {
  opacity: 1;
  max-width: 96px;
  height: auto;
  transition: opacity 0.15s ease 0.3s, max-width 0.15s ease 0.3s;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

#sidebar .profile-img {
  width: 40px;
  height: 40px;
  transition: width 0.3s ease, height 0.3s ease;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
}

#sidebar:hover .profile-img {
  width: 64px;
  height: 64px;
}

.logout-btn {
  width: 160px;
}

nav a {
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 0.375rem; /* rounded-md */
  padding: 0.25rem 0.75rem;
  display: flex;
  align-items: center;
}

nav a:hover {
  background-color: #cbd5e1; /* Tailwind gray-300 */
  color: #1e293b; /* Tailwind gray-800 */
}

nav a:hover svg {
  stroke: #1e293b;
}

#sidebar:hover nav a {
  justify-content: flex-start;
}

#sidebar .logo-minimized {
  max-width: 96px;
  transition: opacity 0.15s ease, max-width 0.15s ease;
}
</style>