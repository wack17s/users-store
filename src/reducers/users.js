import {
  LOAD_USERS,
  ADD_USER,
  UPDATE_USER,
  REMOVE_USER
} from '../actions/UsersActions';

export default function users(state = {}, action) {
  switch (action.type) {
    case LOAD_USERS:
      return { ...state, users: action.users, error: action.error };
    case ADD_USER:
      return { ...state, users: [state.users, action.user] };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.filter(item => item.id !== action.id).concat(action.user)
      };
    case REMOVE_USER:
      return { ...state, users: state.users.filter(item => item.id !== action.id) };
    default:
      return state;
  }
}
