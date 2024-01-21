<template>
  <div class="text-center m-2 flex justify-center">
    <input
      accept=".txt"
      @change="fileSelecting"
      type="file"
      id="fileInput"
      class="hidden"
    />
    <svg
      v-if="file"
      @click="send"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-10 h-10 p-2 rounded bg-green-500 :hover:bg-green-600 cursor-pointer"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
      />
    </svg>

    <svg
      v-if="!file"
      @click="clicking"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-10 h-10 bg-blue-500 p-2 rounded-full cursor-pointer :hover:bg-blue-600"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  </div>
</template>
<style scoped></style>
<script setup>
import { ref } from "vue";
let file = ref(null);
const fileSelecting = (e) => {
  file.value = e.target.files[0];
};
const clicking = () => {
  document.getElementById("fileInput").click();
};
const send = async () => {
  let formData = new FormData();
  formData.append("files", file.value);
  const response = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  console.log(data);
  file.value = null;
};
</script>
