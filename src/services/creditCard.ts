import axios, { AxiosError } from "axios";
import { defaultHeaders } from "../utils/helpers";
import { errorHandler } from "../utils/helpers/errorHandler.ts";

const apiURL = "https://em2lwqwscb.execute-api.us-west-2.amazonaws.com/dev";

export const generateToken = async (data: any) => {
  try {
    const response = await axios.post(`${apiURL}/generate-token`, data, {
      headers: defaultHeaders,
    });

    return response.data;
  } catch (e) {
    return errorHandler(
      e as AxiosError<{
        error: string;
      }>
    );
  }
};

export const validateToken = async (token: string) => {
  try {
    const response = await axios.get(`${apiURL}/credit-card`, {
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e) {
    return errorHandler(
      e as AxiosError<{
        error: string;
      }>
    );
  }
};
