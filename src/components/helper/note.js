import axios from "axios";
var qs = require('qs')

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = false

const URL = {
  NOTELIST: '/api/notes',
  CREATE: '/api/note/create',
  UPDATA: '/api/note/edit',
  DELETE: '/api/note/delete'
}

export default {
  getNoteList() {
    return axios.get(URL.NOTELIST)
  },
  createNote({text,value}){
    return axios.post(URL.CREATE,qs.stringify({text, value}))
  },
  editNote(id){
    return axios.post(URL.UPDATA,qs.stringify({id: id}))
  }
  // createNote({ title = '', description = '', content = '' } = { title: '', description: '', content: '' }) {
  //   return request(URL.CREATE, 'POST', { title, description, content })
  // },
  // updataBlog(blogId, { title, description, content }) {
  //   return request(URL.UPDATA.replace(':blogId', blogId), 'PATCH', { title, description, content })
  // },
  // deleteBlog(blogId) {
  //   return request(URL.DELETE.replace(":blogId", blogId), 'DELETE')
  // }
}