import { Outlet } from "react-router-dom";
import loginImg from "../../assets/img/login.svg";
///styles
import "./styles.scss";
const LoginLayout = () => {


  return (
    <>
      <div className="login-container">
        <div className="login-center-col">
          <div
            className="login-center-left-col"
          
          >
            <Outlet />
          </div>
          <div className="login-center-right-col">
            <img src={loginImg} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginLayout;
