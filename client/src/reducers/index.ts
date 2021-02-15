import { DESELECT_TARGET, GET_DATA, SELECT_TARGET } from '../actions/types';

export interface Group {
  id: number;
  name: string;
  level: number;
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
  selected: Person | Group | undefined;
  selectedType: string | undefined;
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
  selected: undefined,
  selectedType: undefined,
  groups: [],
  persons: [],
  groupsById: {},
  personsById: {},
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        selected: undefined,
        selectedType: undefined,
        ...action.payload,
        groupsById: Object.fromEntries(
          action.payload.groups.map((group: Group) => [group.id, group])
        ),
        personsById: Object.fromEntries(
          action.payload.persons.map((person: Person) => [person.id, person])
        ),
      };
    case SELECT_TARGET: {
      return {
        ...state,
        selected: action.payload,
        selectedType: action.payload.name ? 'group' : 'person',
      };
    }
    case DESELECT_TARGET:
      return {
        ...state,
        selected: undefined,
        selectedType: undefined,
      };
    default: {
      return state;
    }
  }
};
