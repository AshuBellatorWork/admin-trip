import React, { useEffect, useState } from 'react'
import { useEditPackageDetailsMutation, useGetPackageMutation } from '../../../store/services/addTourDetail'
import { Editor } from "primereact/editor";
import { Button, Input, Select } from 'antd';
import UploadTripImg from '../../../pages/addPackageDetail/uploadTripImg';
import { BreadCrum } from '../../breadCrume';
import { useParams } from 'react-router-dom';

const EditPackageDetails = () => {
    const [editFormData, setEditFormData] = useState();
    const [trigger, { data }] = useEditPackageDetailsMutation()
    const [trigg, { data: getPackageDetails }] = useGetPackageMutation()

    const { id } = useParams()

    const [editorData, setEditorData] = useState({
        tourId: "",
        highlights: "",
        needToKnow: "",
        canclePolicy: "",
        inclusions: "",
        images: []
    })
    const handleChange = () => {
        console.log("first")
    }

    const submitHandler = () => {
        console.log("s")
    }


    console.log(getPackageDetails);
    useEffect(() => {
        trigg({
            tourId: id
        })
    }, [])

    useEffect(() => {
        const filterGetPackageDetails = getPackageDetails?.data?.find((elm) => elm?.tourId?._id == id);
        console.log(filterGetPackageDetails);
    }, [getPackageDetails])

    return (
        <div className='text-editor-wrapper'>
            <BreadCrum name={"Edit Package Details"} sub={"Package Section"} />
            <div className="search-container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBlock: "10px" }}>
                <Input placeholder="Search here..." style={{ width: "50%" }} />
                <Button>Add New Category</Button>
            </div>
            <div className="text-editor">
                <Editor value={editorData?.highlights} onTextChange={(e) => handleChange("highlights", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>

            <div className="text-editor">
                <h3 className='title'>Need to know</h3>
                <Editor value={editorData?.needToKnow} onTextChange={(e) => handleChange("needToKnow", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>

            <div className="text-editor">
                <h3 className='title'>Cancel policy</h3>
                <Editor value={editorData?.canclePolicy} onTextChange={(e) => handleChange("canclePolicy", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>

            <div className="text-editor">
                <h3 className='title'>Inclusions</h3>
                <Editor value={editorData?.inclusions} onTextChange={(e) => handleChange("inclusions", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>
            <div className="text-editor">
                <h3 className='title'>Our Packages</h3>
                <Select options={[{}]} style={{ width: '100%' }} onChange={(e) => handleChange("tourId", e)} placeholder='Select your packages' />;

            </div>
            <div className="text-editor">
                <h3 className='title'>Upload Trip Images</h3>
                {/* <UploadTripImg setFileList={setFileList} fileList={fileList} /> */}
            </div>


            <Button onClick={submitHandler}>Submit</Button>
        </div>
    )
}

export default EditPackageDetails