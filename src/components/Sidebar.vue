<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
      user: {
        nickname: 'Pengguna',
        role: 'Role',
        profilePicId: ''
      },
      defaultProfilePic: 'https://storage.googleapis.com/a1aa/image/949c4611-7f10-4473-594d-4957a26bc039.jpg'
    };
  },
  computed: {
    profilePictureUrl() {
      return this.user.profilePicId
        ? `https://drive.google.com/thumbnail?id=${this.user.profilePicId}&sz=w200-h200`
        : this.defaultProfilePic;
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    handleImageError(e) {
      e.target.src = this.defaultProfilePic;
    },
    async logout() {
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
      this.$router.push('/');
    }
  },
  mounted() {
    const userData = JSON.parse(localStorage.getItem('auth_user'));
    if (userData) {
      this.user.nickname = userData.nickname || 'Pengguna';
      this.user.role = userData.role || 'Role';
      this.user.profilePicId = userData.profilePicId || '';
    }

    // Replace hardcoded name & role in DOM
    const profileImg = document.getElementById('profileImg');
    if (profileImg) profileImg.src = this.profilePictureUrl;

    const profileName = document.querySelector('.profile-text h1');
    const profileRole = document.querySelector('.profile-text p');
    if (profileName) profileName.textContent = this.user.nickname;
    if (profileRole) profileRole.textContent = this.user.role;

    // Add event listener for logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', this.logout);
  }
};
</script>
