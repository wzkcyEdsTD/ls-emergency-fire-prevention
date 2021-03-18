import axios from "axios";
const BASEURL = "http://10.53.137.235:9090";
const serverInstanec = axios.create();
serverInstanec.defaults.baseURL = BASEURL;
/**
 * axios default
 * @param {*} url 
 * @param {*} params 
 * @param {*} method 
 */
const getAxios = (url = "", params = {}, method = "post") => {
    const option = { url, method };
    method == 'get' ? option.params = params : option.data = params;
    return serverInstanec.request(option).then(res => {
        if (res.data.code == 200) {
            return Promise.resolve(res.data.result);
        } else {
            return Promise.reject(res.data.message)
        }
    });
};

/**
 *  login without code
 *  @param {Object} data
 */
export const doLogin = (data) => {
    return getAxios("/sys/loginWithoutCode", data)
}
