import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEditTypeOfCourseMutation } from "../../../store/services/typeOfCourse";
import { useEffect } from "react";

const EditCourseTypeComp = ({ typeInputData, setIsModalOpen }) => {
  const [trigger, { data: editedData }] = useEditTypeOfCourseMutation();

  const onFinish = (values) => {
    console.log("Success:", values);
    trigger({
      ...values,
      id: typeInputData?._id,
    });
  };

  const onFinishFailed = (error) => {};

  useEffect(() => {
    if (editedData?.success) {
      setIsModalOpen(false);
      message.success(`${editedData?.message}`);
    }
  }, [editedData]);

  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        labelCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
          title: typeInputData?.title,
          description: typeInputData?.description,
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
    </div>
  );
};

export default EditCourseTypeComp;
