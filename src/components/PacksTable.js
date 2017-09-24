import React, { Component } from 'react'
import { ItemTypes } from './drag-n-drop/constants'
import { DropTarget } from 'react-dnd'
import _ from 'lodash'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import FontIcon from 'material-ui/FontIcon'

import ItemAddModal from './ItemAddModal'

const columnStyle = {
  marginLeft: '0em',
  paddingLeft: '.25em',
  marginRight: '0em',
  paddingRight: '.25em',
  verticalAlign: 'middle',
  textAlign: 'left'
}

const categoryTarget = {
  canDrop() {
    return true
  },

  drop(props) {
    return props.category
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    getItem: monitor.getItem()
  }
}

class PacksTable extends Component {

  renderItems(category) {
    return _.map(category.items, item => {

      let wornColor = (item.worn) ? 'blue' : '#D3D3D3'
      let consumableColor = (item.consumable) ? 'blue' : '#D3D3D3'

      return (
        <TableRow key={item.id} hoverable={true}>
          <TableRowColumn style={{
            marginLeft: '0em',
            paddingLeft: '.5em',
            marginRight: '0em',
            paddingRight: '.25em',
            verticalAlign: 'middle',
            textAlign: 'left'}} colSpan="12">{item.title}</TableRowColumn>
          <TableRowColumn style={columnStyle} colSpan="12">{item.description}</TableRowColumn>
          <TableRowColumn style={columnStyle} colSpan="3">{item.weight}</TableRowColumn>
          <TableRowColumn style={columnStyle} colSpan="2">{item.quantity}</TableRowColumn>
          <TableRowColumn style={columnStyle} colSpan="4">
            <FontIcon className="material-icons" style={{color:wornColor, fontSize:"18px"}}>accessibility</FontIcon>
            <FontIcon className="material-icons" style={{color:consumableColor, fontSize:"16px"}}>restaurant_menu</FontIcon></TableRowColumn>
          <TableHeaderColumn colSpan="2"
            style={columnStyle} >
            <IconMenu
              iconButtonElement={
                <IconButton  style={columnStyle}>
                  <MoreVertIcon />
                </IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <MenuItem primaryText="Edit" />
              <MenuItem primaryText="Remove" />
            </IconMenu>
          </TableHeaderColumn>
        </TableRow>
      )
    })
  }

  renderOverlay(color) {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }


  render() {
    const { category, packId, connectDropTarget, isOver, canDrop } = this.props

    return connectDropTarget(
      <div style={{ paddingLeft: '.5em', paddingRight: '.5em'}} >

      <Table
        fixedHeader={true}
        onRowHover={(d) =>  {}/* console.log(category.items[d])*/}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow >
        <TableHeaderColumn colSpan="35" style={{fontSize: '14px'}}>
          {category.title}
        </TableHeaderColumn>
      </TableRow>
      <TableRow>
        <TableHeaderColumn style={{
          marginLeft: '0em',
          paddingLeft: '.5em',
          marginRight: '0em',
          paddingRight: '.25em',
          verticalAlign: 'middle',
          textAlign: 'left'}} colSpan="12">Name</TableHeaderColumn>
        <TableHeaderColumn style={columnStyle} colSpan="12">Description</TableHeaderColumn>
        <TableHeaderColumn style={columnStyle} colSpan="3">Oz</TableHeaderColumn>
        <TableHeaderColumn style={columnStyle} colSpan="2">Qty</TableHeaderColumn>
        <TableHeaderColumn style={columnStyle} colSpan="4"> </TableHeaderColumn>
        <TableHeaderColumn style={columnStyle} colSpan="2"> </TableHeaderColumn>
      </TableRow>
      </TableHeader>
      <TableBody showRowHover={true} displayRowCheckbox={false}>

      {this.renderItems(category)}

      </TableBody>
      </Table>
      {isOver && canDrop && this.renderOverlay('green')}


      <ItemAddModal packId={packId} categoryId={category.id}/>

      </div>
    )
  }
}

export default DropTarget(ItemTypes.DRAWER_ITEM, categoryTarget, collect)(PacksTable)
