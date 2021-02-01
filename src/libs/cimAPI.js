import axios from "axios";
// const BASEURL = ~window.location.host.indexOf('localhost') ? "http://localhost:3000" : "http://10.36.198.161:3000";
const BASEURL = "https://172.28.77.10:8089";
const serverInstanec = axios.create();
// serverInstanec.defaults.baseURL = BASEURL;

/**
 * axios default
 * @param {*} url
 * @param {*} data
 */
function getAxios(url = "", params = {}, method){
    const option = { url, method };
    method == 'get' ? option.params = params : option.data = params;
    return serverInstanec.request(option).then(res => {

        console.log(res)
        // debugger
        return res
        // return res.data ? Promise.resolve(res.data.data) : Promise.reject(res);
    });
};

function getKey(sign,requestTime,appKey) {
    const method = "get"
 
    return getAxios(`/key/a/api/requestTokenKey`,{
        "sign":sign,
        "requestTime":requestTime,
        "appKey": appKey,
        // "systemcode": slfhyzt
    },method)
};

function getData(sign,requestTime,appKey) {
    const method = "post"
    return getAxios(`/key/a/api/shared/1611732549274`,{
        "sign":sign,
        "requestTime":requestTime,
        "appKey": appKey,
        "params": {"systemcode":"slfhyzt"}
    },method)
};

export default {
    getKey,
    getData
}