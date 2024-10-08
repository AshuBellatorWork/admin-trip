import { Button, Input, Table, } from "antd";
import { useState } from "react";
// import { BreadCrum } from "../../components/breadCrume";
import Pagination from "../../components/pagination/Index";
import { Columns } from "./Columns";
import { useGetFeedbackQuery } from "../../store/services/feedback";
import Loader from "../../components/loader/Loader";


const Feedback = () => {
  const [paginationData, setPagination] = useState({
    noOfRecords: 10,
    index: 0,
    // totalPages: 1,
  });
  const { data,isLoading } = useGetFeedbackQuery()

  const dataSource = data?.feedbacks?.map((item) => {
    return {
      key: item.id,
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,

    }
  })

  return (
    <div>
      {isLoading?<Loader/>:
     <>
      <Table dataSource={dataSource} columns={Columns} pagination={false} />;
     </>
        }
      {/* <Pagination
        paginationData={paginationData}
        setPaginationData={setPagination}
        /> */}
    </div>
  )
}
export default Feedback