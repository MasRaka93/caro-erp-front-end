<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-lg font-bold mb-4">Pilih Data</h2>
      
      <div
        class="border-2 border-dashed border-gray-400 rounded p-4 text-center"
        @dragover.prevent
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
      >
        <p v-if="!selectedFile">Drag & Drop file di sini atau klik untuk memilih file</p>
        <p v-else class="text-green-600">{{ selectedFile.name }}</p>
        <input type="file" class="hidden" ref="fileInput" @change="handleFileChange" />
      </div>

      <div v-if="uploadProgress > 0" class="mt-4">
        <p>Progress: {{ uploadProgress }}%</p>
        <div class="bg-gray-200 rounded-full h-2">
          <div class="bg-sky-500 h-2 rounded-full" :style="{ width: uploadProgress + '%' }"></div>
        </div>
      </div>

      <div class="mt-4 flex justify-end space-x-2">
        <button class="text-gray-500" @click="$emit('close')">Batal</button>
        <button class="bg-sky-500 text-white px-4 py-2 rounded" :disabled="!canSubmit" @click="submitFile">Kirim</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['close', 'submit']);
const selectedFile = ref(null);
const fileInput = ref(null);
const uploadProgress = ref(0);
const canSubmit = ref(false);

// Watch for selected file to enable submit button
watch(selectedFile, (newFile) => {
  canSubmit.value = newFile && newFile.name.endsWith('.xlsx');
});

function handleDrop(e) {
  const files = e.dataTransfer.files;
  if (files.length > 0 && files[0].name.endsWith('.xlsx')) {
    selectedFile.value = files[0];
  } else {
    alert('Hanya file .xlsx yang diterima.');
  }
}

function handleFileChange(e) {
  const files = e.target.files;
  if (files.length > 0 && files[0].name.endsWith('.xlsx')) {
    selectedFile.value = files[0];
  } else {
    alert('Hanya file .xlsx yang diterima.');
  }
}

function triggerFileInput() {
  fileInput.value.click();
}

async function submitFile() {
  if (selectedFile.value) {
    const formData = new FormData();
    formData.append('file', selectedFile.value);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      });

      if (response.ok) {
        const data = await response.json();
        emit('submit', data); // Emit the parsed data to the parent component
        emit('close');
        alert('File berhasil diunggah!');
      } else {
        throw new Error('Gagal mengunggah file.');
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengunggah file.');
      selectedFile.value = null; // Reset the selected file
    } finally {
      uploadProgress.value = 0; // Reset progress
    }
  } else {
    alert('Silakan pilih file terlebih dahulu.');
  }
}
</script>

<style scoped>
</style>