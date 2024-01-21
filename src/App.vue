<template>
  <main class="p-6 min-h-screen w-screen" style="background-color: #494949">
    <div class="motasem bg-gray-500 p-3 rounded relative">
      <div class="absolute top-0 right-0"><InputFile /></div>

      <div class="container">
        <h1 class="text-center font-bold text-2xl my-2" style="color: #3d3d3d">
          Search your Dox <span class="text-white text-3xl">𓂀</span>
        </h1>
        <input
          v-model="searchKey"
          type="text"
          id="searchInput"
          placeholder="Recherche"
          class="p-2 rounded border-2 border-gray-500 w-3/4"
        />
        <button @click="search" class="bg-blue-500 text-white p-2 rounded mx-2">
          Search🔎
        </button>
      </div>
    </div>
    <div id="results" v-if="!consulting">
      <div
        class="text-center text-white m-4 flex flex-row justify-center space-x-2"
        v-for="file in files"
        :key="file"
      >
        <span class="w-3/4 text-black rounded bg-gray-300 pt-1">{{
          file.name
        }}</span>
        <button @click="downloadFile(file)" class="p-2 bg-blue-500 rounded">
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
              d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
            />
          </svg>
        </button>
        <button class="p-2 bg-green-500 rounded" @click="consult(file)">
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
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
        <br />
      </div>
    </div>
    <!--consulting conent-->
    <div class="text-black bg-white p-2 mt-2 rounded" v-if="consulting">
      <div class="mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 bg-yellow-500 cursor-pointer"
          @click="returnToResult"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 9.75h4.875a2.625 2.625 0 0 1 0 5.25H12M8.25 9.75 10.5 7.5M8.25 9.75 10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185Z"
          />
        </svg>
      </div>
      <hr />

      <div>{{ content }}</div>
    </div>

    <!-- <div
      v-if="!lines.length && searchKey"
      class="mt-3 bg-red-500 text-white rounded text-center p-2"
    >
      There is no result !
    </div> -->
    <div class="content text-center">
      <div class="text-xl text-white m-4" v-for="line in lines" :key="line">
        {{ line }} <br />
      </div>
    </div>
  </main>
</template>
<style scoped></style>
<script setup>
import { ref, onMounted, watch } from "vue";
// import { useStore } from "vuex";
import InputFile from "./components/InputFile.vue";

const searchKey = ref("");
// const store = useStore();
// const fileContent = ref("");
const files = ref([]);
const consulting = ref(false);
const content = ref("");
watch(searchKey, async (newVal) => {
  if (newVal) {
    const response = await fetch("http://localhost:3000/file", {
      method: "GET",
    });
    let res = await response.json();
    res = res.filter((file) =>
      file.name.toLowerCase().includes(newVal.toLowerCase())
    );
    files.value = res;
  } else {
    files.value = [];
  }
});

onMounted(async () => {
  const response = await fetch("http://localhost:3000/file", {
    method: "GET",
  });
  const res = await response.json();
  files.value = res;
  // let res = await store.dispatch("getFileContent");
  // lines.value = fileContent.value.split("\n");
});

// const urlify = (fileName) => {
//   const domain = "http://localhost:3000/files";
//   return `${domain}/${encodeURIComponent(fileName)}`;
// };

const consult = (file) => {
  consulting.value = true;
  content.value = file.content;
};
const returnToResult = () => {
  consulting.value = false;
};

const downloadFile = (file) => {
  const fileUrl = "http://localhost:3000/files/" + file.name; // Replace with the actual file URL
  const fileName = file.name; // Replace with the desired file name

  // Create a temporary anchor element
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;

  // Append the anchor element to the document and trigger a click event
  document.body.appendChild(link);
  link.click();

  // Remove the anchor element after the click event
  document.body.removeChild(link);
};
</script>
