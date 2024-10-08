import { Button, Form, Input, Select, Upload } from "antd";
import { useLoginMutation } from "../../store/services/login";
import { WiDirectionLeft } from "react-icons/wi";

///styles
import "./styles.scss";
import { Link } from "react-router-dom";
import { loginRoute } from "../../routes/PagesRoutes";
import { useState } from "react";
import ImageUplaod from "../../components/uploadImage";
import { useSignUpMutation } from "../../store/services/signUpService";
const SignUp = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  
  const [trigger, { data, error }] = useSignUpMutation();
  const [fileList, setFileList] = useState([]);
  const [genderValue, SetGenderValue] = useState();
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append(
      "profileImage",
      fileList.length ? fileList[0]?.originFileObj : ""
    );
    formData.append("username", values.username);

    formData.append("gender", genderValue);
    formData.append("profession", values?.profession);
    formData.append("password", values?.password);
    trigger(formData);
  };

  const onFinishFailed = () => {
  };

  const formFeild = [
    {
      name: "username",
      value: "",
      label: "Username",
      placeholder: "Enter Username here",
      type: "text",
    },
    {
      name: "gender",
      value: "",
      label: "Gender",
      placeholder: "Enter Username here",
      children: ["Male", "Female"],
      type: "text",
    },
    {
      name: "profession",
      value: "",
      label: "Profession",
      placeholder: "Enter Profession here",
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

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <>
      <div className="login-form-container">
        <div className="login-form-title">
          <h3>Create Account </h3>
          <p>Start New Journey With Gi</p>
        </div>
      </div>
      <div className="image-upload-container">
        <ImageUplaod fun={onChange} fileList={fileList} />
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="login-form"
      >
        <div
         className="login-form-div"
        
        >
          {formFeild?.map((item) => {
            if (item.label == "Gender") {
              return (
                <Form.Item
                  label="Select"
                  key={item.label + item.name}
                  className="input-width"
                >
                  <Select
                    defaultValue={"Male"}
                    onChange={(e) => SetGenderValue(e)}
                  >
                    {item?.children?.map((list) => {
                      return (
                        <Option value={list} key={list}>
                          {list}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              );
            } else {
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
                  className={
                    item.label == "Username" || item.label == "Gender"
                      ? "input-width"
                      : "input-widthfull"
                  }
                >
                  <Input placeholder={item.placeholder} type={item.type} />
                </Form.Item>
              );
            }
          })}
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-submit-btn">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="back-icon">
        <Link to={loginRoute}>
          <WiDirectionLeft />
          <span>Back to Login </span>
        </Link>
      </div>
    </>
  );
};

export default SignUp;
