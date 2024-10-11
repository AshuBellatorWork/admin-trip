import { Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useEditCategoryMutation } from "../../../store/services/category";
import PropTypes from "prop-types"; // Import PropTypes

const EditCategory = ({ categoryData, handleCancel }) => {
  const [form] = Form.useForm();
  const [trigger, { data, isError, isLoading }] = useEditCategoryMutation();

  const onFinish = (values) => {
    trigger({ data: values, id: categoryData?.id });
  };

  const onFinishFailed = (errorInfo) => {
    // Handle form submission failure
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (data?.status) {
      message.success(data.message);
      handleCancel();
    }
    if (isError) {
      message.error("Failed to update category");
    }
  }, [data, isError, handleCancel]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="edit-student-form"
        initialValues={{
          name: categoryData?.name,
          description: categoryData?.description,
        }}
      >
        <Form.Item
          name="name"
          label="Category Name"
          rules={[{ required: true, message: "Please enter category name!" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter description!" }]}
        >
          <Input.TextArea placeholder="Enter description" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="form-submit-btn"
            loading={isLoading}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

// Define PropTypes for the component
EditCategory.propTypes = {
  categoryData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default EditCategory;
