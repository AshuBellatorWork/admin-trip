import { useEffect, useState } from "react";
import {
  useGetPackageDetailQuery,
  useUpdatePackagesDetailMutation,
} from "../../store/services/addTourDetail";
import { Editor } from "primereact/editor";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import UploadTripImg from "./uploadTripImg";
import { Button, Checkbox, Col, Input, Row, Select, message } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import { useGetCategoryQuery } from "../../store/services/category";
import { useGetItenaryQuery } from "../../store/services/itinerary";
import {
  useGetPackagesQuery,
  useAddPackageMutation,
} from "../../store/services/package"; 
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
export async function blobCreationFromURL(inputURI) {
  const response = await fetch(inputURI);
  const blob = await response.blob();
  return new File([blob], inputURI, {
    type: blob.type || "image/jpeg",
  });
  // return blob
}
const EditPackageDetail = () => {
  const { id } = useParams();
  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([
    {
      url: "",
    },
  ]);
  const [editorData, setEditorData] = useState({
    // categoryId: "",
    // name: "",
    // highlights: "",
    // needToKnow: "",
    // cancel_policy: "",
    // inclusions: "",
    // package_duration: "",
    // package_night: "",
    // star: "",
    // info: "",
    // description: "",
    // shortDescription: "",
    // location: "",
    // price: "",
    // discountPrice: "",
    // map: "",
    // galleryPhoto: [],
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
  const [triggre, { data: updateData, isLoading }] = useUpdatePackagesDetailMutation();
  const { data: categories = {}, isLoading: loadingCategories } = useGetPackagesQuery();
  const { data: itineraryData = {}, isLoading: loadingItinerary } = useGetItenaryQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (updateData?.status || updateData?.success) {
      message.success(updateData.message);
      navigate("/package"); // Redirect on success
    }
  }, [updateData]);

  const { data: getPackagesDetail, isLoading: getpackageLoader } =
    useGetPackageDetailQuery(id);
  console.log(getPackagesDetail);
  const { data: packagesData, isLoading: categoryModel } =
    useGetCategoryQuery();

  const isLoadingAll = getpackageLoader || categoryModel || isLoading;

  const handleChange = (name, value) => {
    setEditorData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const splitInfo = getPackagesDetail?.data?.info[0]?.split(",");
    splitInfo?.map((item) => {
      setEditorData((prev) => {
        return {
          ...prev,
          info: [...prev.info, item],
        };
      });
    });
    setEditorData((prev) => {
      return {
        ...prev,
        name: getPackagesDetail?.package?.name,
        package_night: getPackagesDetail?.package?.package_night, // correct key for package_night
        star: getPackagesDetail?.package?.star, // assuming 'star' is added later
        package_duration: getPackagesDetail?.package?.package_duration, // assuming 'package_duration' is part of the response
        description: getPackagesDetail?.package?.description,
        short_description: getPackagesDetail?.package?.short_description, // correct key for short description
        location: getPackagesDetail?.package?.location,
        price: getPackagesDetail?.package?.price,
        map: getPackagesDetail?.package?.map,
        discounted_price: getPackagesDetail?.package?.discounted_price, // correct key for discounted price
        category_id: getPackagesDetail?.package?.category_id, // correct key for category_id
        highlight: getPackagesDetail?.package?.highlight, // assuming 'highlight' key
        inclusion: getPackagesDetail?.package?.inclusion, // correct key for inclusion
        need_to_know: getPackagesDetail?.package?.need_to_know, // correct key for need_to_know
        cancel_policy: getPackagesDetail?.package?.cancel_policy, // correct key for cancel_policy
      };
    });

    setFileList2([
      {
        url: getPackagesDetail?.data?.images,
      },
    ]);

    const galleryPhotos = getPackagesDetail?.data?.galleryPhoto.map((item) => {
      return {
        url: item,
      };
    });
    setFileList(galleryPhotos);
  }, [getPackagesDetail]);

  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("highlight", editorData.highlight);
    formData.append("name", editorData.name);
    formData.append("package_duration", editorData.package_duration);
    formData.append("package_night", editorData.package_night);
    formData.append("star", editorData.star);
    formData.append("info", editorData.info);
    formData.append("description", editorData.description);
    formData.append("short_description", editorData.short_description);
    formData.append("location", editorData.location);
    formData.append("price", editorData.price);
    formData.append("map", editorData.map);
    formData.append("need_to_know", editorData.need_to_know);
    formData.append("cancel_policy", editorData.cancel_policy);
    formData.append("inclusion", editorData.inclusion);
    formData.append("category_id", editorData?.category_id);
    formData.append("discounted_price", editorData?.discounted_price);
    // formData.append("image", fileList2[0].originFileObj)
    // fileList.map((item) => formData.append("galleryPhoto", item?.originFileObj))
    // for (let item of fileList) {
    //   if (item?.originFileObj) {
    //     formData.append("galleryPhoto", item?.originFileObj);
    //   } else {
    //     const data = await blobCreationFromURL(item?.url);
    //     formData.append("galleryPhoto", data);
    //   }
    // }
    if (fileList2[0]?.originFileObj) {
      formData.append("image", fileList2[0].originFileObj);
    } else {
      const data = await blobCreationFromURL(fileList2[0]?.url);
      formData.append("image", data);
    }

    triggre({ data: formData, id: id });
  };

  const packageLists = packagesData?.data?.map((elm) => {
    return { value: elm?._id, label: elm?.name };
  });

  const starOption = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
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
    {isLoadingAll ? (
      <Loader />
    ) : (
      <div className="text-editor-wrapper">
        <div className="add-package">
          <p>Trip Packages Details</p>
        </div>

        <div className="text-editor">
          <h3 className="title">Name</h3>
          <Input
            type="text"
            style={{ width: "100%" }}
            onChange={(e) => handleChange("name", e.target.value)}
            value={editorData?.name || getPackagesDetail?.package?.name}
          />
        </div>

        <div className="text-editor">
          <h3 className="title">Categories</h3>
          <Select
            style={{ width: "100%" }}
            placeholder="Select a category"
            value={
              editorData?.category_id || getPackagesDetail?.package?.category_id
            } // Pre-select based on category_id
            onChange={(value) => handleChange("category_id", value)} // Updated to handle single value
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
              value={
                editorData?.package_night ||
                getPackagesDetail?.package?.package_night
              }
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
            <h3 className="title">Star</h3>
            <Select
              className="rating"
              value={editorData?.star || getPackagesDetail?.package?.star}
              style={{ width: "100%" }}
              options={starOption}
              onChange={(e) => handleChange("star", e)}
            />
          </div>
        </div>

        <div className="text-editor">
          <h3 className="title">DNSchedule</h3>
          <textarea
            id="textarea"
            name="textarea"
            value={
              editorData?.package_duration ||
              getPackagesDetail?.package?.package_duration
            }
            rows="4"
            cols="50"
            style={{ width: "100%" }}
            onChange={(e) => handleChange("package_duration", e.target.value)}
          />
        </div>

        <div className="text-editor">
          <h3 className="title">Info</h3>
          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={onChange}
            value={getPackagesDetail?.package?.itenary || []} // Set checked values based on existing data
          >
            <Row>
              {itineraryData.data?.map((itenary) => (
                <Col span={8} key={itenary.id}>
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
            value={
              editorData?.description || getPackagesDetail?.package?.description
            }
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
            value={
              editorData?.short_description ||
              getPackagesDetail?.package?.short_description
            }
            rows="4"
            cols="50"
            style={{ width: "100%" }}
            onChange={(e) => handleChange("short_description", e.target.value)}
          />
        </div>

        <div className="text-editor-num">
          <div className="text-editor">
            <h3 className="title">Price</h3>
            <Input
              type="number"
              value={editorData?.price || getPackagesDetail?.package?.price}
              style={{ width: "100%" }}
              onChange={(e) => handleChange("price", e.target.value)}
            />
          </div>
          <div className="text-editor">
            <h3 className="title">Discount Price</h3>
            <Input
              type="number"
              value={
                editorData?.discounted_price ||
                getPackagesDetail?.package?.discounted_price
              }
              style={{ width: "100%" }}
              onChange={(e) => handleChange("discounted_price", e.target.value)}
            />
          </div>
        </div>

        <div className="text-editor">
          <h3 className="title">Map</h3>
          <Input
            value={editorData?.map || getPackagesDetail?.package?.map}
            style={{ width: "100%" }}
            onChange={(e) => handleChange("map", e.target.value)}
          />
        </div>

        <div className="text-editor">
          <h3 className="title">Location</h3>
          <Input
            value={editorData?.location || getPackagesDetail?.package?.location}
            style={{ width: "100%" }}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        <div className="text-editor">
          <h3 className="title">Highlights</h3>
          <Editor
            value={
              editorData?.highlight || getPackagesDetail?.package?.highlight
            }
            onTextChange={(e) => handleChange("highlight", e.htmlValue)}
            style={{ height: "280px", color: "black" }}
          />
        </div>

        <div className="text-editor">
          <h3 className="title">Need to Know</h3>
          <Editor
            value={
              editorData?.need_to_know ||
              getPackagesDetail?.package?.need_to_know
            }
            onTextChange={(e) => handleChange("need_to_know", e.htmlValue)}
            style={{ height: "280px", color: "black" }}
          />
        </div>

        <div className="text-editor">
          <h3 className="title">Cancel Policy</h3>
          <Editor
            value={
              editorData?.cancel_policy ||
              getPackagesDetail?.package?.cancel_policy
            }
            onTextChange={(e) => handleChange("cancel_policy", e.htmlValue)}
            style={{ height: "280px", color: "black" }}
          />
        </div>

        <div className="text-editor">
          <h3 className="title">Inclusions</h3>
          <Editor
            value={
              editorData?.inclusion || getPackagesDetail?.package?.inclusion
            }
            onTextChange={(e) => handleChange("inclusion", e.htmlValue)}
            style={{ height: "280px", color: "black" }}
          />
        </div>

        <div className="text-editor">
          <h3 className="title">Images</h3>
          <UploadTripImg
            setFileList={setFileList2}
            fileList={
              fileList2.length > 0
                ? fileList2
                : [
                    {
                      uid: "-1", // Unique identifier
                      name: "image.png", // Image name (can be dynamically set)
                      status: "done", // Indicates the upload is complete
                      url: getPackagesDetail?.package?.image, // URL of the existing image
                    },
                  ]
            }
            length={1}
          />
        </div>

        <div className="text-editor">
          <h3 className="title">Upload Trip Images</h3>
          <UploadTripImg
            setFileList={setFileList}
            fileList={fileList}
            length={5}
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

export default EditPackageDetail;
