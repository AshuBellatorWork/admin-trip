import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCreateTypeOfCourseMutation } from "../../../store/services/typeOfCourse";
import { useEffect } from "react";

const AddCourseTypeComp = ({ setIsModalOpen }) => {
  const [trigger, { data: createCourseType }] = useCreateTypeOfCourseMutation();

  const onFinish = (values) => {
    console.log(values);
    trigger(values);
  };

  const onFinishFailed = (error) => {};

  useEffect(() => {
    if (createCourseType?.success) {
      setIsModalOpen(false);
      message.success(createCourseType?.message);
    }
  }, [createCourseType, setIsModalOpen]);

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
          // title:userData?.title,
          // desc:userData?.desc
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          className="input-field"
          rules={[
            {
              required: true,
              message: "Please input the courseType title!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          className="input-field"
          rules={[
            {
              required: true,
              message: "Please input the Description!",
            },
          ]}
        >
          <TextArea />
        </Form.Item>

        <Form.Item style={{ margin: "0" }}>
          <Button
            htmlType="submit"
            style={{ background: "#6E61E4", color: "white", border: "none" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddCourseTypeComp;
