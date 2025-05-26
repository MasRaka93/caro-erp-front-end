<template>
  <div class="flex min-h-screen font-Lexend">
    <Sidebar />
    <div class="flex-1 p-4">
      <!-- Konten utama -->
    </div>
  </div>

  <div class="bg-white text-black p-8 font-Lexend">
    <main class="max-w-[1440px] mx-auto">
      <h1 class="text-2xl font-extrabold mb-8">DATA MARKETPLACE</h1>

      <!-- Dropdown & Info Bar -->
      <section class="flex flex-wrap items-center gap-4 mb-6">
        <select v-model="selectedMarketplace" class="border border-black text-gray-400 text-sm px-4 py-2 appearance-none pr-8">
          <option disabled value="">Marketplace</option>
          <option v-for="mp in marketplaces" :key="mp" :value="mp">{{ mp }}</option>
        </select>
        <select v-model="selectedAkun" class="border border-black text-gray-400 text-sm px-4 py-2 appearance-none pr-8">
          <option disabled value="">Nama Akun Toko</option>
          <option v-for="akun in akunToko" :key="akun" :value="akun">{{ akun }}</option>
        </select>
        <select v-model="selectedBulan" class="border border-black text-gray-400 text-sm px-4 py-2 appearance-none pr-8">
          <option disabled value="">Bulan Data</option>
          <option v-for="bulan in bulanList" :key="bulan" :value="bulan">{{ bulan }}</option>
        </select>
        <select v-model="selectedTahun" class="border border-black text-gray-400 text-sm px-4 py-2 appearance-none pr-8">
          <option disabled value="">Tahun Data</option>
          <option v-for="tahun in tahunList" :key="tahun" :value="tahun">{{ tahun }}</option>
        </select>

        <div class="ml-auto flex items-center space-x-4 text-sm font-normal">
          <span>{{ tanggal }}</span>
          <span>{{ waktu }}</span>
        </div>

        <input
          type="text"
          readonly
          :value="nomorPO"
          class="border border-black text-sm px-4 py-2 w-[160px] text-center ml-4"
        />
      </section>

      <!-- Tombol -->
      <section class="flex justify-end gap-4 mb-2">
        <button
          @click="openUploadModal"
          class="bg-sky-400 text-black font-extrabold text-sm px-4 py-2 rounded-md flex items-center gap-2"
        >
          Unggah Data
          <i class="fas fa-upload"></i>
        </button>
        <button
          @click="kirimData"
          class="bg-sky-400 text-black font-extrabold text-sm px-4 py-2 rounded-md flex items-center gap-2"
        >
          Kirim Data
          <i class="fas fa-paper-plane"></i>
        </button>
      </section>

      <!-- Info Ringkasan -->
      <section class="mb-4">
        <p class="text-gray-600 font-semibold text-lg">
          {{ summaryText }}
        </p>
      </section>

      <!-- Tabel -->
      <section class="overflow-x-auto border border-black">
        <table class="w-full border-collapse table-fixed text-sm">
          <thead>
            <tr class="bg-sky-500 text-white font-semibold text-left">
              <th class="w-10 border border-black px-2 py-2">
                <input type="checkbox" />
              </th>
              <th class="w-[130px] border border-black px-2 py-2">Nomor PO</th>
              <th class="w-[130px] border border-black px-2 py-2">No AWB</th>
              <th class="w-[130px] border border-black px-2 py-2">Tgl Order</th>
              <th class="w-[130px] border border-black px-2 py-2">SKU Produk</th>
              <th class="w-[180px] border border-black px-2 py-2">Nama Produk</th>
              <th class="w-[110px] border border-black px-2 py-2">Varian</th>
              <th class="w-10 border border-black px-2 py-2 text-center">Qty</th>
              <th class="w-[90px] border border-black px-2 py-2">SKU Real</th>
              <th class="w-10 border border-black px-2 py-2 text-center"><i class="fas fa-pen"></i></th>
              <th class="w-10 border border-black px-2 py-2 text-center"><i class="fas fa-trash"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in rows" :key="i" :class="i % 2 === 0 ? 'bg-white' : 'bg-gray-100'">
              <td class="border border-black px-2 py-2 text-center">
                <input type="checkbox" />
              </td>
              <td class="border border-black px-2 py-2 truncate">{{ row.nomorPO }}</td>
              <td class="border border-black px-2 py-2 truncate">{{ row.awb }}</td>
              <td class="border border-black px-2 py-2">{{ row.tglOrder }}</td>
              <td class="border border-black px-2 py-2 truncate">{{ row.skuProduk }}</td>
              <td class="border border-black px-2 py-2 truncate">{{ row.namaProduk }}</td>
              <td class="border border-black px-2 py-2 truncate">{{ row.varian }}</td>
              <td class="border border-black px-2 py-2 text-center">{{ row.qty }}</td>
              <td class="border border-black px-2 py-2">{{ row.skuReal }}</td>
              <td class="border border-black px-2 py-2 text-center cursor-pointer"><i class="fas fa-pen"></i></td>
              <td class="border border-black px-2 py-2 text-center cursor-pointer"><i class="fas fa-trash"></i></td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'DataMarketplace',
  data() {
    return {
      selectedMarketplace: '',
      selectedAkun: '',
      selectedBulan: '',
      selectedTahun: '',
      nomorPO: 'POTK325052301',
      marketplaces: ['Shopee', 'Tokopedia', 'Lazada'],
      akunToko: ['Toko A', 'Toko B', 'Toko C'],
      bulanList: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
      tahunList: Array.from({ length: 11 }, (_, i) => 2024 + i),
      rows: [
        {
          nomorPO: '240412FSD8YU123',
          awb: 'JPX146123568',
          tglOrder: '24/05/2025 10:30',
          skuProduk: '101001 SCH...',
          namaProduk: '101001 SCH Sticker Case ...',
          varian: '108 Pcs (Col..',
          qty: 1,
          skuReal: '101001'
        }
      ]
    };
  },
  computed: {
    tanggal() {
      const now = new Date();
      return now.toLocaleDateString('id-ID');
    },
    waktu() {
      const now = new Date();
      return now.toLocaleTimeString('id-ID');
    },
    summaryText() {
      const total = this.rows.length;
      const sku = new Set(this.rows.map(r => r.skuProduk)).size;
      const error = 0; // Placeholder
      return `${total} Pesanan - ${sku} SKU Produk - ${error} SKU Error`;
    }
  },
  methods: {
    openUploadModal() {
      alert('Upload modal dibuka');
    },
    kirimData() {
      alert('Data dikirim');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;800&display=swap');

.font-Lexend {
  font-family: 'Lexend', sans-serif;
}
</style>
