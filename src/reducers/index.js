import { combineReducers } from 'redux'
import * as PostsAPI from '../utils/PostsAPI'
import * as types from '../actions/actionTypes'


import{
  ADD_POST,
  ADD_COMMENT,
  EDIT_POST,
  EDIT_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
  GET_POSTS_BEGIN,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
} from '../actions'


const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  }
}

const initialState = {
  posts : [],
  loading: false,
  error: null,
}


function posts (state = initialState, action) {


  switch (action.type) {
    case GET_POSTS_BEGIN :
      return {
        ...state,
        loading: true,
        error:null
      }
    case GET_POSTS_SUCCESS :
      return {
        ...state,
        loading: false,
        posts: action.payload.posts
      }
    case GET_POSTS_FAILURE :
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default :
      return state
  }
}





export default combineReducers ({
  posts
})
