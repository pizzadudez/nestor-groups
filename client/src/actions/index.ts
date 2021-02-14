import axios from 'axios';
import { Dispatch } from 'redux';
import { GET_DATA } from './types';

export const fetchData = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('/api/data');
    dispatch({ type: GET_DATA, payload: data });
  } catch (err) {
    console.log(err);
  }
};
