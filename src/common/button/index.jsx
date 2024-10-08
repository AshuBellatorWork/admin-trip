import { Button } from "antd";
///styles
import "./styles.scss";
export const PrimaryButton = ({
  name,
  bg,
  fontClr,
  fun,
  setModalOpenCom,
  val,
  btnType,
  btnFuncType,
}) => {
  return (
    <>
      <Button
        style={{ background: bg, color: fontClr, border: "none" }}
        onClick={() => {
          fun(val);
          setModalOpenCom(0);
        }}
        type={btnType}
        htmlType={btnFuncType}
      >
        {name}
      </Button>
    </>
  );
};

export const SecondaryButton = ({ name, fun }) => {
  return (
    <>
      <Button
        className="secondary-btn"
        onClick={() => {
          fun();
        }}
      >
        {name}
      </Button>
    </>
  );
};
