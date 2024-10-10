import { useState, useEffect } from "react";
import { useAddPackageDetailMutation } from "../../store/services/addTourDetail";
import { Editor } from "primereact/editor";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import UploadTripImg from "./uploadTripImg";
import { useGetTourCategoryQuery } from "../../store/services/tourPackages";
import { Button, Input, Select, message } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";

import { useGetCategoryQuery } from "../../store/services/category";

import { Checkbox, Col, Row } from "antd";
const AddPackageDetail = () => {
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [editorData, setEditorData] = useState({
    categoryId: "",
    name: "",
    highlights: "",
    needToKnow: "",
    canclePolicy: "",
    inclusions: "",
    DNSchedule: "",
    packagesNight: "",
    star: "",
    info: "",
    description: "",
    shortDescription: "",
    location: "",
    price: "",
    discountPrice: "",
    map: "",

    galleryPhoto: [],
  });

  const [triggre, { data: addData, isLoading }] = useAddPackageDetailMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (addData?.status || addData?.success) {
      message.success(addData.message);
      navigate("/package"); // Redirect on success
    }
  }, [addData]);

  const { data: packagesData } = useGetCategoryQuery();

  const handleChange = (name, value) => {
    setEditorData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submitHandler = () => {
    if (!fileList2[0]?.originFileObj) {
      return message.error("plz add package images ");
    } else if (fileList.length < 5) {
      return message.error("plz add min five images ");
    } else {
      const formData = new FormData();

      formData.append("highlights", editorData.highlights);
      formData.append("name", editorData.name);
      formData.append("DNSchedule", editorData.DNSchedule);
      formData.append("packagesNight", editorData.packagesNight);
      formData.append("star", editorData.star);
      formData.append("info", editorData.info);
      formData.append("description", editorData.description);
      formData.append("shortDescription", editorData.shortDescription);
      formData.append("location", editorData.location);
      formData.append("price", editorData.price);
      formData.append("map", editorData.map);
      formData.append("needToKnow", editorData.needToKnow);
      formData.append("canclePolicy", editorData.canclePolicy);
      formData.append("inclusions", editorData.inclusions);
      formData.append("image", fileList2[0].originFileObj);
      formData.append("categoryId", editorData.categoryId);
      formData.append("discountPrice", editorData.discountPrice);
      fileList.map((item) =>
        formData.append("galleryPhoto", item.originFileObj)
      );
      triggre(formData);
    }
  };

  const packageLists = packagesData?.data?.map((elm) => {
    return { value: elm?._id, label: elm?.name };
  });
  const starOption = [
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
    {
      value: "4",
      label: "4",
    },
    {
      value: "5",
      label: "5",
    },
  ];
  const onChange = (checkedValues) => {
    setEditorData((prev) => {
      return {
        ...prev,
        info: checkedValues,
      };
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="text-editor-wrapper">
          {/* <BreadCrum name={'Add Package'} /> */}
          <div className="add-package">
            <p>Add Package</p>
            {/* <hr /> */}
          </div>
          <div className="text-editor">
            <h3 className="title">Name</h3>
            <Input type="text" style={{ width: "100%", color: "" }} onChange={(e) => handleChange("name", e.target.value)}
            />
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
                onChange={(e) => handleChange("packagesNight", e.target.value)}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
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
              onChange={(e) => handleChange("DNSchedule", e.target.value)}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">info</h3>
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={onChange}
            >
              <Row>
                <Col span={8}>
                  <Checkbox value="Meals">Meals</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Sightseeing">Sightseeing</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Cab">Cab</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Camel Ride">Camel Ride</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Quad Bike Ride">Quad Bike Ride</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Sand Boarding">Sand Boarding</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="5 Star">5 Star</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Cab Transfer">Cab Transfer</Checkbox>
                </Col>
                <Col span={8}>
                  <Checkbox value="Buggy Ride">Buggy Ride</Checkbox>
                </Col>
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
              onChange={(e) => handleChange("shortDescription", e.target.value)}
            />
          </div>
          <div className="text-editor-num">
            <div className="text-editor">
              <h3 className="title">price</h3>
              <Input
                type="number"
                style={{ width: "100%", color: "" }}
                onChange={(e) => handleChange("price", e.target.value)}
              />
            </div>
            <div className="text-editor">
              <h3 className="title">Discount Price</h3>
              <Input
                type="number"
                style={{ width: "100%" }}
                onChange={(e) => handleChange("discountPrice", e.target.value)}
              />
            </div>
          </div>
          <div className="text-editor">
            <h3 className="title">map</h3>
            <Input
              type=""
              style={{ width: "100%", color: "" }}
              onChange={(e) => handleChange("map", e.target.value)}
            />
          </div>
          <div className="text-editor">
            <h3 className="title">location</h3>
            <Input
              type=""
              style={{ width: "100%", color: "" }}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Highlights</h3>
            <Editor
              value={editorData?.highlights}
              onTextChange={(e) => handleChange("highlights", e.htmlValue)}
              style={{ height: "280px", color: "black" }}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Need to know</h3>
            <Editor
              value={editorData?.needToKnow}
              onTextChange={(e) => handleChange("needToKnow", e.htmlValue)}
              style={{ height: "280px", color: "black" }}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Cancel policy</h3>
            <Editor
              value={editorData?.canclePolicy}
              onTextChange={(e) => handleChange("canclePolicy", e.htmlValue)}
              style={{ height: "280px", color: "black" }}
            />
          </div>

          <div className="text-editor">
            <h3 className="title">Inclusions</h3>
            <Editor
              value={editorData?.inclusions}
              onTextChange={(e) => handleChange("inclusions", e.htmlValue)}
              style={{ height: "280px", color: "black" }}
            />
          </div>
          <div className="text-editor">
            <h3 className="title">Our Packages</h3>
            <Select
              options={packageLists}
              style={{ width: "100%" }}
              onChange={(e) => handleChange("categoryId", e)}
              placeholder="Select your packages"
            />
            ;
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

          <Button
            onClick={submitHandler}
            style={{
              width: "200px",
              background: "#84a845",
              color: "#fff",
              border: "none",
            }}
          >
            Submit
          </Button>
        </div>
      )}
    </>
  );
};

export default AddPackageDetail;
