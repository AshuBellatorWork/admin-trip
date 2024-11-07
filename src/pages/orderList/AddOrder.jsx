import { useState, useEffect } from "react";
import { useAddOrderMutation } from "../../store/services/orderList"; // Import your mutation from the correct service
import { Button, Input, Select, message } from "antd";

import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const AddOrder = () => {
  // Initialize state with only the required form fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    package_id: "",
    member: "",
    total_price: "",
    status: "",
    visa: "", // Additional field for visa information
  });

  // Destructure the mutation hook for adding an order
  const [trigger, { data: addData, isLoading }] = useAddOrderMutation();
  const navigate = useNavigate(); // For navigation after successful order

  // Side effect to handle the response after submission
  useEffect(() => {
    if (addData?.status || addData?.success) {
      message.success(addData.message);
      navigate("/order-list"); // Redirect to the order list page after successful submission
    }
  }, [addData, navigate]);

  // Handle input field changes
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const submitHandler = () => {
    // Validate required fields
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.package_id ||
      !formData.member ||
      !formData.total_price ||
      !formData.status
    ) {
      return message.error("Please fill all required fields.");
    }

    // Trigger the mutation to add the order
    trigger(formData);
  };

  // Define the options for status dropdown (adjust as necessary)
  const statusOptions = [
    { value: "0", label: "IN PROCESS" },
    { value: "1", label: "APPROVED" },
    { value: "2", label: "REJECTED" },
  ];

  return (
    <>
      {isLoading ? (
        <Loader /> // Show a loader while the request is in progress
      ) : (
        <div className="add-order-form">
          <h2>Add Order</h2>

          {/* First Name */}
          <div className="input-field">
            <h3 className="label">First Name</h3>
            <Input
              type="text"
              style={{ width: "100%" }}
              value={formData.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div className="input-field">
            <h3 className="label">Last Name</h3>
            <Input
              type="text"
              style={{ width: "100%" }}
              value={formData.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
            />
          </div>

          {/* Package ID */}
          <div className="input-field">
            <h3 className="label">Package ID</h3>
            <Input
              type="text"
              style={{ width: "100%" }}
              value={formData.package_id}
              onChange={(e) => handleChange("package_id", e.target.value)}
            />
          </div>

          {/* Member Count */}
          <div className="input-field">
            <h3 className="label">Member</h3>
            <Input
              type="number"
              style={{ width: "100%" }}
              value={formData.member}
              onChange={(e) => handleChange("member", e.target.value)}
            />
          </div>

          {/* Total Price */}
          <div className="input-field">
            <h3 className="label">Total Price</h3>
            <Input
              type="number"
              style={{ width: "100%" }}
              value={formData.total_price}
              onChange={(e) => handleChange("total_price", e.target.value)}
            />
          </div>

          {/* Status */}
          <div className="input-field">
            <h3 className="label">Status</h3>
            <Select
              style={{ width: "100%" }}
              value={formData.status}
              onChange={(value) => handleChange("status", value)}
            >
              {statusOptions.map((option) => (
                <Select.Option key={option.value} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          </div>

          {/* Visa Information */}
          <div className="input-field">
            <h3 className="label">Visa Information</h3>
            <Input
              type="text"
              style={{ width: "100%" }}
              value={formData.visa}
              onChange={(e) => handleChange("visa", e.target.value)}
            />
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
