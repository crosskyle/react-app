import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createItemInCategory } from '../actions'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'
import Dialog from 'material-ui/Dialog';

class ItemAddModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: '',
      description: '',
      weight: '',
      quantity: '',
      worn: false,
      consumable: false
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

    for (let prop in this.state) {
      if (prop !== 'open') {
        obj[prop] = this.state[prop]
      }
    }

    this.props.createItemInCategory(this.props.packId, this.props.categoryId, obj)

    this.setState({
      title: '',
      description: '',
      weight: '',
      quantity: '',
      worn: false,
      consumable: false
    });
  }

  render() {
    return (
      <div>
        <FlatButton
          label="add an item"
          primary={true}
          onClick={this.handleOpen}
        />
        <Dialog
          title="Add an Item"
          open={this.state.open}
          modal={false}
          onRequestClose={() => this.setState({open: false})}
        >
          <form onSubmit={this.onFormSubmit}>
            <TextField
              name="title"
              floatingLabelText="Name"
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value
                })
              }}
            />
            <TextField
              name="description"
              floatingLabelText="Description"
              value={this.state.description}
              onChange={(event) => {
                this.setState({
                  description: event.target.value
                })
              }}
            />
            <TextField
              name="weight"
              floatingLabelText="Weight"
              value={this.state.weight}
              onChange={(event) => {
                this.setState({
                  weight: event.target.value
                })
              }}
            />
            <TextField
              name="quantity"
              floatingLabelText="Quantity"
              value={this.state.quantity}
              onChange={(event) => {
                this.setState({
                  quantity: event.target.value
                })
              }}
            />
            <Checkbox
              name="worn"
              label="Worn"
              value={this.state.term}
              onCheck={() => {
                this.setState({
                  worn: !(this.state.worn)
                })
              }}
            />
            <Checkbox
              name="consumable"
              label="Consumable"
              onCheck={() => {
                this.setState({
                  consumable: !(this.state.consumable)
                })
              }}
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

export default connect(null, { createItemInCategory })(ItemAddModal)
