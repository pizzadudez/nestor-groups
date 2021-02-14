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

export interface Selection {
  type: string | undefined;
  id: number | undefined;
  belongs_to: number | undefined;
}
export interface State {
  selection: Selection;
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
  selection: {
    type: undefined,
    id: undefined,
    belongs_to: undefined,
  },
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
        selection: {
          type: undefined,
          id: undefined,
          belongs_to: undefined,
        },
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
        selection: {
          type: action.payload.type,
          id: action.payload.id,
          belongs_to: action.payload.belongs_to,
        },
      };
    }
    case DESELECT_TARGET:
      return {
        ...state,
        selection: {
          type: undefined,
          id: undefined,
          belongs_to: undefined,
        },
      };
    default: {
      return state;
    }
  }
};
