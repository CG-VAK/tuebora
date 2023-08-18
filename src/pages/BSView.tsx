import { useState, useEffect, FC, ReactElement } from "react";
import Fuse from "fuse.js";
// import CustomTable from "../../components/CustomTable/CustomTable";
// import CustomCard from "../../components/CustomCard/CustomCard";
import "./BSView.scss";
// @ts-ignore
import { orderBy } from "lodash";

import { FormControl, FormControlLabel, TextField } from "@mui/material";
import Switch from "@mui/material/Switch/Switch";
import CSTable from "../components/CustomView/CSTable";
import CSCard from "../components/CustomView/CSCard";

interface SchemaData {
  name?: string;
  key?: string;
  type?: string;
  cardView?: boolean;
  gridView?: boolean;
  search?: boolean;
  sort?: boolean;
}

type props = {
  viewData: any;
  schemaData: SchemaData[];
  viewMode: any;
};

const BSView: FC<props> = ({
  viewData,
  schemaData,
  viewMode
}): ReactElement => {
  const [viewType, setViewType] = useState<string>(viewMode);
  const [searchItems, setSearchItems] = useState<[]>();
  const [searchPlaceholder, setSearchPlaceholder] = useState<[]>();
  const [data, setData] = useState<any>(viewData);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => setData(viewData), [viewData]);

  // set search keys
  useEffect(() => {
    setSearchItems(
      schemaData?.reduce((op: any, data: SchemaData) => {
        if (data?.search) op.push(data?.key);
        return op;
      }, [])
    );
    // set searchable placeholder
    setSearchPlaceholder(
      schemaData?.reduce((op: any, data: SchemaData) => {
        if (data?.search) op.push(data?.name);
        return op;
      }, [])
    );
  }, [data]);

  // construct data as per searched item
  useEffect(() => {
    if (searchValue) {
      const fuse = new Fuse(data as [], {
        keys: searchItems,
      });
      setData(fuse.search(searchValue).map((value: any) => value.item));

    } else {
      setData(viewData);
    }
  }, [searchValue]);

  // Sorting the content
  const handleSort = (value: boolean, key: string) => {
    setData(orderBy(data, [key], value ? "asc" : "desc"));
  };


  return (
    <>
      <div className="divheader">
        <FormControlLabel
          control={
            <Switch
              checked={viewType === 'Grid'}

              onChange={(e) => {
                setSearchValue("");
                e.target.checked ? setViewType("Grid") : setViewType("Card");
              }}
            />
          }
          label={viewType ? viewType : viewMode} style={{ fontWeight: 'bold', textTransform: 'capitalize' }}
        />
      </div>
      {viewType === "Grid" && (
        <div className="search-class">
          <TextField
            className="form-controls"
            type="text"
            label="Search"
            placeholder={searchPlaceholder?.toString() || "Search ..."}
            onChange={(e: any) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>
      )}
      {viewType === "Grid" ? (
        <CSTable
          headerData={schemaData}
          bodyData={data}
          handleSort={(value: boolean, key: string) => handleSort(value, key)}
        />
      ) : (
        <CSCard schemaData={schemaData} cardData={data} />
      )}
    </>
  );
};

export default BSView;
