<script setup lang="ts">
import FormLabelHandler from "../components/FormLabelHandler.vue";
import Button from "../components/Button.vue";
import Separator from "../components/Separator.vue";
import {
  emailRegex,
  formatCardNumber,
  formatCVV,
  formatExpirationDate,
  maxCharacters,
} from "../utils/helpers";
import { useCreditCardStore } from "../store/creditCard.ts";
import { computed } from "vue";

const creditCardStore = useCreditCardStore();

const {
  setCardNumber,
  setEmail,
  setCVV,
  setExpirationDate,
  setToken,
  generateToken,
  validateToken,
  clearGeneratedToken,
} = creditCardStore;
const cardNumber = computed(() => creditCardStore.cardNumber);
const email = computed(() => creditCardStore.email);
const cvv = computed(() => creditCardStore.cvv);
const expirationDate = computed(() => creditCardStore.expirationDate);
const token = computed(() => creditCardStore.token);
const generatedToken = computed(() => creditCardStore.generatedToken);

const required = computed(() => creditCardStore.requiredError);
const loading = computed(() => creditCardStore.loading);

const onSubmit = async () => await generateToken();

const onValidate = async () => await validateToken();
</script>

<template>
  <section class="flex flex-col justify-center items-center h-full">
    <form
      action=""
      class="bg-sky-50 px-4 pt-4 pb-2 rounded-lg shadow-lg w-72 md:w-96 lg:w-[500px]"
    >
      <h1 class="text-yellow-100 font-semibold text-xl md:text-2xl mb-6">
        Ingrese los datos de su
        <span class="text-orange-100">Tarjeta de Crédito</span>
      </h1>
      <FormLabelHandler
        name="cardNumber"
        v-model="cardNumber"
        :handleChange="setCardNumber"
        placeholder="Número de tarjeta"
        type="text"
        :regexFunction="formatCardNumber"
        :error="required"
        errorMessage="Número de tarjeta requerido"
      />
      <div class="flex justify-between items-center flex-wrap">
        <FormLabelHandler
          name="email"
          v-model="email"
          :handleChange="setEmail"
          placeholder="Email"
          type="email"
          class="w-full md:w-44 lg:w-64"
          :regex="emailRegex"
          :error="required"
          errorMessage="Email requerido"
        />
        <FormLabelHandler
          name="expirationDate"
          v-model="expirationDate"
          :handleChange="setExpirationDate"
          placeholder="MMAA"
          type="text"
          class="w-36"
          :regexFunction="formatExpirationDate"
          :error="required"
          errorMessage="Fecha de expiración requerida"
        />
      </div>
      <FormLabelHandler
        name="cvv"
        v-model="cvv"
        :handleChange="setCVV"
        placeholder="CVV"
        type="text"
        class="w-36 ml-auto mr-0 md:mr-12"
        :regexFunction="formatCVV"
        :error="required"
        errorMessage="CVV requerido"
      />
    </form>
    <div
      class="flex justify-center items-center flex-wrap gap-3 mt-5"
      v-if="generatedToken"
    >
      <div class="text-yellow-100 bg-sky-50 px-4 py-2 rounded-lg shadow-md">
        Token generado:
        <span class="text-orange-100">
          {{ generatedToken }}
        </span>
      </div>
      <!--close button-->
      <Button
        text="X"
        type="button"
        color="orange"
        size="sm"
        class="w-8 h-8 flex justify-center items-center shadow-lg"
        @click="clearGeneratedToken"
      />
    </div>
    <Button
      class="mt-6"
      text="Generar Token"
      type="button"
      color="purple"
      size="md"
      :disabled="loading"
      @click="() => !loading && onSubmit()"
    />
    <Separator />
    <div class="flex justify-between items-center flex-wrap gap-3">
      <FormLabelHandler
        name="token"
        v-model="token"
        :handleChange="setToken"
        placeholder="Ingrese el token"
        type="text"
        class="w-42"
        :regexFunction="maxCharacters(16)"
      />
      <Button
        text="Validar Token"
        type="button"
        color="orange"
        size="md mb-4"
        :disabled="loading"
        @click="() => !loading && onValidate()"
      />
    </div>
  </section>
</template>
