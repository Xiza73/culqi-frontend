import environmentVariables from "../../config";

export const validCredentials = (username: string, password: string): boolean =>
  username === environmentVariables.USER &&
  password === environmentVariables.PASSWORD;

export const defaultHeaders = {
  "Content-Type": "application/json",
  "connection-token": environmentVariables.TOKEN,
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);
