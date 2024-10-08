import { Upload } from "antd";

///styles
import "./styles.scss";

const ImageUplaod = ({ fun, fileList }) => {
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
    <div className="image-uploader">
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={fun}
        onPreview={onPreview}
        accept="image/png, image/jpeg,image/jpg ,image/webp, image/svg"
      >
        {fileList?.length < 1 && "+ Upload"}
      </Upload>
    </div>
  );
};

export default ImageUplaod;
