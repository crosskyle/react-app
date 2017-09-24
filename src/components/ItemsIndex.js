import _ from 'lodash'
import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './drag-n-drop/constants'
import { connect } from 'react-redux'
import { readItems, deleteItem } from '../actions'
import {List, ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle-outline'
import { grey400, red500 } from 'material-ui/styles/colors'

const itemSource = {
  beginDrag(props) {
    return {}
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    //connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class ItemsIndex extends Component {

  componentDidMount() {
    this.props.readItems()
  }

  renderItems() {
    const { connectDragSource, isDragging } = this.props

    return _.map(this.props.items, item => {
      let weight = `${item.weight} oz.`

      return connectDragSource(
        <div key={item.id} style={{ opacity: isDragging ? 0.5 : 1 }}>
          <ListItem
            primaryText={item.title}
            secondaryText={weight}
            rightIconButton={
              <IconButton
                touch={true}
                onClick={() => {this.props.deleteItem(item.id, this.props.pack)}}
              >
                <DeleteIcon color={grey400} hoverColor={red500} />
              </IconButton>
            }
            disabled={true}
          >
          </ListItem>
        </div>
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

function mapStateToProps({ items, packs, selectedPack }) {
  return { items, pack: packs[selectedPack] }
}

ItemsIndex = DragSource(ItemTypes.DRAWER_ITEM, itemSource, collect)(ItemsIndex)
ItemsIndex = connect(mapStateToProps, { readItems, deleteItem })(ItemsIndex)

export default ItemsIndex