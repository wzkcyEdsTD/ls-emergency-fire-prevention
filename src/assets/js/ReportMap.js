export default {
    year:[...generateNum(2017,2020)],
    month:[...generateNum(1,12)],
    day:[...generateNum(1,31)],
    hour:[...generateNum(1,24)],
    minute:[...generateNum(1,60)],
    occur:['发现','发生'],
    extent:['平稳','较弱','中等','较强','剧烈',],
    direction:['东','南','西','北'],
    continue:['连续','断续'],
    measure:['米','公里'],
    speed:['快','慢'],
    already:['已经','没有'],
    has:['有','无'],
    hurt:['受伤','死亡'],
    weather:['晴','多云','少云','阴'],
    clean:['阻隔','清理'],
    outfire:['化学','机降','吊桶'],
    task:['侦查','运输','检修'],

}

function generateNum(start,end,step=1){
    let list = []
    for (let index = start; index <= end; index+=step) {
        list.push((index).toString())
    }
    return list
}