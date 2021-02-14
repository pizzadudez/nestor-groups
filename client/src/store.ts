import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer, State } from './reducers';

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
const middleware = [thunk];

const composeEhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  initialState,
  composeEhancers(applyMiddleware(...middleware))
);
