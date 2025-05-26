<script setup>
import Sidebar from '@/components/Sidebar.vue'
import { ref, onMounted } from 'vue'
import { UploadIcon, SendIcon, Pencil, Trash } from 'lucide-vue-next'

const sidebarOpen = ref(true)

const bulanData = ref('')
const tahunData = ref('')

onMounted(() => {
  const now = new Date()
  bulanData.value = String(now.getMonth() + 1).padStart(2, '0')
  tahunData.value = String(now.getFullYear())
})
</script>

<template>
  <div class="flex h-screen">
    <Sidebar v-if="sidebarOpen" />
    
    <div class="flex-1 p-4 overflow-auto">
      <h1 class="text-2xl font-bold mb-4">DATA MARKETPLACE</h1>

      <div class="flex flex-wrap gap-4 mb-4">
        <input class="border p-2 w-48" placeholder="Marketplace" />
        <input class="border p-2 w-48" placeholder="Nama Akun Toko" />
        <input class="border p-2 w-48" :value="bulanData" placeholder="Bulan Data" />
        <input class="border p-2 w-48" :value="tahunData" placeholder="Tahun Data" />
        <div class="ml-auto flex items-center gap-2">
          <span>{{ new Date().toLocaleDateString() }}</span>
          <span>{{ new Date().toLocaleTimeString() }}</span>
          <input class="border p-2 w-48" value="POTK325052301" readonly />
        </div>
      </div>

      <div class="flex gap-4 mb-4">
        <button class="bg-sky-400 text-white px-4 py-2 rounded flex items-center gap-2">
          <UploadIcon class="w-4 h-4" /> Unggah Data
        </button>
        <button class="bg-sky-400 text-white px-4 py-2 rounded flex items-center gap-2">
          <SendIcon class="w-4 h-4" /> Kirim Data
        </button>
      </div>

      <p class="font-bold mb-2">1 Pesanan - 1 SKU Produk - 0 SKU Error</p>

      <table class="w-full border text-sm">
        <thead class="bg-sky-500 text-white">
          <tr>
            <th class="p-2"><input type="checkbox" /></th>
            <th class="p-2">Nomor PO</th>
            <th class="p-2">No AWB</th>
            <th class="p-2">Tgl Order</th>
            <th class="p-2">SKU Produk</th>
            <th class="p-2">Nama Produk</th>
            <th class="p-2">Varian</th>
            <th class="p-2">Qty</th>
            <th class="p-2">SKU Real</th>
            <th class="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b hover:bg-gray-100">
            <td class="p-2"><input type="checkbox" /></td>
            <td class="p-2">240412FSD8YU123</td>
            <td class="p-2">JPX146123568</td>
            <td class="p-2">24/05/2025 10:30</td>
            <td class="p-2">101001 SCH...</td>
            <td class="p-2">101001 SCH Sticker Case...</td>
            <td class="p-2">108 Pcs (Col..</td>
            <td class="p-2">1</td>
            <td class="p-2">101001</td>
            <td class="p-2">
              <div class="flex gap-1">
                <button class="text-blue-500 hover:text-blue-700">
                  <Pencil class="w-4 h-4" />
                </button>
                <button class="text-red-500 hover:text-red-700">
                  <Trash class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
