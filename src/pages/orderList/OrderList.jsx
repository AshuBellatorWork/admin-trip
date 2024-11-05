import React, { useEffect, useState, useMemo } from "react";
import { Select, Table, Button } from "antd";
import { useUpdateStatusMutation } from "../../store/services/inquiry";
import { useGetOrderQuery } from "../../store/services/orderList"; // Adjusted import
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [state, setState] = useState({
    status: "",
    filter: "",
    searchText: "",
  });

  const { data: ordersData, isLoading, isError } = useGetOrderQuery(); // Updated query hook
//console.log(ordersData, "data"); //
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
  const checkStatusColor = { 0: "yellow", 1: "green", 2: "red" };

  const Columns = [
    {
      title: "S.no",
      dataIndex: "Sno",
      key: "Sno",
      filteredValue: [state.searchText],
      onFilter: (value, record) => {
        const { Sno, name, member, status } = record;
        const searchValue = value.toLowerCase();
        return [Sno, name, member, status.props.children].some((field) =>
          String(field).toLowerCase().includes(searchValue)
        );
      },
    },
    { title: "Full Name", dataIndex: "name", key: "name" },
    { title: "Member", dataIndex: "member", key: "member" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Action", dataIndex: "Action", key: "Action" },
  ];

  const data = useMemo(() => {
    return ordersData?.data?.map((item, index) => ({
      key: item.id,
      Sno: index + 1,
      name: `${item?.first_name} ${item?.last_name}`,
      member: item?.member,
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
      Action: (
        <Select
          options={option}
          value={checkStatus[item?.status]}
          style={{ width: "120px" }}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              status: { value: e, id: item?.id },
            }))
          }
        />
      ),
    }));
  }, [ordersData]);

  useEffect(() => {
    if (state.status?.id) {
      trigger(state.status);
    }
  }, [state.status]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper">
          <Link to={"/add-order/"}>
            <Button style={{ background: "#fe5722", color: "white" }}>
              Add Order
            </Button>
          </Link>
          <div className="entries-pagination">
            <div className="show-entites">
              <label className="d-inline-flex align-items-center">
                Show&nbsp;
                <select className="custom-select-sm">
                  <option value="100">100</option>
                  <option value="250">250</option>
                  <option value="500">500</option>
                  <option value="1000">1000</option>
                  <option value="2000">2000</option>
                </select>
                &nbsp;entries
              </label>
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
                onChange={(e) => setState((prev) => ({ ...prev, filter: e }))}
              />
            </div>
            <div className="search">
              <label htmlFor="#" className="search-label">
                Search :{" "}
              </label>
              <input
                type="search"
                className="search-bar"
                onChange={(e) =>
                  setState((prev) => ({ ...prev, searchText: e.target.value }))
                }
              />
            </div>
          </div>
          <Table columns={Columns} dataSource={data} pagination={false} />
        </div>
      )}
    </>
  );
};

export default OrderList;
