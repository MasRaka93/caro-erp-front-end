<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    v-if="isOpen"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <h2 class="text-lg font-bold mb-4">Pilih Data</h2>
 
 

      <!-- Dropzone -->
      <div
        class="border-2 border-dashed border-gray-400 rounded p-4 text-center cursor-pointer"
        @click="triggerFileInput"
      >
        <p v-if="!selectedFile">Drag & Drop file di sini atau klik untuk memilih file (.xlsx)</p>
        <p v-else class="text-green-600">{{ selectedFile.name }}</p>
        <input
          type="file"
          accept=".xlsx"
          ref="fileInput"
          class="hidden"
          @change="handleFileChange"
        />
      </div>
 
 

      <!-- Progress Bar -->
      <div v-if="uploadProgress > 0" class="mt-4">
        <p>Progress: {{ uploadProgress }}%</p>
        <div class="bg-gray-200 rounded-full h-2">
          <div
            class="bg-sky-500 h-2 rounded-full"
            :style="{ width: uploadProgress + '%' }"
          ></div>
        </div>
      </div>
 
 

      <!-- Action Buttons -->
      <div class="mt-4 flex justify-end space-x-2">
        <button
          class="text-gray-500"
          @click="closeModal"
          :disabled="isUploading"
        >
          Batal
        </button>
        <button
          class="bg-sky-500 text-white px-4 py-2 rounded"
          :disabled="!canSubmit || isUploading"
          @click="submitFile"
        >
          Kirim
        </button>
      </div>
    </div>
  </div>
</template>
 
 

<script setup>
import { ref, watch } from 'vue';
 
 

const emit = defineEmits(['close', 'uploaded']);
 
 

const isOpen = ref(true);
const selectedFile = ref(null);
const uploadProgress = ref(0);
const canSubmit = ref(false);
const isUploading = ref(false);
 
 

const fileInput = ref(null);
 
 

watch(selectedFile, (file) => {
  canSubmit.value = file && file.name.toLowerCase().endsWith('.xlsx');
});
 
 

function triggerFileInput() {
  fileInput.value.click();
}
 
 

function handleDrop(event) {
  const file = event.dataTransfer.files[0];
  validateAndSetFile(file);
}
 
 

function handleFileChange(event) {
  const file = event.target.files[0];
  validateAndSetFile(file);
}
 
 

function validateAndSetFile(file) {
  if (file && file.name.toLowerCase().endsWith('.xlsx')) {
    selectedFile.value = file;
  } else {
    alert('Hanya file .xlsx yang diterima.');
    selectedFile.value = null;
  }
}
 
 

function closeModal() {
  if (isUploading.value) return;
  emit('close');
}
 
 

async function submitFile() {
  if (!selectedFile.value) {
    alert('Silakan pilih file terlebih dahulu.');
    return;
  }
 
 

  isUploading.value = true;
  uploadProgress.value = 0;
 
 

  try {
    const formData = new FormData();
    formData.append('file', selectedFile.value);
 
 

    // Menggunakan XMLHttpRequest untuk mendapatkan progress upload
    await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/upload');
 
 

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          uploadProgress.value = Math.round((event.loaded / event.total) * 100);
        }
      };
 
 

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            emit('uploaded', result);
            resolve();
          } catch (error) {
            reject(new Error('Response tidak valid'));
          }
        } else {
          reject(new Error(`Gagal mengunggah file. Status: ${xhr.status}`));
        }
      };
 
 

      xhr.onerror = () => reject(new Error('Terjadi kesalahan saat mengunggah file.'));
 
 

      xhr.send(formData);
    });

    alert('File berhasil diunggah!');
    selectedFile.value = null;
    uploadProgress.value = 0;
    closeModal();
  } catch (error) {
    console.error('Upload failed:', error);
    alert(`Terjadi kesalahan: ${error.message}`);
  } finally {
    isUploading.value = false;
    uploadProgress.value = 0;
  }
}
</script>

<style scoped>
/* Styling mengikuti proyek utama (misal Tailwind) */
/* Sesuaikan sesuai kebutuhan jika ingin tambahan style */
</style>