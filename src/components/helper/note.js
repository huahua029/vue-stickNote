import axios from "axios";
var qs = require('qs')

axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = false

const URL = {
  NOTELIST: '/api/notes',
  CREATE: '/api/note/create',
  FINISH: '/api/note/finish',
  EDIT: '/api/note/edit',
  DELETE: '/api/note/delete',
  REGISTER: '/register',
  LOGIN: '/login'
}

export default {
  getNoteList() {
    return axios.get(URL.NOTELIST)
  },
  createNote({text,value}){
    return axios.post(URL.CREATE,qs.stringify({text, value}))
  },
  finishNote(id){
    return axios.post(URL.FINISH,qs.stringify({id: id}))
  },
  textChange(id,text){
    return axios.post(URL.EDIT,qs.stringify({id,text}))
  },
  deleteNote(id){
    return axios.post(URL.DELETE,qs.stringify({id: id}))
  },
  registerAuth(username,password){
    return axios.post(URL.REGISTER,qs.stringify({username,password}))
  },
  loginAuth(username,password){
    return axios.post(URL.LOGIN,qs.stringify({username,password}))
  }
}