/* eslint-disable no-console */
import axios from 'axios'

const url = 'https://localhost:3000/'

class PlugService {
  static getPlugs () {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${'gallery'}`)
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
  static insertPlug (plug) {
    return axios.post(url, {
      plug
    })
  }

  static deletePlug (id) {
    return axios.delete(`${url}${id}`)
  }
}

export default PlugService
