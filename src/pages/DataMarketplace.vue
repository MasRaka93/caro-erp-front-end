<template>
  <div class="flex min-h-screen bg-white text-black">
    <!-- Sidebar -->
    <Sidebar :isSidebarOpen="isSidebarOpen" @toggle="toggleSidebar" />
     
     
 
 

    <!-- Main Content -->
    <main class="flex-1 p-4 sm:p-8 max-w-[1400px] mx-auto sm:ml-[80px]">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="font-bold text-xl sm:text-2xl font-bold-inter flex-1">DATA MARKETPLACE</h1>
        <div class="md:hidden w-10"></div>
      </div>
 
 

      <!-- Dropdown Filters -->
      <section class="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 w-full">
        <select v-model="selectedMarketplace" @change="onMarketplaceChange" class="filter-select">
          <option disabled value="">Marketplace</option>
          <option v-for="item in uniqueMarketplaces" :key="item">{{ item }}</option>
        </select>
        <select v-model="selectedAkunToko" class="filter-select">
          <option disabled value="">Nama Akun Toko</option>
          <option v-for="item in filteredAkunTokoOptions" :key="item">{{ item }}</option>
        </select>
        <select v-model="selectedMonth" class="filter-select">
          <option v-for="(bulan, i) in bulanOptions" :key="i" :value="bulan">{{ bulan }}</option>
        </select>
        <select v-model="selectedYear" class="filter-select">
          <option v-for="tahun in tahunOptions" :key="tahun" :value="tahun">{{ tahun }}</option>
        </select>
 
 

        <!-- Tanggal & Waktu -->
        <div class="ml-auto flex items-center space-x-4 text-xs sm:text-sm text-black whitespace-nowrap">
          <span>{{ currentDate }}</span>
          <span>{{ currentTime }}</span>
        </div>
 
 

        <!-- PO Otomatis -->
        <input type="text" readonly :value="generatedPO" class="order-id-input" />
      </section>
 
 

      <!-- Summary & Buttons -->
      <section class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <p class="text-gray-600 font-semibold text-sm sm:text-lg whitespace-nowrap">
          {{ tableData.length }} Pesanan - {{ countSKU }} SKU Produk - {{ countSKUError }} SKU Error
        </p>
        <div class="flex gap-4 flex-wrap sm:flex-nowrap">
          <button class="action-button" :disabled="!canUpload" @click="openUploadModal">
            <span>Unggah Data</span><i class="fas fa-upload"></i>
          </button>
          <button class="action-button" :disabled="!canSubmit" @click="submitData">
            <span>Kirim Data</span><i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </section>
 
 

      <!-- Table -->
      <section class="overflow-x-auto border border-black rounded">
        <table class="w-full border-collapse table-fixed min-w-[700px] sm:min-w-full">
          <thead>
            <tr class="bg-sky-500 text-white text-xs sm:text-sm font-semibold">
              <th class="cell-head w-10"><input type="checkbox" /></th>
              <th class="cell-head min-w-[120px]">No PO Marketplace</th>
              <th class="cell-head min-w-[130px]">No AWB</th>
              <th class="cell-head min-w-[130px]">Tgl Order</th>
              <th class="cell-head min-w-[130px]">SKU Produk</th>
              <th class="cell-head min-w-[180px]">Nama Produk</th>
              <th class="cell-head min-w-[120px]">Varian</th>
              <th class="cell-head w-10">Qty</th>
              <th class="cell-head min-w-[100px]">SKU Real</th>
              <th class="cell-head w-10"></th>
              <th class="cell-head w-10"></th>
            </tr>
          </thead>
          <tbody class="text-[10px] sm:text-xs">
            <tr v-for="(row, i) in paginatedData" :key="i" :class="row.statusClass">
              <td class="cell-data text-center"><input type="checkbox" /></td>
              <td class="cell-data">{{ row.poMarketplace }}</td>
              <td class="cell-data">{{ row.awb }}</td>
              <td class="cell-data">{{ row.tgl }}</td>
              <td class="cell-data">{{ row.sku }}</td>
              <td class="cell-data">{{ row.nama }}</td>
              <td class="cell-data">{{ row.varian }}</td>
              <td class="cell-data text-center">{{ row.qty }}</td>
              <td class="cell-data">{{ row.skuReal }}</td>
              <td class="cell-data text-center"><i class="fas fa-edit cursor-pointer"></i></td>
              <td class="cell-data text-center"><i class="fas fa-trash cursor-pointer"></i></td>
            </tr>
          </tbody>
        </table>
      </section>
 
 

      <!-- Pagination -->
      <nav class="mt-4 flex justify-center gap-2 text-sm sm:text-base select-none" aria-label="Pagination">
        <button class="nav-btn" @click="goToPage(1)" :disabled="currentPage === 1"><<</button>
        <button class="nav-btn" @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1"><</button>
        <span class="px-2 py-1">Page {{ currentPage }}</span>
        <button class="nav-btn" @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages">></button>
        <button class="nav-btn" @click="goToPage(totalPages)" :disabled="currentPage === totalPages">>></button>
      </nav>
 
 

      <!-- Upload Modal -->
      <UploadModal v-if="showUploadModal" @close="closeUploadModal" @uploaded="handleUploadedFile" />
    </main>
  </div>
