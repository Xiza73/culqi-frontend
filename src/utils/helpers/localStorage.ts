import environmentVariables from "../../config";

export const setLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getLocalStorage = (key: string) => localStorage.getItem(key);

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);

export const setUserLocalStorage = (username: string) => {
  setLocalStorage("username", username);
  setLocalStorage("token", environmentVariables.TOKEN);
};
