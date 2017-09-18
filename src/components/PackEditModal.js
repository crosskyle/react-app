import React, { Component } from 'react'
import EditIcon from 'material-ui/svg-icons/content/create'
import IconButton from 'material-ui/IconButton'
import { connect } from 'react-redux'
import { updatePack } from '../actions'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'

class PackEditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: '',
      description: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onFormSubmit(event) {
    event.preventDefault()

    let obj = {}

    obj.title = this.state.title
    obj.description = this.state.description

    this.props.updatePack(this.props.pack.id, obj)

    this.setState({
      title: '',
      description: ''
    })
  }

  render() {
    return (
      <div>
        <span style={{textAlign: 'left', marginLeft: 30}}>{this.props.pack.title}</span>
        <IconButton
          onClick={() => this.setState({open: true})}
          style={{ paddingLeft: '20em', paddingRight: '0em',
            verticalAlign: 'middle', textAlign: 'right'}}
        >
          <EditIcon/>
        </IconButton>
        <Dialog
          title="Edit Pack"
          open={this.state.open}
          modal={false}
          onRequestClose={() => this.setState({open: false})}
        >
          <form onSubmit={this.onFormSubmit}>
            <TextField
              name="title"
              floatingLabelText="Name"
              value={this.state.title}
              onChange={(e) => {this.setState({title: e.target.value})}}
            />
            <TextField
              name="description"
              floatingLabelText="Description"
              value={this.state.description}
              onChange={(e) => {this.setState({description: e.target.value})}}
            />
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={() => this.setState({open: false})}
            />
            <FlatButton
              type="submit"
              label="Submit"
              primary={true}
              onClick={() => this.setState({open: false})}
            />
          </form>
        </Dialog>
      </div>
    )
  }
}

export default connect(null, { updatePack })(PackEditModal)