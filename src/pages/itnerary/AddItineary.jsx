import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useAddItineraryMutation } from '../../store/services/itinerary';

const AddItineary = ({ id, handleCancel }) => {
  const [trigger, { data: addItineareyData }] = useAddItineraryMutation()
  const onFinish = (values) => {
    console.log('Success:',);
    trigger({ ...values, packageId: id })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    if (addItineareyData?.status) {
      message.success(addItineareyData?.message)
      handleCancel()
    }
  }, [addItineareyData])
  return (
    <div>
      <Form
        name="basic"

        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Day"
          name="day"
          rules={[
            {
              // required: true,
              message: 'Please enter day!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please enter title!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: 'Please enter content!',
            },
          ]}
        >
          <Input />
        </Form.Item>



        <Form.Item
          wrapperCol={{
            // offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}

export default AddItineary
