import { AutoComplete, Input } from "antd";
import { useState } from "react";

import "./styles.scss";

const SearchBar = () => {
  const [options, setOptions] = useState([
    {
      value: "category",
      label: "category",
    },
    {
      value: "check",
      label: "check",
    },
  ]);
  
  const handleSearch = (value) => {};
  const onSelect = (value) => {
  };
  return (
    <AutoComplete
      popupMatchSelectWidth={252}
      style={{
        width: 600,
      }}
      options={options}
      onSelect={onSelect}
      onSearch={handleSearch}
      size="large"
      className="header-search"
    >
      <Input.Search size="large" placeholder="Search here...." enterButton />
    </AutoComplete>
  );
};

export default SearchBar;
