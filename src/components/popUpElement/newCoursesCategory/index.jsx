import { Select, Space, message } from "antd";
import {
  useAddNewCourseCategoryMutation
} from "../../../store/services/courseCategories";
import { useCourseGetCategorySkillQuery } from "../../../store/services/courseCategorySkills";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../common/button";
import { useParams } from "react-router-dom";

const NewCoursesCategory = ({ setIsModalOpen }) => {
  const { id } = useParams();
  const [filterSkill, setFilterSkill] = useState([]);

  const { data: getCourseSkills } = useCourseGetCategorySkillQuery();
  const [trigger, { data: addNewCourseCategory }] =
    useAddNewCourseCategoryMutation();

  const handleChange = (e) => {
    const newArray = [...e];
    setFilterSkill(newArray);
  };

  const options2 = getCourseSkills?.data?.map((elm) => {
    return {
      label: elm?.title,
      value: elm?._id,
    };
  });

  const handleClick = () => {
    const data = {
      category: id,
      skill: filterSkill,
    };
    trigger(data);
  };

  useEffect(() => {
    if (addNewCourseCategory?.success) {
      setIsModalOpen(false);
      message.success(addNewCourseCategory?.message);
    }
  }, [addNewCourseCategory, setIsModalOpen]);

  return (
    <>
      {/* <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label htmlFor="">Category :</label>
        <Select options={options} defaultValue={"Select category"} onChange={handleChange2}/>
      </div> */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <label htmlFor="">Select Skills :</label>
        <Select
          mode="multiple"
          style={{
            width: "100%",
          }}
          placeholder="select Skill"
          defaultValue={[]}
          onChange={(e) => handleChange(e)}
          optionLabelProp="label"
          options={options2}
          optionRender={(option) => <Space>{option.data.label}</Space>}
        />

        <PrimaryButton
          name={"Submit"}
          bg={"#6E61E4"}
          fontClr="white"
          fun={handleClick}
        />
      </div>
    </>
  );
};

export default NewCoursesCategory;
