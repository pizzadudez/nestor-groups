import axios from 'axios';
import { Dispatch } from 'redux';
import { Selection, State } from '../reducers';
import { DESELECT_TARGET, GET_DATA, SELECT_TARGET } from './types';

export const fetchData = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('/api/data');
    dispatch({ type: GET_DATA, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const selectTarget = (payload: Selection) => (
  dispatch: Dispatch,
  getState: () => State
) => {
  const { id, type } = getState().selection;
  if (type === payload.type && id === payload.id) {
    dispatch({ type: DESELECT_TARGET });
  } else {
    dispatch({ type: SELECT_TARGET, payload });
  }
};
export const changeGroup = (id: number) => async (
  dispatch: Dispatch,
  getState: () => State
) => {
  const { id: targetId, type } = getState().selection;
  const { data } = await axios.patch(`/api/${type}/${targetId}`, {
    belongs_to: id,
  });
  dispatch({ type: GET_DATA, payload: data });
};
