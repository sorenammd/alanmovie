import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export const PaginationRounded=({totelPages,setPage,page})=> {
   
    const handleChange = (event, value) => {
        setPage(value);
    };
  return (
    <Stack spacing={2} >
      <Pagination  onChange={handleChange}  count={totelPages>200 ? 200 :totelPages }  page={page}variant="outlined" shape="rounded" />
    </Stack>
  );
}
