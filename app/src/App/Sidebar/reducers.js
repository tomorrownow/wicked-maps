//Followed docs at https://redux-docs.netlify.com/advanced/example-reddit-api

import { combineReducers } from 'redux'
import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS
} from './actions'

// function selectedSubreddit(state = 'reactjs', action) {
//   switch (action.type) {
//     case SELECT_SUBREDDIT:
//       return action.subreddit
//     default:
//       return state
//   }
// }

function locations(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    // case INVALIDATE_SUBREDDIT:
    //   return Object.assign({}, state, {
    //     didInvalidate: true
    //   })
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_LOCATIONS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsByLocation(state = {}, action) {
  switch (action.type) {
    // case INVALIDATE_SUBREDDIT:
    case RECEIVE_LOCATIONS:
    case REQUEST_LOCATIONS:
      return Object.assign({}, state, {
        [action.bbox]: locations(state[action.bbox], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
    postsByLocation
})

export default rootReducer