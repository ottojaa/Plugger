/* eslint-disable no-console */
/* eslint-disable */
import axios from "axios";
import router from "./routes";
const querystring = require('querystring')

 axios.defaults.withCredentials = true; 
const url = "https://pluggerexpress.herokuapp.com/";

let user = "";
let plugId = "";
let loginstatus = "";

class PlugService {
  static getPlugs() {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${"gallery"}`;
        const res = await axios.get(requestUrl);
        const data = res.data;
        resolve(
          data.map(plug => ({
            ...plug,
            createdAt: new Date(plug.createdAt)
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  static getTitles() {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${"gallery"}`;
        const res = await axios.get(requestUrl);
        const data = res.data;
        resolve(data.map(title => title.title));
      } catch (err) {
        reject(err);
      }
    });
  }
  static myPlugs(currentUser) {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${"myPlugs"}`;
        const res = await axios.get(requestUrl + '/' + currentUser)
        const data = res.data
        console.log(res.data)
        resolve(
          data.map(plug => ({
            ...plug,
          }))
        );
      } catch(err) {
        reject(err)
      }
    })
  }
  static addToMyPlugs(userId, plugId) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = {
          userId: userId,
          plugId: plugId
        }
        const requestUrl = `${url}${'plug/'}{}`;
        const res = await axios({
          method: 'post',
          url: requestUrl,
          data: query,
        })
        const data = res.data
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  static editPlug(formData, plugId) {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${'gallery/'}${plugId}`
        const res = axios.post(requestUrl, formData);
        const data = res.data
        resolve(data)
      } catch(err) {
        reject(err)
      }
    })
  }
  static search(searchterm) {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${"search/"}${searchterm}`;
        const res = await axios(requestUrl);
        const data = res.data;
        console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  static insertPlug(plug) {
    return axios({
      method: "post",
      url: url,
      data: plug,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((response) => {
        console.log(response)
        return response
      })
      .catch((response) => {
        console.log(response)
        return response
      });
  }
  static getPlug(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${"gallery/"}${id}`;
        const res = await axios.get(requestUrl);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  static getSavedPlugs(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${"savedplugs/"}${id}`;
        const res = await axios.get(requestUrl);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  static login(formData) {
    const requestUrl = `${url}${"authenticate"}`;
    return axios({
      method: "post",
      url: requestUrl,
      data: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        return response;
      })
      .catch(err => {
        return err
      });
  }
  static logout() {
    const requestUrl = `${url}${"logout"}`;
    return axios
      .get(requestUrl)
      .then(response => {
        return response
      })
      .catch(err => {
        return err
      });
  }
  static register(formData) {
    const requestUrl = `${url}${"register"}`;
    return axios({
      method: "post",
      url: requestUrl,
      data: formData,
      timeout: 3000,
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    })
      .then(response => {
        return response
      })
      .catch(err => {
        return err
      });
  }
  static checkLogin() {
    const requestUrl = `${url}${"cookie"}`;
    return axios({
      method: "get",
      url: requestUrl,
      data: {}
    }).then(response => {
      return response
    }).catch(err => {
      return err
    })
  }

  static getUsersas() {
    const requestUrl = `${url}${"user"}`;
    return axios({
      method: "get",
      url: requestUrl,
      data: {}
    }).then(response => {
      return response
    }).catch(err => {
      return err
    })
  }

  static getUserById(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${"user"}`;
        const res = axios.get(requestUrl)
        const data = res.data
        resolve(data)
      } catch(err) {
        reject(err)
      }
    })
  }

  static deletePlug(id) {
    return axios.delete(`${url}${'gallery/'}${id}`);
  }
  static getUser() {
    return new Promise(async (resolve, reject) => {
      try {
        const requestUrl = `${url}${"user"}`;
        const res = await axios.get(requestUrl);
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default PlugService;
