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

function Row({id, field, type, code, level, detail}: DataValidationResponse ) {
  const row = {id, field, type, code, level, detail};
  const [open, setOpen] = React.useState(false);

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
          {row.id}
        </TableCell>
        <TableCell align="right">{}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell align="right">Code</TableCell>
                    <TableCell align="right">Level</TableCell>
                    <TableCell align="right">Detail</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
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
const rows = [
 
    "104379": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "REQUIRED",
          "level": "ERROR",
          "detail": {
            "en": "'TYPE' is required",
            "fa": " الزامی است ‏'نوع مفاصاحساب'"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        }
      ]
    },
    "104380": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        }
      ]
    },
    "104381": {
      "non_calc": [
        {
          "_id": null,
          "field": "DESCR",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'DESCR' is missing",
            "fa": "توضیحات ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        }
      ]
    },
    "104382": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "REQUIRED",
          "level": "ERROR",
          "detail": {
            "en": "'TYPE' is required",
            "fa": " الزامی است ‏'نوع مفاصاحساب'"
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
            "fa": "توضیحات ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        }
      ]
    },
    "104383": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "REQUIRED",
          "level": "ERROR",
          "detail": {
            "en": "'TYPE' is required",
            "fa": " الزامی است ‏'نوع مفاصاحساب'"
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
            "fa": "توضیحات ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        }
      ]
    },
    "104384": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "REQUIRED",
          "level": "ERROR",
          "detail": {
            "en": "'TYPE' is required",
            "fa": " الزامی است ‏'نوع مفاصاحساب'"
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
            "fa": "توضیحات ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        }
      ]
    },
    "104385": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "REQUIRED",
          "level": "ERROR",
          "detail": {
            "en": "'TYPE' is required",
            "fa": " الزامی است ‏'نوع مفاصاحساب'"
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
            "fa": "توضیحات ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        }
      ]
    },
    "104386": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "REQUIRED",
          "level": "ERROR",
          "detail": {
            "en": "'TYPE' is required",
            "fa": " الزامی است ‏'نوع مفاصاحساب'"
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
            "fa": "توضیحات ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        }
      ]
    },
    "104387": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "REQUIRED",
          "level": "ERROR",
          "detail": {
            "en": "'TYPE' is required",
            "fa": " الزامی است ‏'نوع مفاصاحساب'"
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
            "fa": "توضیحات ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        }
      ]
    },
    "104388": {
      "non_calc": [
        {
          "_id": null,
          "field": "TYPE",
          "type": "data",
          "code": "REQUIRED",
          "level": "ERROR",
          "detail": {
            "en": "'TYPE' is required",
            "fa": " الزامی است 'نوع مفاصاحساب'"
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
            "fa": "توضیحات ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        }
      ]
    },
    "113933": {
      "non_calc": [
        {
          "_id": null,
          "field": "SCAN",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'SCAN' is missing",
            "fa": "فرم مفاصاحساب ناموجود است"
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
            "fa": "توضیحات ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "OLD_ID",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'OLD_ID' is missing",
            "fa": "شناسه قدیمی ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "ACC_SETTLE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'ACC_SETTLE' is missing",
            "fa": "فرم تسویه حساب ناموجود است"
          }
        },
        {
          "_id": null,
          "field": "COEF_CALCULATE",
          "type": "data",
          "code": "MISSING",
          "level": "WARNING",
          "detail": {
            "en": "'COEF_CALCULATE' is missing",
            "fa": "ضریب محاسبه پیمان ناموجود است"
          }
        }
      ]
    }
];
export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Data ID</TableCell>
            <TableCell align="right">Issues</TableCell>
            <TableCell align="right">Warnings</TableCell>
            <TableCell align="right">Errors</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


