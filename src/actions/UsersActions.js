import api from '../api';

export const LOAD_USERS = 'LOAD_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const REMOVE_USER = 'REMOVE_USER';

export function loadUsers() {
  return async dispatch => {
    try {
      const users = api.users.get();

      dispatch({
        type: LOAD_USERS,
        users
      });
    } catch (error) {
      console.error('loadUsers error: ', error);

      dispatch({
        type: LOAD_USERS,
        error
      });
    }
  };
}

