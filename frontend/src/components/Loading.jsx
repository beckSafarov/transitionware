import { CircularProgress, Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import FullyCentered from './FullyCentered'

const Loading = ({show, ...rest}) => {
  if(!show) return <></>
  return (
    <Box style={{ position: 'absolute', top: '0', right: '0', background: '#000', opacity: '0.8', width: '100%', height: '100%' }}>
      <FullyCentered top='40%'>
        <CircularProgress size={'large'} {...rest} sx={{ zIndex: '100' }} />
      </FullyCentered>
    </Box>
  )
}

export default Loading