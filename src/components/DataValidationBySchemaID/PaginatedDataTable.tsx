// this part is not done yet.
// later it will be replaced with Return part of ModalDataTableNonCalc ...





// import { useState } from "react";
// import TableContainer from '@mui/material/TableContainer';
// import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';
// import Table from "@mui/material/Table";
// import TableHead from "@mui/material/TableHead";
// import TableCell from "@mui/material/TableCell";
// import TableRow from "@mui/material/TableRow";
// import TableBody from "@mui/material/TableBody";
// import type DataItem from "../../types/DataItemType";

// interface Props {
//   CollapsibleDataRow: (dataItem:DataItem) => void;
//   dataItems: DataItem[];
// }

// export default function PaginatedDataTable ({ CollapsibleDataRow, dataItems }: Props) {

//     const [page, setPage] = useState(0); // Current page index
//     const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

//     // Handle page change
//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     // Handle rows per page change
//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0); // Reset to first page
//     };

//     // Slice data for current page
//     const paginatedRows = dataItems.slice(
//         page * rowsPerPage,
//         page * rowsPerPage + rowsPerPage
//     );

//     return(
//         <>
//             <div className="bg-gray-800 rounded-xl p-5">
//                 <div className="flex justify-between items-center mb-4">
//                     <h4 className="font-medium text-gray-400 text-xl">
//                     Data Validation Issues
//                     </h4>
//                 </div>
                
//                 <TableContainer 
//                     component={Paper} 
//                     sx={{ 
//                     backgroundColor: '#1f2937',
//                     '& .MuiTableCell-root': {
//                         color: '#d1d5db',
//                         borderColor: '#374151'
//                     },
//                     '& .MuiTableHead-root .MuiTableCell-root': {
//                         color: '#9ca3af',
//                         fontWeight: '600'
//                     }
//                     }}
//                 >
//                     <Table aria-label="collapsible data table">
//                     <TableHead>
//                         <TableRow >
//                         <TableCell />
//                         <TableCell>Data ID</TableCell>
//                         <TableCell align="center">Total Issues</TableCell>
//                         <TableCell align="center">Warnings</TableCell>
//                         <TableCell align="center">Errors</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {dataItems.map((dataItem) => (
//                         <CollapsibleDataRow 
//                             key={dataItem.dataId}
//                             dataItem={dataItem}
//                         />
//                         ))}
//                     </TableBody>
//                     </Table>
//                 </TableContainer>

//                 <TablePagination
//                     component="div"
//                     count={dataItems.length} // total rows
//                     page={page}
//                     onPageChange={handleChangePage}
//                     rowsPerPage={rowsPerPage}
//                     onRowsPerPageChange={handleChangeRowsPerPage}
//                     rowsPerPageOptions={[5, 10, 25]}
//                 />

//                 </div>
//         </>
//     );
// }