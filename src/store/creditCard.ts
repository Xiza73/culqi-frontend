import { defineStore } from "pinia";
import * as creditCardService from "../services/creditCard.ts";

export const useCreditCardStore = defineStore("creditCard", {
  state: () => ({
    cardNumber: "",
    email: "",
    expirationDate: "",
    cvv: "",
    token: "",
    generatedToken: "",
    loading: false,
    requiredError: false,
  }),
  getters: {},
  actions: {
    setCardNumber(cardNumber: string) {
      this.cardNumber = cardNumber;
    },
    setEmail(email: string) {
      this.email = email;
    },
    setExpirationDate(expirationDate: string) {
      this.expirationDate = expirationDate;
    },
    setCVV(cvv: string) {
      this.cvv = cvv;
    },
    setToken(token: string) {
      this.token = token;
    },
    setCardData({
      cardNumber,
      email,
      expirationDate,
    }: {
      cardNumber: string;
      email: string;
      expirationDate: string;
    }) {
      this.cardNumber = cardNumber;
      this.email = email;
      this.expirationDate = expirationDate;
    },
    clearGeneratedToken() {
      this.generatedToken = "";
    },
    clearCardData() {
      this.cardNumber = "";
      this.email = "";
      this.expirationDate = "";
      this.cvv = "";
    },
    clearCardStore() {
      this.clearCardData();
      this.clearGeneratedToken();
      this.token = "";
      this.requiredError = false;
    },
    async generateToken() {
      if (
        !this.cardNumber ||
        !this.email ||
        !this.cvv ||
        !this.expirationDate
      ) {
        this.requiredError = true;
        return;
      }

      this.loading = true;
      const [month, year] = this.expirationDate.split("/");

      const response = await creditCardService.generateToken({
        card_number: this.cardNumber.replace(/\s/g, ""),
        email: this.email,
        expiration_month: month,
        expiration_year: `20${year}`,
        cvv: this.cvv,
      });

      if (response.error) alert(response.error);

      if (response.token) {
        this.generatedToken = response.token;
        this.clearCardData();
      }

      this.loading = false;
      this.requiredError = false;
    },
    async validateToken() {
      if (!this.token) return;

      this.loading = true;

      const response = await creditCardService.validateToken(this.token);

      if (response.error) alert(response.error);
      else {
        alert("¡Token válido!");
        const { card_number, email, expiration_month, expiration_year } =
          response.data;
        this.setCardData({
          cardNumber: card_number.replace(/(\d{4})/g, "$1 ").trim(),
          email: email,
          expirationDate: `${expiration_month}/${expiration_year.slice(2)}`,
        });
        this.clearGeneratedToken();
        this.token = "";
      }

      this.loading = false;
    },
  },
});
