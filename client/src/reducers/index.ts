import { GET_DATA } from '../actions/types';

export interface Group {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  belongs_to: number | null;
  subgroups: number[] | null;
  persons: number[] | null;
}

export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  job_title: string;
  created_at: string;
  updated_at: string;
  belongs_to: number | null;
}

export interface State {
  groups: Group[];
  persons: Person[];
  groupsById: any;
  personsById: any;
}

type Action = {
  type: string;
  payload: any;
};

const initialState: State = {
  groups: [],
  persons: [],
  groupsById: {},
  personsById: {},
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_DATA: {
      return {
        ...action.payload,
        groupsById: Object.fromEntries(
          action.payload.groups.map((group: Group) => [group.id, group])
        ),
        personsById: Object.fromEntries(
          action.payload.persons.map((person: Person) => [person.id, person])
        ),
      };
    }
    default: {
      return state;
    }
  }
};
