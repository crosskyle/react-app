import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCategory } from '../actions'
import FlatButton from 'material-ui/FlatButton'

import CategoryList from './PacksTable'

class PacksShow extends Component {

  render () {
    const { pack } = this.props

    if (!pack) {
      return (
      <div style={{textAlign: 'center', marginTop: 20}}>
        Select a pack from the drawer
      </div>
      )
    }

    return (
      <div style={{textAlign: 'center'}}>
        <h3 style={{textAlign: 'left', marginLeft: 30}}>{pack.title}</h3>
        <CategoryList packId={pack.id} categories={pack.categories}/>
        <br /><br />
        <FlatButton
          label="add a category"
          primary={true}
          onClick={() => this.props.createCategory(pack.id)}
        />
      </div>
    )
  }
}

function mapStateToProps({ packs, selectedPack }) {
  return { pack: packs[selectedPack] }
}

export default connect(mapStateToProps, { createCategory })(PacksShow)