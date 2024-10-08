import { Button, Form, Input, message } from "antd";
import { useCourseAddCategoryMutation } from "../../../store/services/courseCategories";
import { useEffect } from "react";

const AddCourseTitle = ({ setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [trigger, { data: addCourseCategory }] = useCourseAddCategoryMutation();

  const onFinish = (values) => {
    trigger(values);
  };

  const onFinishFailed = () => {
  };

  useEffect(() => {
    if (addCourseCategory?.success) {
      setIsModalOpen(false);
      message.success(addCourseCategory?.message);
    }
  }, [addCourseCategory]);
  
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="add-courses-form"
      >
        <Form.Item
          name="name"
          label="Add course title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter New Course title here.."} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-submit-btn">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCourseTitle;
