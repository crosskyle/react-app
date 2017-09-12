import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { readPacks, selectedPack, createPack } from '../actions'
import FlatButton from 'material-ui/FlatButton'
import {List, ListItem } from 'material-ui/List'


class PacksIndex extends Component {

  componentDidMount() {
    this.props.readPacks()
  }

  renderPacks() {
    return _.map(this.props.packs, pack => {
      return (
        <ListItem
          onClick= {
            () => {
              this.props.onPackSelect()
              this.props.selectedPack(pack.id)
            }
          }
          primaryText={pack.title}
          key={pack.id}
        >
        </ListItem>
      )
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row around-sm">
          <div className="col">
            <h3>Packs</h3>
          </div>
          <div className="col">
            <FlatButton
              onClick={() => this.props.createPack()}
              label="add a pack"
              primary={true}
              style={{marginTop: 12}}
            />
          </div>
        </div>
        <List>
          {this.renderPacks()}
        </List>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { packs: state.packs }
}

//using readPacks: readPacks instead of mapDispatch
export default connect(mapStateToProps, { createPack, readPacks, selectedPack })(PacksIndex)