import axios from "axios";
// const BASEURL = ~window.location.host.indexOf('localhost') ? "http://localhost:3000" : "http://10.36.198.161:3000";
// const BASEURL = "http://192.168.2.118:9090";
const BASEURL = "http://10.53.137.235:9090";
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

function getKey(sign,requestTime) {
    const method = "get"
    return getAxios(`/fire_forward_py/requestTokenKey/${sign}/${requestTime}`,{
    },method)
};

function getData(sign,requestTime) {
    const method = "get"
    return getAxios(`/fire_forward_py/getData/${sign}/${requestTime}`,{
    },method)
};


function testAxios() {
    const method = "get"
    return getAxios(`front/forestfire/forestFireCaseCurdate/queryForestFireCaseCurData?pageSize=1000`
    ,{},method)
};

function listAxios() {
    const method = "get"
    return getAxios(`front/forestfire/forestFireCaseCurdate/list?pageSize=1000`
    ,{},method)
};

function detailAxios(id) {
    const method = "get"
    return getAxios(`front/forestfire/forestFireCaseCurdate/queryById?id=${id}`
    ,{},method)
};

export default {
    getKey,
    getData,
    testAxios,
    listAxios,
    detailAxios,
}