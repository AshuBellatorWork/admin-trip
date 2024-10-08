import { Button, Form, Input, Select, message } from "antd";
import { useCreateAdminMutation } from "../../../store/services/getAllSubAdmin";
import { useEffect } from "react";

const AddSubAdmins = ({setIsModalOpen}) => {
  const { Option } = Select;

  const [trigger, { data: addSubAdmin }] = useCreateAdminMutation();

  const onFinish = (values) => {
    trigger(values);
  };

  const onFinishFailed = (errorInfo) => {
  };

  useEffect(() => {
    if (addSubAdmin?.status) {
     message.success(addSubAdmin?.message) 
     setIsModalOpen(false);
    }
  },[addSubAdmin]);

  return (
    <div className="add-sub-admin">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="User Id"
          name="userId"
          rules={[
            {
              required: true,
              message: "Please input your userId!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Profession"
          name="profession"
          rules={[
            {
              required: true,
              message: "Please input your profession!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label="User Type" name="userType">
          <Select placeholder="Select user type" allowClear name="userType">
            <Option value="2">CA</Option>
            <Option value="3">RA</Option>
            {/* <Option value="5">MA</Option> */}
          </Select>
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select placeholder="Select a gender" allowClear name="gander">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSubAdmins;
