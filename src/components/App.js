import React, { Component} from 'react';
import { connect } from 'react-redux'
import { Route, Switch, withRouter} from 'react-router-dom'
import { deletePost, votePost, updatePost, addPost } from '../actions/postActions'
import { loadComments, deleteComment, voteComment, updateComment, addComment } from '../actions/commentActions'
import PostList from './PostList'
import PostDetail from './PostDetail'
import NavBar from './NavBar'
import v1 from 'uuid'
import { reset } from 'redux-form'
import EditPost from './EditPost'
import EditComment from './EditComment'

class App extends Component {

  constructor(props,context){
    super(props,context)

    this.openAddModal = this.openAddModal.bind(this)
    this.closeAddModal = this.closeAddModal.bind(this)
    this.addPostDetails = this.addPostDetails.bind(this)

    this.state = {
      newPost: {
        id : '',
        timestamp: 0,
        title: '',
        body: '',
        author: '',
        category: ''
      },
      showAddModal: false
    }

  }

  openAddModal(){
    this.setState({showAddModal: true})
  }

  closeAddModal(){
    this.setState({showAddModal: false})
  }

  addPostDetails (values){
    let newPost = {
      id : v1(values.timestamp),
      timestamp: Date.now(),
      title: values.title,
      body: values.body,
      author: values.author,
      category: values.category
    }
    this.props.makePost(newPost)
    this.closeAddModal()
    return function(dispatch){
      dispatch(reset('addPost'))
    }
  }

  render(){
    const categories = ['React', 'Redux', 'Udacity']
    const { posts, removePost, voteOnPost, savePost, startSort,
            comments, getComments, removeComment, voteOnComment, saveComment, addNewComment
          } = this.props

    return (
      <div className="app">

        <NavBar
          categories={categories}
          makePost={this.addPostDetails}
          openAddModal={this.openAddModal}
          closeAddModal={this.closeAddModal}
          showAddModal={this.state.showAddModal}
        />
        <Switch>
          <Route exact path="/" render={() => (
            <PostList posts={posts}
              category="All"
              startSort = {startSort}
              removePost={removePost}
              voteOnPost={voteOnPost}
              savePost={savePost}/>
          )}/>

          {categories.map((cat)=>(
            <Route exact path={`/${cat.toLowerCase()}`} key={cat} render={() => (
              <PostList posts={posts.filter(p => p.category === cat.toLowerCase())}
                category={cat}
                removePost={removePost}
                voteOnPost={voteOnPost}
                savePost={savePost}
              />
            )}/>
          ))}

          {categories.map((cat)=>(
            <Route exact path={`/${cat}/:post_id`} key={cat} render={(routeProps) => (
              <PostDetail {...Object.assign({},routeProps,
                {posts},{comments},{getComments},{removePost},{savePost},{voteOnPost},
                {removeComment}, {voteOnComment}, {saveComment},{addNewComment}
              )} />
            )}/>
          ))}

          {categories.map((cat) => (
            <Route exact path={`/${cat}/:post_id/EditPost`} key={cat}
              render={(routeProps)=> (
                <EditPost {...Object.assign({},routeProps,{savePost},{posts})}/>
              )}
            />
          ))}

          {categories.map((cat) => (
            <Route exact path={`/${cat}/:post_id/comments/:comment_id`} key={cat}
              render={(routeProps)=> (
                <EditComment {...Object.assign({},routeProps,{saveComment},{comments})}/>
              )}
            />
          ))}


        </Switch>
      </div>
  )}
}

function mapStateToProps(state, ownProps) {
  return {
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch){
  return {
    getComments: (postId) => dispatch(loadComments(postId)),
    removePost: (postId) => dispatch(deletePost(postId)),
    voteOnPost: (postId, choice) => dispatch(votePost(postId, choice)),
    savePost: (postId, title, body) => dispatch(updatePost(postId, title, body)),
    makePost: (post) => dispatch(addPost(post)),
    removeComment: (commentId) => dispatch(deleteComment(commentId)),
    voteOnComment: (commentId, choice) => dispatch(voteComment(commentId, choice)),
    saveComment: (commentId, timestamp, body) => dispatch(updateComment(commentId, timestamp, body)),
    addNewComment: (comment) => dispatch(addComment(comment))
  }
}


export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
