import { Button, Result } from "antd";

const UserCredentialModal = ({ data, setIsModalOpen }) => {
  return (
    <div>
      <Result
        status="success"
        title={data?.data?.userID}
        subTitle={data?.data?.password}
        extra={[
          <Button key="ok" onClick={() => setIsModalOpen(false)}>
            Ok
          </Button>,
        ]}
      />
    </div>
  );
};

export default UserCredentialModal;
