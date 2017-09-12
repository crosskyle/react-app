import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { readItems, deleteItem } from '../actions'
import {List, ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle-outline'
import { grey400, red500 } from 'material-ui/styles/colors'


class ItemsIndex extends Component {

  componentDidMount() {
    this.props.readItems()
  }

  renderItems() {
    return _.map(this.props.items, item => {
      let weight = `${item.weight} oz.`

      return (
        <ListItem
          primaryText={item.title}
          secondaryText={weight}
          key={item.id}
          rightIconButton={
            <IconButton
              touch={true}
              onClick={() => { this.props.deleteItem(item.id) }}
            >
              <DeleteIcon color={grey400} hoverColor={red500} />
            </IconButton>
          }
          disabled={true}
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
            <h3>Items</h3>
          </div>
        </div>
        <List>
          {this.renderItems()}
        </List>
      </div>
    )
  }
}

function mapStateToProps({ items }) {
  return { items }
}

export default connect(mapStateToProps, { readItems, deleteItem })(ItemsIndex)
