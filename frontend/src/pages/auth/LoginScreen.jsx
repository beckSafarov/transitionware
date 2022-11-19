import React from 'react'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import FullyCentered from '../../components/FullyCentered'
import LinearLoading from '../../components/LinearLoading'

const SignUp = () => {
  const [values, setValues] = useState({})
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
  }
  return (
    <FullyCentered top={'40%'}>
      <h1>Log in</h1>
      <LinearLoading show={loading}/>
      <form onSubmit={handleSubmit} style={{ minWidth: '500px' }}>
        <Stack direction='column' spacing={3}>
          <TextField
            onChange={handleChange}
            value={values.email}
            name={'email'}
            type='text'
            label={'Email'}
            variant='standard'
            required
          />
          <TextField
            onChange={handleChange}
            value={values.password}
            type='password'
            name={'password'}
            label={'Password'}
            variant='standard'
            required
          />
          <Button
            type='submit'
            variant='contained'
            style={{ width: '100%', marginTop: '40px' }}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </FullyCentered>
  )
}

export default SignUp
