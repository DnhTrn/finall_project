import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Div from '../../div/div';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useSettings from '../../../../view-models/settingsVM/settingsVM';
import { column } from './columns/column';
import {useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';

import { cyan } from '@mui/material/colors';


const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({ data }) {
  const { theme } = useSettings();
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  // Sử dụng `selectionModelChange` để cập nhật trạng thái chọn
  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection);
  };
  const detail=()=>{
    navigate('/events-management/event/detail/'+selectedRows[0]);
  }
  const change=()=>{
    navigate('/events-management/event/change/'+selectedRows[0]);
  }
  return (
    <Div width="100%" height="100%" position="relative" overflow='hidden'>
      <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={data}
          columns={column}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 20]}
          onRowSelectionModelChange={(rows)=>handleSelectionModelChange(rows)}
          checkboxSelection={true}
          sx={{ border: 0 }}
        />
      </Paper>
      <AnimatePresence>
        {selectedRows.length > 0 && (
          <Div
            initial={{opacity:0,x:'-100px'}}
            animate={{opacity:1,x:'0'}}
            exit={{opacity:0,x:'100px'}}
            column={true}
            position="absolute"
            top="30px"
            right="10px"
            zIndex='100'
            transition='height 0.5s ease'
          >
            
            <Button variant="contained" startIcon={<DeleteIcon />} color="error" size="small">
              Delete
            </Button>
            <AnimatePresence>
              {selectedRows.length === 1 && (
                <>
                  <Div
                      initial={{opacity:0,x:'-100px'}}
                      animate={{opacity:1,x:'0'}}
                      exit={{opacity:0,x:'100px'}}
                      column={true}
                      >
                        <Button onClick={detail} variant="contained" color="success" startIcon={<FileOpenOutlinedIcon />} size="small">
                          Detail
                        </Button>
                        <Button onClick={change} variant="contained" startIcon={<DrawOutlinedIcon />} size="small">
                          Edit
                        </Button>
                  </Div>
                </>
              )}
            </AnimatePresence>
          </Div>
        )}
      </AnimatePresence>
    </Div>
  );
}
