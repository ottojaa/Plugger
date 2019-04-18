/* eslint-disable no-console */
import axios from 'axios'
import router from './routes'
/* eslint-disable */

const url = 'https://localhost:3000/';

class PlugService {
  static getPlugs () {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${'gallery'}`
        const res = await axios.get(requestUrl)
        const data = res.data
        resolve(
          data.map(plug => ({
            ...plug,
            createdAt: new Date(plug.createdAt)
          }))
        )
      } catch (err) {
        reject(err)
      }
    })
  }
  static getTitles () {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${'gallery'}`
        const res = await axios.get(requestUrl)
        const data = res.data
        resolve(data.map(title => title.title))
      } catch (err) {
        reject(err)
      }
    })
  }
  static insertPlug (plug) {
    console.log(plug, 'HHHAAAAA????')
    return axios({
      method: 'post',
      url: url,
      data: plug,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (response) {
        console.log(response)
      })
  }
  static login (formData) {
    const requestUrl = `${url}${'authenticate'}`
    console.log(formData);
    return axios({
      method: 'post',
      url: requestUrl,
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    })
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log('Cannot log in', err)
      })
  }
  static register (formData) {
    const requestUrl = `${url}${'register'}`
    console.log(formData)
    return axios({
      method: 'post',
      url: requestUrl,
      data: formData,
      timeout: 3000,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', }
    })
      .then(response => {
        console.log(response)
        router.push('/dashboard')
      })
      .catch(err => {
        console.log('Cannot register because:', err)
      })
  }

  static deletePlug (id) {
    return axios.delete(`${url}${id}`)
  }
}

export default PlugService
