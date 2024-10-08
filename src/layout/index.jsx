import { Drawer, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import SiderComponent from "../components/sider/index";
import HeaderComponent from "../components/header/Header";
const { Header, Sider, Content } = Layout;

import "./styles.scss";
import { useEffect, useRef, useState } from "react";
import { dashBoardRoute, loginRoute } from "../routes/PagesRoutes";
import { logo } from "../assets";
const LayoutPrimary = () => {
  const elementRef = useRef(null);
  const navigate = useNavigate();
  const loginToken = localStorage.getItem("token");

  // useEffect(() => {
  //   if (loginToken) {
  //     // navigate(dashBoardRoute);
  //   } else {
  //     navigate(loginRoute);
  //   }
  // }, [loginToken]);
const location = window.location.pathname
const routepath = {
  "/":"Dashboard",
  "/package":"Package",
  "/category":"Category",
  "/feedback":"Feedback",
  "/enquiry-list":"Enquiry List",
  "/favourite":"Favourite",
  "/add-package-detail/":"Add Package"
}
const [open, setOpen] = useState(false);
const showDrawer = () => {
  setOpen(true);
};
const onClose = () => {
  setOpen(false);
};
  return (
    <>
      <Drawer title={ <img src={logo} alt="" />} onClose={onClose} open={open} placement="left" className="sider-drawer">
      <SiderComponent onClose={onClose}/>
      </Drawer>
    <Layout className="main-layout">
      <Header className="layout-header">
        <HeaderComponent siderOpen={setOpen} siderOp={open}/>
      </Header>
      <Layout className="sub-layout">
        <Sider className="layout-sider">
          <SiderComponent />
        </Sider>
        <Content  ref={elementRef} >
        <div className="dashboard-header">
        <h2>{routepath[location] || routepath["/itinerary"] }</h2>
      </div>
      <div className="layout-content">

          <Outlet context={[elementRef]} />
      </div>
        </Content>
      </Layout>
    </Layout>
    </>
  );
};

export default LayoutPrimary;
