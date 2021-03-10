import MAP_URL from '@/utils/map/map-url'
const treeData = [
  {
    id: 5,
    label: '火灾报警点',
    showCheck: true,
    children: [
      {
        id: 51,
        label: '火灾报警点'
      }
    ]
  },
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
      // {
      //   id: 22,
      //   label: '应急队伍',
      //   // children: [
      //   //   {
      //   //     id: 221,
      //   //     label: '综合救援队伍',
      //   //     value: MAP_URL.JZJZNL_YJDW_ZH,
      //   //     isZLZY: true
      //   //   },
      //   //   {
      //   //     id: 222,
      //   //     label: '森林消防救援队伍',
      //   //     value: MAP_URL.JZJZNL_YJDW_GG,
      //   //     isZLZY: true
      //   //   },
      //   //   {
      //   //     id: 223,
      //   //     label: '专业救援队伍',
      //   //     value: MAP_URL.JZJZNL_YJDW_ZY,
      //   //     isZLZY: true
      //   //   },
      //   //   {
      //   //     id: 224,
      //   //     label: '志愿者救援队伍',
      //   //     value: MAP_URL.JZJZNL_YJDW_ZYZ,
      //   //     isZLZY: true
      //   //   }
      //   //   // {
      //   //   //   id: 225,
      //   //   //   label: '森林消防救援队伍',
      //   //   //   value: MAP_URL.JZJZNL_YJDW_XFDW,
      //   //   //   isZLZY: true
      //   //   // }
      //   // ]
      // },
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
          // {
          //   id: 251,
          //   label: '冲锋舟',
          //   value: MAP_URL.JZJZNL_YJGJSB_CFZ,
          //   isZLZY: true
          // },
          // {
          //   id: 252,
          //   label: '橡皮艇',
          //   value: MAP_URL.JZJZNL_YJGJSB_XPT,
          //   isZLZY: true
          // },
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
      },

    ]
      
  },
  {
    id: 6,
    label: '行政区划',
    showCheck: true,
    children: [
      {
        id: 61,
        label: '区县'
      },
      {
        id: 62,
        label: '乡镇街道'
      },
      {
        id: 63,
        label: '行政村社区'
      },
      {
        id: 64,
        label: '网格'
      },
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
    id: 7,
    label: '监控设备',
    showCheck: true,
    children: [
      {
        id: 71,
        label: '监控'
      }
    ]
  },
  {
    id: 3,
    label: '办事网点',
    showCheck: true,
    children: [
      {
        id: 31,
        label: '办事网点',
      }
    ]
  },
  {
    id: 8,
    label: '气象站点',
    showCheck: true,
    children: [
      {
        id: 81,
        label: '气象测站'
      }
    ]
  },



]

export default treeData
