import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { readPacks, selectedPack } from '../actions'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {List, ListItem} from 'material-ui/List'


const style = {
  marginTop: 10,
}


class PacksIndex extends Component {

  componentDidMount() {
    this.props.readPacks()
  }

  renderPacks() {
    return _.map(this.props.packs, pack => {
      return (
        <ListItem
          onClick= {
            () => {
              this.props.onPackSelect()
              this.props.selectedPack(pack.id)
            }
          }
          primaryText={pack.title}
          key={pack.id}
        >
        </ListItem>
      )
    })
  }

  render() {
    return (
      <div className="container-fluid" style={style}>
        <div className="row">
          <div className="col-8">
            <h2>Packs</h2>
          </div>
          <div className="col-2">
            <FloatingActionButton mini={true}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
        </div>
        <List>
          {this.renderPacks()}
        </List>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { packs: state.packs }
}

//using readPacks: readPacks instead of mapDispatch
export default connect(mapStateToProps, { readPacks, selectedPack })(PacksIndex)