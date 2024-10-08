import { Avatar } from "antd";

const AvatarCom = ({ showDrawer, open }) => {
  return (
    <div>
      <Avatar
        style={{
          //   backgroundColor: color,
          verticalAlign: "middle",
        }}
        size="small"
        // gap={gap}
        onClick={() => showDrawer()}
      >
        {"user"}
      </Avatar>
    </div>
  );
};

export default AvatarCom;
