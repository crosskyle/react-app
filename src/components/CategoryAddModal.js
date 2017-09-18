import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCategory } from '../actions'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'

class CategoryAddModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: '',
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  onFormSubmit(event) {
    event.preventDefault();

    let obj = {}

    obj.title = this.state.title

    this.props.createCategory(this.props.packId, obj)

    this.setState({
      title: '',
    });
  }

  render() {
    return (
      <div>
        <FlatButton
          label="add a category"
          primary={true}
          onClick={this.handleOpen}
        />
        <Dialog
          title="Add a Category"
          open={this.state.open}
          modal={false}
          onRequestClose={() => this.setState({open: false})}
        >
          <form onSubmit={this.onFormSubmit}>
            <TextField
              name="title"
              floatingLabelText="Name"
              value={this.state.title}
              onChange={(event) => {this.setState({title: event.target.value})}}
            />
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />
            <FlatButton
              type="submit"
              label="Submit"
              primary={true}
              onClick={this.handleClose}
            />
          </form>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { createCategory })(CategoryAddModal)
