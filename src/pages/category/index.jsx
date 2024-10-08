import { Button, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { useDeleteCategoryMutation, useGetCategoryQuery } from "../../store/services/category";
import Pagination from "../../components/pagination/Index";
import { RiDeleteBinLine } from "react-icons/ri";

import { FaRegEdit } from "react-icons/fa";

import AreYouSure from "../../components/popUpElement/areYouSure";
import PrimaryModal from "../../common/modal";
import AddNewCategory from "../../components/popUpElement/category/AddCategory";
import EditCategory from "../../components/popUpElement/category/Edit";

let green = "green";
let geekblue = "geekblue";
let redTag = "red";
const Category = () => {
  const [searchText, setSearchText] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0)
  const [categoryData, setCategoryData] = useState({})
  const [paginationData, setPagination] = useState({
    noOfRecords: 10,
    index: 0,
    // totalPages: 1,
  });
  const  { data:getCategory,isLoading } = useGetCategoryQuery();
  const [trigg,{data:categoryDeleteResponse}]=useDeleteCategoryMutation()
  const Columns = [
    {
      title: "S.no",
      dataIndex: "sno",
      key: "sno",
      filteredValue:[searchText],
      onFilter: (value, record) =>{
        return(
          String(record.sno).toLowerCase().includes(value.toLowerCase()) || 
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.description).toLowerCase().includes(value.toLowerCase())
        )
      }
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  
  
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];
  

 

  const dataSource = getCategory?.data?.map((item,index) => {
    return {
      key:item.student_name+item?.phone,
      sno:index+1,
      name: item.name,
      description:<span style={{textTransform:"lowercase"}}>{item.name}</span> ,
      Action: (
        <div style={{ display: "flex", alignItems: "center" }}>
      
          <Tag color={geekblue} className="cursor-pointor "
           onClick={()=>{
            
            showModal(item,1)
          }}>
            <FaRegEdit/>
          </Tag>
          <Tag color={redTag} className="cursor-pointor "
           onClick={()=>{
            showModal(item,2)
           
          }}>
            <RiDeleteBinLine/>
          </Tag>
        </div>
      ),
    };
  });

  // useEffect(() => {
  //   triggerHandler(paginationData);
  // }, [paginationData?.index]);

  // useEffect(() => {
  //   if (data?.totalPages) {
  //     setPagination({
  //       ...paginationData,
  //       totalPages: data?.totalPages || 1,
  //     });
  //   }
  // }, [data]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (item,val)=>{
    setCategoryData(item)
    setModalOpenValue(val)
    setIsModalOpen(true)
  }
  const deleteStudent = () => {
    trigg({id:categoryData?._id});
  };


 
  const modalComponentObject = [
    {
      content: <AddNewCategory handleCancel={handleCancel}/>,
      label: "Add New Category",
    },
    {
      content: <EditCategory handleCancel={handleCancel} categoryData={categoryData} fun={""}/>,
      label: "Edit Student Info",
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
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComponentObject[modalOpenValue]["label"]}
        element={modalComponentObject[modalOpenValue]["content"]}
      />
      {/* <BreadCrum name={"Category"} sub={""} /> */}
<div className="wrapper">

      <Button onClick={()=> showModal("",0)} style={{background:"#fe5722",color:"white"}}>Add Category</Button>
      <div className="entries-pagination">
          <div className="show-entites">
          <div style={{ paddingLeft: "5px" }}>
          <label className="d-inline-flex align-items-center">
            Show&nbsp;
            <select
              className="custom-select-sm"
              value={paginationData.noOfRecords}
             
            >
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="2000">2000</option>
            </select>
            &nbsp;entries
          </label>
        </div>
        </div>
          <div className="search">
            <label htmlFor="#" className="search-label">Search : </label>
            <input type="search" onChange={(e)=>setSearchText(e.target.value)} className="search-bar" />
          </div>
        </div>
      {/* <div className="search-container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBlock:"10px"}}>
        <Input placeholder="Search here..." style={{width:"50%"}}/>
          
      </div> */}
      <Table dataSource={dataSource} columns={Columns} pagination={false} />;
      {/* <Pagination
        paginationData={paginationData}
        setPaginationData={setPagination}
      /> */}
</div>
    </div>
  );
};

export default Category;
