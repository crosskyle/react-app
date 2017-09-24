import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './drag-n-drop/constants'
import { deleteItem, putItemInCategory } from '../actions'
import { ListItem } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui/svg-icons/content/remove-circle-outline'
import { grey400, red500 } from 'material-ui/styles/colors'

const itemSource = {
  beginDrag(props) {
    return props.item
  },

  endDrag(props, monitor) {
    const categoryEndpoint = monitor.getDropResult().self
    const itemId = props.item.id
    props.putItemInCategory(categoryEndpoint, itemId)
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Item extends Component {

  render() {
    const { connectDragSource, isDragging, item } = this.props
    const weight = `${item.weight} oz.`

    return connectDragSource(
      <div  style={{ opacity: isDragging ? 0.5 : 1 }}>
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
  }
}


Item = DragSource(ItemTypes.DRAWER_ITEM, itemSource, collect)(Item)
Item = connect(null, { deleteItem, putItemInCategory })(Item)

export default Item