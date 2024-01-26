<template>
  <div class="text-center m-2 flex justify-center">
    <div
      v-if="alert"
      :class="{
        'fixed top-1/2 min-h-20  p-2 min-w-full text-white right-0 h-content rounded text-center': true,
        'bg-red-500': error,
        'bg-green-500': success,
      }"
    >
      {{ alertMsg }} message
    </div>
    <form id="form">
      <input
        accept=".txt"
        @change="fileSelecting"
        type="file"
        id="fileInput"
        class="hidden"
      />
    </form>
    <div>
      <!--error-->
      <svg
        v-if="!file && error"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-10 h-10 p-2 rounded bg-red-500 :hover:bg-green-600 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
      <!--success-->
      <svg
        v-if="!file && success"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-12 h-12 p-2 rounded-full bg-green-500 :hover:bg-green-600 cursor-pointer"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
        />
      </svg>
      <!--upload-->
      <svg
        v-if="file && !alert"
        @click="upload"
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
      <!--select-->
      <svg
        v-if="!file && !alert"
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
  </div>
</template>
<style scoped></style>
<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const file = ref(null);
const alert = ref(false);
const error = ref(false);
const success = ref(false);
const alertMsg = ref("");

const fileSelecting = (e) => {
  file.value = e.target.files[0];
};
const clicking = () => {
  document.getElementById("fileInput").click();
};
const lanceAlert = (message) => {
  alert.value = true;
  alertMsg.value = message;
  setTimeout(() => {
    alert.value = false;
  }, 3000);
};
const upload = async () => {
  const res = await store.dispatch("uploadFile", file.value);
  alert.value = true;
  lanceAlert(res.message);
  setTimeout(() => {
    alert.value = false;
  }, 3000);
  if (res.success) {
    console.log("success");
    success.value = true;
    setTimeout(() => {
      success.value = false;
    }, 3000);
  } else {
    console.log("error");
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
  file.value = null; //reset
};
</script>
