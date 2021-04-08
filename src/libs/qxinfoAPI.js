import axios from "axios";

const BASEURL = "http://10.53.137.235:9090";
const serverInstanec = axios.create();
serverInstanec.defaults.baseURL = BASEURL;

/**
 * axios default
 * @param {*} url
 * @param {*} data
 */

 serverInstanec.interceptors.request.use(config => {
    config.headers['X-Access-Token'] = window.localStorage.getItem("token");
    return config;
});

function getAxios(url = "", params = {}, method){
    const option = { url, method };
    method == 'get' ? option.params = params : option.data = params;
    return serverInstanec.request(option).then(res => {
        return res.data ? Promise.resolve(res.data) : Promise.reject(res);
    });
};

function getQXDetail(id) {
    const method = "post"
    const params = {
        "[]": {
            "SzlsDwSjjhQxjHourlyelement": {
                "stcd":`${id}`,
                "@order":"biz_time-"
            },
            "count":5,
            "page":0,
            "@order":"observtimes-",
            "query":2
        },
        "total@":"/[]/total"
    }
    return getAxios(`/commonApiJson/get`
    ,params,method)
}

export default {
    getQXDetail
}