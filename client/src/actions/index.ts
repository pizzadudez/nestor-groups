import axios from 'axios';
import { Dispatch } from 'redux';
import { Group, Person, State } from '../reducers';
import {
  GET_DATA,
  DESELECT_TARGET,
  SELECT_TARGET,
  CreatePersonData,
  CreateGroupData,
  UpdatePersonData,
} from './types';

export const fetchData = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('/api/data');
    dispatch({ type: GET_DATA, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const selectTarget = (payload: Group | Person | undefined) => (
  dispatch: Dispatch,
  getState: () => State
) => {
  const { selected, selectedType } = getState();
  const type = (payload as any).name ? 'group' : 'person';
  if (selected && selected!.id === payload!.id && selectedType === type) {
    dispatch({ type: DESELECT_TARGET });
  } else {
    dispatch({ type: SELECT_TARGET, payload });
  }
};
export const changeGroup = (id: number) => async (
  dispatch: Dispatch,
  getState: () => State
) => {
  const { selected, selectedType } = getState();
  const { data } = await axios.patch(`/api/${selectedType}/${selected!.id}`, {
    belongs_to: id,
  });
  dispatch({ type: GET_DATA, payload: data });
};

export const createPerson = (data: CreatePersonData) => async (
  dispatch: Dispatch
) => {
  await axios.post('/api/persons', data);
  const { data: newData } = await axios.get('/api/data');
  dispatch({ type: GET_DATA, payload: newData });
};
export const createGroup = (data: CreateGroupData) => async (
  dispatch: Dispatch
) => {
  await axios.post('/api/groups', data);
  const { data: newData } = await axios.get('/api/data');
  dispatch({ type: GET_DATA, payload: newData });
};
export const updatePerson = (id: number, data: UpdatePersonData) => async (
  dispatch: Dispatch
) => {
  const parsedData = {
    first_name: data.first_name,
    last_name: data.last_name,
    job_title: data.job_title,
  };
  await axios.patch(`/api/person/${id}`, parsedData);
  const { data: newData } = await axios.get('/api/data');
  dispatch({ type: GET_DATA, payload: newData });
};
export const updateGroup = (id: number, data: CreateGroupData) => async (
  dispatch: Dispatch
) => {
  const parsedData = { name: data.name };
  console.log(parsedData);
  await axios.patch(`/api/group/${id}`, parsedData);
  const { data: newData } = await axios.get('/api/data');
  dispatch({ type: GET_DATA, payload: newData });
};
