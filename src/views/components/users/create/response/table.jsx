import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { column } from './columns/column';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import useSettings from "../../../../../view-models/settingsVM/settingsVM.jsx";
import EventVM from "../../../../../view-models/eventVM/eventVM.jsx";
import useConfirm from "../../../../../view-models/confirm/useConfirm.jsx";
import Div from "../../../div/div.jsx";
import UserVM from "../../../../../view-models/userVM/userVM.jsx";

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({createData,setRes, data, set }) {
    const { theme, setLoad } = useSettings();
    const [selectedRows, setSelectedRows] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const {getConfirm}=useConfirm();
    const {create}=UserVM();

    // Xử lý cập nhật lựa chọn
    const handleSelectionModelChange = (newSelection) => {
        setSelectedRows(newSelection);
        setRowSelectionModel(newSelection);
        set(newSelection);
        console.log(newSelection);
    };
    const handleCreate=async ()=>{
        try{
            setLoad(true);
            const {status,list}= await create(createData);
            setRes(list);
            setLoad(false);
        }catch (e) {
            console.log("UI: "+e);
        }
    }

    return (
        <Div width="100%" height="100%" position="relative" overflow="hidden">
            <Paper sx={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={column}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[10, 20, 30, 50, 100]}
                    checkboxSelection={true}
                    rowSelectionModel={rowSelectionModel} // Liên kết với state
                    onRowSelectionModelChange={handleSelectionModelChange}
                    sx={{ border: 0 }}
                />
            </Paper>
            <AnimatePresence>
                {selectedRows.length > 0 && (
                    <Div
                        initial={{ opacity: 0, x: '-100px' }}
                        animate={{ opacity: 1, x: '0' }}
                        exit={{ opacity: 0, x: '100px' }}
                        column={true}
                        position="absolute"
                        top="30px"
                        right="10px"
                        zIndex="100"
                        transition="height 0.5s ease"
                    >
                        <Button
                            variant="contained"
                            style={{ margin: '2px 0', fontSize: '10px' }}
                            onClick={handleCreate}
                            color="primary"
                            size="small"
                        >
                            Create
                        </Button>
                    </Div>
                )}
            </AnimatePresence>
        </Div>
    );
}
