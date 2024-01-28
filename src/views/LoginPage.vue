<template>
  <main>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-20 w-auto"
          src="data:image/png;base64,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"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Vous connecter à votre compte
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6">
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
          <!--password-->
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
            <button
              type="button"
              @click="login"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Se connecter
            </button>
          </div>
        </form>
        <!--error-->
        <p
          v-if="alert"
          class="rounded text-center bg-red-500 text-white p-2 my-2"
        >
          {{ alertMsg }}
        </p>
        <p class="mt-10 text-center text-sm text-gray-500">
          Pas encore membre?
          <router-link class="text-blue-500 hover:text-blue-700" to="/register"
            >s'inscrire</router-link
          >
        </p>
      </div>
    </div>
  </main>
</template>
<style scoped>
input {
  padding-left: 10px;
}
</style>
<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
const store = useStore();
const router = useRouter();
const alertMsg = ref("");
const alert = ref(false);

//user info

const email = ref("");
const password = ref("");

const login = async () => {
  const user = {
    email: email.value,
    password: password.value,
  };
  const result = await store.dispatch("login", user);
  if (result.user == null) {
    lanceAlert(result.message);
  } else {
    router.push("/home");
  }
};
const lanceAlert = (message) => {
  console.log(message);
  alert.value = true;
  alertMsg.value = message;
  setTimeout(() => {
    alert.value = false;
  }, 3000);
};
</script>
