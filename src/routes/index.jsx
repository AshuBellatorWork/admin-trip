import { createBrowserRouter } from "react-router-dom";
import LayoutPrimary from "../layout";
import {
  addPackageDetail,
  categoryRoutes,
  editPackageDetail,
  enquiryList,
  generalEnquiryList,
  orderList,
  favRoutes,
  feedbackRoute,
  itinerary,
  loginRoute,
  packageRoutes,
  addOrder,
} from "./PagesRoutes";
import Dashboard from "../pages/dashboard";
import LoginLayout from "../pages/auth";
import Login from "../pages/auth/Login";
import PageNotFound from "../pages/pageNotFound";
import Packages from "../pages/tourPackages/Packages";
import Favourite from "../pages/favourite/Favourite";
import AddPackageDetail from "../pages/addPackageDetail/AddPackageDetail";
import Category from "../pages/category";
import EditPackageDetail from "../pages/addPackageDetail/EditPackageDetail";
import Feedback from "../pages/feedback/Feesback";
import EnquiryList from "../pages/enquirylist/EnquiryList";
import GeneralEnquiryList from "../pages/generalenquirylist/GeneralEnquiryList";
import Itinerary from "../pages/itnerary/Itinerary";
import OrderList from "../pages/orderList/orderList"; 
import AddOrder from "../pages/orderList/AddOrder";

const userType = localStorage.getItem("userType");


export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPrimary />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: categoryRoutes,
        element: <Category />,
      },

      {
        path: packageRoutes,
        element: <Packages />,
      },
      {
        path: feedbackRoute,
        element: <Feedback />,
      },
      {
        path: favRoutes,
        element: <Favourite />,
      },
      {
        path: editPackageDetail,
        element: <EditPackageDetail />,
      },
      {
        path: addPackageDetail,
        element: <AddPackageDetail />,
      },

      {
        path: enquiryList,
        element: <EnquiryList />,
      },
      {
        path: generalEnquiryList,
        element: <GeneralEnquiryList />,
      },
      {
        path: orderList,
        element: <OrderList />,
      },
      {
        path: itinerary,
        element: <Itinerary />,
      },
      {
        path: addOrder,
        element: <AddOrder />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      {
        path: loginRoute,
        element: <Login />,
      },
    ],
  },
]);
