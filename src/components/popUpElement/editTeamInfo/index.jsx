import { Button, Form, Input, Upload, message } from "antd";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { IoMdCloudUpload } from "react-icons/io";
import { useEditTeamMemberMutation } from "../../../store/services/teamMember";
import { blobCreationFromURL } from "../../Blob";
const EditTeamInfo = ({ userData, handleCancel }) => {
  const [trigger, { data }] = useEditTeamMemberMutation();
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://admin-api.giedu.in/" + userData?.image,
      },
    ]);
  }, [userData]);

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
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("name", values?.name);
    formData.append("designation", values?.designation);
    formData.append("image", fileList[0].originFileObj);

    trigger({ data: formData, id: userData._id });
  };
  const onFinishFailed = (errorInfo) => {
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  useEffect(() => {
    if (data?.success) {
      message.success(data?.message);
      handleCancel();
    }
  }, [data]);
  return (
    <div>
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
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 1 && (
                  <IoMdCloudUpload className="icon-upload" />
                )}
              </Upload>
            </ImgCrop>
          </div>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          className="input-field"
          rules={[
            {
              required: true,
              message: "Please input the name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Designation"
          name="designation"
          className="input-field"
          rules={[
            {
              required: true,
              message: "Please input the designation!",
            },
          ]}
        >
          <Input />
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

export default EditTeamInfo;
