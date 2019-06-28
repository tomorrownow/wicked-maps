//Followed docs at https://redux-docs.netlify.com/advanced/example-reddit-api

import fetch from 'cross-fetch';

export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';
// export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
// export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

// export function selectSubreddit(subreddit) {
//   return {
//     type: SELECT_SUBREDDIT,
//     subreddit
//   }
// }

// export function invalidateSubreddit(subreddit) {
//   return {
//     type: INVALIDATE_SUBREDDIT,
//     subreddit
//   }
// }

function requestLocations(bbox) {
  return {
    type: REQUEST_LOCATIONS,
    bbox
  }
}

function receiveLocations(subreddit, json) {
  return {
    type: RECEIVE_LOCATIONS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchLocations(bbox) {
  return dispatch => {
    dispatch(requestLocations(bbox))
    return fetch(`https://services1.arcgis.com/aT1T0pU1ZdpuDk1t/ArcGIS/rest/services/survey123_571499fe84ac4125abe48b793b9970a3_stakeholder/FeatureServer/0/query?f=json&returnGeometry=true&inSR=102100&outFields=*&outSR=4326&where=1=1`)
      .then(response => response.json())
      .then(json => dispatch(receiveLocations(bbox, json)))
  }
}

function shouldFetchLocations(state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchLocationsIfNeeded(bbox) {
  return (dispatch, getState) => {
    if (shouldFetchLocations(getState(), bbox)) {
      return dispatch(fetchLocations(bbox))
    }
  }
}