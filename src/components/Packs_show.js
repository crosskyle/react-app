import React, { Component } from 'react'
import { connect } from 'react-redux'
import { readPack } from '../actions'
import _ from 'lodash'
import {List, ListItem} from 'material-ui/List'

class PacksShow extends Component {

  renderCategories() {
    const { pack } = this.props

    return _.map(pack.categories, category => {
      return (
        <div key={category.id}>
          <h4 key={category.title}>{category.title} </h4>
          <List key={category.id}>
            {this.renderItems(category)}
          </List>
        </div>
      )
    })
  }

  renderItems(category) {
    return _.map(category.items, item => {
      return (
        <ListItem key={item.id}>
          {item.title}
        </ListItem>
      )
    })
  }

  render () {

    const { pack } = this.props

    if (!pack) {
      return <div>Select a pack from the drawer</div>
    }

    return (
      <div>
        <h3>{pack.title}</h3>
        <p>{pack.description}</p>
        <List>
          {this.renderCategories()}
        </List>>
      </div>
    )
  }
}

function mapStateToProps({ packs, selectedPack }) {
  return { pack: packs[selectedPack] }
}

export default connect(mapStateToProps, { readPack })(PacksShow)