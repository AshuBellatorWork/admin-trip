import { Button, Drawer, Form, Input, Select } from "antd";
import { MdWavingHand } from "react-icons/md";
import { user } from "../../assets";
import { useState } from "react";
import { useEditAdminMutation } from "../../store/services/getAllSubAdmin";
const DrawerComp = ({ open, setOpen }) => {
  const [disableState, setDisableState] = useState(true);
  const [form] = Form.useForm();

  const [trigger, { data: editUserData }] = useEditAdminMutation();

  const userName = localStorage?.username;
  const gender = localStorage?.gender;
  const profession = localStorage?.profession;
  const userId = localStorage?.userId;

  const onClose = () => {
    setOpen(false);
    setDisableState(true);
  };

  const formFeild = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter Username here",
      disable: disableState,
    },
  
    {
      name: "email",
      label: "Email",
      placeholder: "Enter Email here",
      disable: disableState,
    },
  ];

  // const onFinish = (values) => {
  //   trigger({...values, id:getUserData?.data?._id});
  // };

  const onFinishFailed = () => {
  };
  const username = localStorage.getItem("username")
  const email = localStorage.getItem("email")

  const onFinish = ()=>{
    console.log("first")
  }
  return (
    <Drawer
      title={
        <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {username}
          <span
            style={{
              color: "#6e61e4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdWavingHand />
          </span>
        </p>
      }
      placement="right"
      onClose={onClose}
      open={open}
    >
      <div className="user-profile-container">
        <div className="user-profile">
          <img src={user} alt="" />
        </div>
        <div className="user-detail">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="login-form"
            initialValues={{
              username: username,
              email: email,
            }}
          >
            {formFeild?.map((item) => {
          
                return (
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    // rules={[
                    //   {
                    //     required: true,
                    //   },
                    // ]}
                    key={item.name + item.label}
                  >
                    <Input
                      placeholder={item.placeholder}
                      disabled={item.disable}
                    />
                  </Form.Item>
                );
            
            })}
            {!disableState ? (
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="form-submit-btn"
                >
                  Submit
                </Button>
              </Form.Item>
            ) : (
                <Button
                  type="primary"
                  // htmlType="submit"
                  className="form-submit-btn"
                  style={{marginTop:20}}
                  onClick={() => setDisableState(!disableState)}
                >
                  Edit Profile
                </Button>
            )}
          </Form>
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerComp;
