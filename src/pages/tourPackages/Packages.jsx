import { Button, Image, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { FaRoute } from "react-icons/fa";

import { useGetCategoryQuery } from "../../store/services/category";

import AreYouSure from "../../components/popUpElement/areYouSure";
import PrimaryModal from "../../common/modal";
import AddTourPackages from "../../components/popUpElement/tourPakcages/AddTourPackages"
// import { useGetTourPackagesQuery } from "../../store/services/tourPackages";
import EditTourPackages from "../../components/popUpElement/tourPakcages/EditTourPackages";
import { useDeleteTourPackageMutation, useGetTourCategoryQuery } from "../../store/services/tourPackages";
import {
  useGetPackagesQuery,
  useDeletePackageMutation,
} from "../../store/services/package";

import { Link } from "react-router-dom";
import "./style.scss";
import Loader from '../../components/loader/Loader';

import { RiDeleteBinLine } from "react-icons/ri";

import { FaRegEdit } from "react-icons/fa";
let green = "green";
let geekblue = "geekblue";
let redTag = "red";
const Packages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0);
  const [tourPackageData, setTourPackageData] = useState({});
  const [searchText, setSearchText] = useState("");
  const [paginationData, setPagination] = useState({
    noOfRecords: 10,
    index: 0,
    // totalPages: 1,
  });
  const { data, isLoading } = useGetCategoryQuery();
  const [trigg, { data: categoryDeleteResponse }] =
    useDeleteTourPackageMutation();

  const Columns = [
    {
      title: "Sno",
      dataIndex: "sno",
      key: "sno",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          String(record.sno).toLowerCase().includes(value.toLowerCase()) ||
          String(record.category).toLowerCase().includes(value.toLowerCase()) ||
          String(record.packageName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.packageName.props.children)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Image",
      dataIndex: "Images",
      key: "Images",
    },
    {
      title: "Package Name",
      dataIndex: "packageName",
      key: "packageName",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];

  const { data: getTourPackages } = useGetPackagesQuery();
  // console.log(getTourPackages);

  const dataSource = getTourPackages?.data
    ?.map((item, index) => {
      // Safely handle missing or invalid 'item' or its properties
      return {
        key: (item?.student_name || "") + (item?.phone || ""), // Safely create key
        sno: index + 1,
        Images: (
          <Image
            width={50}
            height={50}
            style={{ borderRadius: "100px" }}
            src={`${item?.localPath}/${item?.image}`}
          />
        ),
        packageName: (
          <Link to={`/edit-package-detail/${item?.id}`}>
            {item?.name || "No Name"} {/* Use a fallback value */}
          </Link>
        ),
        category: item?.category?.name || "Unknown Category", // Safely handle missing category
        Action: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to={`/itinerary/${item?.id}`}>
              <Tag color={geekblue} className="cursor-pointor">
                <FaRoute />
              </Tag>
            </Link>

            <Link to={`/edit-package-detail/${item?.id}`}>
              <Tag color={geekblue} className="cursor-pointor ">
                <FaRegEdit />
              </Tag>
            </Link>
            <Tag
              color={redTag}
              className="cursor-pointor "
              onClick={() => {
                showModal(item, 2);
              }}
            >
              <RiDeleteBinLine />
            </Tag>
          </div>
        ),
      };
    })
    .filter(Boolean); // Remove null or invalid items from the array

  useEffect(() => {
    if (data?.totalPages) {
      setPagination({
        ...paginationData,
        totalPages: data?.totalPages || 1,
      });
    }
  }, [data]);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (item, val) => {
    setTourPackageData(item);
    setModalOpenValue(val);
    setIsModalOpen(true);
  };
  const [triger, { data: deleteData }] = useDeletePackageMutation();
  // console.log(deleteData);
  const deletePackage = () => {
    triger({ id: tourPackageData?.id });
  };

  const modalComponentObject = [
    {
      content: <AddTourPackages handleCancel={handleCancel} data={data} />,
      label: "Add Tour Package",
    },
    {
      content: (
        <EditTourPackages
          getCategory={data}
          handleCancel={handleCancel}
          data={tourPackageData}
          fun={""}
        />
      ),
      label: "Edit Tour Package",
    },
    {
      content: <AreYouSure fun={deletePackage} />,
      label: "Are You Sure",
    },
  ];
  useEffect(() => {
    if (deleteData?.status || deleteData?.success) {
      message.success("Package deleted successfully.");
      handleCancel();
    }
  }, [deleteData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <PrimaryModal
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            title={modalComponentObject[modalOpenValue]["label"]}
            element={modalComponentObject[modalOpenValue]["content"]}
          />
          <div className="wrapper">
            <Link to={"/add-package-detail/"}>
              <Button style={{ background: "#fe5722", color: "white" }}>
                Add Packages
              </Button>
            </Link>
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
                <label htmlFor="#" className="search-label">
                  Search :{" "}
                </label>
                <input
                  type="search"
                  className="search-bar"
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
            <Table
              dataSource={dataSource}
              columns={Columns}
              pagination={false}
            />
            ;
          </div>
        </div>
      )}
    </>
  );
};

export default Packages;
