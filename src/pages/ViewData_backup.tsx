// src/pages/ViewData.tsx
// import React from 'react';
// import GridWithPagination from '../components/GridWithPagination';

// const ViewData: React.FC = () => {
//   return (
//     <div>
//       <h2>View Data</h2>
//       <GridWithPagination />
//     </div>
//   );
// };

// export default ViewData;
import React, { useState } from 'react';

import { Card, CardContent, CardHeader, Grid, IconButton, InputAdornment, TextField, Typography, 
    Button,TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Menu,
  MenuItem, Pagination, Box
} from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import AppsIcon from '@mui/icons-material/Apps';
import SearchIcon from '@mui/icons-material/Search';
import { GridColDef,   DataGrid,
    
    GridValueGetterParams,
    GridSortModel,
    GridFilterModel,
    useGridApiRef, GridColumnMenu
     } from '@mui/x-data-grid';
     
import { FormControlLabel, Switch } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import ColumnReorder from '../components/ColumnReorder';
interface Row {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
  }
// interface GridFilterModel {
//   column: string;
//   operator: string;
//   value: any;
// }
const rows = [
  { id: 1, name: 'Item 1', category: 'Category A', price: 10, stock: 20 },
  { id: 2, name: 'Item 2', category: 'Category B', price: 20, stock: 15 },
  { id: 3, name: 'Item 3', category: 'Category s', price: 20, stock: 15 },
  { id: 4, name: 'Item 4', category: 'Category D', price: 20, stock: 15 },
  { id: 5, name: 'Item 5', category: 'Category E', price: 20, stock: 15 },
  { id: 6, name: 'Item 6', category: 'Category F', price: 20, stock: 15 },
  { id: 7, name: 'Item 7', category: 'Category G', price: 20, stock: 15 },
  { id: 8, name: 'Item 8', category: 'Category H', price: 20, stock: 15 },
  { id: 9, name: 'Item 9', category: 'Category I', price: 20, stock: 15 },
  { id: 10, name: 'Item 10', category: 'Category J', price: 20, stock: 15 },

  // ... (add more data)
];
const gridColumns = ['id','name', 'category'];
//const gridColumns: (keyof Row)[] = ['name', 'category'];

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 200, sortable: true },
  { field: 'category', headerName: 'Category', width: 150, sortable: true },
  { field: 'price', headerName: 'Price', width: 120, sortable: true },
  { field: 'stock', headerName: 'Stock', width: 120, sortable: true },
];

const ViewData: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'card'>('grid');
  const [showAllColumns, setShowAllColumns] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);
  const [colns, setColns] = useState(columns);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
 // const [filterModel, setFilterModel] = useState<GridFilterModel>({});
//   const [filterModel, setFilterModel] = useState<GridFilterModel| {}>({});
 const [filterModel, setFilterModel] = useState<GridFilterModel>({items: []});
//const [filterModel, setFilterModel] = useState<GridFilterModel | null>(null);

  const rowsPerPage = 5;
  const apiRef = useGridApiRef();
  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'card' : 'grid');
  };

  const toggleShowAllColumns = () => {
    setShowAllColumns(!showAllColumns);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(0); // Reset page when search text changes
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );
 
  const visibleColumns = showAllColumns ? Object.keys(rows[0]) : gridColumns;
  
  console.log('.... visible columns ',visibleColumns);
  //const handleChangePage = (event: unknown, newPage: number) => {
const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // 3. Filter
  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    console.log('handleclick ',event,'... event.currentTarget ',event.currentTarget);
    // setAnchorEl(event.currentTarget);
    // setSelectedColumn(event.currentTarget.textContent);
  };

  const handleFilterChange = (model: GridFilterModel) => {
    setFilterModel(model);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
};
const handleColumnSelect = (column: string) => {
    setSelectedColumn(column);
    handleFilterClose();
      // Reload the component with the selected column.
  //forceUpdate();
  };

  const filteredVisibleColumns = selectedColumn
  ? visibleColumns.filter((column) => column === selectedColumn)
  : visibleColumns;
  const visibleColumns1 =  columns.filter((column) => gridColumns.includes(column.field));
  const visibleColumns2 =  showAllColumns ? columns: columns.filter((column) => gridColumns.includes(column.field))

