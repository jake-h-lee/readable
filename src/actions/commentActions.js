import * as types from '../actions/actionTypes'
import * as CommentsAPI from '../utils/CommentsAPI'
import {decrementCommentCount, incrementCommentCount} from './postActions'


export function loadComments(postId){
  return function(dispatch) {
    return CommentsAPI.getByParent(postId).then( comments => {
      dispatch(loadCommentsSuccess(comments))
    }).catch(error => {
      throw(error)
    })
  }
}

export function loadCommentsSuccess(comments) {
  return {
    type: types.LOAD_COMMENTS_SUCCESS,
    comments,
  }
}

export function deleteComment(commentId){
  return function(dispatch) {
    return CommentsAPI.deleteComment(commentId).then( comment => {
      dispatch(deleteCommentSuccess(comment))
      dispatch(decrementCommentCount(comment.parentId))
    }).catch(error => {
      throw(error)
    })
  }
}

export function deleteCommentSuccess(comment) {
  return {
    type: types.DELETE_COMMENT_SUCCESS,
    comment
  }
}

export function voteComment(commentId, choice){
  return function(dispatch) {
    return CommentsAPI.voteComment(commentId, choice).then( comment => {
      dispatch(voteCommentSuccess(comment))
    }).catch(error => {
      throw(error)
    })
  }
}

export function voteCommentSuccess(comment) {
  return {
    type: types.VOTE_COMMENT_SUCCESS,
    comment
  }
}

export function updateComment(commentId, timestamp, body){
  return function(dispatch) {
    return CommentsAPI.updateComment(commentId, timestamp, body).then( comment => {
      dispatch(updateCommentSuccess(comment))
    }).catch(error => {
      throw(error)
    })
  }
}

export function updateCommentSuccess(comment) {
  return {
    type: types.UPDATE_COMMENT_SUCCESS,
    comment
  }
}


export function addComment(comment){
  return function(dispatch) {
    return CommentsAPI.addComment(comment).then( comment => {
      dispatch(addCommentSuccess(comment))
      dispatch(incrementCommentCount(comment.parentId))
    }).catch(error => {
      throw(error)
    })
  }
}

export function addCommentSuccess(comment) {
  return {
    type: types.ADD_COMMENT_SUCCESS,
    comment
  }
}
