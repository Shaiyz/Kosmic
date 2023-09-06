import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import { authReducer, collaboratorReducer, videosReducer } from '.'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

const initialState = {
  auth: {
    user: userFromStorage,
  },
}

const store = createStore(
  combineReducers({
    auth: authReducer,
    collaborators:collaboratorReducer,
    videos:videosReducer
  }),
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

export default store
