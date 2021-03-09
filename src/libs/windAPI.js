import axios from "axios";
// const BASEURL = ~window.location.host.indexOf('localhost') ? "http://localhost:3000" : "http://10.36.198.161:3000";
// const BASEURL = "http://192.168.2.118:9090";
const BASEURL = "https://datacenter.istrongcloud.com";
const serverInstanec = axios.create();
serverInstanec.defaults.baseURL = BASEURL;

/**
 * axios default
 * @param {*} url
 * @param {*} data
 */
function getAxios(url = "", params = {}, method){
    const option = { url, method };
    method == 'get' ? option.params = params : option.data = params;
    return serverInstanec.request(option).then(res => {
        return res.data ? Promise.resolve(res.data) : Promise.reject(res);
    });
};

function getWindDataList() {
    const time = new Date().getTime()
    const method = "get"
    return getAxios(`/data/gfs/time_fc.json?v=${time}`
    ,{},method)
}

function getWindDataDetail(version) {
    const time = new Date().getTime()
    const method = "get"
    return getAxios(`/data/gfs/fcdata/${version}?v=${time}`
    ,{},method)
}

export default {
    getWindDataList,
    getWindDataDetail
}