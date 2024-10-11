import { Button, Form, Input, Select, message } from "antd";
import { useAddCategoryMutation } from "../../../store/services/category";
import { useEffect } from "react";

const AddNewCategory = ({ handleCancel }) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [trigger, { data }] = useAddCategoryMutation();
  const onFinish = (values) => {
    trigger(values);
  };
  const onFinishFailed = (error) => {};

  useEffect(() => {
    if (data?.status) {
      message.success(data?.message);
      handleCancel();
    }
  }, [data]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="edit-student-form"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter name!",
            },
          ]}
        >
          <Input placeholder={"Enter category here.."} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter a description!",
            },
          ]}
        >
          <Input.TextArea placeholder={"Enter description here.."} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-submit-btn">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewCategory;
