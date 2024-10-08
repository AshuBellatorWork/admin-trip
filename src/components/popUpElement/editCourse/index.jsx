import { Button, Form, Input, message } from "antd";
import { SecondaryButton } from "../../../common/button";
import { useCourseEditCategoryMutation } from "../../../store/services/courseCategories";
import { useEffect } from "react";

const EditCourse = ({ getEditData,setIsModalOpen }) => {
  const [form] = Form.useForm();

  const [trigger,{data:editedData}] = useCourseEditCategoryMutation()

  const onFinish = (values) => {
    trigger({
      ...values,
      id:getEditData?._id
    });
  };

  const onFinishFailed = () => {
  };

  useEffect(()=>{
    if (editedData?.success) {
      setIsModalOpen(false)
      message.success(editedData?.message);
    }
  },[editedData])

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="add-courses-form"
        initialValues={{
          name: getEditData?.name,
        }}
      >
        <Form.Item
          name="name"
          label="Edit course title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter course here.."} />
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

export default EditCourse;
