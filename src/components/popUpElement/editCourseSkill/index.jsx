import { Button, Form, Input, message } from "antd";
import { PrimaryButton } from "../../../common/button";
import { useCourseEditCategorySkillMutation } from "../../../store/services/courseCategorySkills";
import { useEffect } from "react";

const EditCourseSkillComp = ({ editSkillData, setIsModalOpen }) => {
  const [trigger, { data: editedData }] = useCourseEditCategorySkillMutation();

  const onFinish = (values) => {
    trigger({ ...values, id: editSkillData?._id });
  };

  useEffect(() => {
    if (editedData?.success) {
      setIsModalOpen(false);
      message.success(editedData?.message)
    }
  }, [editedData,setIsModalOpen]);

  return (
    <div>
      <Form
        layout="vertical"
        name="control-hooks"
        onFinish={onFinish}
        initialValues={{
          title: editSkillData?.title,
          description: editSkillData?.description,
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Edit
        </Button>
      </Form>
    </div>
  );
};

export default EditCourseSkillComp;
