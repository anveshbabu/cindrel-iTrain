import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export function NormalTagIt({data,onDelete}) {
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <>
     {data?.map(({ label,moduleText }, i) =>   <Chip className='mb-2 me-2' key={i} label={`${moduleText} : ${label}`} onDelete={()=>onDelete(i)} />)}
    
    </>
  );
}
