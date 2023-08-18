import React, { FC, ReactElement, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import FilterListIcon from "@mui/icons-material/FilterList";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import "./CSTable.scss";

type Props = {
    headerData: any;
    bodyData: any;
    handleSort: Function;
};
const itemsPerPage = 5;
const CSTable: FC<Props> = ({ headerData, bodyData, handleSort }): ReactElement => {
    const [sortByAsc, setSortByAsc] = useState(true);
    const [showColumnMenu, setShowColumnMenu] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    
    const [page, setPage] = useState(1);
    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return (
        <div style={{ height: 400, width: '100%', paddingTop: '20px' }}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            {headerData?.map((item: any, index: number) => {
                                return (
                                    item?.gridView && (
                                        <TableCell key={index}>
                                            <div className="header-cell">
                                                <span>{item.name}</span>
                                                {item?.sort && (
                                                    <SortIcon
                                                        className="sort-icon"
                                                        onClick={() => {
                                                            handleSort(sortByAsc, item?.key);
                                                            setSortByAsc(!sortByAsc);
                                                        }}
                                                    />
                                                )}
                                                {item?.filter && <FilterListIcon className="filter-icon" />}
                                            </div>
                                        </TableCell>
                                    )
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bodyData?.map((item: any, index: number) => (
                            <TableRow key={index}>
                                {headerData?.map((row: any, index: number) => {
                                    return row?.gridView && (
                                        <TableCell key={index}>{item[row.key]}</TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={Math.ceil(bodyData.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                renderItem={(item) => (
                    <PaginationItem
                        component="button"
                        onClick={(e) => {
                            e.preventDefault();
                            handleChangePage(null, item.page);
                        }}
                    >
                        {item.page}
                    </PaginationItem>
                )}
            />

           
        </div>
    );
};

export default CSTable;
