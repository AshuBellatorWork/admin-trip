import AvatarCom from "./Avatar";
////styles
import "./styles.scss";

const NotificationList = () => {
  return (
    <div className="notification-list-container">
      <div className="list-left-col">
        <AvatarCom />
      </div>
      <div className="list-right-col">
        <p>Raghav Buy a Course</p>
        <span className="time">10:34 - 22-10-2024</span>
      </div>
    </div>
  );
};

export default NotificationList;
