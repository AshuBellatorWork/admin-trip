import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEditFaqMutation } from "../../../store/services/faq";
import { useEffect } from "react";

const EditFaq = ({faqData,handleCancel}) => {
  const [form] = Form.useForm();
  const [trigger,{data}]=useEditFaqMutation()
  
  const onFinish = (values)=>{
    trigger({...values,id:faqData?._id})
  }
  const onFinishFailed =(error)=>{
  }
  useEffect(() => {
    if(data?.success){
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
        className="faq-form"
        initialValues={{
          que:faqData?.que,
          ans:faqData?.ans

        }}
      >
        <Form.Item
          name="que"
          label="Question"
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
          label="Answer"
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
  )
}

export default EditFaq