</template>
 
 

<script setup>
import { ref, computed, onMounted } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import UploadModal from '@/components/UploadModal.vue';
 
 

const isSidebarOpen = ref(true);
 
 

const currentDate = ref('');
const currentTime = ref('');
const selectedMarketplace = ref('');
const selectedAkunToko = ref('');
const selectedMonth = ref(new Date().toLocaleString('default', { month: 'long' }));
const selectedYear = ref(new Date().getFullYear());
const marketplaces = ref([]);
const akunTokoOptions = ref([]);
const bulanOptions = ref(['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']);
const tahunOptions = ref(Array.from({ length: 11 }, (_, i) => 2024 + i));
 
 

const showUploadModal = ref(false);
const tableData = ref([]);
const currentPage = ref(1);
const itemsPerPage = 25;
 
 

const idToko = ref('');
const linkTarget = ref('');
const nomorUrut = ref('01');
 
 

// Computed
const uniqueMarketplaces = computed(() => [...new Set(marketplaces.value)]);
const filteredAkunTokoOptions = computed(() =>
  akunTokoOptions.value
    .filter(t => t.marketplace === selectedMarketplace.value)
    .map(t => t.akun)
);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return tableData.value.slice(start, start + itemsPerPage);
});
const endIndex = computed(() => currentPage.value * itemsPerPage);
const totalPages = computed(() => Math.ceil(tableData.value.length / itemsPerPage));
const canUpload = computed(() => selectedMarketplace.value && selectedAkunToko.value && selectedMonth.value && selectedYear.value);
const canSubmit = computed(() => canUpload.value && tableData.value.length > 0);
 
 

const generatedPO = computed(() => {
  if (!idToko.value) return '';
  const date = new Date();
  const yymmdd = date.toISOString().slice(2, 10).replace(/-/g, '');
  return `PO${idToko.value}${yymmdd}${nomorUrut.value}`;
});
const countSKU = computed(() => tableData.value.length);
const countSKUError = computed(() => tableData.value.filter(d => d.skuReal === '').length);
 
 

// -------------------- FETCH DATA FROM APPSCRIPT --------------------
const fetchMarketplaceData = async () => {
  try {
    const res = await fetch(import.meta.env.VITE_SCRIPT_URL + '?mode=db_toko');
    const data = await res.json();
    console.log('Respons API:', data); // Log respons untuk debugging
 
 

    // Cek apakah status sukses dan data ada serta berbentuk array
    if (data.status === 'success' && Array.isArray(data.data)) {
      // data.data adalah array yang bisa kamu proses dengan .map()
      const marketplacesData = data.data.map(row => ({
        idToko: row.ID_Toko,
        marketplace: row.Marketplace,
        akun: row['Nama Akun Toko'],
        tahun: row['Tahun Data'],
        bulan: row['Bulan Data'],
        link: row['Link Spreadsheet'],
      }));
      marketplaces.value = [...new Set(marketplacesData.map(x => x.marketplace))];
      akunTokoOptions.value = marketplacesData; // Simpan data lengkap
    } else {
      console.error('Data yang diterima tidak sesuai format array:', data);
    }
  } catch (error) {
    console.error('Error fetching marketplace data:', error);
  }
};
 
 

// -------------------- HANDLE MARKETPLACE CHANGE --------------------
const onMarketplaceChange = () => {
  const filtered = akunTokoOptions.value.find(row =>
    row.marketplace === selectedMarketplace.value &&
    row.akun === selectedAkunToko.value &&
    row.bulan === selectedMonth.value &&
    row.tahun === selectedYear.value.toString()
  );
  if (filtered) {
    idToko.value = filtered.idToko;
    linkTarget.value = filtered.link;
  } else {
    idToko.value = '';
    linkTarget.value = '';
  }
};
 
 

