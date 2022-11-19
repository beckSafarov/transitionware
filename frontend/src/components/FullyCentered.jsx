import React from 'react'
import Box from '@mui/system/Box'

const FullyCentered = ({top, left, children, style}) => {
  return (
    <Box
      sx={{ transform: 'translate(-50%, -50%)' }}
      position='absolute'
      top={top}
      left={left}
      textAlign='center'
      style={style}
    >
      {children}      
    </Box>
  )
}

FullyCentered.defaultProps = {
  top: '30%',
  left: '50%',
  style: {}
}

export default FullyCentered