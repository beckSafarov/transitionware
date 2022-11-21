import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import BlockIcon from '@mui/icons-material/Block'
import Tooltip from '@mui/material/Tooltip'
import RefreshIcon from '@mui/icons-material/Refresh'
import { alpha } from '@mui/material/styles'
import LinearLoading from '../LinearLoading'

const UsersTableToolbar =({numSelected, onBlock, onDelete, onRefresh})=>{

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            All Users
          </Typography>
        </>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title='Block/Unblock'>
            <IconButton onClick={onBlock}>
              <BlockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete'>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title='Refresh'>
          <IconButton onClick={onRefresh}>
            <RefreshIcon/>
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

UsersTableToolbar.defaultProps = {
  numSelected: 0, 
  onBlock: ()=>void(0),
  onDelete: ()=>void(0),
  onRefresh: ()=>void(0)
}


export default UsersTableToolbar