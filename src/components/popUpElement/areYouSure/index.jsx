import { PrimaryButton, SecondaryButton } from "../../../common/button";
///styles
import "./styles.scss";
const AreYouSure = ({ fun }) => {
  return (
    <div>
      <p>Are You Sure</p>
      <div className="are-you-sure-submit-btn">
        <SecondaryButton name="Continue" fun={fun} />
      </div>
    </div>
  );
};

export default AreYouSure;
