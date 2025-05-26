<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar :is-minimized="isSidebarMinimized" @toggle="toggleSidebar" />

    <!-- Konten utama -->
    <div class="flex-1 p-4">
      <div class="mb-4 flex flex-col md:flex-row gap-2 md:items-center justify-between">
        <div class="flex gap-2 flex-wrap">
          <!-- Dropdown Marketplace -->
          <select v-model="selectedMarketplace" @change="fetchAccounts" class="select-box">
            <option value="" disabled>Pilih Marketplace</option>
            <option v-for="market in marketplaces" :key="market" :value="market">{{ market }}</option>
          </select>

          <!-- Dropdown Akun -->
          <select v-model="selectedAccount" class="select-box">
            <option value="" disabled>Pilih Akun</option>
            <option v-for="account in accounts" :key="account" :value="account">{{ account }}</option>
          </select>

          <!-- Dropdown Bulan -->
          <select v-model="selectedMonth" class="select-box">
            <option v-for="(month, index) in months" :key="index" :value="month">{{ month }}</option>
          </select>

          <!-- Dropdown Tahun -->
          <select v-model="selectedYear" class="select-box">
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>

        <!-- Tombol Upload dan Kirim -->
        <div class="flex gap-2">
          <button @click="openUploadModal" class="btn btn-primary">Upload Data</button>
          <button @click="submitData" class="btn btn-secondary">Kirim Data</button>
        </div>
      </div>

      <!-- Preview Data -->
      <div v-if="parsedData.length > 0" class="bg-white rounded shadow p-4">
        <h3 class="font-semibold mb-2">Preview Data ({{ parsedData.length }} baris)</h3>
        <div class="overflow-x-auto">
          <table class="table-auto w-full text-sm">
            <thead>
              <tr>
                <th v-for="(header, index) in parsedData[0]" :key="index" class="px-2 py-1 border">{{ header }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in parsedData.slice(1)" :key="rowIndex">
                <td v-for="(cell, colIndex) in row" :key="colIndex" class="px-2 py-1 border">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Upload -->
    <UploadModal v-if="showUploadModal" @close="showUploadModal = false" @uploaded="handleUploadedData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import UploadModal from '@/components/UploadModal.vue'

const isSidebarMinimized = ref(false)
const toggleSidebar = () => {
  isSidebarMinimized.value = !isSidebarMinimized.value
}

const selectedMarketplace = ref('')
const selectedAccount = ref('')
const selectedMonth = ref('')
const selectedYear = ref('')
const marketplaces = ref([])
const accounts = ref([])
const months = ref([
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
])
const years = ref([])
const showUploadModal = ref(false)
const parsedData = ref([])

const fetchMarketplaces = async () => {
  try {
    const res = await fetch('/api/getMarketplaces') // Endpoint dari Apps Script
    const json = await res.json()
    marketplaces.value = json.marketplaces
  } catch (err) {
    console.error('Gagal ambil marketplace:', err)
  }
}

const fetchAccounts = async () => {
  if (!selectedMarketplace.value) return
  try {
    const res = await fetch(`/api/getAccounts?marketplace=${selectedMarketplace.value}`)
    const json = await res.json()
    accounts.value = json.accounts
  } catch (err) {
    console.error('Gagal ambil akun:', err)
  }
}

const openUploadModal = () => {
  if (!selectedMarketplace.value || !selectedAccount.value || !selectedMonth.value || !selectedYear.value) {
    alert('Mohon lengkapi pilihan marketplace, akun, bulan, dan tahun sebelum upload.')
    return
  }
  showUploadModal.value = true
}

const handleUploadedData = (data) => {
  parsedData.value = data
  showUploadModal.value = false
}

const submitData = async () => {
  if (parsedData.value.length === 0) {
    alert('Tidak ada data untuk dikirim.')
    return
  }

  const payload = {
    marketplace: selectedMarketplace.value,
    account: selectedAccount.value,
    month: selectedMonth.value,
    year: selectedYear.value,
    data: parsedData.value
  }

  try {
    const res = await fetch('/api/submitData', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    const result = await res.json()
    alert(result.message || 'Data berhasil dikirim.')
  } catch (err) {
    console.error('Gagal kirim data:', err)
    alert('Terjadi kesalahan saat mengirim data.')
  }
}

onMounted(() => {
  fetchMarketplaces()
  const now = new Date()
  selectedMonth.value = months.value[now.getMonth()]
  selectedYear.value = now.getFullYear()
  years.value = Array.from({ length: 11 }, (_, i) => 2024 + i)
})
</script>

<style scoped>
.select-box {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: white;
}
.btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
}
.btn-primary {
  background-color: #2563eb;
  color: white;
}
.btn-secondary {
  background-color: #10b981;
  color: white;
}
</style>
