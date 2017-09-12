import React, { Component } from 'react'
import { connect } from 'react-redux'
import { readPack, createItem, createCategory } from '../actions'
import _ from 'lodash'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,

} from 'material-ui/Table';

class PacksShow extends Component {

  renderCategories() {
    const { pack } = this.props

    return _.map(pack.categories, category => {
      return (
        <div key={category.id}>
          <Table fixedHeader={true}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn colSpan="5" style={{textAlign: 'left', fontSize: '14px'}}>
                  {category.title}
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn colSpan="2">Item Name</TableHeaderColumn>
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
          <TableRowColumn colSpan="2">{item.title}</TableRowColumn>
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

  render () {

    const { pack } = this.props

    if (!pack) {
      return <div style={{textAlign: 'center'}}>Select a pack from the drawer</div>
    }

    return (
      <div style={{textAlign: 'center'}}>
        <h3 style={{textAlign: 'left', marginLeft: 30}}>{pack.title}</h3>
        {this.renderCategories()}
        <br /><br />
        <FlatButton
          label="add a category"
          primary={true}
        />
      </div>
    )
  }
}

function mapStateToProps({ packs, selectedPack }) {
  return { pack: packs[selectedPack] }
}

export default connect(mapStateToProps, { readPack, createItem, createCategory })(PacksShow)