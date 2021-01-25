import MAP_URL from '@/utils/map/map-url'

const treeData = [
  {
    id: 4,
    icon: '智能分析',
    label: '智能分析与搜索',
    type: 'map',
    children: [
      {
        id: 1,
        label: '阻隔分析',
        // value: MAP_URL.ZG_MAP_REST,
        showCheck: true,
        children: [
          {
            id: 11,
            label: '工程阻隔',
            children: [
              {
                id: 111,
                label: '国道',
                value: MAP_URL.Buffer_35m
              },
              {
                id: 112,
                label: '省道、城市干道',
                value: MAP_URL.Buffer_26m
              },
              {
                id: 113,
                label: '城市高架、快速路',
                value: MAP_URL.Buffer_30m
              },
              {
                id: 114,
                label: '支线',
                value: MAP_URL.Buffer_15m
              },
              {
                id: 115,
                label: '乡道、村道、其他道路',
                value: MAP_URL.Buffer_10m
              }
            ]
          },
          {
            id: 12,
            label: '自然障碍阻隔',
            children: [
              {
                id: 121,
                label: '5m水系',
                value: MAP_URL.Buf_Hyd_5m
              },
              {
                id: 122,
                label: '10m水系',
                value: MAP_URL.Buf_Hyd_10m
              },
              {
                id: 123,
                label: '荒漠地',
                value: MAP_URL.HMD
              }
            ]
          },
          {
            id: 13,
            label: '生物阻隔',
            children: [
              {
                id: 131,
                label: '种植地',
                value: MAP_URL.ZZD
              }
            ]
          }
        ]
      },
      {
        id: 'zbzy',
        label: '周边资源',
        showCheck: true,
        children: [
          {
            id: 21,
            label: '应急专家',
            value: MAP_URL.JZJZNL_YJZJ,
            children: [
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
              }
            ]
          },
          {
            id: 22,
            label: '应急队伍',
            children: [
              {
                id: 221,
                label: '综合救援队伍'
                // value: MAP_URL.JZJZNL_YJDW_ZH
              },
              {
                id: 222,
                label: '骨干救援队伍'
                // value: MAP_URL.JZJZNL_YJDW_GG
              },
              {
                id: 223,
                label: '专业救援队伍'
                // value: MAP_URL.JZJZNL_YJDW_ZY
              },
              {
                id: 224,
                label: '志愿者救援队伍'
                // value: MAP_URL.JZJZNL_YJDW_ZYZ
              }
            ]
          },
          {
            id: 27,
            label: '应急避难场所',
            value: MAP_URL.JZJZNL_BZAZCS
          },
          {
            id: 23,
            label: '应急物资储备库',
            children: [
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
              }
            ]
          },
          {
            id: 24,
            label: '物质企业储备库',
            children: [
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
                value: MAP_URL.JZJZNL_YLJH_JHCS
              },
              // {
              //   id: 262,
              //   label: '救护车辆',
              //   value: MAP_URL.JZJZNL_YLJH_JHCL
              // },
              // {
              //   id: 263,
              //   label: '医疗救护设备',
              //   value: MAP_URL.JZJZNL_YLJH_JHCL_JHSB
              // },
              {
                id: 264,
                label: '医疗物资',
                value: MAP_URL.JZJZNL_YLJH_YLWZ
              },
              // {
              //   id: 265,
              //   label: '血库',
              //   value: MAP_URL.JZJZNL_YLJH_XK
              // },
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
              }
              // {
              //   id: 269,
              //   label: '卫生监督机构',
              //   value: MAP_URL.JZJZNL_YLJH_WSJDJG
              // }
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
                value: MAP_URL.JZJZNL_XFJYNL_XFZ
              }
            ]
          },
          {
            id: 29,
            label: '党政行政机关'
          }
        ]
      },
      {
        id: 'aqfx',
        label: '安全风险源分析',
        showCheck: true,
        children: [
          {
            id: 31,
            label: '水利工程',
            children: [
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
              {
                id: 317,
                label: '旱闸'
              },
              {
                id: 318,
                label: '防浪墙开口'
              },
              {
                id: 319,
                label: '农村饮用水',
                value: MAP_URL.RURAL_DRINKING_WATER
              },
              {
                id: 3110,
                label: '水电站',
                value: MAP_URL.AQFXY_SL_SDZ
              }
            ]
          },
          {
            id: 32,
            label: '道路运输',
            children: [
              {
                index: 321,
                label: '桥梁',
                value: MAP_URL.BRIDGE
              },
              {
                index: 322,
                label: '隧道',
                value: MAP_URL.TUNNEL
              },
              {
                index: 323,
                label: '涵洞',
                value: MAP_URL.AQFXY_JT_HD
              },
              {
                index: 324,
                label: '港口码头',
                value: MAP_URL.PORT_WHARF
              },
              {
                index: 325,
                label: '水路运输单位',
                value: MAP_URL.WATERWAY_TRANSPORT_UNIT
              },
              {
                index: 326,
                label: '市域轨道站点',
                value: MAP_URL.D_HAZARDS_TRACKSHP_P
              },
              {
                index: 327,
                label: '火车站',
                value: MAP_URL.D_HAZARDS_TRAIN_STATION
              },
              {
                index: 328,
                label: '两客一危企业',
                value: MAP_URL.DANGEROUS_CAR_ENTERPRISE
              },
              {
                index: 329,
                label: '道路隐患点',
                value: MAP_URL.ACCIDENT_BLACK_SPOT
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
              }
            ]
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
            id: 37,
            label: '其他',
            children: [
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
          }
        ]
      }
    ]
  },
  {
    id: 5,
    icon: '救援',
    label: '救援路径推送',
    type: 'map'
  }
]

export default treeData
