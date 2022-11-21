import {useState} from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { useEffect } from 'react'
import axios from 'axios'
import UsersTableHead from './UsersTableHead'
import UsersTableToolbar from './UsersTableToolbar'
import { fullConfig } from '../../utils/rxConfig'
import LinearLoading from '../LinearLoading'
import {useNavigate} from 'react-router-dom'
import useAuthContext from '../../hooks/useAuthContext'

const descendingComparator = (a, b, orderBy) => {
  return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export default function UsersTable({user}) {
  const {clearUser, block:blockInContext} = useAuthContext()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    getUsersFromDB()
  }, [])

  const getUsersFromDB = async() => {
    try{
      setLoading(true)
      const res = await axios.get('/api/users')
      setLoading(false)
      setAllUsers(res.data.data)
    }catch(error){
      setLoading(false)
      console.error(error)
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = ({ target }) => {
    setSelected(target.checked ? allUsers : [])
  }

  const handleClick = (clickedUser) => {
    const doesAlreadyExist = selected.find(
      (elem) => elem._id === clickedUser._id
    )
    if (!doesAlreadyExist) {
      setSelected([...selected, clickedUser])
      return
    }
    setSelected(selected.filter((elem) => elem._id !== clickedUser._id))
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const blockLocally = () => {
    setAllUsers(
      allUsers.map((currUser) => {
        const foundUser = selected.find((curr) => curr._id === currUser._id)
        if (!foundUser) return currUser
        foundUser.isBlocked = !foundUser.isBlocked
        return foundUser
      })
    )
  }

  const sendBlockRequest = async(params) => {
    try{
      setLoading(true)
      await axios.put('/api/users', {users: selected}, fullConfig)
      setLoading(false)
    }catch(error){
      setLoading(false)
      console.error(error)
    }
  }

  const handleSelfBlock = () => {
    if(selected.find((blocked=>blocked._id === user._id))){
      navigate('/login')
    }
  }

  const handleBlock = async() => {
    if(!window.confirm('Are you sure?')) return
    blockLocally()
    await sendBlockRequest()
    blockInContext()
    handleSelfBlock()
    setSelected([])
  }

  const deleteLocally = () => {
    if (selected.length === allUsers.length) {
      setAllUsers([])
      return
    } 
    setAllUsers(
      allUsers.filter(
        (currUser) =>
          !selected.find((deletedUser) => deletedUser._id === currUser._id)
      )
    )
  }

  const sendDeleteRequest = async() => {
    try {
      setLoading(true)
      await axios.put('/api/users/delete', {users: selected}, fullConfig)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const handleSuicide = () => {
    if (selected.find((killed) => killed._id === user._id)) {
      clearUser()
      navigate('/login')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return
    deleteLocally()
    await sendDeleteRequest()
    handleSuicide()
    setSelected([])
  }

  const handleRefresh = async() => await getUsersFromDB()

  const isSelected = (_id) => {
    return !!selected.find(item=>item._id === _id)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUsers.length) : 0

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <UsersTableToolbar
          numSelected={selected.length}
          onBlock={handleBlock}
          onDelete={handleDelete}
          onRefresh={handleRefresh}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size={'medium'}
          >
            <UsersTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={allUsers.length}
            />
            <TableBody>
              {allUsers
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={() => handleClick(row)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      style={{
                        background: user._id === row._id ? '#e6e6e6' : 'auto',
                      }}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align='left'>{row._id}</TableCell>
                      <TableCell align='left'>{row.email}</TableCell>
                      <TableCell align='left'>
                        {row.isBlocked ? 'blocked' : 'active'}
                      </TableCell>
                      <TableCell align='left'>
                        {row.lastLoggedDate?.toDateString?.() || 'May 24, 2022'}
                      </TableCell>
                      <TableCell align='left'>
                        {row.regDate?.toDateString?.() || 'May 24, 2022'}
                      </TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={allUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <LinearLoading show={loading} />
      </Paper>
    </Box>
  )
}
