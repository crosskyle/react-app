import React, { Component } from 'react'
import _ from 'lodash'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import ItemAddModal from './ItemAddModal'

class PacksTable extends Component {

  renderCategories(categories) {
    return _.map(categories, category => {
      return (
        <div style={{ marginLeft: 0, marginRight: 0}} key={category.id}>
          <Table
            fixedHeader={true}
            onRowHover={(d) =>  {}/* console.log(category.items[d])*/}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow >
                <TableHeaderColumn colSpan="12" style={{fontSize: '14px'}}>
                  {category.title}
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn colSpan="3">Name</TableHeaderColumn>
                <TableHeaderColumn colSpan="6">Description</TableHeaderColumn>
                <TableHeaderColumn colSpan="1">Oz</TableHeaderColumn>
                <TableHeaderColumn colSpan="1">Qu</TableHeaderColumn>
                <TableHeaderColumn colSpan="2"> </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} displayRowCheckbox={false}>
              {this.renderItems(category)}
            </TableBody>
          </Table>

          <ItemAddModal packId={this.props.packId} categoryId={category.id}/>

        </div>
      )
    })
  }

  renderItems(category) {
    return _.map(category.items, item => {
      return (
        <TableRow key={item.id} hoverable={true}>
          <TableRowColumn colSpan="3">{item.title}</TableRowColumn>
          <TableRowColumn colSpan="6">{item.description}</TableRowColumn>
          <TableRowColumn colSpan="1">{item.weight}</TableRowColumn>
          <TableRowColumn colSpan="1">{item.quantity}</TableRowColumn>
          <TableHeaderColumn colSpan="2">
            <IconMenu
              iconButtonElement={
                <IconButton style={{ paddingRight: '20em', paddingLeft: '0em', verticalAlign: 'middle', textAlign: 'left'}}>
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


  render() {
    return(
      <div>
        {this.renderCategories(this.props.categories)}
      </div>
    )
  }
}

export default PacksTable
