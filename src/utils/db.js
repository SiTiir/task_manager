import axios from 'axios'
axios.defaults.baseURL = 'https://sdaapi.glabazna.eu'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common.Accept = 'json'

const checkUrl = (url) => {
  return url.substr(0, 1) === '/' ? url : '/' + url
}

/*

  tabulky - js4tasks, js4projects

  READ - čtení záznamů
  db.get('js4tasks') - vrátí všechny záznamy tasks jako pole objektů
  db.get('js4tasks?projectid=9') - vrátí všechny záznamy tasks, které mají projectid 9 jako pole objektů
  db.get('js4tasks/20') - vrátí jeden záznam - task s id 20 - jeden objekt

  CREATE - vytváření nových záznamů
  db.post('js4tasks', {task: '...', priority:1, date: '2023-06-30', projectid: 9, completed: 0})

  UPDATE - editace existujícího záznamu
  db.put('js4tasks', {id: 20, completed: 1})

  DELETE - mazání existujího záznamu
  db.delete('js4tasks', {id: 20}) - smaže záznam s id 20

 */

export default {
  get(path) { // READ
    return axios({
      method: 'get',
      url: checkUrl(path),
    }).then((response) => {
      return response.data.data
    })
  },
  post(path, body) { // CREATE
    return axios({
      method: 'post',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    })
  },
  put(path, body) { // UPDATE
    return axios({
      method: 'put',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    })
  },
  delete(path, body) { // DELETE
    return axios({
      method: 'delete',
      url: checkUrl(path),
      data: body
    }).then((response) => {
      return response.data.data
    })
  }
}