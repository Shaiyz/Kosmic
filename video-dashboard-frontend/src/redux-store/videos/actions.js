import types from "../types";
import backend from "../../api";
import { toast } from "react-toastify";

export const fetchVideos = () => async (dispatch, ) => {
  try {
    dispatch({ type: types.FETCH_VIDEOS_REQUEST });
    const { data } = await backend.get("/video");
    dispatch({
      type: types.FETCH_VIDEOS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_VIDEOS_FAIL,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};



export const addCollaborator = (val) => async (dispatch) => {
  try {
    const { data } = await backend.post(`/collaborator`, val);
    dispatch(fetchVideos());
  } catch (error) {
    toast.error(error.response ? error.response.data.error : error.message);
  }
};
