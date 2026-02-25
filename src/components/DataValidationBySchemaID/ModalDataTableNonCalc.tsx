import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type DataValidationResponse from '../../types/DataValidationResponseType';
import type DataItem from '../../types/DataItemType';
import InfoIcon from '@mui/icons-material/Info'; 
import IconButton from '@mui/material/IconButton';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';


const getStatusColor = (level: string) => {
  switch (level?.toUpperCase()) {
    case "ERROR":
      return "bg-red-500/20 text-red-300";
    case "WARNING":
      return "bg-yellow-500/20 text-yellow-300";
    default:
      return "bg-gray-500/20 text-gray-300";
  }
};

function DataRow({ dataItem }: {dataItem: DataItem}) {

  function handleInfoButton(): void {
    const navigate = useNavigate();
    navigate(`/data/detail/${dataItem.dataId}`);
  }  

  const errors = dataItem.array.length;
  const warnings = dataItem.array.filter(e => e.level === 'WARNING').length;
  const errorsCount = dataItem.array.filter(e => e.level === 'ERROR').length;

  return (
    <React.Fragment>
      
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {dataItem.dataId}
        </TableCell>
        <TableCell align="center">{errors}</TableCell>
        <TableCell align="center">{warnings}</TableCell>
        <TableCell align="center">{errorsCount}</TableCell>
        <TableCell align="center">
          <IconButton size="small" name="details" onClick={() => handleInfoButton}>
            <InfoIcon color="primary"/>
          </IconButton>
        </TableCell>
        
      </TableRow>

    </React.Fragment>
  );
}

// function CollapsibleDataRow({ dataItem }: {dataItem: DataItem}) {
//   const [open, setOpen] = React.useState(false);
  
//   const errors = dataItem.array.length;
//   const warnings = dataItem.array.filter(e => e.level === 'WARNING').length;
//   const errorsCount = dataItem.array.filter(e => e.level === 'ERROR').length;

//   return (
//     <React.Fragment>
//       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {dataItem.dataId}
//         </TableCell>
//         <TableCell align="center">{errors}</TableCell>
//         <TableCell align="center">{warnings}</TableCell>
//         <TableCell align="center">{errorsCount}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Table size="small" aria-label="data-validation-details">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Row</TableCell>
//                     <TableCell align="left">Code</TableCell>
//                     <TableCell align="left">Level</TableCell>
//                     <TableCell align="left">Detail</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {dataItem.array.map((issue, index) => (
//                     <TableRow key={index}>
//                       <TableCell component="th" scope="row">
//                         {index+1}
//                       </TableCell>
//                       <TableCell align="left">
//                         <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
//                           {issue.code}
//                         </span>
//                       </TableCell>
//                       <TableCell align="left">
//                         <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(issue.level)}`}>
//                           {issue.level}
//                         </span>
//                       </TableCell>
//                       <TableCell align="left">{issue.detail}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

export default function ModalDataTableNonCalc({ validationResponse }: {validationResponse: DataValidationResponse}) {

  // const schemaId = validationResponse.id;
  const dataObject = validationResponse.root;

  // dataIDs.forEach(dataID => {
  //   if (validationResponse.root[dataID].calc) {
  //     validationResponse.root[dataID].calc.forEach((data) => {
  //       //todo
  //     })
  //   }
  // });
  

  let dataItems: DataItem[] = []
  if (validationResponse.root) {
       dataItems = Object.keys(dataObject).map(dataId => ({
        dataId,
        array: dataObject[dataId].log.non_calc || []
  }))};

  // console.log("the length of dataitems: ", dataItems.length) //////////////////////////test

  if (dataItems.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
          <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Data Issues Found!</h3>
        <p className="text-gray-400">
          All data entries have passed validation checks.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-5">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium text-gray-400 text-xl">
          Data Validation Issues
        </h4>
      </div>
      
      <TableContainer 
        component={Paper} 
        sx={{ 
          backgroundColor: '#1f2937',
          '& .MuiTableCell-root': {
            color: '#d1d5db',
            borderColor: '#374151'
          },
          '& .MuiTableHead-root .MuiTableCell-root': {
            color: '#9ca3af',
            fontWeight: '600'
          }
        }}
      >
        <Table aria-label="collapsible data table">
          <TableHead>
            <TableRow >
              
              <TableCell>Data ID</TableCell>
              <TableCell align="center">Total Issues</TableCell>
              <TableCell align="center">Warnings</TableCell>
              <TableCell align="center">Errors</TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataItems.map((dataItem) => (
              <DataRow 
                key={dataItem.dataId}
                dataItem={dataItem}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
}