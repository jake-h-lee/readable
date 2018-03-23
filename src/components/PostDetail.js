import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import { Panel, Button, Glyphicon, OverlayTrigger, Tooltip, Alert } from 'react-bootstrap'
import {convertTimestamp} from '../utils/TimeStampConverter'
import AddCommentModal from './AddCommentModal'
import v1 from 'uuid'

class PostDetail extends Component {
  constructor(props,context){
    super(props,context)

    

    this.openAddCommentModal = this.openAddCommentModal.bind(this)
    this.closeAddCommentModal = this.closeAddCommentModal.bind(this)
    this.saveNewComment = this.saveNewComment.bind(this)

    this.state = {
      showModal: false,
      showCommentModal: false,
      showAddCommentModal: false
    }

  }



  openAddCommentModal(){
    this.setState({showAddCommentModal: true})
  }

  closeAddCommentModal(){
    this.setState({showAddCommentModal: false})
  }

  saveNewComment (values){
    let newComment = {
      id : v1(values.timestamp),
      timestamp: Date.now(),
      body: values.body,
      author: values.author,
      parentId: values.parentId
    }
    this.props.addNewComment(newComment)
    this.closeAddCommentModal()
  }

  componentWillMount (){
    this.props.getComments(this.props.match.params.post_id)
  }

  render(){
    const {posts, removePost, voteOnPost,
           comments, removeComment, voteOnComment
          } = this.props
    const postId = this.props.match.params.post_id
    const post = posts.filter(p => (p.id === postId))[0]

    if(post){
          return (
          <div className="postDetail">
            <div className="col-md-12" id="detailsPanel">
              <div className="col-md-4">
                  <h2>Post Details</h2>
                  <Panel key={post.id}>

                    <AddCommentModal showAddCommentModal={this.state.showAddCommentModal}
                      closeAddCommentModal={this.closeAddCommentModal}
                      initialValues={{parentId :post.id}}
                      onSubmit={this.saveNewComment}
                    />

                    <Panel.Heading><h3>{post.title}</h3> posted by <em>{post.author}</em> on {convertTimestamp(post.timestamp)}</Panel.Heading>
                    <Panel.Body>
                      <p>"{post.body}"</p>
                      <p>Comments: {post.commentCount}</p>
                      <p>Current Score: {post.voteScore}</p>
                    </Panel.Body>
                    <Panel.Footer>
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id='upvote'>Up Vote</Tooltip>}>
                        <Button bsSize="small" onClick={()=>voteOnPost(post.id, 'upVote')}>
                          <Glyphicon glyph="thumbs-up" title="Up Vote"></Glyphicon>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id='downvote'>Down Vote</Tooltip>}>
                        <Button bsSize="small" onClick={()=>voteOnPost(post.id, 'downVote')}>
                          <Glyphicon glyph="thumbs-down" ></Glyphicon>
                        </Button>
                      </OverlayTrigger>
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id='edit'>Edit</Tooltip>}>
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
                      <OverlayTrigger placement="bottom" overlay={<Tooltip id='add'>Add a Comment</Tooltip>}>
                          <Button bsSize="small" onClick={()=>this.openAddCommentModal()}>
                            <Glyphicon glyph="plus"></Glyphicon>
                          </Button>
                      </OverlayTrigger>
                    </Panel.Footer>
                  </Panel>
                </div>
              </div>
              <div className="col-md-12" id="commentsPanel">
                <div className="col-md-4">
                  <h2>Comments</h2>
                  {comments.length>0 &&
                    comments.filter(c => c.deleted ===false).map(comment =>
                      <Panel key={comment.id}>

                        <Panel.Heading><em>{comment.author}</em> commented on this post at {convertTimestamp(comment.timestamp)}</Panel.Heading>
                        <Panel.Body>
                          <p>Comment: "{comment.body}"</p>
                          <p>Current Score: {comment.voteScore}</p>
                        </Panel.Body>
                        <Panel.Footer>
                          <OverlayTrigger placement="bottom" overlay={<Tooltip id='upvote'>Up Vote</Tooltip>}>
                            <Button bsSize="small" onClick={()=>voteOnComment(comment.id, 'upVote')}>
                              <Glyphicon glyph="thumbs-up" title="Up Vote"></Glyphicon>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="bottom" overlay={<Tooltip id='downvote'>Down Vote</Tooltip>}>
                            <Button bsSize="small" onClick={()=>voteOnComment(comment.id, 'downVote')}>
                              <Glyphicon glyph="thumbs-down" ></Glyphicon>
                            </Button>
                          </OverlayTrigger>
                          <OverlayTrigger placement="bottom" overlay={<Tooltip id='edit'>Edit</Tooltip>}>
                            <Link to={`/${post.category}/${post.id}/comments/${comment.id}`}>
                              <Button bsSize="small">
                                <Glyphicon glyph="pencil"></Glyphicon>
                              </Button>
                            </Link>
                          </OverlayTrigger>
                          <OverlayTrigger placement="bottom" overlay={<Tooltip id='delete'>Delete</Tooltip>}>
                              <Button bsSize="small" onClick={()=>removeComment(comment.id)}>
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
    else {
      return <Alert>404 Post not Found</Alert>
    }
}
}



export default PostDetail
