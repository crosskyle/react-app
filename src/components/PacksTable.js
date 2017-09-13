import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createItem } from '../actions'
import _ from 'lodash'
import FlatButton from 'material-ui/FlatButton'
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


class PacksTable extends Component {

  renderCategories(categories) {
    return _.map(categories, category => {
      return (
        <div key={category.id}>
          <Table fixedHeader={true}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow >
                <TableHeaderColumn colSpan="6" style={{fontSize: '14px'}}>
                  {category.title}
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn colSpan="3">Item Name</TableHeaderColumn>
                <TableHeaderColumn>Weight(oz)</TableHeaderColumn>
                <TableHeaderColumn>Quantity</TableHeaderColumn>
                <TableHeaderColumn> </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.renderItems(category)}
            </TableBody>
          </Table>
          <FlatButton
            label="add an item"
            primary={true}
          />
        </div>
      )
    })
  }

  renderItems(category) {
    return _.map(category.items, item => {
      return (
        <TableRow key={item.id}>
          <TableRowColumn colSpan="3">{item.title}</TableRowColumn>
          <TableRowColumn>{item.weight}</TableRowColumn>
          <TableRowColumn>{item.quantity}</TableRowColumn>
          <TableHeaderColumn>
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
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

export default connect(null, { createItem })(PacksTable)
