import React, { Component } from 'react'
import { connect } from 'react-redux'

import PackEditModal from './PackEditModal'
import PacksTable from './PacksTable'
import CategoryAddModal from './CategoryAddModal'

class PacksShow extends Component {

  render () {
    const { pack } = this.props

    if (!pack) {
      return (
      <div style={{textAlign: 'center', marginTop: 20}}>
        Select a pack
      </div>
      )
    }

    return (
      <div style={{marginTop: 10}}>
        <PackEditModal pack={pack}/>
        <PacksTable packId={pack.id} categories={pack.categories}/>
        <br /><br />
        <CategoryAddModal packId={pack.id}/>
      </div>
    )
  }
}

function mapStateToProps({ packs, selectedPack }) {
  return { pack: packs[selectedPack] }
}

export default connect(mapStateToProps, null)(PacksShow)