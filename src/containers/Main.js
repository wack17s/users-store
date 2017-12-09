import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import MainPage from '../components/MainPage';
import ErrorBox from '../components/ErrorBox';

import firebase from '../utils/firebase';

import * as UsersActions from '../actions/UsersActions';

class Main extends Component {
  static propTypes = {
    loadUsers: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    users: PropTypes.array,
    error: PropTypes.object
  }

  static defaultProps = {
    users: []
  }

  state = {
    error: undefined
  }

  componentWillMount() {
    this.props.loadUsers();
  }

  render() {
    const {
      users,
      error,
      addUser,
      updateUser,
      removeUser
    } = this.props;

    if (error || this.state.error) {
      return <ErrorBox />;
    }

    return (
      <MuiThemeProvider>
        <MainPage
          users={users}
          addUser={addUser}
          updateUser={updateUser}
          removeUser={removeUser}
          saveUsers={firebase.setUsers}
        />
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  const { users, error } = state.users;

  return {
    users,
    error
  };
}

export default connect(mapStateToProps, { ...UsersActions })(Main);
