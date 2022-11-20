import { Alert, Box } from '@mui/material'
import React from 'react'

const AlertBox = ({children, severity}) => {
  if(!children) return <></>
  return (
    <Box style={{padding: '20px 0'}}>
      <Alert severity={severity}>{children}</Alert>
    </Box>
  )
}

AlertBox.defaultProps = {
  severity: 'error'
}

export default AlertBox