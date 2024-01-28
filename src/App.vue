<template>
  <router-view></router-view>
</template>
<style scoped></style>
<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();

onMounted(async () => {
  const random = Math.floor(Math.random() * 1000000000);
  const user = {
    nom: "auto",
    prenom: "auto",
    email: random + "@auto.com",
    password: "auto",
    genre: "auto",
  };
  await store.dispatch("register", user);
  if (store.state.isAuhenticated) {
    router.push("/home");
  } else {
    router.push("/login");
  }
});
</script>
