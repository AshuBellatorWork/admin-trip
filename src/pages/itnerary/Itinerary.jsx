import React, { useEffect, useState } from 'react'
import { Button, message, Select, Space, Table, Tag } from 'antd';
import { Columns } from './TableColums';
import { useDeleteItineraryMutation, useGetItineraryQuery } from "../../store/services/itinerary"
import { Link, useParams } from 'react-router-dom';
import PrimaryModal from '../../common/modal';
import AddItineary from './AddItineary';
import Edititenary from './Edititenary';

import AreYouSure from '../../components/popUpElement/areYouSure';
import { RiDeleteBinLine } from "react-icons/ri";

import { FaRegEdit } from "react-icons/fa";
let green = "green";
let geekblue = "geekblue";
let redTag = "red";
const Itinerary = () => {
  const { id } = useParams()
  const [status, setStatus] = useState()
  const { data: enquiryListDara } = useGetItineraryQuery(id)
  const [trigger, { data: deleteItenData }] = useDeleteItineraryMutation()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpenValue, setModalOpenValue] = useState(0)
  const [itenaryData, setItenaryData] = useState({})
  // const [trigger,{data:updateStatusData}] = useUpdateStatusMutation()
  const option = [{
    value: "IN PROCESS",
    label: "IN PROCESS"
  }, {
    value: "COMPLETED",
    label: "APPROVED"
  },
  {
    value: "CANCELLED",
    label: "REJECTED"
  }]
  const checkStatus = {
    "IN PROCESS": "IN PROCESS",
    COMPLETED: "APPROVED",
    CANCELLED: "REJECTED"
  }
  const data = enquiryListDara?.data?.map((item, index) => {
    return {
      key: item.day,
      Sno: index + 1,
      day: item?.day,
      title: item?.title,
      content: item?.content,

      Action: <div style={{ display: "flex", alignItems: "center" }}>



        <Tag color={geekblue} className="cursor-pointor "
          onClick={() => {
            showModal(item, 1)

          }}  >
          <FaRegEdit />
        </Tag>
        <Tag color={redTag} className="cursor-pointor "
          onClick={() => {
            showModal(item, 2)

          }}>
          <RiDeleteBinLine />
        </Tag>
      </div>,
    }
  })
  const deleteItenary = () => {
    trigger(itenaryData?._id)
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalComponentObject = [
    {
      content: <AddItineary handleCancel={handleCancel} data={data} id={id} />,
      label: "Add Itinerary",
    },
    {
      content: <Edititenary data={itenaryData} handleCancel={handleCancel} fun={""} />,
      label: "Edit Tour Package",
    },
    {
      content: <AreYouSure fun={deleteItenary} />,
      label: "Are You Sure",
    },

  ];
  const showModal = (item, val) => {
    setItenaryData(item)
    setModalOpenValue(val)
    setIsModalOpen(true)
  }

  useEffect(() => {
    if (deleteItenData?.status) {
      message.success(deleteItenData?.message)
      handleCancel()
    }
  }, [deleteItenData])
  return (
    <>
      <PrimaryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        title={modalComponentObject[modalOpenValue]["label"]}
        element={modalComponentObject[modalOpenValue]["content"]}
      />
      <div className='wrapper'>
        <Button onClick={() => {
          showModal("hh", 0)

        }}  >Add Itinearay</Button>
        <div className="entries-pagination">
          <div className="show-entites">
            <div style={{ paddingLeft: "5px" }}>
              <label className="d-inline-flex align-items-center">
                Show&nbsp;
                <select
                  className="custom-select-sm"
                  value={""}

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
            <input type="text" className="search-bar" />
          </div>
        </div>
        <Table columns={Columns} dataSource={data} pagination={false} />;
      </div>
    </>

  )
}

export default Itinerary


