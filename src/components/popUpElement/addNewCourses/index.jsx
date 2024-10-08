import { Button, Form, Input, Select } from "antd";
///styles
import "./styles.scss";

const AddNewCourses = () => {
  const [form] = Form.useForm();
  const { data: allCourseTabList } = useAllCoursesQuery();
  const [trigger, { data: addCourse }] = useAddCourseCardDescMutation();

  const onFinish = (values) => {
    const addCourseData = {
      subjectTitle: values.coursename,
      desc: values.desc,
      id: values.techId,
    };
    trigger(addCourseData);
  };

  const onFinishFailed = () => {
  };

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
          name="coursename"
          label="Add new course title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter New Course here.."} />
        </Form.Item>

        <Form.Item
          name="desc"
          label="Add new course desc"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder={"Enter New Course desc.."} />
        </Form.Item>

        <Form.Item
          name="techId"
          label="Select Field"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select the field">
            {allCourseTabList?.data.map((item) => {
              return (
                <Select.Option key={item._id} values={item?._id}>
                  {item.coursename}
                </Select.Option>
              );
            })}
          </Select>
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

export default AddNewCourses;
