export const column =[{ field: 'id', headerName: 'ID'},
    { field: 'name', headerName: 'Event name',width:200},
    { field: 'start_at', headerName: 'Start at'},
    { field: 'end_at', headerName: 'End at'},
    { field: 'sub_events', headerName: 'Sub event', type: 'number'},
    { field: 'members', headerName: 'Joined', type: 'number'},
    {
      field: 'status',
      headerName: 'Status',
      sortable: false,
    },
    {
      field: 'progress',
      headerName: 'Progress',
    },
    { field: 'created_at', type: 'date-time', headerName: 'Created At' },
    { field: 'updated_at', type: 'date-time', headerName: 'Updated At'}
  ]