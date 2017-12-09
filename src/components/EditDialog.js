import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import validate from '../utils/validation';

export default class AddDialog extends PureComponent {
  static propTypes = {
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    isOpen: PropTypes.bool
  }

  initState = {
    name: '',
    email: '',
    errorName: '',
    errorEmail: '',
    isOpen: false
  }

  state = this.initState

  clearState = () => {
    this.setState(this.initState);
  }

  openDialog = ({ id, name, email }) => {
    this.setState({
      isOpen: true,
      id,
      name,
      email
    });
  }

  renderActions = () => {
    return [
      <RaisedButton
        secondary
        label="Delete"
        onClick={this.handleDelete}
        style={{ marginRight: 100 }}
      />,
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
    const { id, name, email } = this.state;

    const error = validate({ name, email });

    if (error) {
      this.setState({ errorName: error.name, errorEmail: error.email });

      return;
    }

    this.props.onEdit({ id, name, email });

    this.clearState();
  }

  handleCancel = () => {
    this.clearState();
  }

  handleDelete = () => {
    this.props.onDelete(this.state.id);

    this.clearState();
  }

  render() {
    const {
      isOpen,
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
          id={name}
          value={name}
          onChange={this.handleEdit.bind(null, 'name')}
          autoFocus
          errorText={errorName}
        />
        <br />
        <TextField
          id={email}
          value={email}
          onChange={this.handleEdit.bind(null, 'email')}
          errorText={errorEmail}
        />
      </Dialog>
    );
  }
}
