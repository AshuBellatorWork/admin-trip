export const Columns = [
  {
    title: "S.no",
    dataIndex: "Sno",
    key: "S.no",
    filteredValue:[searchText]
    onFilter: (value, record) =>
      record["Sno"] ? record["Sno"].toString().toLowerCase().includes(value.toLowerCase()) : '',
  },
  {
    title: "Full Name",
    dataIndex: "name",
    key: "name",
  },


  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Activity",
    dataIndex: "packageName",
    key: "packageName",
  },
  {
    title: "No of Pack",
    dataIndex: "peopleInfo",
    key: "peopleInfo",
    },
    // {
      //   title: "Check In",
      //   dataIndex: "createdAt",
      //   key: "createdAt",
      //   },
      //   {
        //     title: "Check Out",
        //     dataIndex: "updatedAt",
        //     key: "updatedAt",
        //     },
        
   
        {
          title: "Message",
          dataIndex: "message",
          key: "message",
          },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              },
      {
        title: "Action",
        dataIndex: "Action",
        key: "Action",
      },
];
