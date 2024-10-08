import { useEffect, useState } from 'react'
import {  useGetPackageDetailQuery, useUpdatePackagesDetailMutation } from '../../store/services/addTourDetail'
import { Editor } from "primereact/editor";
import "./styles.scss"
import { useNavigate } from 'react-router-dom';
import UploadTripImg from './uploadTripImg';
import { Button, Checkbox, Col, Input, Row, Select,message } from 'antd';
import { BreadCrum } from '../../components/breadCrume';
import { useGetCategoryQuery } from '../../store/services/category';
import { useParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
export async function blobCreationFromURL(inputURI) {
    const response = await fetch(inputURI);
    const blob = await response.blob();
    return new File([blob], inputURI, {
        type: blob.type || "image/jpeg",
      })
    // return blob
  }
const EditPackageDetail = () => {

const {id} = useParams()
    const [fileList, setFileList] = useState([])
    const [fileList2, setFileList2] = useState([{
        url:""
    }])
    const [editorData, setEditorData] = useState({
        categoryId: "",
        name: "",
        highlights: "",
        needToKnow: "",
        canclePolicy: "",
        inclusions: "",
        DNSchedule: "",
        packagesNight: "",
        star: "",
        info: "",
        description: "",
        shortDescription: "",
        location: "",
        price: "",
        discountPrice: "",
        map: "",

        galleryPhoto: []
    })
    const [triggre, { data:updateData,isLoading  }] = useUpdatePackagesDetailMutation()
    const navigate = useNavigate(); 



    useEffect(() => {
      if (updateData?.status || updateData?.success) {
        message.success(updateData.message);
        navigate("/package"); // Redirect on success
      }
    }, [updateData]);

    const {data:getPackagesDetail,isLoading:getpackageLoader,} =useGetPackageDetailQuery(id)
    const { data: packagesData,isLoading:categoryModel } = useGetCategoryQuery()

    const isLoadingAll = getpackageLoader || categoryModel || isLoading;

   
    const handleChange = (name, value) => {
        setEditorData((prev) => {
            return {
                ...prev, [name]: value

            }
        })
    }

    useEffect(() => {
        const splitInfo = getPackagesDetail?.data?.info[0]?.split(",")
        splitInfo?.map((item)=>{
           setEditorData((prev)=>{
               return{
                   ...prev,  info: [...prev.info, item]
               }
            })
        })
     setEditorData((prev)=>{
        return{
            ...prev,name:getPackagesDetail?.data?.name,
            packagesNight:getPackagesDetail?.data?.packagesNight,
            star:getPackagesDetail?.data?.star,
            DNSchedule:getPackagesDetail?.data?.DNSchedule,
            description:getPackagesDetail?.data?.description,
            shortDescription:getPackagesDetail?.data?.shortDescription,
            location:getPackagesDetail?.data?.location,
            price:getPackagesDetail?.data?.price,
            map:getPackagesDetail?.data?.map,
            discountPrice:getPackagesDetail?.data?.discountPrice,
            categoryId:getPackagesDetail?.data?.categoryId,
            highlights:getPackagesDetail?.data?.highlights[0],
            inclusions:getPackagesDetail?.data?.inclusions[0],
            needToKnow:getPackagesDetail?.data?.needToKnow[0],
            canclePolicy:getPackagesDetail?.data?.canclePolicy[0],
          
           


        }
     })
  
   
     setFileList2([{
        url:getPackagesDetail?.data?.images
     }])

    const galleryPhotos =  getPackagesDetail?.data?.galleryPhoto.map((item)=>{
        return {
            url:item
        }
     })
     setFileList(galleryPhotos)
    }, [getPackagesDetail])

    const submitHandler = async() => {
        const formData = new FormData();
        formData.append("highlights", editorData.highlights);
        formData.append("name", editorData.name);
        formData.append("DNSchedule", editorData.DNSchedule);
        formData.append("packagesNight", editorData.packagesNight);
        formData.append("star", editorData.star);
        formData.append("info", editorData.info);
        formData.append("description", editorData.description);
        formData.append("shortDescription", editorData.shortDescription);
        formData.append("location", editorData.location);
        formData.append("price", editorData.price);
        formData.append("map", editorData.map);
        formData.append("needToKnow", editorData.needToKnow);
        formData.append("canclePolicy", editorData.canclePolicy);
        formData.append("inclusions", editorData.inclusions);
        formData.append("categoryId", editorData?.categoryId)
        formData.append("discountPrice", editorData?.discountPrice)
        // formData.append("image", fileList2[0].originFileObj)
        // fileList.map((item) => formData.append("galleryPhoto", item?.originFileObj))
        for(let item of fileList){
            if(item?.originFileObj )  {
              formData.append("galleryPhoto",item?.originFileObj)
            }else { const data  = await blobCreationFromURL(item?.url)
              formData.append("galleryPhoto",data)
            }
          }
          if(fileList2[0]?.originFileObj )  {
            formData.append("image",fileList2[0].originFileObj)
          }else {
            const data  = await blobCreationFromURL(fileList2[0]?.url)
            formData.append("image",data)
          }
          
      
        triggre({data:formData,id:id});
    }

    const packageLists = packagesData?.data?.map((elm) => {
        return { value: elm?._id, label: elm?.name }
    })
    const starOption =[
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        },
        {
          value: '4',
          label: '4',
        },
        {
          value: '5',
          label: '5',
        },
    ]
    const onChange = (checkedValues) => {
        setEditorData((prev)=>{
            return{
               ...prev,
                info:checkedValues
                }
                })
            
      };
    return (
      <>{isLoadingAll?<Loader />:
        <div className='text-editor-wrapper'>
            {/* <BreadCrum name={'Trip Packages Details'} /> */}
            <div className="add-package">
            <p>Trip Packages Details</p>
            
           </div>
            <div className="text-editor">
                <h3 className='title'>Name</h3>
                <Input type="text" style={{ width: '100%', color: '' }} onChange={(e) => handleChange("name", e.target.value)} value={editorData?.name}/>
            </div>
            <div className='text-editor-num2'>


                <div className="text-editor">
                    <h3 className='title'>Packages Night</h3>
                    <select className="packageNight" id="rating" value={editorData?.packagesNight} style={{ width: '100%', padding: "7px", outline: "none", border: "1px solid #ccc" }} onChange={(e) => handleChange("packagesNight", e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>

                    </select>
                </div>
                <div className="text-editor">
                    <h3 className='title'>star</h3>
                    <Select className="rating" value={editorData?.star} style={{width:"100%"}} options={starOption} onChange={(e) => handleChange("star", e)} />
                   
                 

                </div>
            </div>
            <div className="text-editor">
                <h3 className='title'>DNSchedule</h3>
                <textarea id="textarea" name="textarea" value={editorData?.DNSchedule} rows="4" cols="50" style={{ width: '100%' }} onChange={(e) => handleChange("DNSchedule", e.target.value)} />
            </div>
            <div className="text-editor">
                <h3 className='title'>info</h3>
                <Checkbox.Group
    style={{
      width: '100%',
    }}
    value={editorData?.info}
    onChange={onChange}
  >
    <Row>
      <Col span={8}>
        <Checkbox value="Meals">Meals</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Sightseeing">Sightseeing</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Cab">Cab</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Camel Ride">Camel Ride</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Quad Bike Ride">Quad Bike Ride</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Sand Boarding">Sand Boarding</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="5 Star">5 Star</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Cab Transfer">Cab Transfer</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="Buggy Ride">Buggy Ride</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
            </div>
            <div className="text-editor">
                <h3 className='title'>Description</h3>
                <textarea id="textarea" name="textarea" value={editorData?.description} rows="4" cols="50" style={{ width: '100%' }} onChange={(e) => handleChange("description", e.target.value)} />
            </div>
            <div className="text-editor">
                <h3 className='title'>Short Description</h3>
                <textarea id="textarea" name="textarea"  value={editorData?.shortDescription} rows="4" cols="50" style={{ width: '100%' }} onChange={(e) => handleChange("shortDescription", e.target.value)} />

            </div>
            <div className='text-editor-num'>
                <div className="text-editor">
                    <h3 className='title'>price</h3>
                    <Input type="number"  value={editorData?.price} style={{ width: '100%', color: '' }} onChange={(e) => handleChange("price", e.target.value)} />
                </div>
                <div className="text-editor" >
                    <h3 className='title'>Discount Price</h3>
                    <Input type="number"  value={editorData?.discountPrice} style={{ width: '100%' }} onChange={(e) => handleChange("discountPrice", e.target.value)} />
                </div>
            </div>
            <div className="text-editor">
                <h3 className='title'>map</h3>
                <Input type=""  value={editorData?.map} style={{ width: '100%', color: '' }} onChange={(e) => handleChange("map", e.target.value)} />
            </div>
            <div className="text-editor">
                <h3 className='title'>location</h3>
                <Input type=""  value={editorData?.location} style={{ width: '100%', color: '' }} onChange={(e) => handleChange("location", e.target.value)} />
            </div>


            <div className="text-editor">
                <h3 className='title'>Highlights</h3>
                <Editor value={editorData?.highlights || getPackagesDetail?.data?.highlights[0]} onTextChange={(e) => handleChange("highlights", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>


            <div className="text-editor">
                <h3 className='title'>Need to know</h3>
                <Editor value={editorData?.needToKnow || getPackagesDetail?.data?.needToKnow[0]} onTextChange={(e) => handleChange("needToKnow", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>

            <div className="text-editor">
                <h3 className='title'>Cancel policy</h3>
                <Editor value={editorData?.canclePolicy || getPackagesDetail?.data?.canclePolicy[0]} onTextChange={(e) => handleChange("canclePolicy", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>

            <div className="text-editor">
                <h3 className='title'>Inclusions</h3>
                <Editor value={editorData?.inclusions || getPackagesDetail?.data?.inclusions[0]} onTextChange={(e) => handleChange("inclusions", e.htmlValue)} style={{ height: '280px', color: 'black' }} />
            </div>
            <div className="text-editor">
                <h3 className='title'>Our Packages</h3>
                <Select options={packageLists}  value={editorData?.categoryId} style={{ width: '100%' }} onChange={(e) => handleChange("categoryId", e)} placeholder='Select your packages' />;

            </div>
            <div className="text-editor">
                <h3 className='title'>Images</h3>
                <UploadTripImg setFileList={setFileList2} fileList={fileList2} length={1} />
            </div>



            <div className="text-editor">
                <h3 className='title'>Upload Trip Images</h3>
                <UploadTripImg setFileList={setFileList} fileList={fileList} length={5} />
            </div>


            <Button onClick={submitHandler} style={{width:"200px" ,background:"#84a845", color:"#fff", border:"none"}}>Submit</Button>
        </div>
        }
      </>
    )
}

export default EditPackageDetail
