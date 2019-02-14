import axios from "axios";

var qs = require('qs')

axios.defaults.baseURL = ' http://47.91.156.35:3777'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const URL = {
  NOTELIST: '/notes',
  CREATE: '/note/create',
  FINISH: '/note/finish',
  EDIT: '/note/edit',
  DELETE: '/note/delete',
}

export default {
  getNoteList() {
    return axios.get(URL.NOTELIST)
  },
  createNote({text, value}) {
    return axios.post(URL.CREATE, qs.stringify({text, value}))
  },
  finishNote(id) {
    return axios.post(URL.FINISH, qs.stringify({id: id}))
  },
  textChange(id, text) {
    return axios.post(URL.EDIT, qs.stringify({id, text}))
  },
  deleteNote(id) {
    return axios.post(URL.DELETE, qs.stringify({id: id}))
  },
}