import { Button, Form, Input, message } from "antd";
import { useCourseAddCategorySkillMutation } from "../../store/services/courseCategorySkills";
import { useEffect } from "react";

const AddCourseSkillComp = ({ setIsModalOpen }) => {
  const [form] = Form.useForm();
  const [trigger, { data: addSkill }] = useCourseAddCategorySkillMutation();

  const onFinish = (values) => {
    trigger(values);
  };

  const onFinishFailed = () => {
  };

  useEffect(() => {
    if (addSkill?.success) {
      setIsModalOpen(false);
      message.success(addSkill?.message);
    }
  }, [addSkill]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="title"
          label="Add title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter title here.."} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Add description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter description here.."} />
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

export default AddCourseSkillComp;
