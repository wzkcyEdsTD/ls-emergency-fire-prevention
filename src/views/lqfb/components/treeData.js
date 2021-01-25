import MAP_URL from '@/utils/map/map-url'
const treeData = [
  {
    id: 1,
    label: '基础要素',
    showCheck: true,
    children: [
      {
        id: 11,
        label: '林区',
        children: [
          {
            id: 111,
            label: '森林公园',
            isZLZY: true,
            value: MAP_URL.SECRET_FORESTPARK_M
          },
          {
            id: 112,
            label: '国有林场',
            isZLZY: true,
            value: MAP_URL.SECRET_NATIONAL_FOREST
          }
        ]
      },
      {
        id: 12,
        label: '水系',
        value: MAP_URL.WATER
      },
      {
        id: 13,
        label: '道路',
        value: MAP_URL.ROAD
      },
      {
        id: 14,
        label: '地表覆盖',
        // value: MAP_URL.FANGWU,
        children: [
          {
            id: 141,
            label: '裸露地表', // '荒漠与裸露地表',
            value: MAP_URL.HM
          },
          {
            id: 142,
            label: '农用地', // '种植土地',
            value: MAP_URL.ZZTD
          },
          {
            id: 143,
            label: '林地', // '林草覆盖',
            value: MAP_URL.LCFG
          },
          {
            id: 144,
            label: '房屋建筑（区）',
            value: MAP_URL.FWJZ
          },
          {
            id: 145,
            label: '构筑物',
            value: MAP_URL.GZW
          },
          {
            id: 146,
            label: '湿地',
            isZLZY: true,
            value: MAP_URL.SECRET_WETLAND
          }
          // {
          //   id: 147,
          //   label: '林区资源',
          //   value: MAP_URL.SLZY
          // }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '应急资源',
    showCheck: true,
    children: [
      // {
      //   id: 21,
      //   label: '应急专家',
      //   value: MAP_URL.JZJZNL_YJZJ,
      //   isZLZY: true,
      //   children: [
      //     {
      //       id: 211,
      //       label: '危化类',
      //       isZLZY: true,
      //       value: MAP_URL.JZJZNL_YJZJ_WH
      //     },
      //     {
      //       id: 212,
      //       label: '机械类',
      //       value: MAP_URL.JZJZNL_YJZJ_JXDQ,
      //       isZLZY: true
      //     },
      //     {
      //       id: 213,
      //       label: '矿山类',
      //       value: MAP_URL.JZJZNL_YJZJ_KS,
      //       isZLZY: true
      //     },
      //     {
      //       id: 214,
      //       label: '防汛类',
      //       value: MAP_URL.JZJZNL_YJZJ_FX,
      //       isZLZY: true
      //     },
      //     {
      //       id: 215,
      //       label: '综合类',
      //       value: MAP_URL.JZJZNL_YJZJ_ZH,
      //       isZLZY: true
      //     },
      //     {
      //       id: 216,
      //       label: '减灾救灾类',
      //       value: MAP_URL.JZJZNL_YJZJ_ZJJZ,
      //       isZLZY: true
      //     },
      //     {
      //       id: 217,
      //       label: '地震地质类',
      //       value: MAP_URL.JZJZNL_YJZJ_DZDZ,
      //       isZLZY: true
      //     }
      //   ]
      // },
      {
        id: 22,
        label: '应急队伍',
        children: [
          {
            id: 221,
            label: '综合救援队伍',
            value: MAP_URL.JZJZNL_YJDW_ZH,
            isZLZY: true
          },
          {
            id: 222,
            label: '森林消防救援队伍',
            value: MAP_URL.JZJZNL_YJDW_GG,
            isZLZY: true
          },
          {
            id: 223,
            label: '专业救援队伍',
            value: MAP_URL.JZJZNL_YJDW_ZY,
            isZLZY: true
          },
          {
            id: 224,
            label: '志愿者救援队伍',
            value: MAP_URL.JZJZNL_YJDW_ZYZ,
            isZLZY: true
          }
          // {
          //   id: 225,
          //   label: '森林消防救援队伍',
          //   value: MAP_URL.JZJZNL_YJDW_XFDW,
          //   isZLZY: true
          // }
        ]
      },
      {
        id: 27,
        label: '应急避难场所',
        value: MAP_URL.JZJZNL_BZAZCS,
        isZLZY: true
      },
      {
        id: 23,
        label: '物资储备库',
        children: [
          {
            id: 231,
            label: '市县物资储备库',
            value: MAP_URL.JZJZNL_WZCBK_SX,
            isZLZY: true
          },
          // {
          //   id: 232,
          //   label: '部门物资储备点',
          //   // label: '乡镇物资储备库',
          //   value: MAP_URL.JZJZNL_WZCBK_BM,
          //   isZLZY: true
          // }
          {
            id: 233,
            label: '乡镇（街道）物资储备库',
            value: MAP_URL.JZJZNL_WZCBK_XZ,
            isZLZY: true
          }
        ]
      },
      {
        id: 24,
        label: '物资储备企业',
        children: [
          {
            id: 241,
            label: '供应网点',
            value: MAP_URL.JZJZNL_WZCBQY_GYWD,
            isZLZY: true
          },
          {
            id: 242,
            label: '加工企业',
            value: MAP_URL.JZJZNL_WZCBQY_JGQY,
            isZLZY: true
          },
          {
            id: 243,
            label: '配送中心',
            value: MAP_URL.JZJZNL_WZCBQY_PSZX,
            isZLZY: true
          },
          {
            id: 244,
            label: '运输企业',
            value: MAP_URL.JZJZNL_WZCBQY_YSQY,
            isZLZY: true
          }
        ]
      },
      {
        id: 25,
        label: '应急关键设备',
        children: [
          {
            id: 251,
            label: '冲锋舟',
            value: MAP_URL.JZJZNL_YJGJSB_CFZ,
            isZLZY: true
          },
          {
            id: 252,
            label: '橡皮艇',
            value: MAP_URL.JZJZNL_YJGJSB_XPT,
            isZLZY: true
          },
          {
            id: 253,
            label: '挖掘机',
            value: MAP_URL.JZJZNL_YJGJSB_WJJ,
            isZLZY: true
          },
          {
            id: 254,
            label: '推土机',
            value: MAP_URL.JZJZNL_YJGJSB_TTJ,
            isZLZY: true
          },
          {
            id: 255,
            label: '发电机组',
            value: MAP_URL.JZJZNL_YJGJSB_FDJZ,
            isZLZY: true
          },
          {
            id: 256,
            label: '水泵',
            value: MAP_URL.JZJZNL_YJGJSB_SB,
            isZLZY: true
          },
          {
            id: 257,
            label: '卫星电话',
            value: MAP_URL.JZJZNL_YJGJSB_WXDH,
            isZLZY: true
          },
          {
            id: 2515,
            label: '单兵设备',
            value: MAP_URL.JZJZNL_YJGJSB_DBSB,
            isZLZY: true
          },
          {
            id: 258,
            label: '吊车',
            value: MAP_URL.JZJZNL_YJGJSB_DC,
            isZLZY: true
          },
          {
            id: 259,
            label: '抛绳器',
            value: MAP_URL.JZJZNL_YJGJSB_PSQ,
            isZLZY: true
          },
          {
            id: 2510,
            label: '大型照明设备',
            value: MAP_URL.JZJZNL_YJGJSB_ZMSB,
            isZLZY: true
          },
          {
            id: 2511,
            label: '无人机',
            value: MAP_URL.JZJZNL_YJGJSB_WRJ,
            isZLZY: true
          },
          {
            id: 2512,
            label: '切割机',
            value: MAP_URL.JZJZNL_YJGJSB_QGJ,
            isZLZY: true
          },
          {
            id: 2513,
            label: '运输车',
            value: MAP_URL.JZJZNL_YJGJSB_YSC,
            isZLZY: true
          },
          {
            id: 2514,
            label: '拖轮',
            value: MAP_URL.JZJZNL_YJGJSB_TL,
            isZLZY: true
          }
        ]
      },
      {
        id: 26,
        label: '医疗救护',
        children: [
          {
            id: 261,
            label: '救护场所',
            value: MAP_URL.JZJZNL_YLJH_JHCS,
            isZLZY: true
          },
          {
            id: 262,
            label: '救护车辆',
            value: MAP_URL.JZJZNL_YLJH_JHCL,
            isZLZY: true
          },
          {
            id: 263,
            label: '医疗救护设备',
            value: MAP_URL.JZJZNL_YLJH_JHCL_JHSB,
            isZLZY: true
          },
          {
            id: 264,
            label: '医疗物资',
            value: MAP_URL.JZJZNL_YLJH_YLWZ
          },
          // {
          //   id: 265,
          //   label: '血库',
          //   value: MAP_URL.JZJZNL_YLJH_XK,
          //   isZLZY: true
          // },
          {
            id: 266,
            label: '血站',
            value: MAP_URL.JZJZNL_YLJH_XZ,
            isZLZY: true
          },
          {
            id: 267,
            label: '疾控中心',
            value: MAP_URL.JZJZNL_YLJH_JKZX,
            isZLZY: true
          },
          {
            id: 268,
            label: '急救指挥中心',
            value: MAP_URL.JZJZNL_YLJH_JJZHZX,
            isZLZY: true
          },
          {
            id: 269,
            label: '卫生监督机构',
            value: MAP_URL.JZJZNL_YLJH_WSJDJG,
            isZLZY: true
          }
        ]
      },
      {
        id: 28,
        label: '消防救援能力',
        showCheck: true,
        children: [
          {
            id: 281,
            label: '消防站',
            value: MAP_URL.JZJZNL_XFJYNL_XFZ,
            isZLZY: true
          }
        ]
      }
      // {
      //   id: 29,
      //   label: '党政行政机关'
      // }
    ]
  },
  {
    id: 3,
    label: '安全风险源',
    showCheck: true,
    children: [
      {
        id: 31,
        label: '水利工程',
        children: [
          {
            id: 311,
            label: '水库',
            value: MAP_URL.RESERVOIR,
            isZLZY: true
          },
          {
            id: 312,
            label: '山塘',
            value: MAP_URL.POOL,
            isZLZY: true
          },
          {
            id: 313,
            label: '海塘',
            value: MAP_URL.SEAWALL,
            isZLZY: true
          },
          {
            id: 314,
            label: '堤防',
            value: MAP_URL.DYKE,
            isZLZY: true
          },
          {
            id: 315,
            label: '泵站',
            value: MAP_URL.PUMP,
            isZLZY: true
          },
          {
            id: 316,
            label: '水闸',
            value: MAP_URL.WATER_GATE,
            isZLZY: true
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
            value: MAP_URL.RURAL_DRINKING_WATER,
            isZLZY: true
          },
          {
            id: 3110,
            label: '水电站',
            value: MAP_URL.AQFXY_SL_SDZ,
            isZLZY: true
          }
        ]
      },
      {
        id: 32,
        label: '道路运输',
        children: [
          {
            id: 321,
            label: '桥梁',
            value: MAP_URL.BRIDGE,
            isZLZY: true
          },
          {
            id: 322,
            label: '隧道',
            value: MAP_URL.TUNNEL,
            isZLZY: true
          },
          {
            id: 323,
            label: '涵洞',
            value: MAP_URL.AQFXY_JT_HD,
            isZLZY: true
          },
          {
            id: 324,
            label: '港口码头',
            value: MAP_URL.PORT_WHARF,
            isZLZY: true
          },
          {
            id: 325,
            label: '水路运输单位',
            value: MAP_URL.WATERWAY_TRANSPORT_UNIT,
            isZLZY: true
          },
          {
            id: 326,
            label: '市域轨道站点',
            value: MAP_URL.D_HAZARDS_TRACKSHP_P,
            isZLZY: true
          },
          {
            id: 327,
            label: '火车站',
            value: MAP_URL.D_HAZARDS_TRAIN_STATION,
            isZLZY: true
          },
          {
            id: 328,
            label: '两客一危企业',
            value: MAP_URL.DANGEROUS_CAR_ENTERPRISE,
            isZLZY: true
          },
          {
            id: 329,
            label: '道路隐患点',
            value: MAP_URL.ACCIDENT_BLACK_SPOT,
            isZLZY: true
          }
        ]
      },
      {
        id: 33,
        label: '化工及危险品企业',
        children: [
          {
            id: 331,
            label: '生产企业',
            value: MAP_URL.D_HAZARDS_CHEMICALSHP_SCQY,
            isZLZY: true
          },
          {
            id: 332,
            label: '使用企业',
            value: MAP_URL.D_HAZARDS_CHEMICALSHP_SYQY,
            isZLZY: true
          },
          {
            id: 333,
            label: '仓储经营',
            value: MAP_URL.D_HAZARDS_CHEMICALSHP_SYQY_CCJY,
            isZLZY: true
          },
          {
            id: 334,
            label: '带仓储经营',
            value: MAP_URL.D_HAZARDS_CHEMICALSHP_SYQY_DCCJY,
            isZLZY: true
          },
          // {
          //   id: 335,
          //   label: '不带仓储经营',
          //   value: MAP_URL.D_HAZARDS_CHEMICALSHP_SYQY_BDCCJY
          // },
          {
            id: 336,
            label: '加油站',
            value: MAP_URL.D_HAZARDS_CHEMICALSHP_SYQY_YJZ,
            isZLZY: true
          }
        ]
      },
      {
        id: 34,
        label: '人员密集场所',
        children: [
          {
            id: 341,
            label: '旅游景点',
            value: MAP_URL.TOURIST_SPOT,
            isZLZY: true
          },
          {
            id: 342,
            label: '农家乐',
            value: MAP_URL.AGRITAINMENT,
            isZLZY: true
          },
          {
            id: 343,
            label: '民宿',
            value: MAP_URL.HOMESTAY,
            isZLZY: true
          },
          {
            id: 344,
            label: '重点餐饮',
            value: MAP_URL.AQFXY_RM_ZDCY,
            isZLZY: true
          }
        ]
      },
      {
        id: 35,
        label: '烟花爆竹经营单位',
        value: MAP_URL.D_HARAZDS_FIREWORKS,
        isZLZY: true
      },
      {
        id: 36,
        label: '消防安全单位',
        value: MAP_URL.FIRE_SAFETY_PROTECT_UNIT,
        isZLZY: true
      },
      {
        id: 37,
        label: '其他',
        children: [
          {
            id: 371,
            label: '民爆物品企业',
            value: MAP_URL.CIVIL_EXPLOSIVES_ENTERPRISES,
            isZLZY: true
          },
          {
            id: 372,
            label: '易制毒化学品企业',
            value: MAP_URL.AQFXY_QT_YZDHX,
            isZLZY: true
          }
        ]
      }
    ]
  },
  {
    id: 4,
    label: '巡逻范围',
    showCheck: true,
    children: [
      {
        id: 41,
        label: '巡逻范围',
        value: MAP_URL.SLFH_FHRY
      }
    ]
  },
  {
    id: 6,
    label: '预案调取',
    showCheck: false,
    children: [
      {
        id: 61,
        label: '预案启动条件'
      },
      {
        id: 62,
        label: '事故分级调取'
      }
      // {
      //   id: 63,
      //   label: '组织指挥体系及职责'
      // }
    ]
  },
  {
    id: 7,
    label: '监控设备',
    showCheck: true,
    children: [
      {
        id: 71,
        label: '监控'
      }
    ]
  }
]

export default treeData
