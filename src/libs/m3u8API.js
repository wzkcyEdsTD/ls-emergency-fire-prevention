import axios from "axios";
const serverInstanec = axios.create();
const BASEURL = "http://10.53.129.97/m3u8";
serverInstanec.defaults.baseURL = BASEURL;

/**
 * axios default
 * @param {*} url 
 * @param {*} params 
 * @param {*} method 
 */
const getAxios = (url = "", params = {}, method = "get") => {
    const option = { url, method };
    method == 'get' ? option.params = params : option.data = params;
    return serverInstanec.request(option).then(res => {
        return Promise.resolve(res.request.responseURL);
    });
};

/**
 *  login without code
 *  @param {Object} data
 */
export const fetchVideoURL = (url, data = {}) => {
    return getAxios(url, data)
}
