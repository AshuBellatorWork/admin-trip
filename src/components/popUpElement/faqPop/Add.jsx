import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useAddFaqMutation } from "../../../store/services/faq";
import { useEffect } from "react";

const AddNewfaq = ({ handleCancel }) => {
  const [form] = Form.useForm();
  const [trigger, { data }] = useAddFaqMutation();
  const onFinish = (values) => {
    trigger(values);
  };
  const onFinishFailed = (error) => {
  };
  useEffect(() => {
    if (data?.success) {
      message.success(data.message);
      handleCancel(false);
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
        className="faq-form"
      >
        <Form.Item
          name="que"
          label="Add Question"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter New Question"} />
        </Form.Item>
        <Form.Item
          name="ans"
          label="Add Answer"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea placeholder={"Enter answer."} />
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

export default AddNewfaq;
