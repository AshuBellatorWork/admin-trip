import { Button, Image, Input, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import Pagination from "../../components/pagination/Index";
import { Columns } from "./TableColums";
import AreYouSure from "../../components/popUpElement/areYouSure";
import PrimaryModal from "../../common/modal";
import EditTourPackages from "../../components/popUpElement/tourPakcages/EditTourPackages";
import AddFav from "../../components/popUpElement/fav/AddFav";
import { useDeleteFavTourMutation, useGetFavTourQuery } from "../../store/services/fav";
import Loader from "../../components/loader/Loader";

// import { BreadCrum } from "../../components/breadCrume";
// import { useDeleteCategoryMutation, useGetCategoryQuery } from "../../store/services/category";

// import AddTourPackages from "../../components/popUpElement/tourPakcages/AddTourPackages"
// import { useGetTourPackagesQuery } from "../../store/services/tourPackages";
// import { useGetTourCategoryQuery } from "../../store/services/tourPackages";

// let green = "green";
// let geekblue = "geekblue";
let redTag = "red";
const Favourite = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0)
  const [tourPackageData, setTourPackageData] = useState({})
  const [paginationData, setPagination] = useState({
    noOfRecords: 10,
    index: 0,
    // totalPages: 1,
  });
//   const  { data } = useGetCategoryQuery();
  const [trigg,{data:categoryDeleteResponse}]=useDeleteFavTourMutation()



const {data:getTourPackages,isLoading} = useGetFavTourQuery()

  const dataSource = getTourPackages?.data != null && getTourPackages?.data?.map((item) => {
    return {
      key:item?.image,
      Images: (
        <Image
          width={50}
          height={50}
          style={{ borderRadius: "100px" }}
          src={item?.images}
        />
      ),
      name:item?.name,
      description: item?.description,
      Action: (
        <div style={{ display: "flex", alignItems: "center" }}>
      
          {/* <Tag color={geekblue} className="cursor-pointor "
           onClick={()=>{
            
            showModal(item,1)
          }}>
            Edit
          </Tag> */}
          <Tag color={redTag} className="cursor-pointor "
           onClick={()=>{
            showModal(item,2)
           
          }}>
            Delete
          </Tag>
        </div>
      ),
    };
  });

  // useEffect(() => {
  //   triggerHandler(paginationData);
  // }, [paginationData?.index]);

  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (item,val)=>{
    setTourPackageData(item)
    setModalOpenValue(val)
    setIsModalOpen(true)
  }
  const deleteStudent = () => {
    trigg({tourId:tourPackageData?._id});
  };


  const modalComponentObject = [
    {
      content: <AddFav handleCancel={handleCancel} data={[]}/>,
      label: "Add Fav",
    },
    {
      content: <EditTourPackages getCategory={[]} handleCancel={handleCancel} data={tourPackageData} fun={""}/>,
      label: "Edit Tour Package",
    },
    {
      content: <AreYouSure fun={deleteStudent} />,
      label: "Are You Sure",
    },
   
  ];
  useEffect(() => {
    if(categoryDeleteResponse?.status){
      message.success(categoryDeleteResponse.message)
      // triggerHandler(paginationData)
      handleCancel()
    }
  }, [categoryDeleteResponse])
  
  return (
    <div>
      {isLoading ? <Loader/>:
      <>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComponentObject[modalOpenValue]["label"]}
        element={modalComponentObject[modalOpenValue]["content"]}
      />
      {/* <BreadCrum name={"Favourite"} sub={""} /> */}
      {/* <div className="search-container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBlock:"10px"}}>
        <Input placeholder="Search here..." style={{width:"50%"}}/>
          <Button onClick={()=> showModal("",0)}>Add New Packages</Button>
      </div> */}
      <Table dataSource={dataSource} columns={Columns} pagination={false} />;
      {/* <Pagination
        paginationData={paginationData}
        setPaginationData={setPagination}
      /> */}
      </>
      }
    </div>
  );
};

export default Favourite;


