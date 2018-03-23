const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

export const getByParent = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {method: 'DELETE', headers })
    .then(res => res.json())


export const voteComment = (id, choice) =>
  fetch(`${api}/comments/${id}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({option: choice})
    })
    .then(res => res.json())

export const updateComment = (id, title, body) =>
  fetch(`${api}/comments/${id}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({title: title, body: body})
    })
    .then(res => res.json())

export const addComment = (comment) =>
  fetch(`${api}/comments`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author,
        parentId: comment.parentId
      })
    })
    .then(res => res.json())
