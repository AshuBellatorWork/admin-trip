import { fetchBaseQuery } from "@reduxjs/toolkit/query";
// import { message } from "antd";
import { toast } from "react-toastify";
import { loginRoute } from "../../../routes/PagesRoutes";

export const dynamicBaseQuery = async (args, WebApi, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    // baseUrl: "https://admin-api.giedu.in",
    baseUrl: "https://tripatours.com/api",
    headers: {
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
  // if (result?.data.status === 200 || result?.data.status) {
  //   message.success(result?.data?.message);
  // } else if (result?.data.status === false) {
  //   message.error(result?.data?.message);
  // }
};
