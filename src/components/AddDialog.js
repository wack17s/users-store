import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import validate from '../utils/validation';

export default class AddDialog extends PureComponent {
  static propTypes = {
    onAddDialog: PropTypes.func,
    isOpen: PropTypes.bool
  }

  initState = {
    name: '',
    email: '',
    errorName: '',
    errorEmail: ''
  }

  state = this.initState

  clearState = () => {
    this.setState(this.initState);
  }

  renderActions = () => {
    return [
      <FlatButton label="Cancel" onClick={this.handleCancel} />,
      <FlatButton label="Apply" onClick={this.handleAdd} />
    ];
  }

  handleEdit = (key, e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ [key]: e.target.value });
  }

  handleAdd = () => {
    const { name, email } = this.state;

    const error = validate({ name, email });

    if (error) {
      this.setState({ errorName: error.name, errorEmail: error.email });

      return;
    }

    this.clearState();

    this.props.onAddDialog({ name, email });
  }

  handleCancel = () => {
    this.clearState();

    this.props.onAddDialog();
  }

  render() {
    const { isOpen } = this.props;
    const {
      name,
      email,
      errorName,
      errorEmail
    } = this.state;

    return (
      <Dialog
        title="Edit User Profile"
        actions={this.renderActions()}
        modal
        open={isOpen}
      >
        <TextField
          value={name}
          onChange={this.handleEdit.bind(null, 'name')}
          autoFocus
          errorText={errorName}
        />
        <br />
        <TextField
          value={email}
          onChange={this.handleEdit.bind(null, 'email')}
          errorText={errorEmail}
        />
      </Dialog>
    );
  }
}
