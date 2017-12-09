import * as firebase from 'firebase';

import { usersToObject } from './users';

import config from '../etc/config';

class Firebase {
  constructor() {
    this.init();

    this.database = firebase.database();
  }

  init = () => {
    firebase.initializeApp(config);
  }

  getUsers = async () => {
    try {
      const snapshot = await firebase.database().ref('users/').once('value');

      return snapshot.val();
    } catch (error) {
      console.error('Firebase get users setUsers error: ', error);
    }
  }

  setUsers = users => {
    try {
      firebase.database().ref('users/').set(usersToObject(users));

      return true;
    } catch (error) {
      console.error('Firebase set users setUsers error: ', error);

      return false;
    }
  }
}

export default new Firebase();
