import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { column } from './columns/column';
import Div from "../../../../../div/div.jsx";


const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ data,set }) {
  return (
    <Div width="100%" height="450px" position="relative" overflow='hidden'>
      <Paper sx={{ height: '80%', width: '100%',fontSize:'10px'}}>
        <DataGrid
          rows={data}
          columns={column}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20]}
          onRowSelectionModelChange={(rows)=>set(rows)}
          sx={{ border: 0 }}
        />
      </Paper>
    </Div>
  );
}
