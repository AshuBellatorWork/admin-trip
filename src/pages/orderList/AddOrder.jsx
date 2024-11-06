import { useState, useEffect } from "react";
import { useAddPackageMutation } from "../../store/services/addTourDetail"; // Use correct import for mutation
import { Button, Input, Select, message } from "antd";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const AddOrder = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    package_id: "",
    member: "",
    total_price: "",
    status: "",
  });

  const [triggre, { data: addData, isLoading }] = useAddPackageMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (addData?.status || addData?.success) {
      message.success(addData.message);
      navigate("/orders"); // Redirect on success
    }
  }, [addData, navigate]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = () => {
    if (!formData.first_name || !formData.last_name || !formData.package_id) {
      return message.error("Please fill all required fields.");
    } else {
      triggre(formData);
    }
  };

  const statusOptions = [
    { value: "0", label: "IN PROCESS" },
    { value: "1", label: "APPROVED" },
    { value: "2", label: "REJECTED" },
  ];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="add-order-form">
          <h2>Add Order</h2>

          {/* First Name */}
          <div className="input-field">
            <h3 className="label">First Name</h3>
            <Input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => handleChange("first_name", e.target.value)}
              value={formData.first_name}
            />
          </div>

          {/* Last Name */}
          <div className="input-field">
            <h3 className="label">Last Name</h3>
            <Input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => handleChange("last_name", e.target.value)}
              value={formData.last_name}
            />
          </div>

          {/* Package ID */}
          <div className="input-field">
            <h3 className="label">Package ID</h3>
            <Input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => handleChange("package_id", e.target.value)}
              value={formData.package_id}
            />
          </div>

          {/* Member */}
          <div className="input-field">
            <h3 className="label">Member</h3>
            <Input
              type="number"
              style={{ width: "100%" }}
              onChange={(e) => handleChange("member", e.target.value)}
              value={formData.member}
            />
          </div>

          {/* Total Price */}
          <div className="input-field">
            <h3 className="label">Total Price</h3>
            <Input
              type="number"
              style={{ width: "100%" }}
              onChange={(e) => handleChange("total_price", e.target.value)}
              value={formData.total_price}
            />
          </div>

          {/* Status */}
          <div className="input-field">
            <h3 className="label">Status</h3>
            <Select
              style={{ width: "100%" }}
              onChange={(value) => handleChange("status", value)}
              value={formData.status}
            >
              {statusOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </div>

          {/* Submit Button */}
          <Button onClick={submitHandler} type="primary">
            Submit
          </Button>
        </div>
      )}
    </>
  );
};

export default AddOrder;


