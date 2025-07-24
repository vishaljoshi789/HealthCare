"use client";
import { jwtDecode } from "jwt-decode";
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import {GFContext} from "@/context/AuthContext";
// import { toast } from "sonner";

type AuthToken = {
  access: string;
  refresh: string;
};

const useAxios = (): AxiosInstance => {
  const { authToken, baseURL , setAuthToken } = useContext(GFContext)

  const router = useRouter();
  

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${authToken?.access}`,
    },
  });

  axiosInstance.interceptors.request.use(
    async (req: InternalAxiosRequestConfig) => {
      if (!authToken) {
        router.push("/auth/login");
        return Promise.reject("No auth token available");
      }

      req.headers.Authorization = `Bearer ${authToken.access}`;

      const user = jwtDecode(authToken.access) as { exp?: number };
      const isExpired = dayjs.unix(user.exp || 0).diff(dayjs()) < 1;

      if (!isExpired) {
        return req;
      }

      try {
        const response = await axios.post<AuthToken>(
          `${baseURL}/auth/token/refresh/`,
          {
            refresh: authToken.refresh,
          }
        );

        localStorage.setItem("authToken", JSON.stringify(response.data));
        setAuthToken(response.data);

        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
      } catch (error) {
        console.error("Error refreshing token:", error);
        router.push("/auth/login");
        return Promise.reject(error);
      }
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      console.error("Axios Error:", error);
      if (error.response && error.response.status === 401) {
        router.push("/auth/login");
      }
      else if (error.response && error.response.status) {
        console.log(`An error (${error.response.status}) occurred`);
      } else {
        console.error("Something Went Wrong");
      }
      return error.response;
    }
  )

  return axiosInstance;
};

export default useAxios;