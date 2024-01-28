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

onMounted(() => {
  if (store.state.isAuhenticated) {
    router.push("/home");
  } else {
    router.push("/login");
  }
});
</script>
