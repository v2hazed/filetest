<template>
  <main class="bg-gray-500 min-h-screen p-2">
    <!--navbar-->
    <div class="flex rounded p-2 justify-between">
      <!--return to home-->
      <router-link to="/home" class="bg-blue-500 hover:bg-blue-700 p-1 rounded">
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
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
      </router-link>
      <button class="bg-red-500 hover:bg-red-700 p-1 rounded" @click="logout">
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
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </svg>
      </button>
    </div>
    <!--content-->
    <form class="space-y-6">
      <!--nom-->
      <div>
        <label
          for="nom"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Nom
        </label>
        <div class="mt-2">
          <input
            v-model="nom"
            id="nom"
            name="nom"
            type="text"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <!--prenom-->
      <div>
        <label
          for="prenom"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Prénom
        </label>
        <div class="mt-2">
          <input
            v-model="prenom"
            id="prenom"
            name="prenom"
            type="text"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <!--genre-->
      <div>
        <label
          for="genre"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Genre
        </label>
        <div class="mt-2">
          <select
            class="border-2 border-black rounded"
            v-model="genre"
            id="genre"
            name="genre"
            autocomplete="genre"
            required
          >
            <option class="border-2 border-black rounded" value="homme">
              Homme
            </option>
            <option class="border-2 border-black rounded" value="femme">
              Femme
            </option>
          </select>
        </div>
      </div>

      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Email
        </label>
        <div class="mt-2">
          <input
            v-model="email"
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Mot de passe</label
          >
        </div>
        <div class="mt-2">
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label
            for="confirmPassword"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Confirmation du mot de passe</label
          >
        </div>
        <div class="mt-2">
          <input
            v-model="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="button"
          @click="enregistrer"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enregister
        </button>
      </div>
    </form>
  </main>
</template>
<style scoped>
input {
  padding-left: 10px;
}
</style>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
const store = useStore();
const router = useRouter();
//user info
const nom = ref(store.state.user.nom);
const prenom = ref(store.state.user.prenom);
const genre = ref(store.state.user.genre);
const email = ref(store.state.user.email);
const password = ref(store.state.user.password);
const confirmPassword = ref(store.state.user.password);
const logout = () => {
  store.commit("setUser", null);
  store.commit("setIsAuhenticated", false);
  router.push("/login");
};
const enregistrer = () => {
  if (password.value == confirmPassword.value) {
    const user = {
      nom: nom.value,
      prenom: prenom.value,
      genre: genre.value,
      email: email.value,
      password: password.value,
    };
    store.dispatch("updateUser", user);
  } else {
    alert("Les mots de passe ne correspondent pas");
  }
};
</script>
