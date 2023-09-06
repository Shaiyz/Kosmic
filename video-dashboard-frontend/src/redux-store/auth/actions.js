import types from '../types'
import backend from '../../api'
import { toast } from 'react-toastify'

export const userLogin = (payload) => {
  return {
    type: types.USER_LOGIN,
    payload,
  }
}

export const userLogout = () => {
  return {
    type: types.USER_LOGOUT,
  }
}

export const setAuthError = (error) => {
  return {
    type: types.SET_AUTH_ERROR,
    payload: error.message,
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    let cred = {
      email: email,
      password: password,
    }

    const { data } = await backend.post('/user/signin', cred)
    toast.success(data.message)

    dispatch({
      type: types.USER_LOGIN,
      payload: data.data,
    })

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.data))
  } catch (error) {
    dispatch({
      type: types.SET_AUTH_ERROR,
      payload: error.response ? error.response.data.error : error.message,
    })
    toast.error(error.response ? error.response.data.message : error.message)
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  dispatch(userLogout())
}
