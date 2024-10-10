import { useEffect, useState } from "react";
import { useGetDashboardQuery } from "../../store/services/dashBoard";
import Card from "./Crad";
import { DatePicker, Space } from 'antd';
import "./style.scss";
import Loader from "../../components/loader/Loader";
import { useGetPackagesQuery } from "../../store/services/package";
import { useGetInquiryQuery } from "../../store/services/inquiry";
import { useGetCatQuery } from "../../store/services/category"; 



const Dashboard = () => {
  const [date, setDate] = useState("");
  const [totalBuggyPackages, setTotalBuggyPackages] = useState(0);
  const [totalSafariPackages, setTotalSafariPackages] = useState(0);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [totalCompledInquiries, setTotalCompledInquiries] = useState(0);
  const [totalCancelledInquiries, setTotalCancelledInquiries] = useState(0);
  const [totalInprocessInquiries, setTotalInprocessInquiries] = useState(0);
  const [totalActivities, setTotalActivities] = useState(0);

  const { data: dashboardData, isLoading: isDashboardLoading } = useGetDashboardQuery(date);
  const dashBoardData = dashboardData?.data;

  const { data: packagesData } = useGetPackagesQuery();
  const { data: inquiriesData } = useGetInquiryQuery();
  const { data: categoriesData } = useGetCatQuery();
  // Log packagesData using useEffect to avoid re-render issues
  useEffect(() => {
    if (packagesData) {
      const total = packagesData.data.filter(
        (packageItem) => packageItem.category_id == 1 && packageItem.status == 1
      ).length;
      setTotalBuggyPackages(total);

      const totalsafari = packagesData.data.filter(
        (packageItem) => packageItem.category_id == 3 && packageItem.status == 1
      ).length;
      setTotalSafariPackages(totalsafari);
    }

    if (inquiriesData) {
      const totalinquiry = inquiriesData?.data?.length || 0;
      setTotalInquiries(totalinquiry);

      const totalcompletedinquiry = inquiriesData.data.filter(
        (inquiryItem) => inquiryItem.status == 1).length;
      setTotalCompledInquiries(totalcompletedinquiry);

      const totalcancelledinquiry = inquiriesData.data.filter(
        (inquiryItem) => inquiryItem.status == 2
      ).length;
      setTotalCancelledInquiries(totalcancelledinquiry);

      const totalinprocessinquiry = inquiriesData.data.filter(
        (inquiryItem) => inquiryItem.status == 0
      ).length;
      setTotalInprocessInquiries(totalinprocessinquiry);

    }

    if(categoriesData) {
      const totalactivity = categoriesData?.data?.length || 0;
      setTotalActivities(totalactivity);
    }

  }, [packagesData, inquiriesData, categoriesData]); // Added inquiriesData as dependency

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  return (
    <>
      {isDashboardLoading ? (
        <Loader />
      ) : (
        <>
          <div className="date-filter">
            <h3>Dashboard</h3>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Space direction="horizontal">
                <span>Search by date</span>
                <DatePicker onChange={onChange} />
              </Space>
            </div>
          </div>

          <div className="cards-container">
            <Card name={"Total Activity"} value={totalActivities} />
            <Card
              name={"Total Buggy Packages"}
              value={totalBuggyPackages}
            />{" "}
            {/* Use state here */}
            <Card name={"Total Safari Packages"} value={totalSafariPackages} />
            <Card name={"Total Enquiries"} value={totalInquiries} />
            <Card
              name={"Total Completed Enquiries"}
              value={totalCompledInquiries}
            />
            <Card
              name={"Total Cancelled Enquiries"}
              value={totalCancelledInquiries}
            />
            <Card
              name={"Total InProgress Enquiries"}
              value={totalInprocessInquiries}
            />
            <Card
              name={"Total Buggy Enquiries"}
              value={dashBoardData?.totalBuggyEnquiries}
            />
            <Card
              name={"Total Desert Enquiries"}
              value={dashBoardData?.totalDesertEnquiries}
            />
          </div>
        </>
        
      )}
    </>
  );
};

export default Dashboard;
