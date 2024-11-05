import { useState, useEffect } from "react";
// import { useAddPackageDetailMutation } from "../../store/services/addTourDetail";
import { useGetItenaryQuery } from "../../store/services/itinerary";
import { Editor } from "primereact/editor";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import UploadTripImg from "./uploadTripImg";
import { useGetTourCategoryQuery } from "../../store/services/tourPackages";
import { Button, Input, Select, message, Checkbox, Col, Row } from "antd";
// import { BreadCrum } from "../../components/breadCrume";
import Loader from "../../components/loader/Loader";
import {
  useGetPackagesQuery,
  useAddPackageMutation,
} from "../../store/services/package";
import { useGetCategoryQuery } from "../../store/services/category";
// import { useAddPackageMutation } from "../../store/services/package"; //

const AddOrder = () => {
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [editorData, setEditorData] = useState({
    category_id: "",
    name: "",
    highlight: "",
    need_to_know: "",
    cancel_policy: "",
    inclusion: "",
    package_duration: "",
    package_night: "",
    star: "",
    info: [],
    description: "",
    short_description: "",
    location: "",
    price: "",
    discounted_price: "",
    map: "",
    galleryPhoto: [],
  });

  const [triggre, { data: addData, isLoading }] = useAddPackageMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (addData?.status || addData?.success) {
      message.success(addData.message);
      navigate("/package"); // Redirect on success
    }
  }, [addData, navigate]);

  const { data: itineraryData = {}, isLoading: loadingItinerary } =
    useGetItenaryQuery();
  const { data: packagesData } = useGetTourCategoryQuery();
  const { data: categories = {}, isLoading: loadingCategories } =
    useGetCategoryQuery();
  // console.log(categories);

  const handleChange = (name, value) => {
    setEditorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = () => {
    if (!fileList2[0]?.originFileObj) {
      return message.error("Please add package images.");
    } else if (fileList.length < 5) {
      return message.error("Please add at least five images.");
    } else {
      const formData = new FormData();
      Object.entries(editorData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      fileList.forEach((item) =>
        formData.append("galleryPhoto[]", item.originFileObj)
      );
      formData.append("image", fileList2[0].originFileObj);
      triggre(formData);
    }
  };

  const starOption = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
  ];

  const onChange = (checkedValues) => {
    setEditorData((prev) => ({
      ...prev,
      info: checkedValues,
    }));
  };
  return (
    <>
      {isLoading || loadingCategories || loadingItinerary ? (
        <Loader />
      ) : (
        <div className="text-editor-wrapper">
          <div className="add-package">
            <p>Add Order</p>
          </div>
          <div className="text-editor">
            <h3 className="title">Name</h3>
            <Input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="text-editor">
            <h3 className="title">Categories</h3>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select categories"
              onChange={(values) => handleChange("category_id", values)}
            >
              {categories?.data?.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          <div className="text-editor-num2">
            <div className="text-editor">
              <h3 className="title">Packages Night</h3>
              <select
                className="packageNight"
                id="rating"
                style={{
                  width: "100%",
                  padding: "7px",
                  outline: "none",
                  border: "1px solid #ccc",
                }}
                onChange={(e) => handleChange("package_night", e.target.value)}
              >
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-editor">
              <h3 className="title">Package Rating</h3>
              <Select
                className="rating"
                style={{ width: "100%" }}
                options={starOption}
                onChange={(e) => handleChange("star", e)}
              />
            </div>
          </div>
          <div className="text-editor">
            <h3 className="title">Day/Night Schedule</h3>
            <Input
              id="textarea"
              name="textarea"
              rows="4"
              cols="50"
              style={{ width: "100%" }}
              onChange={(e) => handleChange("package_duration", e.target.value)}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Info</h3>
            <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
              <Row>
                {itineraryData.data?.map((itenary) => (
                  <Col span={8} key={itenary.id}>
                    {" "}
                    {/* Use unique id */}
                    <Checkbox value={itenary.id}>{itenary.name}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>

          <div className="text-editor">
            <h3 className="title">Description</h3>
            <textarea
              id="textarea"
              name="textarea"
              rows="4"
              cols="50"
              style={{ width: "100%" }}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="text-editor">
            <h3 className="title">Short Description</h3>
            <textarea
              id="textarea"
              name="textarea"
              rows="4"
              cols="50"
              style={{ width: "100%" }}
              onChange={(e) =>
                handleChange("short_description", e.target.value)
              }
            />
          </div>
          <div className="text-editor-num">
            <div className="text-editor">
              <h3 className="title">Price</h3>
              <Input
                type="number"
                style={{ width: "100%" }}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>
            <div className="text-editor">
              <h3 className="title">Discount Price</h3>
              <Input
                type="number"
                style={{ width: "100%" }}
                onChange={(e) =>
                  handleChange("discounted_price", e.target.value)
                }
              />
            </div>
          </div>
          <div className="text-editor">
            <h3 className="title">Map</h3>
            <Input
              style={{ width: "100%" }}
              onChange={(e) => handleChange("map", e.target.value)}
            />
          </div>
          <div className="text-editor">
            <h3 className="title">Location</h3>
            <Input
              style={{ width: "100%" }}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Highlights</h3>
            <Editor
              value={editorData.highlights}
              onTextChange={(e) => handleChange("highlight", e.htmlValue)}
              style={{ height: "280px", color: "black" }}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Need to know</h3>
            <Editor
              value={editorData.needToKnow}
              onTextChange={(e) => handleChange("need_to_know", e.htmlValue)}
              style={{ height: "280px", color: "black" }}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Cancel policy</h3>
            <Editor
              value={editorData.canclePolicy}
              onTextChange={(e) => handleChange("cancel_policy", e.htmlValue)}
              style={{ height: "280px", color: "black" }}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Inclusions</h3>
            <Editor
              value={editorData.inclusions}
              onTextChange={(e) => handleChange("inclusion", e.htmlValue)}
              style={{ height: "280px", color: "black" }}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Images</h3>
            <UploadTripImg
              setFileList={setFileList2}
              fileList={fileList2}
              length={1}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Upload Trip Images</h3>
            <UploadTripImg
              setFileList={setFileList}
              fileList={fileList}
              length={10}
            />
          </div>

          <Button onClick={submitHandler} type="primary">
            Submit
          </Button>
        </div>
      )}
    </>
  );
};

export default AddOrder;
