<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Responsive Sidebar with Centered Icons</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Lexend&display=swap" rel="stylesheet" />
  <style>
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
      position: fixed;
      top: 0;
      left: 0;
      z-index: 40;
    }
    /* Hide all text and large profile & logout button by default */
    #sidebar .sidebar-text,
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
    /* Desktop hover: show text and large profile & logout */
    @media (min-width: 768px) {
      #sidebar {
        width: 4rem; /* minimized width */
        padding-left: 0;
        padding-right: 0;
      }
      #sidebar:hover {
        width: 18rem; /* expanded width */
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
      #sidebar:hover .sidebar-text,
      #sidebar:hover .profile-text,
      #sidebar:hover .logout-btn,
      #sidebar:hover .logo-expanded {
        opacity: 1;
        max-width: 1000px;
      }
      #sidebar:hover .logo-minimized {
        opacity: 0;
        max-width: 0;
        transition: opacity 0.15s ease, max-width 0.15s ease;
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
      #sidebar:hover .profile-img {
        width: 4rem;
        height: 4rem;
        transition: width 0.3s ease, height 0.3s ease;
      }
      #sidebar .profile-img {
        width: 40px;
        height: 40px;
        transition: width 0.3s ease, height 0.3s ease;
        object-fit: cover;
        margin-left: auto;
        margin-right: auto;
      }
      #sidebar .logout-btn {
        width: 160px;
      }
      /* Hover effect on menu items: background behind icon and text */
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
      /* Center icons in minimized mode */
      nav a {
        justify-content: center;
      }
      #sidebar:hover nav a {
        justify-content: flex-start;
      }
      /* When expanded, add left margin to icons */
      #sidebar:hover nav a svg {
        margin-right: 0.75rem;
      }
    }
    /* Mobile: hide sidebar by default */
    @media (max-width: 767px) {
      #sidebar {
        width: 18rem;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
      #sidebar.open {
        transform: translateX(0);
      }
      /* Show all text and large profile & logout on mobile when open */
      #sidebar.open .sidebar-text,
      #sidebar.open .profile-text,
      #sidebar.open .logout-btn,
      #sidebar.open .logo-expanded {
        opacity: 1;
        max-width: 1000px;
      }
      #sidebar.open .logo-minimized {
        opacity: 0;
        max-width: 0;
        transition: opacity 0.15s ease, max-width 0.15s ease;
      }
      #sidebar.open .profile-img {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        transition: width 0.3s ease, height 0.3s ease;
        margin-left: 0;
        margin-right: 0;
      }
      #sidebar .profile-img {
        width: 4rem;
        height: 4rem;
        object-fit: cover;
        transition: width 0.3s ease, height 0.3s ease;
      }
      /* Hover effect on menu items for mobile open */
      nav a {
        transition: background-color 0.3s ease, color 0.3s ease;
        border-radius: 0.375rem; /* rounded-md */
        padding: 0.25rem 0.75rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      nav a:hover {
        background-color: #cbd5e1; /* Tailwind gray-300 */
        color: #1e293b; /* Tailwind gray-800 */
      }
      nav a:hover svg {
        stroke: #1e293b;
      }
      /* Hide hamburger when sidebar open */
      #hamburgerBtn.open {
        display: none;
      }
      /* Overlay visible when sidebar open */
      #overlay {
        display: none;
      }
      #overlay.show {
        display: block;
      }
    }
  </style>