// -------------------- HANDLE FILE UPLOAD --------------------
const openUploadModal = () => {
  showUploadModal.value = true;
};
const closeUploadModal = () => {
  showUploadModal.value = false;
};
 
 

const handleUploadedFile = async (rows) => {
  showUploadModal.value = false;
  tableData.value = rows.map(row => ({
    ...row,
    skuReal: '',
    statusClass: ''
  }));
  await validateData();
  currentPage.value = 1; // Reset to first page
};
 
 

const validateData = async () => {
  try {
    const skuRes = await fetch(import.meta.env.VITE_SCRIPT_URL + '?mode=db_produk');
    const skuData = await skuRes.json();
    const validSKUList = skuData.map(r => r.sku);
 
 

    tableData.value = tableData.value.map(row => {
      const skuReal = row['SKU Produk'] ? row['SKU Produk'].toString().trim().toUpperCase() : '';
      const po = row['No PO Marketplace'];
      const awb = row['No AWB'];
 
 

      // Status warna
      let statusClass = '';
      if (!skuReal) {
        statusClass = 'bg-yellow-100'; // SKU Real kosong / error
      } else if (!validSKUList.includes(skuReal)) {
        statusClass = 'bg-green-100'; // SKU Real tidak terdaftar
      }
 
 

      return {
        poMarketplace: po,
        awb: awb,
        tgl: row['Tanggal Order'],
        sku: row['SKU Produk'],
        nama: row['Nama Produk'],
        varian: row['Varian'],
        qty: row['Qty'],
        skuReal,
        statusClass,
      };
    });
  } catch (error) {
    console.error('Error validating data:', error);
    alert('Gagal memvalidasi data.');
  }
};
 
 

// -------------------- HANDLE SUBMIT DATA --------------------
const submitData = async () => {
  if (!canSubmit.value) {
    alert('Lengkapi filter dan unggah data terlebih dahulu.');
    return;
  }
  if (!confirm('Yakin ingin mengirim data?')) return;
 
 

  try {
    const response = await fetch(import.meta.env.VITE_SCRIPT_URL + '?action=submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        marketplace: selectedMarketplace.value,
        akunToko: selectedAkunToko.value,
        bulan: selectedMonth.value,
        tahun: selectedYear.value,
        data: tableData.value,
      }),
    });
    if (response.ok) {
      alert('Data berhasil dikirim!');
      tableData.value = [];
      currentPage.value = 1;
    } else {
      alert('Gagal mengirim data.');
    }
  } catch (error) {
    console.error('Submit data error:', error);
    alert('Terjadi kesalahan saat mengirim data.');
  }
};
 
 

// -------------------- PAGINATION --------------------
const goToPage = (page) => {
  if (page < 1) page = 1;
  if (page > totalPages.value) page = totalPages.value;
  currentPage.value = page;
};
 
 

// -------------------- INIT --------------------
onMounted(() => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString('id-ID');
  currentTime.value = now.toLocaleTimeString('id-ID', { hour12: false });
  fetchMarketplaceData(); // Panggil fungsi untuk ambil data saat komponen dimuat
});
</script>
 
 

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap");
 
 

.font-bold-inter {
  font-family: "Inter", sans-serif;
  font-weight: 700;
}
 
 

.filter-select {
  @apply border border-black text-gray-400 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 appearance-none pr-7 sm:pr-8 flex-shrink-0;
}
.order-id-input {
  @apply border border-black text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 w-[120px] sm:w-[160px] text-center ml-2 sm:ml-4 flex-shrink-0;
}
.action-button {
  @apply bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 sm:px-5 rounded-lg shadow-md flex items-center gap-2 transition-colors duration-200 whitespace-nowrap;
}
.cell-head {
  @apply border border-black px-2 sm:px-3 py-1 sm:py-2 text-center;
}
.cell-data {
  @apply border border-black px-2 sm:px-3 py-1 sm:py-2 truncate max-w-[180px];
}
.nav-btn {
  @apply font-bold p-1 sm:p-2 hover:text-sky-600 transition-colors;
}
.bg-yellow-100 {
  background-color: #fef3c7;
}
.bg-green-100 {
  background-color: #dcfce7;
}
</style>