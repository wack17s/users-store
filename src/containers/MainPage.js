import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as UsersActions from '../actions/UsersActions';

class MainPage extends Component {
  static propTypes = {
    loadUsers: PropTypes.func.isRequired,
    users: PropTypes.array,
    error: PropTypes.error
  }

  static defaultProps = {
    users: []
  }

  componentWillMount() {
    this.props.loadUsers();
  }

  render() {
    const { users, error } = this.props;

    return (
      <div>
        {JSON.stringify(error || users)}
      </div>
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

export default connect(mapStateToProps, { ...UsersActions })(MainPage);
