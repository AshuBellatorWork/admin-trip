import { Button, Image, Input, Table, Tag } from "antd";
import { BreadCrum } from "../../components/breadCrume";
import { useEffect, useState } from "react";

import { useGetCategoryQuery } from "../../store/services/category";
import Pagination from "../../components/pagination/Index";
import { Columns } from "./TableColums";


// import { useGetTourPackagesQuery } from "../../store/services/tourPackages";
import { useGetTourCategoryQuery } from "../../store/services/tourPackages";
import { Link } from "react-router-dom";
import { addHouseRuleRoute, addPackageDetail, editHouseRuleRoute } from "../../routes/PagesRoutes";


let geekblue = "geekblue";
const HouseRule = () => {

  const [paginationData, setPagination] = useState({
    noOfRecords: 10,
    index: 0,
    // totalPages: 1,
  });
  const { data } = useGetCategoryQuery();


  const { data: getTourPackages } = useGetTourCategoryQuery()

  const dataSource = getTourPackages?.data?.map((item) => {
    return {
      key: item.student_name + item?.phone,
      Images: (
        <Image
          width={50}
          height={50}
          style={{ borderRadius: "100px" }}
          src={item?.image}
        />
      ),
      title: item.title,
      description: item.description,
      Action: (
        <div style={{ display: "flex", alignItems: "center" }}>


          {/* <Link to={`/house-rule/${item?._id}`}>
          <Tag color={geekblue} className="cursor-pointor">
            Check House Rule
          </Tag>
            </Link> */}
          <Link to={`/edit-house-rule/${item?._id}`}>
            <Tag color={geekblue} className="cursor-pointor">
              Update Detail
            </Tag>
          </Link>
          {/* <Tag color={geekblue} className="cursor-pointor "
           onClick={()=>{
            
            showModal(item,1)
          }}>
            Edit
          </Tag> */}
          {/* <Tag color={redTag} className="cursor-pointor "
           onClick={()=>{
            showModal(item,2)
           
          }}>
            Delete
          </Tag> */}
        </div>
      ),
    };
  });

  // useEffect(() => {
  //   triggerHandler(paginationData);
  // }, [paginationData?.index]);

  useEffect(() => {
    if (data?.totalPages) {
      setPagination({
        ...paginationData,
        totalPages: data?.totalPages || 1,
      });
    }
  }, [data]);







  return (
    <div>

      <BreadCrum name={"House Rule Detail"} sub={"Package Section"} />
      <div className="search-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBlock: "10px" }}>
        <Input placeholder="Search here..." style={{ width: "50%" }} />
        <Link to={addHouseRuleRoute}>
          <Button >Add House Rule Detail</Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={Columns} pagination={false} />;
      <Pagination
        paginationData={paginationData}
        setPaginationData={setPagination}
      />
    </div>
  );
};

export default HouseRule;


