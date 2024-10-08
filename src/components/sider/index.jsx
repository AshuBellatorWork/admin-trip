import { Children, useState } from "react";
import { Menu } from "antd";
import {
  
  categoryRoutes,
  dashBoardRoute,
  enquiryList,
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
      label: <Link to={dashBoardRoute} onClick={onClose}>Dashboard</Link>,
      icon: <MdDashboard />,
    },
    {
      key: "2",
      label: <Link to={categoryRoutes} onClick={onClose}>Category</Link>,
      icon: <PiStudentBold />,
  },
    {
      key: "3",
      label: "Packages Section",
      icon: <PiStudentBold />,
      children:[

      {
        key: "4",
        label: <Link to={packageRoutes} onClick={onClose}>Package</Link>,
        icon: <PiStudentBold />,
    },
    
  
    ]
    },
      {
        key: "5",
        label: <Link to={favRoutes} onClick={onClose}>Favourite</Link>,
        icon: <GrLike />,
      },
      {
        key: "6",
        label: <Link to={feedbackRoute} onClick={onClose}>Feedback</Link>,
        icon: <FcFeedback />,
      },
      {
        key: "7",
        label: <Link to={enquiryList} onClick={onClose}>Enquiry List</Link>,
        icon: <MdDashboard />,
      },
   
    // userType3 || userType5
    //   ? {
    //       key: "ourTeam",
    //       label: <Link to={ourTeam}>Our Team</Link>,
    //       icon: <MdMenuBook />,
    //     }
    //   : null,
    // {
    //   key: "faq",
    //   label: <Link to={faq}>Faq</Link>,
    //   icon: <MdMenuBook />,
    // },
    // {
    //   key: "5",
    //   label: "Record",
    //   children: [
     
    //     userType5
    //       ? {
    //           key: "7",
    //           label: <Link to={subAdminRecordRoutes}>Sub Admin</Link>,
    //           icon: <PiStudentBold />,
    //         }
    //       : null,
    //     {
    //       key: "8",
    //       label: <Link to={teacherRecordRoutes}>Teacher</Link>,
    //       icon: <FaRegCreditCard />,
    //     },
    //   ],
    // },
    // {
    //   key: 9,
    //   label: "Student Fees",
    //   children: [
    //     {
    //       key: "10",
    //       label: <Link to={pendingPaymentRoutes}>Pending Fees</Link>,
    //       icon: <FaRegCreditCard />,
    //     },
    //     {
    //       key: "11",
    //       label: <Link to={pendingPaymentRoutes}>Confirm Fess</Link>,
    //       icon: <FaRegCreditCard />,
    //     },
    //   ],
    // },
    // userType3 || userType5
    //   ? {
    //       key: "14",
    //       label: <Link to={CourseTitle}>Add Course Title</Link>,
    //       icon: <MdMenuBook />,
    //     }
    //   : null,
    // userType2 || userType3 || userType5
    //   ? {
    //       key: "query",
    //       label: <Link to={clientFeedback}>Client Feedback</Link>,
    //       icon: <MdMenuBook />,
    //     }
    //   : null,
    // userType2 || userType5
    //   ? {
    //       key: "courseType",
    //       label: <Link to={addCourseType}>Add Course Type</Link>,
    //       icon: <MdMenuBook />,
    //     }
    //   : null,
    // userType3 || userType5
    //   ? {
    //       key: "15",
    //       label: <Link to={CourseSkills}>Add Course Skills</Link>,
    //       icon: <MdMenuBook />,
    //     }
    //   : null,

    // userType3 || userType5
    //   ? {
    //       key: "12",
    //       label: <Link to={addNewStudent}>Add New Student</Link>,
    //       icon: <MdMenuBook />,
    //     }
    //   : null,
    {
      key: "8",
      label: (
        <span
          onClick={() => {
            onClose()
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
