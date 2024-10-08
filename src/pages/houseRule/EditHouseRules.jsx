import { useEffect, useState } from "react";
// import UploadTripImg from './uploadTripImg';
import { useGetTourCategoryQuery } from "../../store/services/tourPackages";
import { Button, Input, Select } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import { TimePicker } from 'antd';
import moment from 'moment';
import "./style.scss";
import { useAddHouseRuleMutation, useEditHouseRuleMutation, useGetHouseRuleQuery } from "../../store/services/houseRule";
import { useParams } from "react-router-dom";

const EditHouseRules = () => {
  const { id } = useParams()
  const { data: houseRuleData } = useGetHouseRuleQuery(id);
  const houseRuleDataObj = houseRuleData?.data[0]
  const [editorData, setEditorData] = useState({
    tourId: houseRuleDataObj?.tourId,
    title: houseRuleDataObj?.title,
    description: houseRuleDataObj?.description,
    check_in: houseRuleDataObj?.check_in,
    check_out: houseRuleDataObj?.check_out,
    cancellation_policy: houseRuleDataObj?.cancellation_policy,
    child_policy: houseRuleDataObj?.child_policy,
    crib_policy: houseRuleDataObj?.crib_policy,
    extra_bed_policy: houseRuleDataObj?.extra_bed_policy,
    age_restriction: houseRuleDataObj?.age_restriction,
    pets: houseRuleDataObj?.pets,
    accepted_cards: [],
  });
  const [triggre, { data }] = useEditHouseRuleMutation();
  const { data: packagesData } = useGetTourCategoryQuery();
  console.log(houseRuleData?.data[0])
  const handleChange = (name, value) => {
    setEditorData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    setEditorData((prev) => {
      return {
        ...prev,
        tourId: houseRuleDataObj?.tourId,
        title: houseRuleDataObj?.title,
        description: houseRuleDataObj?.description,
        check_in: houseRuleDataObj?.check_in,
        check_out: houseRuleDataObj?.check_out,
        cancellation_policy: houseRuleDataObj?.cancellation_policy,
        child_policy: houseRuleDataObj?.child_policy,
        crib_policy: houseRuleDataObj?.crib_policy,
        extra_bed_policy: houseRuleDataObj?.extra_bed_policy,
        age_restriction: houseRuleDataObj?.age_restriction,
        pets: houseRuleDataObj?.pets,
      }
    })
  }, [houseRuleData])

  const handleChangeCrib = (name, value) => {
    setEditorData((prev) => {
      const updatedCribPolicy = prev?.crib_policy?.map((item) => {
        // If you want to update the object based on some condition, you can put it here.
        // For now, let's update the first object in the array.
        return {
          ...item,
          // Use nested spread to update specific keys within the object
          ...{
            [name]: value,
          }
        };
      });

      return {
        ...prev,
        crib_policy: updatedCribPolicy
      };
    })
  };


  const submitHandler = () => {
    triggre(editorData)
  };

  const packageLists = packagesData?.data?.map((elm) => {
    return { value: elm?._id, label: elm?.title };

  });

  const cardLists = [
    { value: "Visa", label: "Visa" },
    { value: "Rupay", label: "Rupay" },
    { value: "Mastercard", label: "Mastercard" }
  ]


  return (
    <div className="text-editor-wrapper">
      <BreadCrum name={"Edit House Rule Details"} />

      {/* <div className="text-editor">
        <h3 className="title">Title</h3>
        <Input
          value={editorData?.title}
        onChange={(e) => handleChange("title", e.target.value)}
        />
      </div> */}
      {/* ------------------------ */}
      <div className="text-editor">
        <h3 className="title">Title</h3>
        <Input
          value={editorData?.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="text-editor">
        <h3 className="title">Description</h3>
        <Input
          value={editorData?.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>
      <div className="time">
        <div className="text-editor">
          <h3 className="title">Check In Time</h3>
          <TimePicker className="check-in"
            value={editorData.check_in ? moment(editorData.check_in, 'h:mm A') : null}
            onChange={(time, timeString) => handleChange("check_in", timeString)}
            format="h:mm A"
            use12Hours
          />
        </div>

        <div className="text-editor">
          <h3 className="title">Check Out Time</h3>
          <TimePicker className="check-in"
            value={editorData.check_out ? moment(editorData.check_out, 'h:mm A') : null}
            onChange={(time, timeString) => handleChange("check_out", timeString)}
            format="h:mm A"
            use12Hours
          />
        </div>
      </div>
      <div className="text-editor">
        <h3 className="title">Cancellation Policy</h3>
        <Input
          value={editorData?.cancellation_policy}
          onChange={(e) => handleChange("cancellation_policy", e.target.value)}
        />
      </div>
      <div className="text-editor">
        <h3 className="title">Child Policy</h3>
        <Input
          value={editorData?.child_policy}
          onChange={(e) => handleChange("child_policy", e.target.value)}
        />
      </div>
      <div className="crib-policy">
        <h3 className="title">Crib Policy</h3>
        <div className="crib-sec">

          <Input
            placeholder="Age"
            value={editorData.crib_policy?.[0].age}
            onChange={(e) => handleChangeCrib("age", e.target.value)}
          />
          <Input
            placeholder="Product"
            value={editorData.crib_policy?.[0].product}
            onChange={(e) => handleChangeCrib("product", e.target.value)}
          />
        </div>
        <Input
          placeholder="Price"
          value={editorData.crib_policy?.[0].price}
          onChange={(e) => handleChangeCrib("price", e.target.value)}
        />
      </div>









      <div className="text-editor">
        <h3 className="title">Extra Bed Policy</h3>
        <Input
          value={editorData?.extra_bed_policy}
          onChange={(e) => handleChange("extra_bed_policy", e.target.value)}
        />
      </div>
      <div className="text-editor">
        <h3 className="title">Age Restriction</h3>
        <Input
          value={editorData?.age_restriction}
          onChange={(e) => handleChange("age_restriction", e.target.value)}
        />
      </div>
      <div className="text-editor">
        <h3 className="title">Pets</h3>
        <Input
          value={editorData?.pets}
          onChange={(e) => handleChange("pets", e.target.value)}
        />
      </div>



      <div className="text-editor">
        <h3 className="title">Our Packages</h3>
        <Select
          options={packageLists}
          style={{ width: "100%" }}
          value={editorData?.tourId}
          onChange={(e) => handleChange("tourId", e)}
          placeholder="Select your packages"
        />
        ;
      </div>
      <div className="text-editor">
        <h3 className="title">Cards</h3>
        <Select
          options={cardLists}
          mode="multiple"
          style={{ width: "100%" }}
          defaultValue={editorData?.accepted_cards}
          onChange={(e) => handleChange("accepted_cards", e)}
          placeholder="Select your card"
        />
      </div>
      {/* <div className="text-editor">
                <h3 className='title'>Upload Trip Images</h3>
                <UploadTripImg setFileList={setFileList} fileList={fileList} />
            </div> */}

      <Button onClick={submitHandler}>Submit</Button>
    </div>
  );
};

export default EditHouseRules;


