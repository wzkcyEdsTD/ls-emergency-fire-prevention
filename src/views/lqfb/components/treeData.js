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
            dataset:"d_forest_park"
            // value: MAP_URL.SECRET_FORESTPARK_M
          },
          {
            id: 112,
            label: '国有林场',
            isZLZY: true,
            dataset:"d_national_forest"
            // value: MAP_URL.SECRET_NATIONAL_FOREST
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
            dataset:"d_wetland",
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
    id: 7,
    label: '监控设备',
    showCheck: true,
    children: [
      {
        id: 71,
        label: '监控设备',
        dataset:"d_video"
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
        dataset:"d_handle_network"
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
        label: '气象测站',
        dataset:"v_forest_qixiangcezhandian"
      }
    ]
  },
  {
    id: 9,
    label: '教育学区资源',
    showCheck: true,
    children: [
      {
        id: 91,
        label: '小学',
        dataset:"jy_primaryschool"
      },
      {
        id: 92,
        label: '小学学区'
      },
      {
        id: 93,
        label: '小学适龄儿童',
        dataset:"jy_primaryschool_children"
      },
      {
        id: 94,
        label: '初中',
        dataset:"jy_middleschool"
      },
      {
        id: 95,
        label: '初中学区'
      },
      {
        id: 96,
        label: '初中适龄儿童',
        dataset:"jy_middleschool_children"
      },
    ]
  },
  {
    id: 10,
    label: '铁塔',
    showCheck: true,
    children: [
      {
        id: 101,
        label: '铁塔',
        dataset:"v_forest_tower"
      },
      {
        id: 102,
        label: '铁塔监控',
        dataset:"v_forest_tower_video"
      }
    ]
  },
  {
    id: 4,
    label: '小流域监控',
    showCheck: true,
    children: [
      {
        id: 41,
        label: '小流域监控',
        icon:"小流域监控",
        dataset:"v_forest_small_watershed_video"
      },
    ]
  },
]

export default treeData
