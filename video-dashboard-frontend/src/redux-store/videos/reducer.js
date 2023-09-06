import types from '../types'

export const videosReducer = (
  state = { videos: [], error: null },
  action
) => {
  switch (action.type) {
    case types.FETCH_VIDEOS_REQUEST:
      return {
        loading: true,
        videos: [],
      }
    case types.FETCH_VIDEOS_SUCCESS:
      return {
        loading: false,
        videos: action.payload,
      }
    case types.FETCH_VIDEOS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export default videosReducer
