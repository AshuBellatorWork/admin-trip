import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";

///styles
import "./styles.scss";
import { PrimaryButton } from "../../../common/button";

const AddDescription = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenCom, setModalOpenCom] = useState(0);
  const [trigg, { data: courseData }] = useCourseDetailsMutation();
  const { data: getCourseDetails } = useGetCourseDetailsQuery({
    id: data?._id,
  });

  const [description, setDescription] = useState({
    id: data?._id,
    courseTitle: [],
    whatWillYouLearn: [],
    courseDesc: "",
    courseTitleDesc: "",
    title: data?.title,
  });

  const teamChangeHandler = (e, index, key, type) => {
    const value = e.target.value;
    if (type === 0) {
      setDescription((prevState) => ({
        ...prevState,
        whatWillYouLearn: prevState.whatWillYouLearn.map((item, i) => {
          if (i === index) {
            // If it's the target object, update the specified key
            return {
              ...item,
              [key]: value,
            };
          }
          return item; // Otherwise, return the original object
        }),
      }));
    } else {
      setDescription((prevState) => ({
        ...prevState,
        courseTitle: prevState.courseTitle.map((item, i) => {
          if (i === index) {
            // If it's the target object, update the specified key
            return {
              ...item,
              [key]: value,
            };
          }
          return item; // Otherwise, return the original object
        }),
      }));
    }
  };

  const [error, setError] = useState({
    courseTitle: "",
    whatWillYouLearn: "",
    courseDesc: "",
    courseTitleDesc: "",
    title: false,
  });

  useEffect(() => {
    if (getCourseDetails) {
      const learn_technology = getCourseDetails?.data?.learn_technology || [];
      const courseTitle = getCourseDetails?.data?.course_content || [];

      setDescription((prevState) => ({
        ...prevState,
        whatWillYouLearn: [...prevState.whatWillYouLearn, ...learn_technology],
        courseTitle: [...prevState.courseTitle, ...courseTitle],
      }));
    }
  }, [getCourseDetails]);
  const handleSubmit = () => {
    let isSuccess = false;

    for (const key of Object.keys(description)) {
      setError((prev) => {
        return { ...prev, [key]: Boolean(!description[key]) };
      });
    }

    for (const key of Object.keys(description)) {
      const value = Boolean(description[key]);
      if (!value) {
        isSuccess = false;
        break;
      } else {
        isSuccess = true;
      }
    }

    // if (isSuccess) {
    //   trigg(description);
    // }
  };

  useEffect(() => {
    setDescription((prev) => {
      return {
        ...prev,
        courseTitleDesc: getCourseDetails?.data?.courseTitleDesc,
      };
    });
  }, [getCourseDetails]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (!value) {
      setError((prev) => {
        return {
          ...prev,
          [name]: true,
        };
      });
    } else {
      setError((prev) => {
        return {
          ...prev,
          [name]: false,
        };
      });
    }
    setDescription((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="add-course-details-con">
        <div className="add-course-left-col">
          <div className="banner-details-sec sec">
            <h3 className="title">Course Heading</h3>
            <div className="input-field">
              <label className="input-label">Description</label>
              <TextArea
                name="courseTitleDesc"
                className="add-learn-input"
                placeholder="title..."
                style={{
                  border: error?.courseTitleDesc ? "1px solid red" : "",
                }}
                value={description.courseTitleDesc}
                onChange={(e) => handleChange(e)}
              ></TextArea>
            </div>
          </div>

          <div className="what-will-you-learn-sec sec">
            <h3 className="title">What Will You Learn</h3>
            <AiOutlinePlusCircle
              onClick={() => {
                setDescription((prevState) => ({
                  ...prevState,
                  whatWillYouLearn: [
                    ...prevState.whatWillYouLearn,
                    { whatWillYouLearn: "" },
                  ],
                }));
              }}
            />
            <div className="input-field">
              <label className="input-label">Title</label>

              {description?.whatWillYouLearn?.map((item, i) => {
                return (
                  <React.Fragment key={item?.whatWillYouLearn + i}>
                    <div className="items-input">
                      <Input
                        key={"Team" + i}
                        style={{
                          border: error?.whatWillYouLearn
                            ? "1px solid red"
                            : "",
                        }}
                        placeholder="input placeholder"
                        value={item?.whatWillYouLearn}
                        name="whatWillYouLearn"
                        className="add-learn-input"
                        onChange={(e) =>
                          teamChangeHandler(e, i, "whatWillYouLearn", 0)
                        }
                      />
                      <AiOutlineMinusCircle onClick={() => {}} />
                      {/* {i !== 0 ? (
                      
                      ) : (
                       
                      )} */}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
        <div className="add-course-right-col">
          <div className="course-content-sec sec">
            <div className="heading">
              <h3 className="title">Course Content</h3>
              <PrimaryButton
                name="Add Courses"
                bg={"#6E61E4"}
                fontClr="white"
                fun={showModal}
                setModalOpenCom={setModalOpenCom}
              />
            </div>
            {description?.courseTitle?.map((item, i) => {
              return (
                <>
                  <div className="input-field">
                    <label className="input-label">Title</label>
                    <div className="title">
                      <Input
                        placeholder="Title"
                        name="courseTitle"
                        value={item?.courseTitle}
                        style={{
                          border: error?.courseTitle ? "1px solid red" : "",
                        }}
                        onChange={(e) =>
                          teamChangeHandler(e, i, "courseTitle", 1)
                        }
                      />
                    </div>
                    <div className="input-field">
                      <label className="input-label">Description</label>
                      <TextArea
                        name="courseDesc"
                        value={item?.courseDesc}
                        className="add-Course-Content-input"
                        placeholder="description..."
                        style={{
                          border: error?.courseDesc ? "1px solid red" : "",
                        }}
                        onChange={(e) =>
                          teamChangeHandler(e, i, "courseDesc", 1)
                        }
                      ></TextArea>
                    </div>
                  </div>

                  <AiOutlineMinusCircle onClick={() => {}} />
                </>
              );
            })}
          </div>
        </div>
      </div>
      <Button
        onClick={() => handleSubmit()}
        className="btn-submit-course-details ant-btn"
        type="button"
        style={{ marginTop: "15px" }}
      >
        Submit
      </Button>
    </>
  );
};

export default AddDescription;
