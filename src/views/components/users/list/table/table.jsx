import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Div from '../../div/div';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import useSettings from '../../../../view-models/settingsVM/settingsVM';
import { column } from './columns/column';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';

import { cyan } from '@mui/material/colors';
import EventVM from "../../../../view-models/eventVM/eventVM.jsx";
import useConfirm from "../../../../view-models/confirm/useConfirm.jsx";

const paginationModel = { page: 0, pageSize: 10 };

export default function DataTable({ data, set }) {
    const { theme, setLoad } = useSettings();
    const [selectedRows, setSelectedRows] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);
    const { deleteEvents } = EventVM();
    const {getConfirm}=useConfirm();
    const navigate = useNavigate();

    // Xử lý cập nhật lựa chọn
    const handleSelectionModelChange = (newSelection) => {
        setSelectedRows(newSelection);
        setRowSelectionModel(newSelection);
        console.log(newSelection);
    };

    // Hàm xóa
    const handleDelete = async () => {
        try {
            setLoad(true);
            const { status } = await deleteEvents(selectedRows);
            setLoad(false);
            if (status) {
                set(true);
                setSelectedRows([]);
                setRowSelectionModel([]); // Reset lựa chọn của DataGrid
            }
        } catch (e) {
            setLoad(false);
        }
    };

    // Hàm xem chi tiết
    const detail = () => {
        navigate('/events-management/event/detail/' + selectedRows[0]);
    };

    // Hàm chỉnh sửa
    const change = () => {
        navigate('/events-management/event/change/' + selectedRows[0]);
    };

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
                            onClick={()=>getConfirm('warning','delete',handleDelete)}
                            startIcon={<DeleteIcon />}
                            color="error"
                            size="small"
                        >
                            Delete
                        </Button>
                        <AnimatePresence>
                            {selectedRows.length === 1 && (
                                <>
                                    <Div
                                        initial={{ opacity: 0, x: '-100px' }}
                                        animate={{ opacity: 1, x: '0' }}
                                        exit={{ opacity: 0, x: '100px' }}
                                        column={true}
                                    >
                                        <Button
                                            onClick={detail}
                                            style={{ margin: '2px 0', fontSize: '10px' }}
                                            variant="contained"
                                            color="success"
                                            startIcon={<FileOpenOutlinedIcon />}
                                            size="small"
                                        >
                                            Detail
                                        </Button>
                                        <Button
                                            onClick={change}
                                            style={{ margin: '2px 0', fontSize: '10px' }}
                                            variant="contained"
                                            startIcon={<DrawOutlinedIcon />}
                                            size="small"
                                        >
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
