import { useMemo, useState } from 'react'
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
import useAuthContext from '../../hooks/useAuthContext'

const descendingComparator = (a, b, orderBy) => {
  return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

export default function UsersTable({ user, onLogout }) {
  const { block: blockInContext } = useAuthContext()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [loading, setLoading] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  useEffect(() => {
    getUsersFromDB()
  }, [])

  const getUsersFromDB = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/users')
      setLoading(false)
      const newUserData = res.data.data
      setAllUsers(newUserData)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const handleRequestSort = (_, property) => {
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

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(+e.target.value)
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

  const sync = async (type = 'block') => {
    const path = `/api/users/${type === 'delete' ? 'delete' : ''}`
    try {
      setLoading(true)
      await axios.put(path, { users: selected }, fullConfig)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const handleSelectedSelf = () => {
    if (selected.find((s) => s._id === user._id)) onLogout(false)
  }

  const handleBlock = async () => {
    if (!window.confirm('Are you sure?')) return
    blockLocally()
    await sync()
    blockInContext()
    handleSelectedSelf()
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

  const handleDelete = async () => {
    if (!window.confirm('Are you sure?')) return
    deleteLocally()
    await sync('delete')
    handleSelectedSelf()
    setSelected([])
  }

  const handleRefresh = async () => await getUsersFromDB()

  const isSelected = (_id) => {
    return !!selected.find((item) => item._id === _id)
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUsers.length) : 0

  const formatDate = (dateString) => new Date(dateString).toDateString()

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
                  const lastLoggedDate = formatDate(row.lastLoggedDate)
                  const regDate = formatDate(row.regDate)
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
                      <TableCell align='left'>{lastLoggedDate}</TableCell>
                      <TableCell align='left'>{regDate}</TableCell>
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
