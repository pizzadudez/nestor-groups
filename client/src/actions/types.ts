export const GET_DATA = 'GET_DATA';
export const SELECT_TARGET = 'SELECT_TARGET';
export const DESELECT_TARGET = 'DESELECT_TARGET';

export const CREATE_PERSON = 'CREATE_PERSON';
export const CREATE_GROUP = 'CREATE_GROUP';
export const UPDATE_PERSON = 'UPDATE_PERSON';
export const UPDATE_GROUP = 'UPDATE_GROUP';

export interface CreatePersonData {
  first_name: string;
  last_name: string;
  job_title: string;
}
export interface CreateGroupData {
  name: string;
}
export interface UpdatePersonData {
  first_name?: string;
  last_name?: string;
  job_title?: string;
}
