import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import AddDialog from './AddDialog';
import EditDialog from './EditDialog';

export default class MainPage extends PureComponent {
  static propTypes = {
    users: PropTypes.array.isRequired,
    addUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    removeUser: PropTypes.func.isRequired,
    saveUsers: PropTypes.func.isRequired,
  }

  state = {
    isAddOpen: false,
    showSaveButton: false
  }

  handleOpenEdit = user => {
    this.edit.openDialog(user);
  }

  handleEditKeyPress = (e, user) => {
    if (e.charCode === 13) {
      e.preventDefault();
      e.stopPropagation();

      this.handleOpenEdit(user);
    }
  }

  handleOpenAdd = e => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ isAddOpen: true });
  }

  handleAddDialog = user => {
    if (user) {
      this.props.addUser(user);

      this.setState({ showSaveButton: true });
    }

    this.setState({ isAddOpen: false });
  }

  handleEdit = user => {
    if (user) {
      this.props.updateUser(user);

      this.setState({ showSaveButton: true });
    }
  }

  handleDelete = userId => {
    if (userId) {
      this.props.removeUser(userId);

      this.setState({ showSaveButton: true });
    }
  }

  handleSave = e => {
    const { saveUsers, users } = this.props;

    e.preventDefault();
    e.stopPropagation();

    const status = saveUsers(users);

    if (status) {
      this.setState({ saveStatus: 'Done' });
    } else {
      this.setState({ saveStatus: 'Failed' });
    }

    setTimeout(() => this.setState({ saveStatus: '', showSaveButton: false }), 2500);
  }

  renderUsersList = () => {
    return this.props.users.map((user, index) => (
      <ListItem
        key={index}
        primaryText={user.name}
        secondaryText={user.email}
        onClick={this.handleOpenEdit.bind(null, user)}
        onKeyPress={this.handleEditKeyPress.bind(null, user)}
      />
    ));
  }

  render() {
    const { isAddOpen, saveStatus, showSaveButton } = this.state;

    return (
      <List>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Users" />
          </ToolbarGroup>
          <ToolbarGroup>
            {saveStatus && <FlatButton disabled label={saveStatus} />}
            <FlatButton
              disabled={!!saveStatus || !showSaveButton}
              label="Save"
              onClick={this.handleSave}
            />
          </ToolbarGroup>
        </Toolbar>
        <Divider />
        {this.renderUsersList()}
        <Divider />
        <RaisedButton label="+" fullWidth onClick={this.handleOpenAdd} />

        <AddDialog onAddDialog={this.handleAddDialog} isOpen={isAddOpen} />
        <EditDialog
          ref={editDialog => { this.edit = editDialog; }}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </List>
    );
  }
}
