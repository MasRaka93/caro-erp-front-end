<template>
  <div class="flex min-h-screen bg-white text-black">
    <Sidebar :isSidebarOpen="true" />

    <main class="flex-1 p-4 sm:p-8 max-w-[1400px] mx-auto sm:ml-[80px]">
      <div class="flex justify-between items-center mb-6">
        <h1 class="font-bold text-xl sm:text-2xl font-bold-inter">DATA MARKETPLACE</h1>
      </div>

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
        <div class="ml-auto flex items-center space-x-4 text-xs sm:text-sm text-black whitespace-nowrap">
          <span>{{ currentDate }}</span>
          <span>{{ currentTime }}</span>
        </div>
        <input type="text" readonly :value="generatedPO" class="order-id-input" />
      </section>

      <section class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <p class="text-gray-600 font-semibold text-sm sm:text-lg whitespace-nowrap">
          {{ tableData.length }} Pesanan - {{ countSKU }} SKU Produk - {{ countSKUError }} SKU Error
        </p>
        <div class="flex gap-4 flex-wrap sm:flex-nowrap">
          <button class="action-button" :disabled="!canUpload" @click="showUploadModal = true">
            <span>Unggah Data</span><i class="fas fa-upload"></i>
          </button>
          <button class="action-button" :disabled="!canSubmit" @click="submitData">
            <span>Kirim Data</span><i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </section>

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

      <nav class="mt-4 flex justify-center gap-2 text-sm sm:text-base select-none" aria-label="Pagination">
        <button class="nav-btn" @click="currentPage = 1"><<</button>
        <button class="nav-btn" @click="currentPage--" :disabled="currentPage <= 1"><</button>
        <span class="px-2 py-1">Page {{ currentPage }}</span>
        <button class="nav-btn" @click="currentPage++" :disabled="endIndex >= tableData.length">></button>
        <button class="nav-btn" @click="currentPage = totalPages">>></button>
      </nav>

      <UploadModal v-if="showUploadModal" @close="showUploadModal = false" @uploaded="handleUploadedFile" />
    </main>
  </div>
</template>