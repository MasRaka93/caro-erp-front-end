<template>
  <main class="bg-white text-black p-4 sm:p-8 max-w-[1400px] mx-auto sm:ml-[80px]">
    <h1 class="font-bold text-xl sm:text-2xl mb-6 sm:mb-8 font-bold-inter">DATA MARKETPLACE</h1>

    <!-- Filters and Info Bar -->
    <section class="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 w-full">
      <select class="filter-select" aria-label="Marketplace">
        <option disabled selected>Marketplace</option>
      </select>
      <select class="filter-select" aria-label="Nama Akun Toko">
        <option disabled selected>Nama Akun Toko</option>
      </select>
      <select class="filter-select" aria-label="Bulan Data">
        <option disabled selected>Bulan Data</option>
      </select>
      <select class="filter-select" aria-label="Tahun Data">
        <option disabled selected>Tahun Data</option>
      </select>

      <div class="ml-auto flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-black whitespace-nowrap">
        <span>"current-date"</span>
        <span>"current-time"</span>
      </div>

      <input type="text" readonly value="POTK325052301" class="order-id-input" />
    </section>

    <!-- Summary + Buttons -->
    <section class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-3 sm:gap-4">
      <p class="text-gray-600 font-semibold text-sm sm:text-lg whitespace-nowrap">
        125 Pesanan - 58 SKU Produk - 0 SKU Error
      </p>
      <div class="flex gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
        <button class="action-button">
          <span>Unggah Data</span>
          <i class="fas fa-upload"></i>
        </button>
        <button class="action-button">
          <span>Kirim Data</span>
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </section>

    <!-- Table -->
    <section class="overflow-x-auto border border-black rounded">
      <table class="w-full border-collapse table-fixed min-w-[700px] sm:min-w-full">
        <thead>
          <tr class="bg-sky-500 text-white text-xs sm:text-sm font-semibold">
            <th class="cell-head w-10">
              <input type="checkbox" aria-label="Select all rows" />
            </th>
            <th class="cell-head min-w-[120px]">Nomor PO</th>
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
          <tr v-for="n in 3" :key="n" :class="n % 2 === 0 ? 'bg-gray-100' : 'bg-white'">
            <td class="cell-data text-center"><input type="checkbox" :aria-label="`Select row ${n}`" /></td>
            <td class="cell-data" title="240412FSD8YU...">240412FSD8YU...</td>
            <td class="cell-data" title="JPX146123568">JPX146123568</td>
            <td class="cell-data" title="24/05/2025 10:30">24/05/2025 10:30</td>
            <td class="cell-data" title="101001 SCH...">101001 SCH...</td>
            <td class="cell-data" title="101001 SCH Sticker Case ...">101001 SCH Sticker Case ...</td>
            <td class="cell-data" title="108 Pcs (Col..">108 Pcs (Col..</td>
            <td class="cell-data text-center">1</td>
            <td class="cell-data" title="101001">101001</td>
            <td class="cell-data text-center cursor-pointer" title="Edit row">
              <i class="fas fa-edit"></i>
            </td>
            <td class="cell-data text-center cursor-pointer" title="Delete row">
              <i class="fas fa-trash"></i>
            </td>
          </tr>
          <tr v-for="n in 22" :key="`empty-${n}`" :class="n % 2 === 0 ? 'bg-gray-100' : 'bg-white'">
            <td class="border border-black" colspan="11">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- Pagination -->
    <nav class="mt-4 flex flex-wrap justify-center items-center gap-2 text-sm sm:text-base select-none" aria-label="Pagination">
      <button class="nav-btn" aria-label="First page"><i class="fas fa-step-backward"></i></button>
      <button class="nav-btn" aria-label="Previous page"><i class="fas fa-caret-left"></i></button>
      <template v-for="n in 9" :key="n">
        <button class="page-btn" :aria-label="`Page ${n}`">{{ n }}</button>
      </template>
      <span class="px-2 py-1">…</span>
      <button class="nav-btn" aria-label="Next page"><i class="fas fa-caret-right"></i></button>
      <button class="nav-btn" aria-label="Last page"><i class="fas fa-step-forward"></i></button>
    </nav>
  </main>
</template>

<script setup>
// Placeholder script block. Nanti bisa tambahkan fetch data marketplace, filter logic, pagination, dsb
  // Fungsi untuk update tanggal dan waktu
    import { ref, onMounted, onBeforeUnmount } from 'vue';

    const currentDate = ref('');
    const currentTime = ref('');
    let intervalId = null;

    const updateDateTime = () => {
    const now = new Date();
    currentDate.value = now.toLocaleDateString('en-GB');
    currentTime.value = now.toLocaleTimeString('en-GB', { hour12: false });
    };

    onMounted(() => {
    updateDateTime();
    intervalId = setInterval(updateDateTime, 1000);
    });

    onBeforeUnmount(() => {
    clearInterval(intervalId); // Bersihkan interval saat komponen di-unmount
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

.page-btn {
  @apply font-semibold px-2 sm:px-3 py-1 rounded hover:bg-sky-100 transition-colors;
}
</style>
