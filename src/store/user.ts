import { defineStore } from "pinia";
import environmentVariables from "../config";
import { removeLocalStorage } from "../utils/helpers";

export const useUserStore = defineStore("user", {
  state: () => ({
    username: "",
    token: "",
  }),
  getters: {},
  actions: {
    setUserData(username: string) {
      this.username = username;
      this.token = environmentVariables.TOKEN;
    },
    clearUserData() {
      this.username = "";
      this.token = "";
      removeLocalStorage("username");
      removeLocalStorage("token");
    },
  },
});
