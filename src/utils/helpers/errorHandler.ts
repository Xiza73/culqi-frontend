import { AxiosError } from "axios";
import { capitalize } from "./main.ts";

const CustomErrors: {
  [key: string]: string;
} = {
  "Invalid card number": "Número de tarjeta inválido",
  "String must contain at most 4 character(s)": "Fecha inválida",
  "String must contain at least 4 character(s)": "Fecha inválida",
  "String must contain at least 3 character(s)": "CVV inválido",
  "Invalid token": "Token inválido",
};

const errorMessage = (message?: string, path?: string) => {
  if (!message) return "Error desconocido";
  if (message === "Invalid") return capitalize(path || "") + " inválido";
  return CustomErrors[message] || message;
};

export const errorHandler = (
  e: AxiosError<{
    error: string;
  }>
) => {
  if (!e.response?.data?.error) return { error: "Error desconocido" };
  const err = [];
  try {
    err.push(JSON.parse(e.response.data.error));
  } catch (_) {
    err.push({ message: e.response.data.error });
  }
  return {
    error: errorMessage(err?.[0]?.message, err?.[0]?.path?.[0]),
  };
};
