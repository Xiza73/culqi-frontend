<script setup lang="ts">
import { onMounted, computed } from "vue";
import { getLocalStorage } from "./utils/helpers";
import { useUserStore } from "./store/user";
import Button from "./components/Button.vue";
import router from "./router";
import { useCreditCardStore } from "./store/creditCard.ts";

const userStore = useUserStore();
const { clearCardStore } = useCreditCardStore();

const { setUserData, clearUserData } = userStore;

const token = computed(() => userStore.token);

const logout = () => {
  clearUserData();
  clearCardStore();
  router.push("/");
};

onMounted(() => {
  const token = getLocalStorage("token");
  const user = getLocalStorage("user");

  if (token) {
    setUserData(user!);
  }
});
</script>

<template>
  <nav
    class="bg-white-100 fixed w-full z-10 top-0 flex justify-between items-center px-4 h-14"
  >
    <router-link to="/">
      <img
        src="https://culqi.com/assets/images/brand/culqi-logo.png?v=1"
        alt="culqilogo"
      />
    </router-link>
    <Button
      v-if="token"
      color="orange"
      size="sm"
      text="Cerrar sesión"
      type="button"
      @click="logout"
    />
  </nav>
  <main class="h-screen bg-white-100 pt-14">
    <router-view></router-view>
  </main>
</template>
