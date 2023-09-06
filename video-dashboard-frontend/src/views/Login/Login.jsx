import { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import { authActions } from '../../redux-store'
import FormField from '../../components/Formfeild/Formfeild'
import { Redirect } from 'react-router-dom'
import Alert from '../../components/Alert/Alert'


const useStyles = makeStyles((theme) => ({
  loginPage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginCard: {
    margin: '40px 0',
    padding: '20px 0',
    width: 320,
  },
}))

const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { user, error } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(authActions.login(email, password))
   }
  if (user) {
    return <Redirect to='dashboard' />
  }

  return (
    <div className={classes.loginPage}>
      <Card className={classes.loginCard}>
        <CardContent>
          <Typography variant='h4' align='center'>
            Login
          </Typography>
          <br />
          {error && <Alert variant='error'>{error}</Alert>}
          <form onSubmit={loginHandler}>
            <FormField
              label='Email'
              elementConfig={{ type: 'text' }}
              value={email}
              valueChanged={(e) => setEmail(e.target.value)}
              required
            />
            <FormField
              label='Password'
              elementConfig={{ type: 'password' }}
              value={password}
              valueChanged={(e) => setPassword(e.target.value)}
              required
            />
            <Button type='submit' variant='contained' color='primary'>
              Login
            </Button>
          </form>
          <br />
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
