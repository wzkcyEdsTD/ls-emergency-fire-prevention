import MAP_URL from '@/utils/map/map-url'
const treeData = [
  {
    id: 1,
    label: '火灾报警点',
    showCheck: true,
    children: [
      {
        id: 11,
        label: '火灾报警点'
      }
    ]
  },
  {
    id: 2,
    label: '基础要素',
    showCheck: true,
    children: [
      {
        id: 21,
        label: '林区',
        children: [
          {
            id: 211,
            label: '森林公园',
            isZLZY: true,
            dataset:"d_forest_park"
            // value: MAP_URL.SECRET_FORESTPARK_M
          },
          {
            id: 212,
            label: '国有林场',
            isZLZY: true,
            dataset:"d_national_forest"
            // value: MAP_URL.SECRET_NATIONAL_FOREST
          }
        ]
      },
      {
        id: 22,
        label: '水系',
        value: MAP_URL.WATER
      },
      {
        id: 23,
        label: '道路',
        value: MAP_URL.ROAD
      },
      {
        id: 24,
        label: '地表覆盖',
        // value: MAP_URL.FANGWU,
        children: [
          {
            id: 241,
            label: '裸露地表', // '荒漠与裸露地表',
            value: MAP_URL.HM
          },
          {
            id: 242,
            label: '农用地', // '种植土地',
            value: MAP_URL.ZZTD
          },
          {
            id: 243,
            label: '林地', // '林草覆盖',
            value: MAP_URL.LCFG
          },
          {
            id: 244,
            label: '房屋建筑（区）',
            value: MAP_URL.FWJZ
          },
          {
            id: 245,
            label: '构筑物',
            value: MAP_URL.GZW
          },
          {
            id: 246,
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
    id: 3,
    label: '应急资源',
    showCheck: true,
    children: [
      {
        id: 31,
        label: '应急避难场所',
        value: MAP_URL.JZJZNL_BZAZCS,
        isZLZY: true
      },
      {
        id: 32,
        label: '物资储备库',
        children: [
          {
            id: 321,
            label: '市县物资储备库',
            value: MAP_URL.JZJZNL_WZCBK_SX,
            isZLZY: true
          },
          {
            id: 322,
            label: '乡镇（街道）物资储备库',
            value: MAP_URL.JZJZNL_WZCBK_XZ,
            isZLZY: true
          }
        ]
      },
      {
        id: 33,
        label: '物资储备企业',
        children: [
          {
            id: 331,
            label: '供应网点',
            value: MAP_URL.JZJZNL_WZCBQY_GYWD,
            isZLZY: true
          },
          {
            id: 332,
            label: '加工企业',
            value: MAP_URL.JZJZNL_WZCBQY_JGQY,
            isZLZY: true
          },
          {
            id: 333,
            label: '配送中心',
            value: MAP_URL.JZJZNL_WZCBQY_PSZX,
            isZLZY: true
          },
          {
            id: 334,
            label: '运输企业',
            value: MAP_URL.JZJZNL_WZCBQY_YSQY,
            isZLZY: true
          }
        ]
      },
      {
        id: 35,
        label: '应急关键设备',
        children: [
          {
            id: 351,
            label: '挖掘机',
            value: MAP_URL.JZJZNL_YJGJSB_WJJ,
            isZLZY: true
          },
          {
            id: 352,
            label: '推土机',
            value: MAP_URL.JZJZNL_YJGJSB_TTJ,
            isZLZY: true
          },
          {
            id: 353,
            label: '发电机组',
            value: MAP_URL.JZJZNL_YJGJSB_FDJZ,
            isZLZY: true
          },
          {
            id: 354,
            label: '水泵',
            value: MAP_URL.JZJZNL_YJGJSB_SB,
            isZLZY: true
          },
          {
            id: 355,
            label: '卫星电话',
            value: MAP_URL.JZJZNL_YJGJSB_WXDH,
            isZLZY: true
          },
          {
            id: 356,
            label: '单兵设备',
            value: MAP_URL.JZJZNL_YJGJSB_DBSB,
            isZLZY: true
          },
          {
            id: 357,
            label: '吊车',
            value: MAP_URL.JZJZNL_YJGJSB_DC,
            isZLZY: true
          },
          {
            id: 358,
            label: '抛绳器',
            value: MAP_URL.JZJZNL_YJGJSB_PSQ,
            isZLZY: true
          },
          {
            id: 359,
            label: '大型照明设备',
            value: MAP_URL.JZJZNL_YJGJSB_ZMSB,
            isZLZY: true
          },
          {
            id: 3510,
            label: '无人机',
            value: MAP_URL.JZJZNL_YJGJSB_WRJ,
            isZLZY: true
          },
          {
            id: 3511,
            label: '切割机',
            value: MAP_URL.JZJZNL_YJGJSB_QGJ,
            isZLZY: true
          },
          {
            id: 3512,
            label: '运输车',
            value: MAP_URL.JZJZNL_YJGJSB_YSC,
            isZLZY: true
          },
          {
            id: 3513,
            label: '拖轮',
            value: MAP_URL.JZJZNL_YJGJSB_TL,
            isZLZY: true
          }
        ]
      },
      {
        id: 36,
        label: '医疗救护',
        children: [
          {
            id: 361,
            label: '救护场所',
            value: MAP_URL.JZJZNL_YLJH_JHCS,
            isZLZY: true
          },
          {
            id: 362,
            label: '救护车辆',
            value: MAP_URL.JZJZNL_YLJH_JHCL,
            isZLZY: true
          },
          {
            id: 363,
            label: '医疗救护设备',
            value: MAP_URL.JZJZNL_YLJH_JHCL_JHSB,
            isZLZY: true
          },
          {
            id: 364,
            label: '医疗物资',
            value: MAP_URL.JZJZNL_YLJH_YLWZ
          },
          {
            id: 365,
            label: '血站',
            value: MAP_URL.JZJZNL_YLJH_XZ,
            isZLZY: true
          },
          {
            id: 366,
            label: '疾控中心',
            value: MAP_URL.JZJZNL_YLJH_JKZX,
            isZLZY: true
          },
          {
            id: 367,
            label: '急救指挥中心',
            value: MAP_URL.JZJZNL_YLJH_JJZHZX,
            isZLZY: true
          },
          {
            id: 368,
            label: '卫生监督机构',
            value: MAP_URL.JZJZNL_YLJH_WSJDJG,
            isZLZY: true
          }
        ]
      },
      {
        id: 37,
        label: '消防救援能力',
        showCheck: true,
        children: [
          {
            id: 371,
            label: '消防站',
            value: MAP_URL.JZJZNL_XFJYNL_XFZ,
            isZLZY: true
          }
        ]
      },

    ]
  },
  {
    id: 4,
    label: '行政区划',
    showCheck: true,
    children: [
      {
        id: 41,
        label: '区县'
      },
      {
        id: 42,
        label: '乡镇街道'
      },
      {
        id: 43,
        label: '行政村社区'
      },
      {
        id: 44,
        label: '网格'
      },
    ]
  },
  {
    id: 5,
    label: '视频监控',
    showCheck: true,
    children: [
      {
        id: 51,
        label: '视频监控',
        dataset:"d_video"
      },
      {
        id: 52,
        label: '铁塔监控',
        dataset:"v_forest_tower_video"
      },
      {
        id: 53,
        label: '小流域监控',
        icon:"小流域监控",
        dataset:"v_forest_small_watershed_video"
      },
      {
        id: 54,
        label: '消防通道视频监控',
        icon:"消防通道视频监控",
        dataset:"v_forest_firefighting_video"
      },
      {
        id: 55,
        label: '水利视频监控',
        icon:"水利视频监控",
        dataset:"v_forest_hydraulic_video"
      },
    ]
  },
  {
    id: 6,
    label: '办事网点',
    showCheck: true,
    children: [
      {
        id: 61,
        label: '办事网点',
        dataset:"d_handle_network"
      }
    ]
  },
  {
    id: 7,
    label: '气象站点',
    showCheck: true,
    children: [
      {
        id: 71,
        label: '气象测站',
        dataset:"v_forest_qixiangcezhandian"
      }
    ]
  },
  {
    id: 8,
    label: '教育学区资源',
    showCheck: true,
    children: [
      {
        id: 81,
        label: '小学',
        dataset:"jy_primaryschool"
      },
      {
        id: 82,
        label: '小学学区'
      },
      {
        id: 83,
        label: '小学适龄儿童',
        dataset:"jy_primaryschool_children"
      },
      {
        id: 84,
        label: '初中',
        dataset:"jy_middleschool"
      },
      {
        id: 85,
        label: '初中学区'
      },
      {
        id: 86,
        label: '初中适龄儿童',
        dataset:"jy_middleschool_children"
      },
    ]
  },
  {
    id: 9,
    label: '铁塔',
    showCheck: true,
    children: [
      {
        id: 91,
        label: '铁塔',
        dataset:"v_forest_tower"
      },

    ]
  },
  {
    id: 10,
    label: '消防车道',
    showCheck: true,
    children: [
      {
        id: 101,
        label: '消防车道',
        dataset:"v_forest_firefighting_car"
      },

    ]
  },
]

export default treeData
