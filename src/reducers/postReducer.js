import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function postReducer (state = initialState.posts, action){
  switch (action.type){
    case types.LOAD_POSTS_SUCCESS:
      return action.posts
    case types.DELETE_POST_SUCCESS:
      let index = state.findIndex(post => post.id === action.post.id)
      let newState = state.slice()
      newState.splice(index,1)
      return newState
    case types.VOTE_POST_SUCCESS:
      index = state.findIndex(post => post.id === action.post.id)
      newState = state.slice()
      newState.splice(index, 1, action.post)
      return newState
    case types.UPDATE_POST_SUCCESS:
      index = state.findIndex(post => post.id === action.post.id)
      newState = state.slice()
      newState.splice(index, 1, action.post)
      return newState
    case types.ADD_POST_SUCCESS:
      return [...state, action.post]
    case types.DECREMENT_COMMENTCOUNT:
      index = state.findIndex(post => post.id === action.postId)
      newState = state.slice()
      newState[index]['commentCount']--
      return newState
    case types.INCREMENT_COMMENTCOUNT:
      index = state.findIndex(post => post.id === action.postId)
      newState = state.slice()
      newState[index]['commentCount']++
      return newState
    default:
      return state
  }
}
