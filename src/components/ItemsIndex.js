import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Item from './Item'
import { readItems } from '../actions'
import {List} from 'material-ui/List'

class ItemsIndex extends Component {

  componentDidMount() {
    this.props.readItems()
  }

  renderItems() {
    return _.map(this.props.items, item => {
      return <Item item={item} key={item.id} />
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

ItemsIndex = connect(mapStateToProps, { readItems })(ItemsIndex)

export default ItemsIndex