// sample request response:
// {
//   "131": {
//     "104379": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "TYPE",
//           "type": "data",
//           "code": "REQUIRED",
//           "level": "ERROR",
//           "detail": {
//             "en": "'TYPE' is required",
//             "fa": " الزامی است ‏'نوع مفاصاحساب'"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         }
//       ]
//     },
//     "104380": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "DESCR",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'DESCR' is missing",
//             "fa": "توضیحات ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         }
//       ]
//     },
//     "104381": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "DESCR",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'DESCR' is missing",
//             "fa": "توضیحات ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         }
//       ]
//     },
//     "104382": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "TYPE",
//           "type": "data",
//           "code": "REQUIRED",
//           "level": "ERROR",
//           "detail": {
//             "en": "'TYPE' is required",
//             "fa": " الزامی است ‏'نوع مفاصاحساب'"
//           }
//         },
//         {
//           "_id": null,
//           "field": "DESCR",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'DESCR' is missing",
//             "fa": "توضیحات ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         }
//       ]
//     },
//     "104383": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "TYPE",
//           "type": "data",
//           "code": "REQUIRED",
//           "level": "ERROR",
//           "detail": {
//             "en": "'TYPE' is required",
//             "fa": " الزامی است ‏'نوع مفاصاحساب'"
//           }
//         },
//         {
//           "_id": null,
//           "field": "DESCR",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'DESCR' is missing",
//             "fa": "توضیحات ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         }
//       ]
//     },
//     "104384": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "TYPE",
//           "type": "data",
//           "code": "REQUIRED",
//           "level": "ERROR",
//           "detail": {
//             "en": "'TYPE' is required",
//             "fa": " الزامی است ‏'نوع مفاصاحساب'"
//           }
//         },
//         {
//           "_id": null,
//           "field": "DESCR",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'DESCR' is missing",
//             "fa": "توضیحات ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         }
//       ]
//     },
//     "104385": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "TYPE",
//           "type": "data",
//           "code": "REQUIRED",
//           "level": "ERROR",
//           "detail": {
//             "en": "'TYPE' is required",
//             "fa": " الزامی است ‏'نوع مفاصاحساب'"
//           }
//         },
//         {
//           "_id": null,
//           "field": "DESCR",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'DESCR' is missing",
//             "fa": "توضیحات ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         }
//       ]
//     },
//     "104386": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "TYPE",
//           "type": "data",
//           "code": "REQUIRED",
//           "level": "ERROR",
//           "detail": {
//             "en": "'TYPE' is required",
//             "fa": " الزامی است ‏'نوع مفاصاحساب'"
//           }
//         },
//         {
//           "_id": null,
//           "field": "DESCR",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'DESCR' is missing",
//             "fa": "توضیحات ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         }
//       ]
//     },
//     "104387": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "TYPE",
//           "type": "data",
//           "code": "REQUIRED",
//           "level": "ERROR",
//           "detail": {
//             "en": "'TYPE' is required",
//             "fa": " الزامی است ‏'نوع مفاصاحساب'"
//           }
//         },
//         {
//           "_id": null,
//           "field": "DESCR",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'DESCR' is missing",
//             "fa": "توضیحات ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         }
//       ]
//     },
//     "104388": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "TYPE",
//           "type": "data",
//           "code": "REQUIRED",
//           "level": "ERROR",
//           "detail": {
//             "en": "'TYPE' is required",
//             "fa": " الزامی است ‏'نوع مفاصاحساب'"
//           }
//         },
//         {
//           "_id": null,
//           "field": "DESCR",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'DESCR' is missing",
//             "fa": "توضیحات ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         }
//       ]
//     },
//     "113933": {
//       "non_calc": [
//         {
//           "_id": null,
//           "field": "SCAN",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'SCAN' is missing",
//             "fa": "فرم مفاصاحساب ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "DESCR",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'DESCR' is missing",
//             "fa": "توضیحات ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "OLD_ID",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'OLD_ID' is missing",
//             "fa": "شناسه قدیمی ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "ACC_SETTLE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'ACC_SETTLE' is missing",
//             "fa": "فرم تسویه حساب ناموجود است"
//           }
//         },
//         {
//           "_id": null,
//           "field": "COEF_CALCULATE",
//           "type": "data",
//           "code": "MISSING",
//           "level": "WARNING",
//           "detail": {
//             "en": "'COEF_CALCULATE' is missing",
//             "fa": "ضریب محاسبه پیمان ناموجود است"
//           }
//         }
//       ]
//     }
//   }
// }