import * as React from 'react';

import Box from '@mui/material/Box';
import {
  DataGrid, GridColDef, GridRowModel, GridRowsProp,
} from '@mui/x-data-grid/';

import { MAIN_THEME } from '../../utils/constants';
import { updateLineup } from '../redux/reducer';
import { useAppDispatch, useAppSelector } from '../redux/store';

const columns: GridColDef[] = [
  {
    field: 'num',
    headerName: '#',
    width: 10,
    editable: false,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'col-header',
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'col-header',
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 150,
    editable: true,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'col-header',
  },
];

function Roster() {
  const { playerCount, lineup } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const dataRows = [];
  for (let i = 0; i < playerCount; i += 1) {
    dataRows.push({
      id: i, num: i + 1, name: lineup[i].name, position: lineup[i].position,
    });
  }
  const rows: GridRowsProp = [
    ...dataRows,
  ];

  const processRowUpdate = React.useCallback(
    (newRow: GridRowModel) => {
      dispatch(updateLineup(newRow));
      return newRow;
    },
    [],
  );

  const handleProcessRowUpdateError = React.useCallback(
    (error: Error) => {
      console.log('error', error);
    },
    [],
  );

  const height = 378 + (playerCount - 8) * 40;

  return (
    <Box sx={{
      height,
      maxWidth: 352,
      m: 'auto',
      mt: 1,
      alignItems: 'center',
      justifyContent: 'center',
      '& .col-header': {
        color: MAIN_THEME.fontColor,
        backgroundColor: MAIN_THEME.color,
      },
      '& .MuiSvgIcon-root': {
        color: MAIN_THEME.fontColor,
        opacity: 0.7,
      },
      // '& .row': {
      //   color: MAIN_THEME.fontColor,
      //   backgroundColor: MAIN_THEME.color,
      // },
    }}
    >
      <DataGrid
        sx={{ maxWidth: 360 }}
        rowHeight={40}
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
        hideFooter
        hideFooterSelectedRowCount
        hideFooterPagination
        getRowClassName={() => 'row'}
      />
    </Box>
  );
}

export default Roster;
