import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createItem } from '../actions'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';

class ItemAddModal extends Component {

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div>
        <FlatButton
          label="add an item"
          primary={true}
          onClick={this.handleOpen}
        />
        <Dialog
          title="Dialog With Actions"
          actions={
            [
              <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
              />,
              <FlatButton
                label="Submit"
                primary={true}
                disabled={true}
                onClick={this.handleClose}
              />
            ]
          }
          modal={true}
          open={this.state.open}
        >
          Only actions can close this dialog.
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { createItem })(ItemAddModal)
