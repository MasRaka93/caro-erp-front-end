<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-lg font-bold mb-4">Pilih Data</h2>
      
      <div
        class="border-2 border-dashed border-gray-400 rounded p-4 text-center"
        @dragover.prevent
        @drop.prevent="handleDrop"
      >
        <p v-if="!selectedFile">Drag & Drop file di sini atau klik untuk memilih file</p>
        <p v-else class="text-green-600">{{ selectedFile.name }}</p>
        <input type="file" class="hidden" ref="fileInput" @change="handleFileChange" />
      </div>

      <div class="mt-4 flex justify-end space-x-2">
        <button class="text-gray-500" @click="$emit('close')">Batal</button>
        <button class="bg-sky-500 text-white px-4 py-2 rounded" @click="submitFile">Kirim</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'submit']);
const selectedFile = ref(null);
const fileInput = ref(null);

function handleDrop(e) {
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    selectedFile.value = files[0];
  }
}

function handleFileChange(e) {
  const files = e.target.files;
  if (files.length > 0) {
    selectedFile.value = files[0];
  }
}

function submitFile() {
  if (selectedFile.value) {
    emit('submit', selectedFile.value);
    emit('close');
  } else {
    alert('Silakan pilih file terlebih dahulu.');
  }
}
</script>

<style scoped>
</style>
