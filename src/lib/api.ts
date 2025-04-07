"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchApi<T = any>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any,
) {
  const cookieHeader = cookies().toString();

  try {
    const response = await axios({
      method: method,
      url: `${baseUrl}${url}`,
      data: data,
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });

    return { data: response.data, error: null };
  } catch (err) {
    const error = err as AxiosError;

    console.error(`Error in ${method.toUpperCase()} ${url}: ${error.message}`);

    return { data: null, error: error.message };
  }
}