console.log('... visiblecolums 1 ',visibleColumns1,'.. filteredVisibleColumns ',filteredVisibleColumns,'...visibleColumns2 ',visibleColumns2,'...selectedColumn ',selectedColumn);
//   const handleColumnChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
//     const updatedColumns = columns.map((col) =>
//       col.field === field ? { ...col, hide: !event.target.checked } : col
//     );
//     setColns(updatedColumns);
//   };
// const filteredRows = rows.filter((row) => {
//     // Implement your custom filter logic here
//     // Example: Filter by 'name' field
//     return row.name.toLowerCase().includes(searchText.toLowerCase());
//   });
const handleSortModelChange = (model: GridSortModel) => {
    setSortModel(model);
  };
  const filteredAndPaginatedRows = rows
  .filter((row) => row.name.toLowerCase().includes(searchText.toLowerCase()))
  .slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // State for storing the reordered columns
  const [reorderedColumns, setReorderedColumns] = useState<GridColDef<Row>[]>(() =>
  gridColumns.map((column) => ({
    field: column,
    headerName: column,
    width: 150,
    sortable: true,
    valueGetter: (params: any) => params.row[column],
  }))
);
  console.log('... reorder column ',reorderedColumns);
  const handleColumnsChange = (newColumns: GridColDef<Row>[]) => {
    setReorderedColumns(newColumns);
  };
  console.log('... filteredRows ',filteredRows,'...filteredAndPaginatedRows ',filteredAndPaginatedRows);
  return (
    
    <div style={{ padding: '20px' }}>
        {/* <ColumnReorder columns={reorderedColumns} onColumnsChange={handleColumnsChange} /> */}
        {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <IconButton onClick={toggleViewMode}>
          {viewMode === 'grid' ? <AppsIcon /> : <ViewModuleIcon />}
        </IconButton>
        <Typography variant="subtitle1" style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
          {viewMode === 'grid' ? 'Table View' : 'Card View'}
        </Typography>
        <Switch checked={showAllColumns} onChange={toggleShowAllColumns} />
      </div> */}
      {/* <div style={{ textAlign: 'right', marginBottom: '10px' }}> */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <FormControlLabel
          control={
      <Switch
          checked={viewMode === 'grid'}
          onChange={toggleViewMode}
          color="primary"
        //   defaultChecked
        //       onChange={(e) => {
               
        //         e.target.checked ? setViewMode("grid") : setViewMode("card");
        //       }}
             
        />
    }
    label={viewMode} style={{ fontWeight: 'bold', textTransform: 'capitalize' }}
  />
 {/* test start */}

 
 {/* test end */}
   <div>
          <IconButton onClick={handleFilterClick}>
            <FilterListIcon />
          </IconButton>
         
         
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
          >
            {columns.map((column: any,index:Number) => (
               
              <MenuItem
              key={`${column}-${index}`} 
            
               selected={column === selectedColumn}
                onClick={() => handleColumnSelect(column)}
              >
                <span>{column}</span>
              </MenuItem>
            ))}
          </Menu>
        </div>
        <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* <IconButton onClick={toggleViewMode}>
          {viewMode === 'grid' ? <AppsIcon /> : <ViewModuleIcon />}
        </IconButton> */}
        <Button onClick={toggleShowAllColumns}>
          {showAllColumns ? 'Show Restricted Columns' : 'Show All Columns'}
        </Button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        {/* <TextField
          variant="outlined"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
      </div>
      {viewMode === 'grid' ? (
        <div style={{ height: 400, width: '100%' }}>
       {/* <DataGrid
          columns={columns}
          rows={rows}
          filterModel={Object.keys(filterModel).length > 0 ? [filterModel] : []}
          onFilterModelChange={handleFilterChange}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection
        /> */}
         {/* <DataGrid
          columns={visibleColumns2}
          rows={rows}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          filterModel={filterModel}
          onFilterModelChange={handleFilterChange}
         
        /> */}
         <DataGrid
        //   columns={columns.filter((column) =>
        //     visibleColumns.includes(column.field)
        //   )}
       
        //   rows={filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage)}
        columns={visibleColumns.filter((column) =>
            visibleColumns.includes(column)
          ).map((column) => ({
            field: column,
            headerName: column,
            width: 150,
            sortable: true,
          }))}
          rows={filteredAndPaginatedRows}
         // rows={filteredRows.slice((page - 1) * rowsPerPage, page * rowsPerPage + rowsPerPage)}
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
        />
         <Box mt={2}>
          <Pagination
            count={Math.ceil(rows.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </div>
    //     <TableContainer component={Card} elevation={3}>
    //     <Table>
    //       <TableHead>
    //       <TableRow>
    //               {filteredVisibleColumns.map((column) => (
    //                 <TableCell
    //                   key={column}
    //                   style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
    //                 >
    //                   {column}
    //                 </TableCell>
    //               ))}
    //             </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {filteredRows
    //           .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    //           .map((row) => (
    //             <TableRow key={row.id}>
    //               {visibleColumns.map((column) => (
    //                 <TableCell key={column}>{row[column as keyof Row]}</TableCell>
    //               ))}
    //             </TableRow>
    //           ))}
    //       </TableBody>
    //     </Table>
    //     <TablePagination
    //       rowsPerPageOptions={[]}
    //       component="div"
    //       count={filteredRows.length}
    //       rowsPerPage={rowsPerPage}
    //       page={page}
    //       onPageChange={handleChangePage}
    //     />
    //   </TableContainer>
        //   <Grid container spacing={2}>
        //   {filteredRows.map((row) => (
        //        <Grid item key={row.id} xs={12} sm={6} md={4}>
        //        <Card>
        //          <CardContent>
        //            {visibleColumns.map((column) => (
        //              <Typography key={column} variant="body2">
        //                {column}:  {row[column as keyof Row]}
        //              </Typography>
        //            ))}
        //          </CardContent>
        //        </Card>
        //      </Grid>
        //   ))}
        // </Grid>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {filteredRows.map((row) => (
            <Card
              key={row.id}
              style={{
                minWidth: '200px',
                maxWidth: '300px',
                margin: '10px',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
              elevation={3}
            >
              <CardContent>
                {visibleColumns.map((column) => (
                  <Typography key={column} variant="body2">
                    <strong>{column}:</strong> {row[column as keyof Row]}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          ))}
          </div>
        // <Grid container spacing={2}>
        //   {filteredRows.map((row) => (
        //     <Grid item key={row.id} xs={12} sm={6} md={4}>
            
        //     </Grid>
        //   ))}
        // </Grid>
      )}
    </div>
  );
};

export default ViewData;
