import { Button, Form, Input, Space, message } from "antd";

import { useLoginMutation } from "../../store/services/login";
import { Link, useNavigate } from "react-router-dom";
import { dashBoardRoute, loginRoute, signUp } from "../../routes/PagesRoutes";
import { useEffect } from "react";
import Loader from "../../components/loader/Loader";

///styles
import "./styles.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const loginToken = localStorage.getItem("token");
  const [form] = Form.useForm();
  const [trigger, { data, error,isLoading }] = useLoginMutation();

  const onFinish = (values) => {
    trigger(values);
  };

  const onFinishFailed = () => {
  };

  

  useEffect(() => {
    if (loginToken) {
      navigate(dashBoardRoute);
    } else {
      navigate(loginRoute);
    }
  }, [loginToken]);
  useEffect(() => {
    if (data?.token) {
      localStorage.setItem("token", data?.token);
      localStorage.setItem("userType", data?.user?.userType);
      localStorage.setItem("username", data?.user?.username);
      localStorage.setItem("email", data?.user?.email);
      message.success(data?.message);
      window.location.replace("/");
    }
  }, [data]);


  const formFeild = [
    {
      name: "username",
      value: "",
      label: "Username",
      placeholder: "Enter Username here",
      type: "text",
    },
    {
      name: "password",
      value: "",
      label: "Password",
      placeholder: "Enter Password here",
      type: "password",
    },
  ];

  return (
    <>
    {isLoading?<Loader />:
    <>
      <div className="logo">Tripatour</div>
      <div className="login-form-container">
        <div className="login-form-title">
          <h3>Log In</h3>
          <p>Welcome back! Please enter your detail</p>
        </div>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="login-form"
      >
        {formFeild?.map((item) => {
          return (
            <Form.Item
              name={item.name}
              label={item.label}
              
              rules={[
                {
                  required: true,
                },
              ]}
              key={item.name + item.label}
            >
              <Input placeholder={item.placeholder} type={item?.type}/>
            </Form.Item>
          );
        })}
        <Space
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          {/* <Link to={signUp}>Create Account</Link> */}
          {/* <Link to={""}>Forgot Password?</Link> / */}
        </Space>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-submit-btn">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
}
</>
  );
};

export default LoginForm;
