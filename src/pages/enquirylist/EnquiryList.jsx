import React, { useEffect, useState } from "react";
import { Select, Table } from "antd";
import {
  useGetInquiryQuery,
  useUpdateStatusMutation,
} from "../../store/services/inquiry";
import Loader from "../../components/loader/Loader";

const EnquiryList = () => {
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState();
  const [filter, setFilter] = useState("");
  const { data: inquiriesData, isLoading, isError } = useGetInquiryQuery();
  const [trigger] = useUpdateStatusMutation();

  const option = [
    { value: "0", label: "IN PROCESS" },
    { value: "1", label: "APPROVED" },
    { value: "2", label: "REJECTED" },
  ];

  const option2 = [
    { value: "", label: "ALL" },
    { value: "IN PROCESS", label: "IN PROCESS" },
    { value: "COMPLETED", label: "APPROVED" },
    { value: "CANCELLED", label: "REJECTED" },
  ];

  const checkStatus = {
    "IN PROCESS": "IN PROCESS",
    COMPLETED: "APPROVED",
    CANCELLED: "REJECTED",
  };

  const checkStatusColor = {
    0: "yellow",
    1: "green",
    2: "red",
  };

  const Columns = [
    {
      title: "S.no",
      dataIndex: "Sno",
      key: "S.no",
      onFilter: (value, record) => record.Sno.toString().includes(value),
    },
    { title: "Full Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Activity", dataIndex: "packageName", key: "packageName" },
    { title: "No of Pack", dataIndex: "peopleInfo", key: "peopleInfo" },
    { title: "Message", dataIndex: "message", key: "message" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Action", dataIndex: "Action", key: "Action" },
  ];

  const data = inquiriesData?.data?.map((item, index) => {
    return {
      key: item._id,
      Sno: index + 1,
      name: item?.fullName,
      email: item?.email,
      phone: item?.phone_number,
      packageName: item?.package.name,
      status: (
        <p
          style={{
            whiteSpace: "nowrap",
            padding: "5px",
            borderRadius: "5px",
            textAlign: "center",
            color:
              checkStatusColor[item?.status] === "yellow" ? "black" : "white",
            background: checkStatusColor[item?.status],
          }}
        >
          {checkStatus[item?.status]}
        </p>
      ),
      message: item?.message,
      Action: (
        <Select
          options={option}
          value={checkStatus[item?.status]}
          style={{ width: "120px" }}
          onChange={(e) => setStatus({ value: e, id: item?._id })}
        />
      ),
    };
  });

  useEffect(() => {
    if (status?.value) {
      trigger(status); // Ensure status contains the right value
    }
  }, [status]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper">
          <div className="entries-pagination">
            <div className="show-entites">
              <div style={{ paddingLeft: "5px" }}>
                <label className="d-inline-flex align-items-center">
                  Show&nbsp;
                  <select className="custom-select-sm" value={""}>
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
            <div
              className="filter"
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px",
              }}
            >
              <p>Search by Status</p>
              <Select
                options={option2}
                style={{ width: "120px" }}
                onChange={(e) => setFilter(e)}
                value={filter}
              />
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
          <Table columns={Columns} dataSource={data} pagination={false} />
        </div>
      )}
    </>
  );
};

export default EnquiryList;
