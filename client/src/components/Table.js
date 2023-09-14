import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

import EditModal from './EditModal'

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'sector', label: 'Sector', minWidth: 100 },


];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

export default function StickyHeadTable(props) {
    const [page, setPage] = React.useState(0);
    const [visible,setVisible] = React.useState(false);
    const [changeID,setChangeID] = React.useState("");
    const [sector,setSector] = React.useState("");
    const [name,setName] = React.useState("");


    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const onShowHandler = (e) => {
        setChangeID(e.target.id)
        setName(e.target.name)
        setSector(e.target.dataset.space)
        setVisible(true)
    }
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell
                                key="Setting"
                                align="left"
                            >
                                Setting
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.dataSource
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key="Setting" align='left' >
                                            <Button onClick={(e) => onShowHandler(e)} id = {row._id} name = {row.name} data-space = {row.sector}>edit</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.dataSource.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <EditModal visible = {visible} setVisible = {setVisible} changeID = {changeID} name = {name} sector = {sector}/>
        </Paper>
    );
}