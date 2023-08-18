import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { BusinessObject } from "../interfaces/BusinessObject";


// ...
interface GridViewProps {
    data: BusinessObject[];
    schema: any;
  }
  
  const GridView: React.FC<GridViewProps> = ({ data, schema }) => {
    console.log('... grid view data',data,'..schema ',schema);
   // const settings = schema.attributes.filter(attr => attr.gridView);
//    const settings = schema.attributes.filter((attr:any) => attr.gridView);
//     const columns: GridColDef[] = settings.map((attribute: any) => ({
//       field: attribute.key,
//       headerName: attribute.name,
//       width: 150,
//       sortable: attribute.sort,
//       hide: !attribute.cardView
//     }));
  
    // Rest of the component remains the same
        return (
      <div style={{ height: 400, width: '100%' }}>
        <p> Gridview</p>
        {/* <DataGrid
          rows={data}
          columns={columns}
        //   pageSize={5}
          sortingOrder={settings.sortableColumns}
        /> */}
      </div>
    );
  };
//   const GridView: React.FC<GridViewProps> = ({ data, schemaName }) => {
//     const attributes = getSchemaAttributes(schemaName);
//     //const settings = getBusinessObjectSettings(schemaName);
//     const schema = getSchema(schemaName); // Retrieve the correct schema object
//     const settings = schema.settings;
//     const columns: GridColDef[] = attributes.map((attribute: string) => ({
//       field: attribute,
//       headerName: attribute,
//       width: 150,
//       sortable: settings.sortableColumns.includes(attribute),
//       hide: !settings.viewAttributes.includes(attribute)
//     }));
  
//     return (
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={data}
//           columns={columns}
//         //   pageSize={5}
//           sortingOrder={settings.sortableColumns}
//         />
//       </div>
//     );
//   };
export default GridView;