import * as React from 'react';

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid/';

import { Player } from '../redux/dataStructure';
import {MAIN_THEME} from '../../constants'

const team = [new Player(1, 'Andre', 'S'), new Player(2, 'Michael', 'MB')]
const dataRows = [];
for (let i = 0; i < 2; i++) {
  dataRows.push({ id: i, col0: i, col1: team[i].name, col2: team[i].position })
}
console.log(dataRows)
// const rows: GridRowsProp = [
//   { id: 1, col0: 1, col1: 'Andre', col2: 'S' },
//   { id: 2, col0: 2, col1: 'Michael', col2: 'MB' },
//   { id: 3, col0: 3, col1: 'Player 3', col2: 'MB' },
//   { id: 4, col0: 4, col1: 'Player 4', col2: 'OH' },
//   { id: 5, col0: 5, col1: 'Player 5', col2: 'OH' },
//   { id: 6, col0: 6, col1: 'Player 6', col2: 'UTL' },
//   { id: 7, col0: 7, col1: 'Player 7', col2: 'OPP' },
//   { id: 8, col0: 8, col1: 'Player 8', col2: 'MB' },
// ];

const rows: GridRowsProp = [
  ...dataRows
];

const columns: GridColDef[] = [
  { field: 'col0', headerName: '#', width: 10, editable: true, headerAlign: 'center', align: 'center',headerClassName: 'col-header', },
  { field: 'col1', headerName: 'Name', width: 150, editable: true, headerAlign: 'center', align: 'center',headerClassName: 'col-header', },
  { field: 'col2', headerName: 'Position', width: 150, editable: true, headerAlign: 'center', align: 'center', headerClassName: 'col-header', },
];

const Roster = () => {
  return (
    // <div style={{ height: 600, maxWidth: 500, margin: 'auto' }}>
      <Box sx={{ 
        height: 600,
        maxWidth: 360,
        m: 'auto',
        my: 5,
        alignItems: 'center', 
        justifyContent: 'center',
        '& .col-header': {
          color: MAIN_THEME.fontColorSecondary,
          backgroundColor: MAIN_THEME.color,
        }, 
      }}>
        <DataGrid
          sx={{ maxWidth: 360}}
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          hideFooter={true}
          // hideFooterRowCount={true}
          // processRowUpdate={processRowUpdate}
          hideFooterSelectedRowCount={true}
          hideFooterPagination={true}

        />
      </Box>

    // </div>
  );
}


// const columns: GridColumns = [
//   { field: 'name', headerName: 'Name', width: 180, editable: true },
//   { field: 'age', headerName: 'Age', type: 'number', editable: true },
//   {
//     field: 'dateCreated',
//     headerName: 'Date Created',
//     type: 'date',
//     width: 180,
//     editable: true,
//   },
//   {
//     field: 'lastLogin',
//     headerName: 'Last Login',
//     type: 'dateTime',
//     width: 220,
//     editable: true,
//   },
// ];


export default Roster