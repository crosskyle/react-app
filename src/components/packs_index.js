import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { readPacks } from '../actions'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import {List, ListItem} from 'material-ui/List'


const style = {
  marginLeft: 20,
};


class PacksIndex extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.readPacks()
  }

  renderPacks() {
    return _.map(this.props.packs, pack => {
      return (
        <ListItem
          onClick={this.props.onPackSelect}
          primaryText={pack.title}
          key={pack.id}>
          <Link to={`/packs/${pack.id}`}>
          </Link>
        </ListItem>
      )
    })
  }

  render() {
    return (
      <div>
        <h3>Packs</h3>
        <List>
          {this.renderPacks()}
        </List>
        <div className="text-xs-left">
          <FloatingActionButton mini={true} style={style}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { packs: state.packs }
}

//using readPacks: readPacks instead of mapDispatch
export default connect(mapStateToProps, { readPacks })(PacksIndex)