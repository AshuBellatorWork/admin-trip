import { Children, useState } from "react";
import { Menu } from "antd";
import {
  
  categoryRoutes,
  dashBoardRoute,
  enquiryList,
  generalEnquiryList,
  orderList,
  favRoutes,
  feedbackRoute,
  loginRoute,
  packageRoutes,
} from "../../routes/PagesRoutes";
import { Link } from "react-router-dom";
import { MdDashboard, MdLogout, MdMenuBook } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FaRegCreditCard } from "react-icons/fa6";
import { GrLike } from "react-icons/gr";
import { FcFeedback } from "react-icons/fc";



///styles
import "./styles.scss";
import AreYouSure from "../popUpElement/areYouSure";
import PrimaryModal from "../../common/modal";
const SiderComponent = ({onClose}) => {
  const [modalOpenValue, setModalOpenValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userType = localStorage.getItem("userType");

  const userType2 = userType == 2;
  const userType3 = userType == 3;
  const userType5 = userType == 5;

  const items = [
    {
      key: "1",
      label: (
        <Link to={dashBoardRoute} onClick={onClose}>
          Dashboard
        </Link>
      ),
      icon: <MdDashboard />,
    },
    {
      key: "2",
      label: (
        <Link to={categoryRoutes} onClick={onClose}>
          Category
        </Link>
      ),
      icon: <PiStudentBold />,
    },
    {
      key: "3",
      label: "Packages Section",
      icon: <PiStudentBold />,
      children: [
        {
          key: "4",
          label: (
            <Link to={packageRoutes} onClick={onClose}>
              Package
            </Link>
          ),
          icon: <PiStudentBold />,
        },
      ],
    },
    {
      key: "5",
      label: (
        <Link to={favRoutes} onClick={onClose}>
          Favourite
        </Link>
      ),
      icon: <GrLike />,
    },
    {
      key: "6",
      label: (
        <Link to={feedbackRoute} onClick={onClose}>
          Feedback
        </Link>
      ),
      icon: <FcFeedback />,
    },
    {
      key: "7",
      label: (
        <Link to={enquiryList} onClick={onClose}>
          Enquiry List
        </Link>
      ),
      icon: <MdDashboard />,
    },
    {
      key: "8",
      label: (
        <Link to={generalEnquiryList} onClick={onClose}>
          {" "}
          General Enquiry List{" "}
        </Link>
      ),
      icon: <MdDashboard />,
    },

    {
      key: "9",
      label: (<Link to={orderList} onClick={onClose}> {" "} Order List{" "} </Link>),
      icon: <MdDashboard />,
    },

    {
      key: "10",
      label: (
        <span
          onClick={() => {
            onClose();
            setIsModalOpen(true);
            setModalOpenValue(0);
          }}
        >
          Logout
        </span>
      ),
      icon: <MdLogout />,
    },
  ];

  const logOutFun = () => {
    localStorage.clear();
    window.location.replace(loginRoute);
  };

  const onFinish = () => {
    setIsModalOpen(false);
  };

  const modalComObj = [
    {
      content: <AreYouSure fun={logOutFun} />,
      label: "Log Out",
    },
  ];

  return (
    <>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComObj[modalOpenValue]["label"]}
        onFinish={onFinish}
        width={modalOpenValue == 2 && true}
        element={modalComObj[modalOpenValue]["content"]}
      />

      <Menu
        theme="transparent"
        defaultSelectedKeys={["1"]}
        
        mode="inline"
        items={items}
        className="sider-menu"
      />
    </>
  );
};

export default SiderComponent;
