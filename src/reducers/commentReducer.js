import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function commentReducer (state = initialState.comments, action){
  switch (action.type){
    case types.LOAD_COMMENTS_SUCCESS:
      return action.comments
    case types.DELETE_COMMENT_SUCCESS:
      let index = state.findIndex(comment => comment.id === action.comment.id)
      let newState = state.slice()
      newState.splice(index,1)
      return newState
    case types.VOTE_COMMENT_SUCCESS:
      index = state.findIndex(comment => comment.id === action.comment.id)
      newState = state.slice()
      newState.splice(index, 1, action.comment)
      return newState
    case types.UPDATE_COMMENT_SUCCESS:
      index = state.findIndex(comment => comment.id === action.comment.id)
      newState = state.slice()
      newState.splice(index, 1, action.comment)
      return newState
    case types.ADD_COMMENT_SUCCESS:
      return [...state, action.comment]
    default:
      return state
  }
}
