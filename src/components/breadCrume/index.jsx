import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { dashBoardRoute } from "../../routes/PagesRoutes";
////styles
import "./styles.scss";
export const BreadCrum = ({ name, sub }) => {
  return (
    <>
      <div className="bread-crum-Container">
        <div className="left-bread-crum">
          <h4>{name}</h4>
        </div>
        <div className="right-bread-crum">
          <Link to={dashBoardRoute}>
            <IoMdHome />
          </Link>
          / {sub && ` ${sub} /`}
          <Link to={"/"}>{name}</Link>
        </div>
      </div>
    </>
  );
};
