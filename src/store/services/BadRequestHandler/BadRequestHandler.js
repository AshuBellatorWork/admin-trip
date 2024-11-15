import { fetchBaseQuery } from "@reduxjs/toolkit/query";
// import { message } from "antd";
import { toast } from "react-toastify";
import { loginRoute } from "../../../routes/PagesRoutes";

export const dynamicBaseQuery = async (args, WebApi, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: "http://13.233.68.30/",
    headers: {
      // baseUrl: "http://127.0.0.1:8000",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await rawBaseQuery(args, WebApi, extraOptions);
  if (result?.error) {
    const responseMessage = result?.error?.data?.message;
    const status = result?.error?.status;
    if (status === 401) {
      localStorage.clear();
      window.location.replace(loginRoute);
    } else {
      toast.error(responseMessage);
    }
  }
  return result;
};
