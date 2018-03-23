import * as types from '../actions/actionTypes'
import * as PostsAPI from '../utils/PostsAPI'

export function loadPosts(){
  return function(dispatch) {
    return PostsAPI.getAll().then( posts => {
      dispatch(loadPostsSuccess(posts))
    }).catch(error => {
      throw(error)
    })
  }
}

export function decrementCommentCount (postId){
  return {
    type: types.DECREMENT_COMMENTCOUNT,
    postId
  }
}

export function incrementCommentCount (postId){
  return {
    type: types.INCREMENT_COMMENTCOUNT,
    postId
  }
}

export function loadPostsSuccess(posts) {
  return {
    type: types.LOAD_POSTS_SUCCESS,
    posts
  }
}

export function deletePost(postId){
  return function(dispatch) {
    return PostsAPI.deletePost(postId).then( id => {
      dispatch(deletePostSuccess(id))
    }).catch(error => {
      throw(error)
    })
  }
}

export function deletePostSuccess(post) {
  return {
    type: types.DELETE_POST_SUCCESS,
    post
  }
}

export function votePost(postId, choice){
  return function(dispatch) {
    return PostsAPI.votePost(postId, choice).then( post => {
      dispatch(votePostSuccess(post))
    }).catch(error => {
      throw(error)
    })
  }
}

export function votePostSuccess(post) {
  return {
    type: types.VOTE_POST_SUCCESS,
    post
  }
}

export function updatePost(postId, title, body){
  return function(dispatch) {
    return PostsAPI.updatePost(postId, title, body).then( post => {
      dispatch(updatePostSuccess(post))
    }).catch(error => {
      throw(error)
    })
  }
}

export function updatePostSuccess(post) {
  return {
    type: types.UPDATE_POST_SUCCESS,
    post
  }
}


export function addPost(post){
  return function(dispatch) {
    return PostsAPI.addPost(post).then( post => {
      dispatch(addPostSuccess(post))
    }).catch(error => {
      throw(error)
    })
  }
}

export function addPostSuccess(post) {
  return {
    type: types.ADD_POST_SUCCESS,
    post
  }
}
