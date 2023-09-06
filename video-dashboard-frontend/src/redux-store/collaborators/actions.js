import types from "../types";
import backend from "../../api";
import { toast } from "react-toastify";

export const fetchCollaborators = () => async (dispatch, getState) => {
  try {
    dispatch({ type: types.FETCH_COLLABORATORS_REQUEST });
    const { data } = await backend.get("/collaborator");
    dispatch({
      type: types.FETCH_COLLABORATORS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_COLLABORATORS_FAIL,
      payload: error.response ? error.response.data.error : error.message,
    });
  }
};

export const editCollaborator = (val) => async (dispatch) => {
  try {
    const { data } = await backend.put(
      `/collaborator/${val.id}`,
      val
    );
    dispatch(fetchCollaborators());
    toast.success(data.message);
  } catch (error) {
    toast.error(error.response.data.error);
  }
};

export const addCollaborator = (val) => async (dispatch) => {
  try {
    const { data } = await backend.post(`/collaborator`, val);
    dispatch(fetchCollaborators());
    toast.success(data.message);

  } catch (error) {
    toast.error(error.response ? error.response.data.error : error.message);
  }
};
