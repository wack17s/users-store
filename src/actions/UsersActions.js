import uuid from 'uuid/v4';

import { usersToArray } from '../utils/users';

import firebase from '../utils/firebase';

export const LOAD_USERS = 'LOAD_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const REMOVE_USER = 'REMOVE_USER';

export function loadUsers() {
  return async dispatch => {
    try {
      const users = await firebase.getUsers();

      dispatch({
        type: LOAD_USERS,
        users: usersToArray(users)
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

export function addUser({ name, email }) {
  return async dispatch => {
    try {
      dispatch({
        type: ADD_USER,
        user: {
          name,
          email,
          id: uuid()
        }
      });
    } catch (error) {
      console.error('loadUsers error: ', error);
    }
  };
}

export function updateUser({ id, name, email }) {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_USER,
        user: { id, name, email }
      });
    } catch (error) {
      console.error('loadUsers error: ', error);
    }
  };
}

export function removeUser(id) {
  return async dispatch => {
    try {
      dispatch({
        type: REMOVE_USER,
        id
      });
    } catch (error) {
      console.error('loadUsers error: ', error);
    }
  };
}
