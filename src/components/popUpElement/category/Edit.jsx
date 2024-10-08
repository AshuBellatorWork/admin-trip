import { Button, Form,Select, Input, message } from "antd";
import { useEffect } from "react";
import { useEditCategoryMutation } from "../../../store/services/category";



const EditCategory = ({categoryData,handleCancel}) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [trigger,{data}] = useEditCategoryMutation()
  const onFinish =(values)=>{
    trigger({data:values,id:categoryData?._id})
  }
  const onFinishFailed = (error)=>{
  }


  useEffect(() => {
    if(data?.status){
      message.success(data?.message)
      handleCancel()
    }
  }, [data])
  
  return (
    <div>
        <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="edit-student-form"
        initialValues={{name:categoryData?.name}}
     
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
        <Select
          placeholder="Select Name"
          // onChange={onGenderChange}
          allowClear
        >
          <Option value="BUGGY PACKAGES">BUGGY PACKAGES</Option>
          <Option value="DESERT SAFARI PACKAGES">DESERT SAFARI PACKAGES</Option>
        </Select>
        </Form.Item>
        <Form.Item>


<Button type="primary" htmlType="submit" className="form-submit-btn">
  Save
</Button>
</Form.Item>
        </Form>
    </div>
  )
}

export default EditCategory