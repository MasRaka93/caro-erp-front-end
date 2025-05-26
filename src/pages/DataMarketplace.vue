<template>
  <div class="flex min-h-screen font-lexend">
    <Sidebar />

    <div class="flex-1 p-4 bg-gray-50">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 class="text-2xl font-bold mb-2 md:mb-0">Data Marketplace</h1>

        <div class="flex flex-wrap gap-2">
          <select v-model="selectedMarketplace" class="select">
            <option disabled value="">Pilih Marketplace</option>
            <option v-for="marketplace in marketplaces" :key="marketplace">{{ marketplace }}</option>
          </select>

          <select v-model="selectedAccount" class="select">
            <option disabled value="">Pilih Akun Toko</option>
            <option v-for="account in accounts" :key="account">{{ account }}</option>
          </select>

          <select v-model="selectedMonth" class="select">
            <option v-for="(month, index) in months" :key="index" :value="month.value">{{ month.name }}</option>
          </select>

          <select v-model="selectedYear" class="select">
            <option v-for="year in years" :key="year">{{ year }}</option>
          </select>
        </div>
      </div>

      <div class="flex justify-between mb-4">
        <button @click="openUpload" class="btn-primary">
          <Upload class="w-4 h-4 mr-1" /> Upload Data
        </button>
        <button @click="submitData" class="btn-green">
          <Send class="w-4 h-4 mr-1" /> Kirim Data
        </button>
      </div>

      <!-- Tabel Data -->
      <div class="overflow-auto rounded shadow bg-white">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-200 text-gray-700">
            <tr>
              <th class="px-4 py-2">No</th>
              <th class="px-4 py-2">Tanggal</th>
              <th class="px-4 py-2">Nomor PO</th>
              <th class="px-4 py-2">Marketplace</th>
              <th class="px-4 py-2">Akun</th>
              <th class="px-4 py-2">Status</th>
              <th class="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in dataTable" :key="index" :class="row.status === 'Valid' ? 'bg-green-50' : 'bg-red-50'">
              <td class="px-4 py-2">{{ index + 1 }}</td>
              <td class="px-4 py-2">{{ formatDate(row.tanggal) }}</td>
              <td class="px-4 py-2">{{ row.nomorPO }}</td>
              <td class="px-4 py-2">{{ row.marketplace }}</td>
              <td class="px-4 py-2">{{ row.akun }}</td>
              <td class="px-4 py-2">{{ row.status }}</td>
              <td class="px-4 py-2 flex gap-2">
                <button class="text-blue-600 hover:underline" @click="editRow(index)">
                  <Edit class="w-4 h-4" />
                </button>
                <button class="text-red-600 hover:underline" @click="deleteRow(index)">
                  <Trash2 class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Upload Modal -->
    <UploadModal v-if="showUploadModal" @close="showUploadModal = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import UploadModal from '@/components/UploadModal.vue'
import { Upload, Send, Edit, Trash2 } from 'lucide-vue-next'
import dayjs from 'dayjs'

// Dummy data
const marketplaces = ref(['Shopee', 'Tokopedia', 'Lazada'])
const accounts = ref(['TokoA', 'TokoB', 'TokoC'])

const selectedMarketplace = ref('')
const selectedAccount = ref('')
const selectedMonth = ref('')
const selectedYear = ref('')
const showUploadModal = ref(false)

const months = ref([
  { name: 'Januari', value: '01' },
  { name: 'Februari', value: '02' },
  { name: 'Maret', value: '03' },
  { name: 'April', value: '04' },
  { name: 'Mei', value: '05' },
  { name: 'Juni', value: '06' },
  { name: 'Juli', value: '07' },
  { name: 'Agustus', value: '08' },
  { name: 'September', value: '09' },
  { name: 'Oktober', value: '10' },
  { name: 'November', value: '11' },
  { name: 'Desember', value: '12' },
])

const years = ref([])
const dataTable = ref([])

const openUpload = () => {
  showUploadModal.value = true
}

const submitData = () => {
  alert('Data dikirim!')
}

const editRow = (index) => {
  alert('Edit baris ke-' + (index + 1))
}

const deleteRow = (index) => {
  if (confirm('Yakin ingin menghapus baris ini?')) {
    dataTable.value.splice(index, 1)
  }
}

const formatDate = (dateStr) => {
  return dayjs(dateStr).format('DD/MM/YYYY HH:mm:ss')
}

onMounted(() => {
  const now = new Date()
  selectedMonth.value = String(now.getMonth() + 1).padStart(2, '0')
  selectedYear.value = String(now.getFullYear())

  for (let y = 2024; y <= 2034; y++) {
    years.value.push(String(y))
  }

  // Contoh dummy data
  dataTable.value = [
    {
      tanggal: new Date(),
      nomorPO: 'PO123456',
      marketplace: 'Shopee',
      akun: 'TokoA',
      status: 'Valid',
    },
    {
      tanggal: new Date(),
      nomorPO: 'PO654321',
      marketplace: 'Tokopedia',
      akun: 'TokoB',
      status: 'Invalid',
    },
  ]
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lexend&display=swap');

.font-lexend {
  font-family: 'Lexend', sans-serif;
}

.select {
  @apply px-2 py-1 border rounded text-sm;
}

.btn-primary {
  @apply inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm;
}

.btn-green {
  @apply inline-flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm;
}
</style>
