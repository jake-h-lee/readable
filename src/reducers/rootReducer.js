import { combineReducers } from 'redux'
import posts from './postReducer'
import comments from './commentReducer'
import { reducer as formReducer } from 'redux-form'
import * as types from '../actions/actionTypes'

const rootReducer = combineReducers({
  posts,
  comments,
  form: formReducer.plugin({
    addPost: (state, action) => {
      switch(action.type){
        case types.ADD_POST_SUCCESS:
          return undefined
        default:
          return state
      }
    },
    addComment: (state, action) => {
      switch(action.type){
        case types.ADD_COMMENT_SUCCESS:
          return undefined
        default:
          return state
      }
    },
    editCommentModal: (state, action) => {
      switch(action.type){
        case types.UPDATE_COMMENT_SUCCESS:
          return undefined
        default:
          return state
      }
    }
  })
})

export default rootReducer
