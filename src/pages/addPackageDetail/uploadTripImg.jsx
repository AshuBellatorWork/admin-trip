import { Upload } from 'antd'
import React, { useState } from 'react'

const UploadTripImg = ({ fileList,setFileList, length }) => {

    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };
    // console.log(fileList[0].name, "outer");
  
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

    return (
        <div>
          <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
                accept="image/png, image/jpeg,image/jpg ,image/webp, image/svg"
              >
                {fileList?.length < length && "+ Upload"}
              </Upload>
        </div>
    )
}

export default UploadTripImg