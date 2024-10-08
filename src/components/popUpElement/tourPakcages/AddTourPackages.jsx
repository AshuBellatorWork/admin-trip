import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Upload, message } from "antd";


import { IoMdCloudUpload } from "react-icons/io";

// import "./styles.scss";

import moment from "moment";
import { useAddTourPackagesMutation } from "../../../store/services/tourPackages";
import { useGetCategoryQuery } from "../../../store/services/category";


const AddTourPackages = ({ handleCancel }) => {
  const {Option} = Select
  const [trigger, { data: craetedTeam }] = useAddTourPackagesMutation();
  const  { data:categoryData } = useGetCategoryQuery();
  console.log(categoryData,"sdkfmgk")
  const [fileList, setFileList] = useState([]);
  const onFinish = (values) => {
    const dateTime = moment(values.timing).format("DD-MM-YYYY MM-HH")
    const time = dateTime.split(" ")
    const formData = new FormData();
    formData.append("title", values?.title);
    formData.append("description", values?.description);
    formData.append("image", fileList[0]?.originFileObj);
    formData.append("price", values?.price);
    formData.append("timing", time[1]);
    formData.append("date", time[0]);

    trigger({data:formData,id:values?.category});
  };

  const onFinishFailed = (errorInfo) => {
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  useEffect(() => {
    if (craetedTeam?.success) {
      message.success(craetedTeam.message);
      handleCancel();
    }
  }, [craetedTeam]);

  return (
    <div className="add-team-member-form">
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item className="input-field">
          <div className="member-img-upload">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList?.length < 1 && (
                  <IoMdCloudUpload className="icon-upload" />
                )}
              </Upload>
          </div>
        </Form.Item>
    
        <Form.Item
          label="Title"
          name="title"
          className="input-field"
          rules={[
            {
              required: true,
              message: "Please input the title!",
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
              message: "Please input the description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          className="input-field"
          rules={[
            {
              required: true,
              message: "Please input the price!",
            },
          ]}
        >
          <Input />
        </Form.Item>
     
        <Form.Item
          name="category"
          label="Category"
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
          {categoryData?.data.map((item)=>{
            return <Option value={item?._id} key={item?._id} >{item?.name}</Option>
          })}
        </Select>
        </Form.Item>
        <Form.Item
          label="timing"
          name="timing"
          className="input-field"
          rules={[
            {
              required: true,
              message: "Please input the name!",
              },
              ]}>
            <DatePicker  showTime/>

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

export default AddTourPackages;