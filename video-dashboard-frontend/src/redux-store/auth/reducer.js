import types from '../types'

const initialState = {
  user: null,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
    case types.USER_LOGIN:
      return { ...state, user: action.payload }
    case types.USER_LOGOUT:
      return initialState
    case types.SET_AUTH_ERROR:
      return { ...state, error: action.payload }
  }
}

export default authReducer
