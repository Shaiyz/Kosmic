import types from '../types'

export const collaboratorsReducer = (
  state = { collaborators: [], error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_COLLABORATORS_REQUEST:
      return {
        loading: true,
        collaborators: [],
      }
    case types.FETCH_COLLABORATORS_SUCCESS:
      return {
        loading: false,
        collaborators: action.payload,
      }
    case types.FETCH_COLLABORATORS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export default collaboratorsReducer
