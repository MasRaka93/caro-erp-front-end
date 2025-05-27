<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-lg font-bold mb-4">Pilih Data</h2>

      <!-- Dropzone -->
      <div
        class="border-2 border-dashed border-gray-400 rounded p-4 text-center cursor-pointer"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
      >
        <p v-if="!selectedFile">Drag & Drop file di sini atau klik untuk memilih file (.xlsx)</p>
        <p v-else class="text-green-600">{{ selectedFile.name }}</p>
        <input type="file" accept=".xlsx" class="hidden" ref="fileInput" @change="handleFileChange" />
      </div>

      <!-- Progress -->
      <div v-if="uploadProgress > 0" class="mt-4">
        <p>Progress: {{ uploadProgress }}%</p>
        <div class="bg-gray-200 rounded-full h-2">
          <div class="bg-sky-500 h-2 rounded-full" :style="{ width: uploadProgress + '%' }"></div>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-4 flex justify-end space-x-2">
        <button class="text-gray-500" @click="$emit('close')">Batal</button>
        <button
          class="bg-sky-500 text-white px-4 py-2 rounded"
          :disabled="!canSubmit"
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

const selectedFile = ref(null);
const fileInput = ref(null);
const uploadProgress = ref(0);
const canSubmit = ref(false);

// File type validation
watch(selectedFile, (file) => {
  canSubmit.value = file && file.name.endsWith('.xlsx');
});

function triggerFileInput() {
  fileInput.value.click();
}

function handleDrop(e) {
  const file = e.dataTransfer.files[0];
  validateAndSetFile(file);
}

function handleFileChange(e) {
  const file = e.target.files[0];
  validateAndSetFile(file);
}

function validateAndSetFile(file) {
  if (file && file.name.endsWith('.xlsx')) {
    selectedFile.value = file;
  } else {
    alert('Hanya file .xlsx yang diterima.');
  }
}

async function submitFile() {
  if (!selectedFile.value) {
    alert('Silakan pilih file terlebih dahulu.');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('file', selectedFile.value);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Gagal mengunggah file.');

    const result = await response.json(); // expected: JSON array of rows
    emit('uploaded', result);
    emit('close');
    alert('File berhasil diunggah!');
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Terjadi kesalahan saat mengunggah file.');
  } finally {
    uploadProgress.value = 0;
    selectedFile.value = null;
  }
}
</script>

<style scoped>
/* Tetap kosong: mengikuti styling dari komponen utama */
</style>