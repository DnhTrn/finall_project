import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { column } from './columns/column';
import {useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import Div from "../../../div/div.jsx";
import useSettings from "../../../../../view-models/settingsVM/settingsVM.jsx";
import EventVM from "../../../../../view-models/eventVM/eventVM.jsx";


const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({ data,set }) {
  const { theme,setLoad } = useSettings();
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();
  // Sử dụng `selectionModelChange` để cập nhật trạng thái chọn
  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection);
  };
  //
  const {updateApply}=EventVM();
  //
  const handleAccess=async ()=>{
    try{
      setLoad(true);
      const {status}=await updateApply(selectedRows,true);
      setLoad(false);
      if(status){
        set(true)
      }
    }catch (e) {
      console.error(e);
    }
  }
  //
  const handleCancel=async ()=>{
    try{
      setLoad(true);
      const {status}=await updateApply(selectedRows,false);
      setLoad(false);
      if(status){
        set(true)
      }
    }catch (e) {
      console.error(e);
    }
  }
  const detail=()=>{
    navigate('/events-management/application/detail/'+selectedRows[0]);
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
            
            <Button onClick={handleCancel} variant="outlined" startIcon={<DrawOutlinedIcon />} style={{margin:'2px 0',fontSize:'10px'}} color="error" size="small">
              Cancel
            </Button>
            <Button onClick={handleAccess} variant="contained" style={{margin:'2px 0',fontSize:'10px'}} startIcon={<DrawOutlinedIcon />} size="small">
              Access
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
                        <Button onClick={detail} style={{margin:'2px 0',fontSize:'10px'}} variant="contained" color="success" startIcon={<FileOpenOutlinedIcon />} size="small">
                          Detail
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
