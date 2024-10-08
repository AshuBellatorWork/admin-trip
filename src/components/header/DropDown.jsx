import { Dropdown } from "antd";
import { IoMdNotifications } from "react-icons/io";
import NotificationList from "./NotificationList";

const DropDown = () => {
  const items = [
    {
      label: <NotificationList />,
      key: "0",
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={["click"]}
    >
      <a>
        <IoMdNotifications />
      </a>
    </Dropdown>
  );
};

export default DropDown;
