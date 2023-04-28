<script setup lang="ts">
import { ref } from "@vue/runtime-dom";
import FormLabel from "../components/FormLabel.vue";
import Button from "../components/Button.vue";
import router from "../router/index";
import {
  setUserLocalStorage,
  validCredentials,
} from "../utils/helpers";
import { useUserStore } from "../store/user";

const { setUserData } = useUserStore();

const username = ref("");
const password = ref("");

const error = ref(false);
const incorrectCredentials = ref(false);

const onSubmit = () => {
  if (!username.value || !password.value) {
    error.value = true;
    return;
  }
  if (!validCredentials(username.value, password.value)) {
    incorrectCredentials.value = true;
    return;
  }
  error.value = false;
  incorrectCredentials.value = false;
  setUserLocalStorage(username.value);
  setUserData(username.value);
  router.push("/payment");
};
</script>

<template>
  <section class="flex flex-col justify-center items-center h-full">
    <h1 class="text-purple-100 font-semibold text-lg mb-4">
      Ingresa al <span class="text-sky-100">Sistema de Pago</span> de Culqi
    </h1>
    <form
      action=""
      class="bg-white-200 p-4 rounded-lg shadow-lg w-72 md:w-80"
      @submit.prevent="onSubmit"
    >
      <FormLabel
        label="Usuario"
        name="username"
        placeholder="Ingresa tu usuario"
        type="text"
        v-model="username"
        :error="error"
        errorMessage="Usuario requerido"
      />
      <FormLabel
        label="Contraseña"
        name="password"
        placeholder="Ingresa tu contraseña"
        type="password"
        v-model="password"
        :error="error"
        errorMessage="Contraseña requerida"
      />
      <Button
        class="flex mx-auto mt-6"
        color="purple"
        size="md"
        type="submit"
        text="Ingresar"
      />
    </form>
    <p
      class="text-orange-300 text-md font-semibold italic mt-4"
      v-if="incorrectCredentials"
    >
      Credenciales incorrectas
    </p>
  </section>
</template>
