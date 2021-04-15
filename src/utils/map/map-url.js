const dataSourceName = 'lishui_forestfire_v2'
const dataUrl = 'http://10.53.137.59:8090/iserver/services/data-lishui_forestfire_v2/rest/data'
// const bufferUrl = 'http://10.36.234.83:8090/iserver/services/data-buffer/rest/data'
const bufferUrl = ''
const mapUrl = {
  dataUrl,
  dataSourceName,
  // 等高线
  DGX: {
    type: 'wms',
    layerName: 'dgx_330000:dgx_330000',
    url: 'http://60.191.94.50:9090/geoserver/wms'
  },
  // 森林资源一张图
  SLZY: {
    type: 'wms',
    layerName: 'ZJ_SLZYDTGX:slzy_xz_2018',
    url: 'http://60.191.94.50:9090/geoserver/wms',
    styles: 'SLZYWeiXin_XB2',
    icon: '区域线icon.png',
    label: '林区资源'
  },
  // 矢量地图服务
  ZWPT_SG_WZ_CGCS2000: {
    type: 'map',
    layerName: 'wenzhou_emap',
    url: 'http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=717e5c0403f4c23654be096d2f7d6e68'
  },
  // 影像注记
  YJ_YXZJ_2019_CGCS2000: {
    type: 'map',
    layerName: 'img_zj',
    url: 'http://t3.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=717e5c0403f4c23654be096d2f7d6e68'
  },
  // 2019年影像
  IMG_2019: {
    type: 'map',
    layerName: 'img_2019',
    url: 'http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=717e5c0403f4c23654be096d2f7d6e68'
  },
  // 2018年影像
  IMG_2018: {
    type: 'map',
    layerName: 'img_2018',
    url: 'http://10.36.245.203:8090/iserver/services/map-agscachev2-YX2018CGC2000/rest/maps/YX_2018_CGC2000'
  },
  // 2017年影像
  IMG_2017: {
    type: 'map',
    layerName: 'img_2017',
    url: 'http://10.36.245.203:8090/iserver/services/map-agscachev2-Layers/rest/maps/Layers'
  },
  // 2014年影像
  IMG_2014: {
    type: 'map',
    layerName: 'img_2014',
    url: 'http://10.36.245.203:8090/iserver/services/map-agscachev2-YX2014CGC2000/rest/maps/YX_2014_CGC2000'
  },
  // 2012年影像
  IMG_2012: {
    type: 'map',
    layerName: 'img_2012',
    url: 'http://10.36.245.203:8090/iserver/services/map-agscachev2-Layers2/rest/maps/Layers'
  },
  // 雨情--实时
  // ----一小时累计降雨
  RIAN_1_H: {
    type: 'map',
    layerName: 'RIAN_1_HOUR',
    // url: 'http://10.36.234.83:8090/iserver/services/map-kljcz_1/rest/maps/klj01%4010.36.234.85_klj_RainFall'
  },
  // ----三小时累计降雨
  RIAN_3_H: {
    type: 'map',
    layerName: 'RIAN_3_HOUR',
    // url: 'http://10.36.234.83:8090/iserver/services/map-kljcz_3/rest/maps/klj03'
  },
  // ----六小时累计降雨
  RIAN_6_H: {
    type: 'map',
    layerName: 'RIAN_6_HOUR',
    // url: 'http://10.36.234.83:8090/iserver/services/map-kljcz_6/rest/maps/klj06'
  },
  // ----短时预报 未来3小时
  RIAN_SHORT_3_H_PR: {
    type: 'map',
    layerName: 'RIAN_SHORT_3_HOUR'
  },
  // 雨情--预测
  // ----一小时预测降雨
  RIAN_1_H_PR: {
    type: 'map',
    layerName: 'RIAN_1_H_PR',
    // url: 'http://10.36.234.83:8090/iserver/services/map-Weather_Pr/rest/maps/Pr01@10.36.234.85_Weather_RainFall'
  },
  // ----三小时预测降雨
  RIAN_3_H_PR: {
    type: 'map',
    layerName: 'RIAN_3_H_PR',
    // url: 'http://10.36.234.83:8090/iserver/services/map-Weather_Pr/rest/maps/Pr03@10.36.234.85_Weather_RainFall'
  },
  // ----六小时预测降雨
  RIAN_6_H_PR: {
    type: 'map',
    layerName: 'RIAN_6_H_PR',
    // url: 'http://10.36.234.83:8090/iserver/services/map-Weather_Pr/rest/maps/Pr06@10.36.234.85_Weather_RainFall'
  },

  // 阻隔分析
  ZG_MAP_REST: {
    type: 'map',
    layerName: 'ZG_MAP_REST',
    url: 'http://172.20.83.218:8090/iserver/services/map-buffer/rest/maps/Buffer_35m%40Buffer'
  },
  // --国道
  Buffer_35m: {
    type: 'data',
    layerName: 'Buffer_35m',
    label: '国道',
    dataSourceName: 'Buffer',
    // url: bufferUrl
  },
  // --省道、城市干道
  Buffer_26m: {
    type: 'data',
    layerName: 'Buffer_26m',
    label: '省道、城市干道',
    dataSourceName: 'Buffer',
    // url: bufferUrl
  },
  // --城市高架、快速路
  Buffer_30m: {
    type: 'data',
    layerName: 'Buffer_30m',
    label: '城市高架、快速路',
    dataSourceName: 'Buffer',
    // url: bufferUrl
  },
  // --支线
  Buffer_15m: {
    type: 'data',
    layerName: 'Buffer_15m',
    label: '支线',
    dataSourceName: 'Buffer',
    // url: bufferUrl
  },
  // --乡道、村道、其他道路
  Buffer_10m: {
    type: 'data',
    layerName: 'Buffer_10m',
    label: '乡道、村道、其他道路',
    dataSourceName: 'Buffer',
    // url: bufferUrl
  },
  // --5m水系
  Buf_Hyd_5m: {
    type: 'data',
    layerName: 'Buf_Hyd_5m',
    label: '阻隔水系-1',
    dataSourceName: 'Buffer',
    // url: bufferUrl
  },
  // --10m水系
  Buf_Hyd_10m: {
    type: 'data',
    layerName: 'Buf_Hyd_10m',
    label: '阻隔水系-2',
    dataSourceName: 'Buffer',
    // url: bufferUrl
  },
  // 荒漠地
  HMD: {
    type: 'data',
    layerName: '荒漠SmA',
    label: '荒漠地',
    dataSourceName: 'Buffer',
    // url: bufferUrl
  },
  // 种植地
  ZZD: {
    type: 'data',
    layerName: 'SmA95',
    label: '种植地',
    dataSourceName: 'Buffer',
    // url: bufferUrl
  },
  // 地表覆盖
  HM: {
    type: 'map',
    layerName: 'HuangMoYLLDB',
    label: '裸露地表',
    icon: '荒漠与裸露地表颜色.png',
    // url: 'http://10.36.234.83:8090/iserver/services/map-TuDiLY/rest/maps/HuangMoYLLDB'
  },
  ZZTD: {
    type: 'map',
    layerName: 'ZhongZhiTD',
    label: '农用地',
    icon: '种植土地颜色.png',
    // url: 'http://10.36.234.83:8090/iserver/services/map-TuDiLY/rest/maps/ZhongZhiTD'
  },
  LCFG: {
    type: 'map',
    layerName: 'LinCaoFG',
    label: '林地',
    icon: '林草覆盖颜色.png',
    // url: 'http://10.36.234.83:8090/iserver/services/map-TuDiLY/rest/maps/LinCaoFG'
  },
  FWJZ: {
    type: 'map',
    layerName: 'FangWuJZ',
    label: '房屋建筑（区）',
    icon: '房屋建筑（区）颜色.png',
    // url: 'http://10.36.234.83:8090/iserver/services/map-TuDiLY/rest/maps/FangWuJZ'
  },
  GZW: {
    type: 'map',
    layerName: 'GouZhuW',
    label: '构筑物',
    icon: '构筑物颜色.png',
    // url: 'http://10.36.234.83:8090/iserver/services/map-TuDiLY/rest/maps/GouZhuW'
  },

  VIDEO:{
    type: 'data', // 数据服务
    layerName: 'd_video',
    label: '监控设备',
    dataSourceName,
    icon: '监控设备.png',
    url: dataUrl
  },
  NETWORK:{
    type: 'data', // 数据服务
    layerName: 'd_handle_network',
    label: '办事网点',
    dataSourceName,
    icon: '办事网点.png',
    url: dataUrl
  },
  QIXIANG:{
    type: 'data', // 数据服务
    layerName: 'v_forest_qixiangcezhandian',
    label: '气象测站',
    dataSourceName,
    icon: '气象测站.png',
    url: dataUrl
  },
  TIETA:{
    type: 'data', // 数据服务
    layerName: 'v_forest_tower',
    label: '铁塔',
    dataSourceName,
    icon: '铁塔.png',
    url: dataUrl
  },
  // 水系
  WATER: {
    type: 'map',
    layerName: 'SECRET_WETLAND',
    label: '水系',
    icon: '水系.png',
    // url: 'http://172.20.83.218:8090/iserver/services/map-ruian/rest/maps/HYD_PY@MapManager'
    // url: 'http://10.36.234.83:8090/iserver/services/map-ruian/rest/maps/HYD_PY%40MapManager'
  },
  // 道路
  ROAD: {
    type: 'map',
    layerName: 'SECRET_WETLAND',
    label: '道路',
    icon: 'road.png',

    // url: 'http://10.36.234.83:8090/iserver/services/map-RuianRoad/rest/maps/Guodao%40MapManager'
    // url: 'http://172.20.83.218:8090/iserver/services/map-ruian/rest/maps/Road_Classify'
    // url: 'http://10.36.234.83:8094/iserver/services/map-Network/rest/maps/TRA_NET_LN@MapManager'
  },
  // 村庄、房屋
  FANGWU: {
    type: 'map',
    layerName: 'FANGWU',
    label: '村庄、房屋',
    url: 'http://172.20.83.218:8098/iserver/services/map-FWM/rest/maps/RES_PY_RA%4010.36.234.85_fxft'
  },

  // 应急专家
  JZJZNL_YJZJ: {
    type: 'data', // 数据服务
    layerName: 'd_emergency_team',
    label: '应急专家',
    dataSourceName,
    // url: dataUrl,
    icon: '危化类.png'
  },
  // --危化类
  JZJZNL_YJZJ_WH: {
    type: 'data', // 数据服务
    layerName: 'd_emergency_team',
    label: '危化类专家',
    dataSourceName,
    // url: dataUrl,
    icon: '危化类.png',
    attributeFilter: "DATATYPE = '危化类专家'"
  },
  // --机械电气类
  JZJZNL_YJZJ_JXDQ: {
    type: 'data', // 数据服务
    layerName: 'd_emergency_team',
    label: '机械类专家',
    dataSourceName,
    // url: dataUrl,
    icon: '机械电气类.png',
    attributeFilter: "DATATYPE = '机械类专家'"
  },
  // --矿山类
  JZJZNL_YJZJ_KS: {
    type: 'data', // 数据服务
    layerName: 'd_emergency_team',
    label: '矿山类专家',
    dataSourceName,
    // url: dataUrl,
    icon: '矿山类.png',
    attributeFilter: "DATATYPE = '矿山类专家'"
  },
  // --防汛类
  JZJZNL_YJZJ_FX: {
    type: 'data', // 数据服务
    layerName: 'd_emergency_team',
    label: '防汛类专家',
    dataSourceName,
    // url: dataUrl,
    icon: '防汛类.png',
    attributeFilter: "DATATYPE = '防汛类专家'"
  },
  // --综合类
  JZJZNL_YJZJ_ZH: {
    type: 'data', // 数据服务
    layerName: 'd_emergency_team',
    label: '综合类专家',
    dataSourceName,
    // url: dataUrl,
    icon: '综合类.png',
    attributeFilter: "DATATYPE = '综合类专家'"
  },
  // --减灾救灾类
  JZJZNL_YJZJ_ZJJZ: {
    type: 'data', // 数据服务
    layerName: 'd_emergency_team',
    label: '减灾救灾类专家',
    dataSourceName,
    // url: dataUrl,
    icon: '减灾救灾类.png',
    attributeFilter: "DATATYPE = '减灾救灾类专家'"
  },
  // --地震地质类
  JZJZNL_YJZJ_DZDZ: {
    type: 'data', // 数据服务
    layerName: 'd_emergency_team',
    label: '地震地质类专家',
    dataSourceName,
    // url: dataUrl,
    icon: '地震地质类.png',
    attributeFilter: "DATATYPE = '地震地质类专家'"
  },

  // 应急队伍
  JZJZNL_YJDW: {
    type: 'data',
    layerName: 'd_emergency_team',
    label: '应急队伍',
    dataSourceName,
    url: dataUrl,
    icon: '综合救援队伍.png'
  },
  // --综合救援队伍
  JZJZNL_YJDW_ZH: {
    type: 'data',
    layerName: 'd_emergency_team',
    label: '综合救援队伍',
    dataSourceName,
    url: dataUrl,
    icon: '综合救援队伍.png',
    attributeFilter: "DATATYPE = '综合救援队伍'"
  },
  // --骨干救援队伍
  JZJZNL_YJDW_GG: {
    type: 'data',
    layerName: 'd_emergency_team',
    label: '森林消防救援队伍',
    dataSourceName,
    url: dataUrl,
    icon: '森林消防救援队伍.png',
    attributeFilter: "DATATYPE = '骨干救援队伍'"
  },
  // --专业救援队伍
  JZJZNL_YJDW_ZY: {
    type: 'data',
    layerName: 'd_emergency_team',
    label: '专业救援队伍',
    dataSourceName,
    url: dataUrl,
    icon: '专业救援队伍.png',
    attributeFilter: "DATATYPE = '专业救援队伍'"
  },
  // --森林消防救援队伍
  JZJZNL_YJDW_XFDW: {
    type: 'data',
    layerName: 'd_emergency_team',
    label: '森林消防救援队伍',
    dataSourceName,
    url: dataUrl,
    icon: '森林消防救援队伍.png',
    attributeFilter: "DATATYPE = '专业救援队伍' AND TYPE2 = '森林消防救援队伍'"
  },
  // --志愿者救援队伍
  JZJZNL_YJDW_ZYZ: {
    type: 'data',
    layerName: 'd_emergency_team',
    label: '志愿者救援队伍',
    dataSourceName,
    url: dataUrl,
    icon: '志愿者救援队伍.png',
    attributeFilter: "DATATYPE = '志愿者救援队伍'"
  },
  // 应急避难场所
  JZJZNL_BZAZCS: {
    type: 'data',
    layerName: 'JZJZNL_BZAZCS',
    label: '应急避难场所',
    dataSourceName,
    // url: dataUrl,
    icon: '应急避难场所.png'
  },
  // 应急物资储备库
  // --市县物资储备库
  JZJZNL_WZCBK_SX: {
    type: 'data',
    layerName: 'JZJZNL_WZCBK',
    label: '市县物资储备库',
    dataSourceName,
    // url: dataUrl,
    icon: '市县物资储备库.png',
    attributeFilter: "DATATYPE = '市县物资储备库'"
  },
  // --部门物资储备点
  JZJZNL_WZCBK_BM: {
    type: 'data',
    layerName: 'JZJZNL_WZCBK',
    label: '部门物资储备点',
    dataSourceName,
    // url: dataUrl,
    icon: '部门物资储备点.png',
    attributeFilter: "DATATYPE = '部门物资储备点'"
  },
  // --乡镇（街道）物资储备库
  JZJZNL_WZCBK_XZ: {
    type: 'data',
    layerName: 'JZJZNL_WZCBK',
    label: '乡镇（街道）物资储备库',
    dataSourceName,
    // url: dataUrl,
    icon: '部门物资储备点.png',
    attributeFilter: "DATATYPE = '乡镇物资储备点'"
  },

  // 物质企业储备库
  // --供应网点
  JZJZNL_WZCBQY_GYWD: {
    type: 'data',
    layerName: 'JZJZNL_WZCBQY_GYWD',
    label: '供应网点',
    dataSourceName,
    // url: dataUrl,
    icon: '供应网点.png'
  },
  // --加工企业
  JZJZNL_WZCBQY_JGQY: {
    type: 'data',
    layerName: 'JZJZNL_WZCBQY_JGQY',
    label: '加工企业',
    dataSourceName,
    // url: dataUrl,
    icon: '供应网点.png'
  },
  // --配送中心
  JZJZNL_WZCBQY_PSZX: {
    type: 'data',
    layerName: 'JZJZNL_WZCBQY_PSZX',
    label: '配送中心',
    dataSourceName,
    // url: dataUrl,
    icon: '供应网点.png'
  },
  // --运输企业
  JZJZNL_WZCBQY_YSQY: {
    type: 'data',
    layerName: 'JZJZNL_WZCBQY_YSQY',
    label: '运输企业',
    dataSourceName,
    // url: dataUrl,
    icon: '运输企业.png'
  },
  // 应急关键设备
  // --冲锋舟
  JZJZNL_YJGJSB_CFZ: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '冲锋舟',
    dataSourceName,
    // url: dataUrl,
    icon: '冲锋舟.png',
    attributeFilter: "YJGJSB_TYPE = '冲锋舟'"
  },
  // --橡皮艇
  JZJZNL_YJGJSB_XPT: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '橡皮艇',
    dataSourceName,
    // url: dataUrl,
    icon: '橡皮艇.png',
    attributeFilter: "YJGJSB_TYPE = '橡皮艇'"
  },
  // --挖掘机
  JZJZNL_YJGJSB_WJJ: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '挖掘机',
    dataSourceName,
    // url: dataUrl,
    icon: '挖掘机.png',
    attributeFilter: "YJGJSB_TYPE = '挖掘机'"
  },
  // --推土机
  JZJZNL_YJGJSB_TTJ: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '推土机',
    dataSourceName,
    // url: dataUrl,
    icon: '推土机.png',
    attributeFilter: "YJGJSB_TYPE = '推土机'"
  },
  // --发电机组
  JZJZNL_YJGJSB_FDJZ: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '发电机组',
    dataSourceName,
    // url: dataUrl,
    icon: '发电机组.png',
    attributeFilter: "YJGJSB_TYPE = '发电机组'"
  },
  // --水泵
  JZJZNL_YJGJSB_SB: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '水泵',
    dataSourceName,
    // url: dataUrl,
    icon: '水泵.png',
    attributeFilter: "YJGJSB_TYPE = '水泵'"
  },
  // --卫星电话
  JZJZNL_YJGJSB_WXDH: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '卫星电话',
    dataSourceName,
    // url: dataUrl,
    icon: '运输车.png',
    attributeFilter: "YJGJSB_TYPE = '卫星电话'"
  },
  // --单兵设备
  JZJZNL_YJGJSB_DBSB: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '单兵设备',
    dataSourceName,
    // url: dataUrl,
    icon: '运输车.png',
    attributeFilter: "YJGJSB_TYPE = '单兵设备'"
  },
  // --吊车
  JZJZNL_YJGJSB_DC: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '吊车',
    dataSourceName,
    // url: dataUrl,
    icon: '吊车.png',
    attributeFilter: "YJGJSB_TYPE = '吊车'"
  },
  // --抛绳器
  JZJZNL_YJGJSB_PSQ: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '抛绳器',
    dataSourceName,
    // url: dataUrl,
    icon: '抛绳器.png',
    attributeFilter: "YJGJSB_TYPE = '抛绳器'"
  },
  // --大型照明设备
  JZJZNL_YJGJSB_ZMSB: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '大型照明设备',
    dataSourceName,
    // url: dataUrl,
    icon: '大型照明设备.png',
    attributeFilter: "YJGJSB_TYPE = '大型照明设备'"
  },
  // --无人机
  JZJZNL_YJGJSB_WRJ: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '无人机',
    dataSourceName,
    // url: dataUrl,
    icon: '无人机.png',
    attributeFilter: "YJGJSB_TYPE = '无人机'"
  },
  // --切割机
  JZJZNL_YJGJSB_QGJ: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '切割机',
    dataSourceName,
    // url: dataUrl,
    icon: '切割机.png',
    attributeFilter: "YJGJSB_TYPE = '切割机'"
  },
  // --运输车
  JZJZNL_YJGJSB_YSC: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '运输车',
    dataSourceName,
    // url: dataUrl,
    icon: '运输车.png',
    attributeFilter: "YJGJSB_TYPE = '运输车'"
  },
  // --拖轮
  JZJZNL_YJGJSB_TL: {
    type: 'data',
    layerName: 'JZJZNL_YJGJSB',
    label: '拖轮',
    dataSourceName,
    // url: dataUrl,
    icon: '运输车.png',
    attributeFilter: "YJGJSB_TYPE = '拖轮'"
  },

  // 医疗救护
  // --救护场所
  JZJZNL_YLJH_JHCS: {
    type: 'data',
    layerName: 'JZJZNL_YLJH_JHCS',
    label: '救护场所',
    dataSourceName,
    // url: dataUrl,
    icon: '救护场所.png'
  },
  // --救护车辆
  JZJZNL_YLJH_JHCL: {
    type: 'data',
    layerName: 'JZJZNL_YLJH_JHCL',
    label: '救护车辆',
    dataSourceName,
    // url: dataUrl,
    icon: '救护车辆.png'
  },
  // --医疗救护设备
  JZJZNL_YLJH_JHCL_JHSB: {
    type: 'data',
    layerName: 'JZJZNL_YLJH_JHCL_JHSB',
    label: '医疗救护设备',
    dataSourceName,
    // url: dataUrl,
    icon: '医疗救护设备.png'
  },
  // --医疗物资
  JZJZNL_YLJH_JHCL_YLWZ: {
    type: 'data',
    layerName: 'JZJZNL_YLJH_JHCL_YLWZ',
    label: '医疗物资',
    dataSourceName,
    // url: dataUrl,
    icon: '医疗物资.png'
  },
  // --血库
  JZJZNL_YLJH_XK: {
    type: 'data',
    layerName: 'JZJZNL_YLJH_XZ_XK',
    label: '血库',
    dataSourceName,
    // url: dataUrl,
    icon: '血库.png'
  },
  // --血站
  JZJZNL_YLJH_XZ: {
    type: 'data',
    layerName: 'JZJZNL_YLJH_XZ',
    label: '血站',
    dataSourceName,
    // url: dataUrl,
    icon: '血站.png'
  },
  // --疾控中心
  JZJZNL_YLJH_JKZX: {
    type: 'data',
    layerName: 'JZJZNL_YLJH_JKZX',
    label: '疾控中心',
    dataSourceName,
    // url: dataUrl,
    icon: '疾控中心.png'
  },
  // --急救指挥中心
  JZJZNL_YLJH_JJZHZX: {
    type: 'data',
    layerName: 'JZJZNL_YLJH_JJZHZX',
    label: '急救指挥中心',
    dataSourceName,
    // url: dataUrl,
    icon: '急救指挥中心.png'
  },
  // --卫生监督机构
  JZJZNL_YLJH_WSJDJG: {
    type: 'data',
    layerName: 'JZJZNL_YLJH_WSJDJG',
    label: '卫生监督机构',
    dataSourceName,
    // url: dataUrl
  },
  // 消防救援能力
  // --消防站
  JZJZNL_XFJYNL_XFZ: {
    type: 'data',
    layerName: 'JZJZNL_XFJYNL_XFZ',
    label: '消防站',
    dataSourceName,
    // url: dataUrl,
    icon: '消防站.png'
  },
  // --专职消防队
  // --消防栓
  // 党政行政机关
  // 安全风险源
  // --水库
  RESERVOIR: {
    type: 'data',
    layerName: 'RESERVOIR',
    label: '水库',
    dataSourceName,
    // url: dataUrl,
    icon: '水库.png'
  },
  // --山塘
  POOL: {
    type: 'data',
    layerName: 'POOL',
    label: '山塘',
    dataSourceName,
    // url: dataUrl,
    icon: '山塘.png'
  },
  // --海塘
  SEAWALL: {
    type: 'data',
    layerName: 'SEAWALL',
    label: '海塘',
    dataSourceName,
    // url: dataUrl,
    icon: '海塘.png'
  },
  // --堤防
  DYKE: {
    type: 'data',
    layerName: 'DYKE',
    label: '堤防',
    dataSourceName,
    // url: dataUrl,
    icon: '堤防.png'
  },
  // --泵站
  PUMP: {
    type: 'data',
    layerName: 'PUMP',
    label: '泵站',
    dataSourceName,
    // url: dataUrl,
    icon: '泵站.png'
  },
  // --水闸
  WATER_GATE: {
    type: 'data',
    layerName: 'WATER_GATE',
    label: '水闸',
    dataSourceName,
    // url: dataUrl,
    icon: '水闸.png'
  },
  // --旱闸
  // --防浪墙开口
  // --农村饮用水
  RURAL_DRINKING_WATER: {
    type: 'data',
    layerName: 'RURAL_DRINKING_WATER',
    label: '农村饮用水',
    dataSourceName,
    // url: dataUrl,
    icon: '农村饮用水.png'
  },
  // --水电站
  AQFXY_SL_SDZ: {
    type: 'data',
    layerName: 'AQFXY_SL_SDZ',
    label: '水电站',
    dataSourceName,
    // url: dataUrl,
    icon: '水电站.png'
  },
  // 道路运输
  // --桥梁
  BRIDGE: {
    type: 'data',
    layerName: 'BRIDGE',
    label: '桥梁',
    dataSourceName,
    // url: dataUrl,
    icon: '桥梁.png'
  },
  // --隧道
  TUNNEL: {
    type: 'data',
    layerName: 'TUNNEL',
    label: '隧道',
    dataSourceName,
    // url: dataUrl,
    icon: '隧道.png'
  },
  // --涵洞
  AQFXY_JT_HD: {
    type: 'data',
    layerName: 'AQFXY_JT_HD',
    label: '涵洞',
    dataSourceName,
    // url: dataUrl,
    icon: '涵洞.png'
  },
  // --港口码头
  PORT_WHARF: {
    type: 'data',
    layerName: 'PORT_WHARF',
    label: '港口码头',
    dataSourceName,
    // url: dataUrl,
    icon: '港口.png'
  },
  // --水路运输单位
  WATERWAY_TRANSPORT_UNIT: {
    type: 'data',
    layerName: 'WATERWAY_TRANSPORT_UNIT',
    label: '水路运输单位',
    dataSourceName,
    // url: dataUrl,
    icon: '水路运输单位.png'
  },
  // --市域轨道站点
  D_HAZARDS_TRACKSHP_P: {
    type: 'data',
    layerName: 'D_HAZARDS_TRACKSHP_P',
    label: '市域轨道站点',
    dataSourceName,
    // url: dataUrl,
    icon: '市域轨道站点.png'
  },
  // --火车站
  D_HAZARDS_TRAIN_STATION: {
    type: 'data',
    layerName: 'D_HAZARDS_TRAIN_STATION',
    label: '火车站',
    dataSourceName,
    // url: dataUrl,
    icon: '火车站.png'
  },
  // --两客一危企业
  DANGEROUS_CAR_ENTERPRISE: {
    type: 'data',
    layerName: 'DANGEROUS_CAR_ENTERPRISE',
    label: '两客一危企业',
    dataSourceName,
    // url: dataUrl,
    icon: '两客一危企业.png'
  },
  // --道路隐患点
  ACCIDENT_BLACK_SPOT: {
    type: 'data',
    layerName: 'DANGEROUS_CAR_ENTERPRISE',
    label: '道路隐患点',
    dataSourceName,
    // url: dataUrl,
    icon: '道路隐患点.png'
  },
  // 化工危险品企业
  D_HAZARDS_CHEMICALSHP: {
    type: 'data',
    layerName: 'D_HAZARDS_CHEMICALSHP',
    label: '化工危险品企业',
    dataSourceName,
    // url: dataUrl,
    icon: '生产企业.png'
  },
  // --生产企业
  D_HAZARDS_CHEMICALSHP_SCQY: {
    type: 'data',
    layerName: 'D_HAZARDS_CHEMICALSHP',
    label: '生产企业',
    dataSourceName,
    // url: dataUrl,
    icon: '生产企业.png',
    attributeFilter: "DATATYPE = '生产企业'"
  },
  // --使用企业
  D_HAZARDS_CHEMICALSHP_SYQY: {
    type: 'data',
    layerName: 'D_HAZARDS_CHEMICALSHP',
    label: '使用企业',
    dataSourceName,
    // url: dataUrl,
    icon: '使用企业.png',
    attributeFilter: "DATATYPE = '使用企业'"
  },
  // --仓储经营
  D_HAZARDS_CHEMICALSHP_SYQY_CCJY: {
    type: 'data',
    layerName: 'D_HAZARDS_CHEMICALSHP',
    label: '仓储经营',
    dataSourceName,
    // url: dataUrl,
    icon: '仓储经营.png',
    attributeFilter: "DATATYPE = '仓储经营'"
  },
  // --带仓储经营
  D_HAZARDS_CHEMICALSHP_SYQY_DCCJY: {
    type: 'data',
    layerName: 'D_HAZARDS_CHEMICALSHP',
    label: '带仓储经营',
    dataSourceName,
    // url: dataUrl,
    icon: '带仓储经营.png',
    attributeFilter: "DATATYPE = '带仓储经营'"
  },
  // --不带仓储经营
  D_HAZARDS_CHEMICALSHP_SYQY_BDCCJY: {
    type: 'data',
    layerName: 'D_HAZARDS_CHEMICALSHP',
    label: '不带仓储经营',
    dataSourceName,
    // url: dataUrl,
    icon: '不带仓储经营.png',
    attributeFilter: "DATATYPE = '不带仓储经营'"
  },
  // --加油站
  D_HAZARDS_CHEMICALSHP_SYQY_YJZ: {
    type: 'data',
    layerName: 'D_HAZARDS_CHEMICALSHP',
    label: '加油站',
    dataSourceName,
    // url: dataUrl,
    icon: '加油站.png',
    attributeFilter: "DATATYPE = '加油站'"
  },
  // 人员密集场所
  // --旅游景点
  TOURIST_SPOT: {
    type: 'data',
    layerName: 'TOURIST_SPOT',
    label: '旅游景点',
    dataSourceName,
    // url: dataUrl,
    icon: '旅游景点.png'
  },
  // --农家乐
  AGRITAINMENT: {
    type: 'data',
    layerName: 'AGRITAINMENT',
    label: '农家乐',
    dataSourceName,
    // url: dataUrl,
    icon: '农家乐.png'
  },
  // --民宿
  HOMESTAY: {
    type: 'data',
    layerName: 'HOMESTAY',
    label: '民宿',
    dataSourceName,
    // url: dataUrl,
    icon: '民宿.png'
  },
  // --重点餐饮
  AQFXY_RM_ZDCY: {
    type: 'data',
    layerName: 'AQFXY_RM_ZDCY',
    label: '重点餐饮',
    dataSourceName,
    // url: dataUrl,
    icon: '重点餐饮(瑞安).png'
  },
  // 爆竹烟花经营单位
  D_HARAZDS_FIREWORKS: {
    type: 'data',
    layerName: 'D_HARAZDS_FIREWORKS',
    label: '烟花爆竹经营单位',
    dataSourceName,
    // url: dataUrl,
    icon: '专库存储经营.png'
  },
  // 消防安全重点单位
  FIRE_SAFETY_PROTECT_UNIT: {
    type: 'data',
    layerName: 'FIRE_SAFETY_PROTECT_UNIT',
    label: '消防安全单位',
    dataSourceName,
    // url: dataUrl,
    icon: '消防安全重点单位.png'
  },
  // 其它
  // --民爆物品企业
  CIVIL_EXPLOSIVES_ENTERPRISES: {
    type: 'data',
    layerName: 'CIVIL_EXPLOSIVES_ENTERPRISES',
    label: '民爆物品企业',
    dataSourceName,
    // url: dataUrl,
    icon: '民爆物品企业(瑞安).png'
  },
  // --易制毒化学品企业
  AQFXY_QT_YZDHX: {
    type: 'data',
    layerName: 'AQFXY_QT_YZDHX',
    label: '易制毒化学品企业',
    dataSourceName,
    // url: dataUrl,
    icon: '易制毒化学品企业(瑞安).png'
  },
  // 巡逻范围
  SLFH_FHRY: {
    type: 'map',
    layerName: 'SLFH_FHRY',
    label: '巡逻范围',
    dataSourceName,
    icon: '巡逻范围.png',
    // url: 'http://172.20.83.218:8090/iserver/services/data-wenzhouyingji/rest/data'
    // url: 'http://10.36.234.83:8094/iserver/services/map-SLFH_DATA/rest/maps/SLFH_FHRY'
  }
}

export default mapUrl
