import React, {Component} from 'react'
import { Panel, Button, Glyphicon, OverlayTrigger, Tooltip} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import {convertTimestamp} from '../utils/TimeStampConverter'


class PostList extends Component {
  constructor(props,context){
    super(props,context)

    this.state = {
      posts: [],
      currentSort: 'timestamp',
      showModal: false,
      sortIncreasing: true
    }

  }



  sortPosts = (sortby, posts) => {
    if(this.state.sortIncreasing === true){
      return posts.sort((a,b)=>  b[sortby] - a[sortby])
    }
    else {
      return posts.sort((a,b)=>  a[sortby] - b[sortby])
    }
  }

  updateSort = (sortby) => {
    if(sortby === this.state.currentSort){
      this.setState({sortIncreasing: !this.state.sortIncreasing})
    }
    this.setState({currentSort: sortby})
  }

  render(){

    const { category, removePost, voteOnPost} = this.props
    let posts=this.sortPosts(this.state.currentSort, this.props.posts)


    return (
      <div className="listPosts">

        <div className="col-md-12">
          <div className="col-md-4">
          <h2>{category} Posts </h2>
          <div className="buttons">
            <OverlayTrigger placement="bottom" overlay={<Tooltip id='dateSort'>Sort by Date</Tooltip>}>
              <Button bsSize="small"onClick={()=>this.updateSort('timestamp')}>Date </Button>
            </OverlayTrigger>
            <OverlayTrigger placement="bottom" overlay={<Tooltip id='voteSort'>Sort by Votes</Tooltip>}>
              <Button bsSize="small" onClick={()=>this.updateSort('voteScore')}>Votes</Button>
            </OverlayTrigger>
          </div>

          {
            posts.filter(p=> p.deleted === false).map(post =>


              <Panel key={post.id}>

                <Panel.Heading><h3>{post.title}</h3> posted by <em>{post.author}</em> {convertTimestamp(post.timestamp)}</Panel.Heading>
                <Panel.Body>
                  <p>Comments: {post.commentCount}</p>
                  <p>Current Score: {post.voteScore}</p>
                </Panel.Body>
                <Panel.Footer>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id='upvote'>Up Vote</Tooltip>}>
                    <Button bsSize="small" onClick={()=>voteOnPost(post.id, 'upVote')}>
                      <Glyphicon glyph="thumbs-up"></Glyphicon>
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id='downvote'>Down Vote</Tooltip>}>
                    <Button bsSize="small" onClick={()=>voteOnPost(post.id, 'downVote')}>
                      <Glyphicon glyph="thumbs-down" ></Glyphicon>
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id='view'>View</Tooltip>}>
                    <Link to={`/${post.category}/${post.id}`}>
                      <Button bsSize="small">
                        <Glyphicon glyph="eye-open"></Glyphicon>
                      </Button>
                    </Link>
                  </OverlayTrigger>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id='view'>Edit</Tooltip>}>
                    <Link to={`/${post.category}/${post.id}/EditPost`}>
                      <Button bsSize="small">
                        <Glyphicon glyph="pencil"></Glyphicon>
                      </Button>
                    </Link>
                  </OverlayTrigger>

                  <OverlayTrigger placement="bottom" overlay={<Tooltip id='delete'>Delete</Tooltip>}>
                      <Button bsSize="small" onClick={()=>removePost(post.id)}>
                        <Glyphicon glyph="trash"></Glyphicon>
                      </Button>
                  </OverlayTrigger>
                </Panel.Footer>
              </Panel>
            )
          }
          </div>
        </div>
    </div>
    )
  }
}



export default PostList
