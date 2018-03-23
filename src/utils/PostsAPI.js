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

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, { method: 'DELETE', headers })
    .then(res => res.json())

export const votePost= (id, choice) =>
  fetch(`${api}/posts/${id}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({option: choice})
    })
    .then(res => res.json())

export const updatePost = (id, title, body) =>
  fetch(`${api}/posts/${id}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({title: title, body: body})
    })
    .then(res => res.json())


export const addPost = (post) =>
  fetch(`${api}/posts`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        id: post.id,
        timestamp: post.timestamp,
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category
      })
    })
    .then(res => res.json())

// export const deletePost = (id) =>
//   fetch(`${api}/posts/${id}`, { method: 'DELETE', headers })
//     .then(res => res.json())
//
// export const deletePost = (id) =>
//   fetch(`${api}/posts/${id}`, { method: 'DELETE', headers })
//     .then(res => res.json())
