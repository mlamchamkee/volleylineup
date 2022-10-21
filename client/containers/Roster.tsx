import * as React from 'react';

import Box from '@mui/material/Box';
import {
  DataGrid, GridColDef, GridRowModel, GridRowsProp,
} from '@mui/x-data-grid/';

import { MAIN_THEME } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { updateLineup } from '../redux/reducer';

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
  const { lineup } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const dataRows = [];
  for (let i = 0; i < 6; i++) {
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

  return (
  // <div style={{ height: 600, maxWidth: 500, margin: 'auto' }}>
    <Box sx={{
      height: 328,
      maxWidth: 352,
      m: 'auto',
      my: 5,
      alignItems: 'center',
      justifyContent: 'center',
      '& .col-header': {
        color: MAIN_THEME.fontColorSecondary,
        backgroundColor: MAIN_THEME.color,
      },
    }}
    >
      <DataGrid
        sx={{ maxWidth: 360 }}
        rowHeight={45}
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
        hideFooter
          // hideFooterRowCount={true}
        hideFooterSelectedRowCount
        hideFooterPagination
      />
    </Box>
  // </div>
  );
}

export default Roster;
