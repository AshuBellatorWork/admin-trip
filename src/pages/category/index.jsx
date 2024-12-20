import { Button, Table, Tag, message, Spin } from "antd";
import { useEffect, useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetCatQuery,
  useEditCategoryMutation, // Ensure this is imported
} from "../../store/services/category";
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
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0);
  const [categoryData, setCategoryData] = useState({});
  const [paginationData, setPagination] = useState({
    noOfRecords: 10,
    index: 0,
  });

  const { data: getCategory, isLoading, isError } = useGetCatQuery();
  const [triggerDelete, { data: categoryDeleteResponse }] =
    useDeleteCategoryMutation();
  const [triggerEdit, { data: categoryEditResponse }] =
    useEditCategoryMutation(); // Add edit mutation
  const Columns = [
    {
      title: "S.no",
      dataIndex: "sno",
      key: "sno",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.sno).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.description).toLowerCase().includes(value.toLowerCase())
        );
      },
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

  // Prepare data for the table
  const dataSource =
    getCategory?.data?.map((item, index) => ({
      key: item.id,
      sno: index + 1,
      name: item.name,
      description: (
        <span style={{ textTransform: "lowercase" }}>{item.description}</span>
      ),
      Action: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Tag
            color={geekblue}
            className="cursor-pointer"
            onClick={() => showModal(item, 1)} // Show Edit Modal
          >
            <FaRegEdit />
          </Tag>
          <Tag
            color={redTag}
            className="cursor-pointer"
            onClick={() => showModal(item, 2)} // Show Delete Modal
          >
            <RiDeleteBinLine />
          </Tag>
        </div>
      ),
    })) || [];

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = (item, val) => {
    setCategoryData(item);
    setModalOpenValue(val);
    setIsModalOpen(true);
  };

  const deleteCategory = () => {
    triggerDelete({ id: categoryData?.id });
  };

  const editCategory = (updatedData) => {
    triggerEdit({ id: categoryData.id, ...updatedData }); // Call edit mutation
  };

  const modalComponentObject = [
    {
      content: <AddNewCategory handleCancel={handleCancel} />,
      label: "Add New Category",
    },
    {
      content: (
        <EditCategory
          handleCancel={handleCancel}
          categoryData={categoryData}
          onEdit={editCategory} // Pass edit function
        />
      ),
      label: "Edit Category Info",
    },
    {
      content: <AreYouSure fun={deleteCategory} />,
      label: "Are You Sure",
    },
  ];

  useEffect(() => {
    if (categoryDeleteResponse?.status) {
      message.success(categoryDeleteResponse.message);
      handleCancel();
    }
  }, [categoryDeleteResponse]);

  useEffect(() => {
    if (categoryEditResponse?.status) {
      // Check for edit response
      message.success(categoryEditResponse.message);
      handleCancel();
    }
  }, [categoryEditResponse]);

  if (isLoading) return <Spin tip="Loading..." />;

  if (isError) {
    return <div>Error loading categories.</div>;
  }

  return (
    <div>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComponentObject[modalOpenValue]["label"]}
        element={modalComponentObject[modalOpenValue]["content"]}
      />
      <div className="wrapper">
        <Button
          onClick={() => showModal("", 0)}
          style={{ background: "#fe5722", color: "white" }}
        >
          Add Category
        </Button>
        <div className="entries-pagination">
          <div className="show-entities">
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
            <label htmlFor="#" className="search-label">
              Search :
            </label>
            <input
              type="search"
              onChange={(e) => setSearchText(e.target.value)}
              className="search-bar"
            />
          </div>
        </div>
        <Table dataSource={dataSource} columns={Columns} pagination={false} />
      </div>
    </div>
  );
};

export default Category;
