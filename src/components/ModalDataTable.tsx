import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type DataValidationResponse from '../types/dataValidationResponse';

interface DataValidationError {
  _id: any;
  field: string;
  type: string;
  code: string;
  level: string;
  detail: {
    en: string;
    fa: string;
  };
}

interface DataItem {
  dataId: string;
  non_calc: DataValidationError[];
}

interface RowProps {
  dataItem: DataItem;
  getStatusColor: (level: string) => string;
}

function DataRow({ dataItem, getStatusColor }: RowProps) {
  const [open, setOpen] = React.useState(false);
  
  const errors = dataItem.non_calc.length;
  const warnings = dataItem.non_calc.filter(e => e.level === 'WARNING').length;
  const errorsCount = dataItem.non_calc.filter(e => e.level === 'ERROR').length;

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {dataItem.dataId}
        </TableCell>
        <TableCell align="right">{errors}</TableCell>
        <TableCell align="right">{warnings}</TableCell>
        <TableCell align="right">{errorsCount}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="data-validation-details">
                <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Code</TableCell>
                    <TableCell align="right">Level</TableCell>
                    <TableCell align="right">English Detail</TableCell>
                    <TableCell align="right">Persian Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataItem.non_calc.map((error, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {error.field}
                      </TableCell>
                      <TableCell>{error.type}</TableCell>
                      <TableCell align="right">
                        <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                          {error.code}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(error.level)}`}>
                          {error.level}
                        </span>
                      </TableCell>
                      <TableCell align="right">{error.detail.en}</TableCell>
                      <TableCell align="right" dir="rtl">{error.detail.fa}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Props {
  DataValidationResponse: DataValidationResponse;
  validationType: "schema" | "data" | null;
  getStatusColor: (level: string) => string;
}

export default function ModalDataTable({ DataValidationResponse, validationType, getStatusColor }: Props) {
  console.log("ModalDataTable received:", DataValidationResponse);
  
  if ('id' in DataValidationResponse && 'root' in DataValidationResponse) {
    const root = DataValidationResponse.root;
    
    if (!root || typeof root !== 'object') {
      return (
        <div className="bg-gray-800 rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 mb-4">
            <svg className="h-8 w-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.342 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Invalid Data Structure</h3>
          <p className="text-gray-400">
            No valid data found in the response.
          </p>
        </div>
      );
    }
    
    const dataItems: DataItem[] = Object.keys(root).map(dataId => ({
      dataId,
      non_calc: root[dataId]?.non_calc || []
    }));

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
            Data Validation Issues ({dataItems.length} data entries)
          </h4>
          <span className="text-sm text-gray-500">
            Click on <KeyboardArrowDownIcon fontSize="small" /> to see details for each data entry
          </span>
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
              <TableRow>
                <TableCell />
                <TableCell>Data ID</TableCell>
                <TableCell align="right">Total Issues</TableCell>
                <TableCell align="right">Warnings</TableCell>
                <TableCell align="right">Errors</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataItems.map((dataItem) => (
                <DataRow 
                  key={dataItem.dataId}
                  dataItem={dataItem}
                  getStatusColor={getStatusColor}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    // This is the old structure
    const schemaId = Object.keys(DataValidationResponse)[0];
    const dataObject = DataValidationResponse[schemaId];
    
    const dataItems: DataItem[] = Object.keys(dataObject).map(dataId => ({
      dataId,
      non_calc: dataObject[dataId].non_calc || []
    }));

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
            Data Validation Issues ({dataItems.length} data entries)
          </h4>
          <span className="text-sm text-gray-500">
            Click on <KeyboardArrowDownIcon fontSize="small" /> to see details for each data entry
          </span>
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
              <TableRow>
                <TableCell />
                <TableCell>Data ID</TableCell>
                <TableCell align="right">Total Issues</TableCell>
                <TableCell align="right">Warnings</TableCell>
                <TableCell align="right">Errors</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataItems.map((dataItem) => (
                <DataRow 
                  key={dataItem.dataId}
                  dataItem={dataItem}
                  getStatusColor={getStatusColor}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}