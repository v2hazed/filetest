<template>
  <main class="p-6 min-h-screen w-screen" style="background-color: #494949">
    <!--navbar-->
    <div class="flex bg-white rounded my-2 p-2">
      <!--profile-->
      <router-link class="bg-gray-500 p-1 rounded pt-2" to="/profile"
        ><svg
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
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </router-link>
      <!--input file-->
      <InputFile />
    </div>

    <div class="motasem bg-gray-500 p-3 rounded relative">
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
        <button class="bg-blue-500 text-white p-2 rounded mx-2">
          Search🔎
        </button>
      </div>
    </div>
    <div id="results" v-if="!consulting">
      <div
        class="text-center text-white m-4 flex flex-row justify-center space-x-2"
        v-for="file in store.state.files"
        :key="file"
      >
        <span class="w-3/4 text-black rounded bg-gray-300 pt-1">{{
          file.name
        }}</span>
        <!--download-->
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
        <!--consult-->
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
        <!--delte-->
        <button
          v-if="store.state.user.isAdmin"
          @click="deleteFile(file.name)"
          class="p-2 bg-red-500 rounded"
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
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

      <div class="truncateee">
        <span v-for="word in getContent()" :key="word">{{ word }}</span>
      </div>
    </div>

    <!-- <div
        v-if="!lines.length && searchKey"
        class="mt-3 bg-red-500 text-whi te rounded text-center p-2"
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
import { useStore } from "vuex";
import InputFile from "../components/InputFile.vue";

const searchKey = ref("");
const store = useStore();
// const fileContent = ref("");
const consulting = ref(false);
const content = ref("");
const getContent = () => {
  // let localContent = content.value;
  // localContent = localContent.replace(/(\r\n|\n|\r)/gm, " ");
  const words = content.value.split(" ");
  return words;
};

watch(searchKey, async (newVal) => {
  //searching
  if (newVal) {
    await store.dispatch("search", newVal);
  } else {
    await store.dispatch("initFiles");
  }
});

onMounted(async () => {
  await store.dispatch("initFiles");
});

const consult = (file) => {
  consulting.value = true;
  content.value = file.content;
};
const returnToResult = () => {
  consulting.value = false;
};

const downloadFile = (file) => {
  let uri = "";
  if (store.state.PROD_MODE) {
    if (store.state.PROD.SERVER_LANG == "NODE") {
      uri = store.state.PROD.NODE;
    } else if (store.state.PROD.SERVER_LANG == "PHP") {
      uri =
        store.state.PROD.PHP +
        "/src/files.module/file.controller.php?download=" +
        file.name;
    }
  } else {
    //local
    if (store.state.DEV.SERVER_LANG == "NODE") {
      uri = store.state.DEV.NODE;
    } else if (store.state.DEV.SERVER_LANG == "PHP") {
      uri =
        store.state.DEV.PHP +
        "/src/files.module/file.controller.php?download=" +
        file.name;
    }
  }
  window.open(uri, "_blank");
};
const deleteFile = (fileName) => {
  store.dispatch("deleteFile", fileName);
};
</script>
