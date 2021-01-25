import MAP_URL from '@/utils/map/map-url'
const hzdfxNodes = [
  //  阻隔分析 start
  {
    id: 11,
    label: '国道',
    value: MAP_URL.Buffer_35m
  },
  {
    id: 12,
    label: '省道、城市干道',
    value: MAP_URL.Buffer_26m
  },
  {
    id: 13,
    label: '城市高架、快速路',
    value: MAP_URL.Buffer_30m
  },
  {
    id: 14,
    label: '支线',
    value: MAP_URL.Buffer_15m
  },
  {
    id: 15,
    label: '乡道、村道、其他道路',
    value: MAP_URL.Buffer_10m
  },
  {
    id: 16,
    label: '5m水系',
    value: MAP_URL.Buf_Hyd_5m
  },
  {
    id: 17,
    label: '10m水系',
    value: MAP_URL.Buf_Hyd_10m
  },
  // 荒漠地
  {
    id: 18,
    label: '荒漠地',
    value: MAP_URL.HMD
  },
  // 种植地
  {
    id: 19,
    label: '种植地',
    value: MAP_URL.ZZD
  },
  // 林区资源
  // {
  //   id: 110,
  //   label: '林区资源',
  //   value: MAP_URL.SLZY
  // },
  //  阻隔分析 end
  // 应急专家 start
  {
    id: 211,
    label: '危化类',
    value: MAP_URL.JZJZNL_YJZJ_WH
  },
  {
    id: 212,
    label: '机械电气类',
    value: MAP_URL.JZJZNL_YJZJ_JXDQ
  },
  {
    id: 213,
    label: '矿山类',
    value: MAP_URL.JZJZNL_YJZJ_KS
  },
  {
    id: 214,
    label: '防汛类',
    value: MAP_URL.JZJZNL_YJZJ_FX
  },
  {
    id: 215,
    label: '综合类',
    value: MAP_URL.JZJZNL_YJZJ_ZH
  },
  {
    id: 216,
    label: '减灾救灾类',
    value: MAP_URL.JZJZNL_YJZJ_ZJJZ
  },
  {
    id: 217,
    label: '地震地质类',
    value: MAP_URL.JZJZNL_YJZJ_DZDZ
  },
  // 应急专家 end
  {
    id: 221,
    label: '综合救援队伍',
    value: MAP_URL.JZJZNL_YJDW_ZH
  },
  {
    id: 222,
    label: '骨干救援队伍',
    value: MAP_URL.JZJZNL_YJDW_GG
  },
  {
    id: 223,
    label: '专业救援队伍',
    value: MAP_URL.JZJZNL_YJDW_ZY
  },
  {
    id: 224,
    label: '志愿者救援队伍',
    value: MAP_URL.JZJZNL_YJDW_ZYZ
  },
  {
    id: 27,
    label: '应急避难场所',
    value: MAP_URL.JZJZNL_BZAZCS
  },
  {
    id: 231,
    label: '市县物资储备库',
    value: MAP_URL.JZJZNL_WZCBK_SX
  },
  {
    id: 232,
    label: '部门物资储备点',
    value: MAP_URL.JZJZNL_WZCBK_BM
  },
  {
    id: 233,
    label: '乡镇（街道）物资储备库',
    value: MAP_URL.JZJZNL_WZCBK_XZ
  },
  {
    id: 241,
    label: '供应网点',
    value: MAP_URL.JZJZNL_WZCBQY_GYWD
  },
  {
    id: 242,
    label: '加工企业',
    value: MAP_URL.JZJZNL_WZCBQY_JGQY
  },
  {
    id: 243,
    label: '配送中心',
    value: MAP_URL.JZJZNL_WZCBQY_PSZX
  },
  {
    id: 244,
    label: '运输企业',
    value: MAP_URL.JZJZNL_WZCBQY_YSQY
  },
  {
    id: 251,
    label: '冲锋舟',
    value: MAP_URL.JZJZNL_YJGJSB_CFZ
  },
  {
    id: 252,
    label: '橡皮艇',
    value: MAP_URL.JZJZNL_YJGJSB_XPT
  },
  {
    id: 253,
    label: '挖掘机',
    value: MAP_URL.JZJZNL_YJGJSB_WJJ
  },
  {
    id: 254,
    label: '推土机',
    value: MAP_URL.JZJZNL_YJGJSB_TTJ
  },
  {
    id: 255,
    label: '发电机组',
    value: MAP_URL.JZJZNL_YJGJSB_FDJZ
  },
  {
    id: 256,
    label: '水泵',
    value: MAP_URL.JZJZNL_YJGJSB_SB
  },
  {
    id: 257,
    label: '卫星电话',
    value: MAP_URL.JZJZNL_YJGJSB_WXDH
  },
  {
    id: 2515,
    label: '单兵设备',
    value: MAP_URL.JZJZNL_YJGJSB_DBSB
  },
  {
    id: 258,
    label: '吊车',
    value: MAP_URL.JZJZNL_YJGJSB_DC
  },
  {
    id: 259,
    label: '抛绳器',
    value: MAP_URL.JZJZNL_YJGJSB_PSQ
  },
  {
    id: 2510,
    label: '大型照明设备',
    value: MAP_URL.JZJZNL_YJGJSB_ZMSB
  },
  {
    id: 2511,
    label: '无人机',
    value: MAP_URL.JZJZNL_YJGJSB_WRJ
  },
  {
    id: 2512,
    label: '切割机',
    value: MAP_URL.JZJZNL_YJGJSB_QGJ
  },
  {
    id: 2513,
    label: '运输车',
    value: MAP_URL.JZJZNL_YJGJSB_YSC
  },
  {
    id: 2514,
    label: '拖轮',
    value: MAP_URL.JZJZNL_YJGJSB_TL
  },
  {
    id: 261,
    label: '救护场所',
    value: MAP_URL.JZJZNL_YLJH_JHCS
  },
  {
    id: 262,
    label: '救护车辆',
    value: MAP_URL.JZJZNL_YLJH_JHCL
  },
  {
    id: 263,
    label: '医疗救护设备',
    value: MAP_URL.JZJZNL_YLJH_JHCL_JHSB
  },
  {
    id: 264,
    label: '医疗物资',
    value: MAP_URL.JZJZNL_YLJH_YLWZ
  },
  {
    id: 266,
    label: '血站',
    value: MAP_URL.JZJZNL_YLJH_XZ
  },
  {
    id: 267,
    label: '疾控中心',
    value: MAP_URL.JZJZNL_YLJH_JKZX
  },
  {
    id: 268,
    label: '急救指挥中心',
    value: MAP_URL.JZJZNL_YLJH_JJZHZX
  },
  {
    id: 269,
    label: '卫生监督机构',
    value: MAP_URL.JZJZNL_YLJH_WSJDJG
  },
  {
    id: 281,
    label: '消防站',
    value: MAP_URL.JZJZNL_XFJYNL_XFZ
  },
  {
    id: 311,
    label: '水库',
    value: MAP_URL.RESERVOIR
  },
  {
    id: 312,
    label: '山塘',
    value: MAP_URL.POOL
  },
  {
    id: 313,
    label: '海塘',
    value: MAP_URL.SEAWALL
  },
  {
    id: 314,
    label: '堤防',
    value: MAP_URL.DYKE
  },
  {
    id: 315,
    label: '泵站',
    value: MAP_URL.PUMP
  },
  {
    id: 316,
    label: '水闸',
    value: MAP_URL.WATER_GATE
  },
  // {
  //   id: 317,
  //   label: '旱闸'
  // },
  // {
  //   id: 318,
  //   label: '防浪墙开口'
  // },
  {
    id: 319,
    label: '农村饮用水',
    value: MAP_URL.RURAL_DRINKING_WATER
  },
  {
    id: 3110,
    label: '水电站',
    value: MAP_URL.AQFXY_SL_SDZ
  },
  {
    id: 321,
    label: '桥梁',
    value: MAP_URL.BRIDGE
  },
  {
    id: 322,
    label: '隧道',
    value: MAP_URL.TUNNEL
  },
  {
    id: 323,
    label: '涵洞',
    value: MAP_URL.AQFXY_JT_HD
  },
  {
    id: 324,
    label: '港口码头',
    value: MAP_URL.PORT_WHARF
  },
  {
    id: 325,
    label: '水路运输单位',
    value: MAP_URL.WATERWAY_TRANSPORT_UNIT
  },
  {
    id: 326,
    label: '市域轨道站点',
    value: MAP_URL.D_HAZARDS_TRACKSHP_P
  },
  {
    id: 327,
    label: '火车站',
    value: MAP_URL.D_HAZARDS_TRAIN_STATION
  },
  {
    id: 328,
    label: '两客一危企业',
    value: MAP_URL.DANGEROUS_CAR_ENTERPRISE
  },
  {
    id: 329,
    label: '道路隐患点',
    value: MAP_URL.ACCIDENT_BLACK_SPOT
  },
  {
    id: 331,
    label: '生产企业',
    value: MAP_URL.D_HAZARDS_CHEMICALSHP_SCQY
  },
  {
    id: 332,
    label: '使用企业',
    value: MAP_URL.D_HAZARDS_CHEMICALSHP_SYQY
  },
  {
    id: 333,
    label: '仓储经营',
    value: MAP_URL.D_HAZARDS_CHEMICALSHP_SYQY_CCJY
  },
  {
    id: 334,
    label: '带仓储经营',
    value: MAP_URL.D_HAZARDS_CHEMICALSHP_SYQY_DCCJY
  },
  // {
  //   id: 335,
  //   label: '不带仓储经营',
  //   value: MAP_URL.D_HAZARDS_CHEMICALSHP_SYQY_BDCCJY
  // },
  {
    id: 336,
    label: '加油站',
    value: MAP_URL.D_HAZARDS_CHEMICALSHP_SYQY_YJZ
  },
  {
    id: 341,
    label: '旅游景点',
    value: MAP_URL.TOURIST_SPOT
  },
  {
    id: 342,
    label: '农家乐',
    value: MAP_URL.AGRITAINMENT
  },
  {
    id: 343,
    label: '民宿',
    value: MAP_URL.HOMESTAY
  },
  {
    id: 344,
    label: '重点餐饮',
    value: MAP_URL.AQFXY_RM_ZDCY
  },
  {
    id: 35,
    label: '烟花爆竹经营单位',
    value: MAP_URL.D_HARAZDS_FIREWORKS
  },
  {
    id: 36,
    label: '消防安全单位',
    value: MAP_URL.FIRE_SAFETY_PROTECT_UNIT
  },
  {
    id: 371,
    label: '民爆物品企业',
    value: MAP_URL.CIVIL_EXPLOSIVES_ENTERPRISES
  },
  {
    id: 372,
    label: '易制毒化学品企业',
    value: MAP_URL.AQFXY_QT_YZDHX
  }
]

export default hzdfxNodes
