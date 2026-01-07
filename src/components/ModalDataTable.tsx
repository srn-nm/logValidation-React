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
  const schemaId = Object.keys(DataValidationResponse)[0];
  const dataObject = DataValidationResponse[schemaId].root;
  
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

{
  "id": 25,
  "description": "پیوست ها",
  "root": {
    "39541": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'TYPE' is missing",
            "fa": "نوع پیوست ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39679": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39708": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39713": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39720": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39750": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39752": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39754": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39756": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39762": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'TYPE' is missing",
            "fa": "نوع پیوست ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39764": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39766": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39768": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39770": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39793": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39807": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39813": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39866": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39870": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39872": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39874": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39876": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39878": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39900": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39902": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39925": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39927": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39950": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39955": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39957": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39960": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39977": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "39979": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "40200": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'TYPE' is missing",
            "fa": "نوع پیوست ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "40202": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'TYPE' is missing",
            "fa": "نوع پیوست ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "40430": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "40434": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "40435": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "40512": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "40597": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'TYPE' is missing",
            "fa": "نوع پیوست ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "40601": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'TYPE' is missing",
            "fa": "نوع پیوست ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    },
    "40820": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات پیوست ناموجود است"
          }
        }
      ]
    }
  },
  "schemaId": "25"
}