</head>
<body class="bg-white">
  <div class="flex min-h-screen">
    <!-- Hamburger for mobile -->
    <button id="hamburgerBtn" aria-label="Toggle menu" class="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400">
      <svg class="w-8 h-8 text-black" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>

    <aside id="sidebar" class="">
      <div>
        <!-- Profile -->
        <div class="flex items-center space-x-0 md:space-x-4 mb-12">
          <img
            src="https://storage.googleapis.com/a1aa/image/949c4611-7f10-4473-594d-4957a26bc039.jpg"
            alt="Profile image of a man with glasses smiling"
            class="rounded-full object-cover profile-img flex-shrink-0"
          />
          <div class="profile-text">
            <h1 class="text-black font-semibold text-lg leading-tight">Raka</h1>
            <p class="text-xs text-gray-700 leading-tight">Super Admin</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="space-y-6">
          <a href="#" class="flex items-center space-x-0 md:space-x-3 text-black font-semibold text-base leading-tight">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/></svg>
            <span class="sidebar-text hidden md:inline">Data Marketplace</span>
          </a>
          <a href="#" class="flex items-center space-x-0 md:space-x-3 text-black font-semibold text-base leading-tight">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" viewBox="0 0 24 24"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 7v10"/><path d="M12 7v10"/><path d="M17 7v10"/></svg>
            <span class="sidebar-text hidden md:inline">Scan AWB</span>
          </a>
          <a href="#" class="flex items-center space-x-0 md:space-x-3 text-black font-semibold text-base leading-tight">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span class="sidebar-text hidden md:inline">Belanja Produk</span>
          </a>
          <a href="#" class="flex items-center space-x-0 md:space-x-3 text-black font-semibold text-base leading-tight">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" viewBox="0 0 24 24"><path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="m16 19 3 3 3-3"/><path d="M18 12h.01"/><path d="M19 16v6"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/></svg>
            <span class="sidebar-text hidden md:inline">Success</span>
          </a>
          <a href="#" class="flex items-center space-x-0 md:space-x-3 text-black font-semibold text-base leading-tight">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" viewBox="0 0 24 24"><path d="M21 8L18.74 5.74A9.75 9.75 0 0 0 12 3C11 3 10.03 3.16 9.13 3.47"/><path d="M8 16H3v5"/><path d="M3 12C3 9.51 4 7.26 5.64 5.64"/><path d="m3 16 2.26 2.26A9.75 9.75 0 0 0 12 21c2.49 0 4.74-1 6.36-2.64"/><path d="M21 12c0 1-.16 1.97-.47 2.87"/><path d="M21 3v5h-5"/><path d="M22 22 2 2"/></svg>
            <span class="sidebar-text hidden md:inline">Retur / Cancel</span>
          </a>
          <a href="#" class="flex items-center space-x-0 md:space-x-3 text-black font-semibold text-base leading-tight">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" viewBox="0 0 24 24"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/></svg>
            <span class="sidebar-text hidden md:inline">Laporan</span>
          </a>
          <a href="#" class="flex items-center space-x-0 md:space-x-3 text-black font-semibold text-base leading-tight">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><circle cx="12" cy="12" r="4"/></svg>
            <span class="sidebar-text hidden md:inline">Pengaturan</span>
          </a>
        </nav>
      </div>

      <div class="flex flex-col items-center space-y-6">
        <button
          type="button"
          class="logout-btn bg-sky-400 text-white font-semibold text-sm rounded-md px-6 py-2 w-full max-w-[160px]"
        >
          Logout
        </button>
        <img
          src="https://i.imgur.com/dQV51zd.png"
          alt="Minimized logo"
          class="logo-minimized object-contain"
          style="max-width: 96px;"
        />
        <img
          src="https://i.imgur.com/Pgr96A6.png"
          alt="Expanded logo"
          class="logo-expanded object-contain w-full max-w-[180px]"
        />
      </div>
    </aside>

    <!-- Overlay for mobile when sidebar open -->
    <div id="overlay" class="fixed inset-0 bg-black bg-opacity-30 hidden z-30 md:hidden"></div>

    <main class="flex-1 ml-16 md:ml-16">
      <!-- Content area, empty as per design -->
    </main>
  </div>

  <script>
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const overlay = document.getElementById('overlay');

    let mobileSidebarOpen = false;

    hamburgerBtn.addEventListener('click', () => {
      mobileSidebarOpen = !mobileSidebarOpen;
      if (mobileSidebarOpen) {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        hamburgerBtn.classList.add('open');
      } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        hamburgerBtn.classList.remove('open');
      }
    });

    overlay.addEventListener('click', () => {
      mobileSidebarOpen = false;
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
      hamburgerBtn.classList.remove('open');
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) {
        mobileSidebarOpen = false;
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        hamburgerBtn.classList.remove('open');
      } else {
        mobileSidebarOpen = false;
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        hamburgerBtn.classList.remove('open');
      }
    });
  </script>
</body>
</html>