<template>
  <main class="container p-6">
    <div class="searchGroup flex justify-center space-x-2">
      <input
        type="text"
        class="border-2 p-1"
        placeholder="search..."
        v-model="searchKey"
      />
      <button
        @click="search"
        class="rounded p-1 bg-blue-500 hover:bg-blue-700 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>
      </button>
    </div>
    <div class="content text-center">
      <div class="text-xl" v-for="line in lines" :key="line">{{ line }}</div>
    </div>
  </main>
</template>
<style scoped></style>
<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

const searchKey = ref("");
const store = useStore();
const fileContent = ref("");
const lines = ref([]);
const search = () => {
  let linesArray = fileContent.value.split("\n");
  lines.value = linesArray.filter((line) => line.includes(searchKey.value));
};
onMounted(async () => {
  let res = await store.dispatch("getFileContent");
  fileContent.value = res;
});
</script>
