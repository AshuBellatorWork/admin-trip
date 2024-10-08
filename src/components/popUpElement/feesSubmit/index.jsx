import { Input } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../../../common/button";
import { toast } from "react-toastify";
import { usePayFeesMutation } from "../../../store/services/payFees";

///styles
import "./styles.scss";
const FeesSubmitPop = ({ stdUserId, setIsModalOpen }) => {
  const [formData, setFormData] = useState({
    userId: stdUserId?.userId || "",
    fee: "",
    roll_no: stdUserId?.roll_no,
    submittedBy: "Admin",
    student_name: stdUserId?.student_name,
  });
  const [feesAmountError, setFeesAmountError] = useState(false);
  const [feeStatusCheck, setFeeStatusCheck] = useState(
    stdUserId?.monthly_fee * stdUserId?.fee_Delay
  );

  const [trigger, { data:paidFee }] = usePayFeesMutation();

  const amountHandler = (value) => {
    setFeeStatusCheck(value);
  };
  const submitFormData = () => {
    if (!formData?.fee) {
      setFeesAmountError(true);
      toast.error("Please Enter Amount"); //checking empty fields
    } else {
      setFeesAmountError(false);
      trigger({
        userId: stdUserId?.userId,
        id: stdUserId?._id,
        studentPaidFee:formData?.fee,
      });
    }
  };

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        ["fee"]: feeStatusCheck,
      };
    });
  }, [feeStatusCheck]);

  return (
    <div className="popup-container">
      <div className="pending-fees-top-col">
        {/* <img src={card} alt="" /> */}
        <label>Student Name</label>
        <Input placeholder={stdUserId?.student_name} disabled />
        <label>Last Fees</label>
        <Input
          placeholder={moment(stdUserId?.fees_Date).format("DD-MM-YYYY hh:mm")}
          disabled
        />
        <label>Fees Delay</label>
        <Input placeholder={stdUserId?.fee_Delay} disabled />
        <label>Monthly Fees</label>
        <Input placeholder={stdUserId?.monthly_fee} type="number" disabled />
        <label>Total Fees</label>
        <Input
          placeholder={
            stdUserId?.monthly_fee * stdUserId?.fee_Delay - formData.fee || "0"
          }
          type="number"
          disabled
        />
        <label>Enter Fees</label>
        <Input
          placeholder="Enter Fees"
          value={formData?.fee}
          type="number"
          style={{
            border: feesAmountError ? "1px solid red" : "",
          }}
          onChange={(e) => amountHandler(e.target.value * stdUserId?.fee_Delay)}
        />
      </div>
      <div className="pending-fees-bottom-col">
        <PrimaryButton
          name={"Submit"}
          bg="#6E60E4"
          fontClr="white"
          fun={submitFormData}
        />
      </div>
    </div>
  );
};

export default FeesSubmitPop;
