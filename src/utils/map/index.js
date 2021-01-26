import randomColor from 'randomcolor'
import 'ol/ol.css'
import 'ol-ext/dist/ol-ext.min.css'
import '@supermap/iclient-ol/dist/iclient-openlayers.min.css'

import Map from 'ol/Map'
import View from 'ol/View'
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer'
import TileWMS from 'ol/source/TileWMS'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import { ScaleLine, defaults as defaultControls, MousePosition } from 'ol/control'
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style'
import { MultiPolygon, Point, LineString } from 'ol/geom'

import Feature from 'ol/Feature'
import { Draw, Select, Modify } from 'ol/interaction'

import Static from 'ol/source/ImageStatic'
import ADLayer from './openlayers.echart'

var echarts = require('echarts')
import 'echarts-gl'

import {
  TileSuperMapRest,
  FeatureService,
  SuperMap
} from '@supermap/iclient-ol'
import Ol_filter_Mask from 'ol-ext/filter/Mask'
import Ol_filter_Crop from 'ol-ext/filter/Crop'
import store from '@/store'

import { addInteraction } from './measure'

const createMap = (divId, options = {}) => {
  const map = new Map({
    target: divId,
    controls: defaultControls({
      attribution: false,
      zoom: false,
      rotate: false
    }).extend([scaleControl(), mousePositionControl()]),
    view: new View({
      center: [119.923238,28.467972],
      zoom: 14,
      projection: 'EPSG:4326'
    }),
    ...options
  })

  map.on('pointermove', function (evt) {
    const hit = map.hasFeatureAtPixel(evt.pixel)
    map.getTargetElement().style.cursor = hit ? 'pointer' : ''
  })

  window.g = {
    map
  }
  return map
}

const scaleControl = () => {
  const control = new ScaleLine({
    units: 'metric',
    bar: true,
    steps: 2,
    text: true,
    minWidth: 140
  })
  return control
}

const mousePositionControl = () => {
  const control = new MousePosition({
    coordinateFormat: function (coordinate) {
      return `经度:${coordinate[0].toFixed(4)}，纬度:${coordinate[1].toFixed(4)}`
    },
    projection: 'EPSG:4326',
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: ''
  })
  return control
}

const getMap = () => {
  return window.g.map
}

const goHome = () => {
  getMap().getView().setCenter([119.923238,28.467972])
  getMap().getView().setZoom(14)
}

const addLayer = layer => {
  getMap().addLayer(layer)
}

const removeLayer = layer => {
  layer && getMap().removeLayer(layer)
}

const zoomToFeature = (feature, level) => {
  const type = feature.getGeometry().getType()
  if (type === 'Point') {
    getMap().getView().setCenter(feature.getGeometry().getCoordinates())
    getMap().getView().setZoom(level)
  } else {
    getMap().getView().fit(feature.getGeometry().getExtent())
  }
}

const createTileSuperMapRestLayer = (url, options = {}) => {
  const layer = new TileLayer({
    source: new TileSuperMapRest({
      url: url,
      wrapX: true
    }),
    projection: 'EPSG:4326',
    ...options
  })

  // if (isMask) {
  //   const mask = createMaskByGeoJson(require('@/components/Map/ruian.json'))
  //   layer.addFilter(mask)
  // }

  return layer
}


const createTianDiTuLayer = (type, options = {}) => {
  const token = "2e6919cbe2122200fa172aaea99742e0";
  const layer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      // crossOrigin: 'anonymous',
      url: `http://t4.tianditu.com/DataServer?T=${type}&x={x}&y={y}&l={z}&tk=${token}`,
      wrapX: false,
      crossOrigin: "Anonymous"
    }),
    className:type
  })

  return layer
}

const createTestLayer = (url, options = {}) => {
  const token = "2e6919cbe2122200fa172aaea99742e0";
  const layer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      // crossOrigin: 'anonymous',
      url: url
    }),
    className:'base'
  })

  return layer
}

const createTileSuperMapRestSource = (url) => {
  return new TileSuperMapRest({
    url,
    wrapX: true
  })
}

const createVectorLayer = (features = []) => {
  return new VectorLayer({
    source: new VectorSource({
      features
    }),
    // zIndex: 100,
    style: new Style({
      stroke: new Stroke({
        color: '#12FD94',
        // 'rgba(0, 255, 0, 1)',
        lineDash: [5, 3],
        width: 2
      }),
      fill: new Fill({
        color: 'rgba(254,27, 1, 0.3)'
      })
    })
  })
}

const createVectorLayerByDataRest = ({ url, dataSourceName, label, layerName, icon, attributeFilter, geomFilter, cropFeature }) => {
  var image = new Icon({
    anchor: [0, 26],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: require(`@/assets/images/icon/${icon || '机械电气类.png'}`)
  })
  var styles = {
    Point: new Style({
      image: image
    }),
    LineString: new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2
      })
    }),
    MultiLineString: new Style({
      stroke: new Stroke({
        color: 'green',
        width: 1
      })
    }),
    MultiPoint: new Style({
      image: image
    }),
    MultiPolygon: new Style({
      stroke: new Stroke({
        color: 'rgba(240, 240, 240, 1)',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(240, 240, 240, 0.5)'
      })
    }),
    Polygon: new Style({
      stroke: new Stroke({
        color: 'rgba(240, 240, 240, 1)',
        lineDash: [4],
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(240, 240, 240, 0.5)'
      })
    }),
    GeometryCollection: new Style({
      stroke: new Stroke({
        color: 'magenta',
        width: 2
      }),
      fill: new Fill({
        color: 'magenta'
      }),
      image: new CircleStyle({
        radius: 10,
        fill: null,
        stroke: new Stroke({
          color: 'magenta'
        })
      })
    }),
    Circle: new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.2)'
      })
    })
  }

  var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()]
  }
  if (geomFilter) {
    return getFeaturesByGeometry({ url, dataSourceName, label, layerName, attributeFilter, geomFilter, styleFunction })
  }
  return getFeaturesBySQL({ url, dataSourceName, label, layerName, attributeFilter, cropFeature, styleFunction })
}

const getFeaturesBySQL = ({ url, dataSourceName, layerName, label, attributeFilter, cropFeature, styleFunction }) => {
  return new Promise((resolve, reject) => {
    const filter = layerName === 'SLFH_FHRY' ? '' : "DISTRICT_CODE = '330381'"
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
      toIndex: 999999,
      queryParameter: {
        // name: layerName,
        attributeFilter: attributeFilter ? filter + ' AND ' + attributeFilter : filter,
        maxFeatures: 99999999
      },
      datasetNames: [`${dataSourceName}:${layerName}`]
    })
    new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
      // debugger
      const features = new GeoJSON().readFeatures(serviceResult.result.features)
      if (layerName === 'SLFH_FHRY') {
        // 巡逻范围
        features.map(f => {
          const rColor = randomColor({
            luminosity: 'light',
            format: 'rgba',
            alpha: 0.6
          })
          f.setStyle(new Style({
            stroke: new Stroke({
              color: 'rgba(0,0,0,0.9)',
              lineDash: [4],
              width: 1
            }),
            fill: new Fill({
              color: rColor
            })
          }))
        })
      }
      // console.log({ label })
      if (label === '森林公园') {
        features.map(f => {
          f.setStyle(new Style({
            stroke: new Stroke({
              color: 'rgba(17, 243, 142, 0.8)',
              // lineDash: [4],
              width: 1
            }),
            fill: new Fill({
              color: 'rgba(17, 243, 142, 0.8)'
            }),
            text: new Text({
              textAlign: 'center', // 位置
              textBaseline: 'middle', // 基准线
              offsetY: 20,
              font: 'normal 16px bold 微软雅黑', // 文字样式
              text: f.get('NAME') + '', // 文本内容
              fill: new Fill({ // 文本填充样式（即文字颜色)
                color: '#6CF54B'
              }),
              stroke: new Stroke({
                color: '#101518',
                width: 2
              })
            })
          }))
        })
      }

      if (label === '国有林场') {
        features.map(f => {
          f.setStyle(new Style({
            stroke: new Stroke({
              color: 'rgba(249,219,49, 0.8)',
              // lineDash: [4],
              width: 1
            }),
            fill: new Fill({
              color: 'rgba(249,219,49, 0.8)'
            }),
            text: new Text({
              textAlign: 'center', // 位置
              textBaseline: 'middle', // 基准线
              offsetY: 20,
              font: 'normal 16px bold 微软雅黑', // 文字样式
              text: f.get('NAME') + '', // 文本内容
              fill: new Fill({ // 文本填充样式（即文字颜色)
                color: '#FC9309'
              }),
              stroke: new Stroke({
                color: '#101518',
                width: 2
              })
            })
          }))
        })
      }

      if (label === '湿地') {
        features.map(f => {
          f.setStyle(new Style({
            stroke: new Stroke({
              color: 'rgba(59, 97, 249, 0.8)',
              // lineDash: [4],
              width: 1
            }),
            fill: new Fill({
              color: 'rgba(59, 97, 249, 0.8)'
            }),
            text: new Text({
              textAlign: 'center', // 位置
              textBaseline: 'middle', // 基准线
              offsetY: 20,
              font: 'normal 16px bold 微软雅黑', // 文字样式
              text: f.get('NAME') + '', // 文本内容
              fill: new Fill({ // 文本填充样式（即文字颜色)
                color: '#418CFD'
              }),
              stroke: new Stroke({
                color: '#101518',
                width: 2
              })
            })
          }))
        })
      }

      var vectorSource = new VectorSource({
        features,
        wrapX: false
      })
      const resultLayer = new VectorLayer({
        source: vectorSource,
        style: styleFunction,
        // className:label
      })
      // 暂时用遮罩，后面再用turfjs
      // const mask = createMaskByGeoJson(require('@/components/Map/ruian.json'))
      // resultLayer.addFilter(mask)
      if (cropFeature) {
        const crop = createCropByFeature(cropFeature)
        resultLayer.addFilter(crop)
      }
      resolve(resultLayer)
    })
  })
}

const getAllFeaturesBySQL = ({ url, dataSourceName, layerName, attributeFilter }) => {
  return new Promise((resolve, reject) => {
    const filter = layerName === 'SLFH_FHRY' ? '' : "DISTRICT_CODE = '330381'"
    var sqlParam = new SuperMap.GetFeaturesBySQLParameters({
      toIndex: 999999,
      queryParameter: {
        // name: layerName,
        attributeFilter: attributeFilter ? filter + ' AND ' + attributeFilter : filter,
        maxFeatures: 99999999
      },
      datasetNames: [`${dataSourceName}:${layerName}`]
    })
    new FeatureService(url).getFeaturesBySQL(sqlParam, serviceResult => {
      const features = new GeoJSON().readFeatures(serviceResult.result.features)
      resolve(features)
    })
  })
}

const getFeaturesByGeometry = ({ url, dataSourceName, label, layerName, attributeFilter, geomFilter, styleFunction }) => {
  return new Promise((resolve, reject) => {
    var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
      toIndex: 999999,
      attributeFilter: attributeFilter || '',
      geometry: geomFilter.getGeometry(),
      spatialQueryMode: 'INTERSECT', // 相交空间查询模式
      datasetNames: [`${dataSourceName}:${layerName}`]
    })

    new FeatureService(url).getFeaturesByGeometry(geometryParam, serviceResult => {
      let features
      if (serviceResult.result) {
        features = new GeoJSON().readFeatures(serviceResult.result.features || [])
      } else {
        features = []
      }

      if (store.getters.isAddFeatures) {
        store.dispatch('map/changeFeatures', features)
      }
      if (layerName === 'SLFH_FHRY') {
        // 巡逻范围
        features.map(f => {
          const rColor = randomColor({
            luminosity: 'light',
            format: 'rgba',
            alpha: 0.6
          })
          f.setStyle(new Style({
            stroke: new Stroke({
              color: 'rgba(0,0,0,0.9)',
              lineDash: [4],
              width: 1
            }),
            fill: new Fill({
              color: rColor
            })
          }))
        })
      }

      if (['国道', '省道、城市干道', '城市高架、快速路', '支线', '乡道、村道、其他道路'].indexOf(label) > -1) {
        features.map(f => {
          f.setStyle(new Style({
            stroke: new Stroke({
              color: 'rgba(249, 165, 40, 1)',
              width: 1
            }),
            fill: new Fill({
              color: 'rgba(249, 165, 40, 0.6)'
            })
          }))
          f.values_.label = label
          return f
        })
      }

      if (['阻隔水系-1', '阻隔水系-2'].indexOf(label) > -1) {
        features.map(f => {
          f.setStyle(new Style({
            stroke: new Stroke({
              color: 'rgba(7, 231, 247, 1)',
              width: 1
            }),
            fill: new Fill({
              color: 'rgba(7, 231, 247, 0.6)'
            })
          }))
          f.values_.label = label
          return f
        })
      }

      if (['荒漠地', '种植地'].indexOf(label) > -1) {
        features.map(f => {
          f.setStyle(new Style({
            stroke: new Stroke({
              color: 'rgba(183, 176, 176, 1)',
              width: 1
            }),
            fill: new Fill({
              color: 'rgba(183, 176, 176, 0.6)'
            })
          }))
          f.values_.label = label
          return f
        })
      }

      // console.log({ features })
      if (features.length > 0) {
        var vectorSource = new VectorSource({
          features,
          wrapX: false
        })
        const resultLayer = new VectorLayer({
          source: vectorSource,
          style: styleFunction
        })
        resolve(resultLayer)
      } else {
        resolve(null)
      }
    })
  })
}

const getFeaturesByCoordinate = ({ lon, lat, url, dataSourceName, layerName }) => {
  return new Promise((resolve, reject) => {
    var point = new Point([lon, lat])
    var geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
      toIndex: 999999,
      datasetNames: [`${dataSourceName}:${layerName}`], // ["pg_wzyjdb:SLFH_FHRY"],
      geometry: point,
      spatialQueryMode: 'INTERSECT'
    })

    new FeatureService(url).getFeaturesByGeometry(geometryParam, serviceResult => {
      const features = new GeoJSON().readFeatures(serviceResult.result.features)
      if (features.length > 0) {
        resolve(features[0])
      } else {
        resolve(null)
      }
    })
  })
}

const createVectorLayerByGeoJson = json => {
  var image = new CircleStyle({
    radius: 10,
    fill: null,
    stroke: new Stroke({ color: 'red', width: 2 })
  })
  var styles = {
    Point: new Style({
      image: image
    }),
    LineString: new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2
      })
    }),
    MultiLineString: new Style({
      stroke: new Stroke({
        color: 'green',
        width: 1
      })
    }),
    MultiPoint: new Style({
      image: image
    }),
    MultiPolygon: new Style({
      stroke: new Stroke({
        color: 'yellow',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba(255, 255, 0, 0.1)'
      })
    }),
    Polygon: new Style({
      stroke: new Stroke({
        color: 'rgba(240, 240, 240, 1)',
        lineDash: [4],
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(240, 240, 240, 0.5)'
      })
    }),
    GeometryCollection: new Style({
      stroke: new Stroke({
        color: 'magenta',
        width: 2
      }),
      fill: new Fill({
        color: 'magenta'
      }),
      image: new CircleStyle({
        radius: 10,
        fill: null,
        stroke: new Stroke({
          color: 'magenta'
        })
      })
    }),
    Circle: new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2
      }),
      fill: new Fill({
        color: 'rgba(255,0,0,0.2)'
      })
    })
  }

  var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()]
  }
  var vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(json),
    wrapX: false
  })
  const resultLayer = new VectorLayer({
    source: vectorSource,
    style: styleFunction
  })
  return resultLayer
}

const createFeatureByGeoJson = (json, properties) => {
  const feature = (new GeoJSON()).readFeature(json)
  feature.setProperties(properties)
  return feature
}

const createMaskByGeoJson = json => {
  var coords = json.coordinates
  var f = new Feature(new MultiPolygon(coords))
  return new Ol_filter_Mask({
    feature: f,
    inner: true,
    fill: new Fill({ color: '#204F77' })
  })
}

const createCropByFeature = feature => {
  return new Ol_filter_Crop({
    feature,
    inner: false
  })
}

const doInteractionDraw = (type, callback) => {
  var source = new VectorSource({ wrapX: false })
  const draw = new Draw({
    source: source,
    type
  })
  getMap().addInteraction(draw)

  draw.on('drawend', e => {
    const geom = e.feature.getGeometry()
    const feature = new Feature({ geometry: geom })
    var format = new GeoJSON()
    const geojsonRepresenation = format.writeGeometry(geom)
    getMap().removeInteraction(draw)
    callback(geojsonRepresenation, feature)
  })
}

const addInteractionModify = () => {
  const select = new Select({
    wrapX: false
  })
  const modify = new Modify({
    features: select.getFeatures()
  })

  modify.on('modifyend', e => {
    const features = e.features
    var format = new GeoJSON()
    const geojsonRepresenation = format.writeFeature(features.getArray()[0])
    store.dispatch('map/changeDrawGeojson', geojsonRepresenation)
  })
  getMap().addInteraction(select)
  getMap().addInteraction(modify)
  return { select, modify }
}

const removeInteractionModify = ({ select, modify }) => {
  if (modify) {
    getMap().removeInteraction(modify)
  }
  if (select) {
    getMap().removeInteraction(select)
  }
}

const createFeature = (pos, name, properties = {}) => {
  return new Feature({
    geometry: new Point(pos),
    name,
    ...properties
  })
}

const createLineStringFeature = (pts, name, properties = {}) => {
  return new Feature(new LineString(pts))
}
const getTerminalstylePointStyle = () => {
  return new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: 'rgba(255,0,0,1)'
      }),
      stroke: new Stroke({ color: 'red', width: 2 })
    })
  })
}
const getFirePointStyle = () => {
  // return new Style({
  //   image: new CircleStyle({
  //     radius: 10,
  //     fill: new Fill({
  //       color: 'rgba(255,0,0,1)'
  //     }),
  //     stroke: new Stroke({ color: 'red', width: 2 })
  //   })
  // })
  return new Style({
    image: new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      src: require(`@/assets/images/icon/${'火灾点.png'}`)
    }),
    stroke: new Stroke({ color: 'red', width: 2 })
  })
}
const getDiyPointStyle = () => {
  return new Style({
    image: new Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      src: require(`@/assets/images/icon/diypoint.png`)
    }),
    stroke: new Stroke({ color: 'red', width: 2 })
  })
}

const getFhryStyle = (feature) => {
  console.log({ feature })
  return new Style({
    image: new Icon({
      anchor: [0.5, 49],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: require(`@/assets/images/icon/${'人员icon.png'}`)
    }),
    text: new Text({
      textAlign: 'center', // 位置
      textBaseline: 'middle', // 基准线
      offsetY: -49,
      font: 'normal 14px 微软雅黑', // 文字样式
      text: feature.get('name') + '', // 文本内容
      fill: new Fill({ // 文本填充样式（即文字颜色)
        color: '#FFF'
      }),
      stroke: new Stroke({
        color: '#000',
        width: 2
      })
    })
  })
}

const getMonitorStyle = (feature) => {
  return new Style({
    image: new Icon({
      anchor: [0.5, 26],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: require(`@/assets/images/icon/${'监控.png'}`)
    })
  })
}

const getLsgjStyle = (feature) => {
  return new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: 'rgba(35, 165, 240,0.6)'
      }),
      stroke: new Stroke({
        color: 'rgba(35, 165, 240,1)',
        width: 2
      })
    }),
    text: new Text({
      textAlign: 'center', // 位置
      textBaseline: 'middle', // 基准线
      offsetY: 20,
      font: 'normal 14px 微软雅黑', // 文字样式
      text: feature.get('time') + '', // 文本内容
      fill: new Fill({ // 文本填充样式（即文字颜色)
        color: '#FFF'
      }),
      stroke: new Stroke({
        color: '#000',
        width: 2
      })
    })
  })
}

const getPolygonStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: 'rgba(0,0,0,0)',
      width: 2
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.1)'
    })
  })
}

const createStaticImageLayer = (url, extent) => {
  return new ImageLayer({
    source: new Static({
      url,
      projection: 'EPSG:4326',
      imageExtent: extent
    })
  })
}

var oe = null
const getWindLayer = (windData) => {
  windData = windData.result;
  (function () {
    const data = []
    let maxMag = 0
    let minMag = Infinity
    for (let i = 0; i < windData.length; i++) {
      const vx = windData[i][2]
      const vy = windData[i][3]
      const mag = Math.sqrt(vx * vx + vy * vy)
      data.push([windData[i][1], windData[i][0], vy, vx, mag])
      maxMag = Math.max(mag, maxMag)
      minMag = Math.min(mag, minMag)
    }
    const option = {
      visualMap: {
        left: 'right',
        min: minMag,
        max: maxMag,
        dimension: 4,
        show: false,
        inRange: {
          // color: ['green', 'yellow', 'red']
          color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        },
        realtime: false,
        calculable: true,
        textStyle: {
          color: '#fff'
        }
      },
      legend: {
        show: false
      },
      series: [{
        type: 'flowGL',
        coordinateSystem: 'GLMap',
        data: data,
        supersampling: 4,
        particleType: 'line',
        particleDensity: 128,
        particleSpeed: 1,
        // gridWidth: windData.nx,
        // gridHeight: windData.ny,
        itemStyle: {
          opacity: 0.7
        }
      }]
    }
    oe = new ADLayer(option, window.g.map, echarts)
    oe.render()
  })()
}

//风向图
var createWindBuilder = function(uComp, vComp) {
  var uData = uComp.data,
      vData = vComp.data;
  return {
      header: uComp.header,
      //recipe: recipeFor("wind-" + uComp.header.surface1Value),
      data: function(i) {
          return [uData[i], vData[i]];
      }
  }
};

var createBuilder = function(data) {
  var uComp = null,
      vComp = null,
      scalar = null;

  data.forEach(function(record) {
      switch (record.header.parameterCategory + "," + record.header.parameterNumber) {
          case "2,2":
              uComp = record;
              break;
          case "2,3":
              vComp = record;
              break;
          default:
              scalar = record;
      }
  });

  return createWindBuilder(uComp, vComp);
};

var buildGrid = function(data, callback) {
  var builder = createBuilder(data);

  var header = builder.header;
  var λ0 = header.lo1,
      φ0 = header.la1; // the grid's origin (e.g., 0.0E, 90.0N)
  var Δλ = header.dx,
      Δφ = header.dy; // distance between grid points (e.g., 2.5 deg lon, 2.5 deg lat)
  var ni = header.nx,
      nj = header.ny; // number of grid points W-E and N-S (e.g., 144 x 73)
  var date = new Date(header.refTime);
  date.setHours(date.getHours() + header.forecastTime);

  // Scan mode 0 assumed. Longitude increases from λ0, and latitude decreases from φ0.
  // http://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_table3-4.shtml
  var grid = [],
      p = 0;
  var isContinuous = Math.floor(ni * Δλ) >= 360;
  for (var j = 0; j < nj; j++) {
      var row = [];
      for (var i = 0; i < ni; i++, p++) {
          row[i] = builder.data(p);
      }
      if (isContinuous) {
          // For wrapped grids, duplicate first column as last column to simplify interpolation logic
          row.push(row[0]);
      }
      grid[j] = row;
  }
  callback(header, grid);
};

function wind(windData){
  buildGrid(windData, function(header, grid) {
    var data = [];
    var p = 0;
    var maxMag = 0;
    var minMag = Infinity;
    for (var j = 0; j < header.ny; j++) {
        for (var i = 0; i < header.nx; i++) {
            var vx = grid[j][i][0];
            var vy = grid[j][i][1];
            var mag = Math.sqrt(vx * vx + vy * vy);
            var lng = i / header.nx * 360;
            if (lng >= 180) {
                lng = 180 - lng;
            }
            // 数据是一个一维数组
            // [ [经度, 维度，向量经度方向的值，向量维度方向的值] ]
            data.push([
                lng,
                90 - j / header.ny * 180,
                vx,
                vy,
                mag
            ]);
            maxMag = Math.max(mag, maxMag);
            minMag = Math.min(mag, minMag);
        }
    }
    const option ={
        visualMap: {
            left: 'right',
            min: minMag,
            max: maxMag,
            dimension: 4,
            inRange: {
                // color: ['green', 'yellow', 'red']
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
            },
            realtime: false,
            calculable: true,
            textStyle: {
                color: '#fff'
            }
        },
        bmap: {
            center: [0, 0],
            zoom: 1,
            roam: true,
            mapStyle: {
                'styleJson': [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#031628'
                    }
                }, {
                    'featureType': 'land',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#000102'
                    }
                }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#000000'
                    }
                }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.stroke',
                    'stylers': {
                        'color': '#0b3d51'
                    }
                }, {
                    'featureType': 'local',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#000000'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#000000'
                    }
                }, {
                    'featureType': 'railway',
                    'elementType': 'geometry.stroke',
                    'stylers': {
                        'color': '#08304b'
                    }
                }, {
                    'featureType': 'subway',
                    'elementType': 'geometry',
                    'stylers': {
                        'lightness': -70
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'geometry.fill',
                    'stylers': {
                        'color': '#000000'
                    }
                }, {
                    'featureType': 'all',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                        'color': '#857f7f'
                    }
                }, {
                    'featureType': 'all',
                    'elementType': 'labels.text.stroke',
                    'stylers': {
                        'color': '#000000'
                    }
                }, {
                    'featureType': 'building',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#022338'
                    }
                }, {
                    'featureType': 'green',
                    'elementType': 'geometry',
                    'stylers': {
                        'color': '#062032'
                    }
                }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#465b6c'
                    }
                }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                        'color': '#022338'
                    }
                }, {
                    'featureType': 'label',
                    'elementType': 'all',
                    'stylers': {
                        'visibility': 'off'
                    }
                }]
            }
        },
        series: [{
            type: 'flowGL',
            coordinateSystem: 'bmap',
            data: data,
            supersampling: 4,
            particleType: 'line',
            particleDensity: 128,
            particleSpeed: 1,
            // gridWidth: windData.nx,
            // gridHeight: windData.ny,
            itemStyle: {
                opacity: 0.7
            }
        }]
    };
    oe = new ADLayer(option, window.g.map, echarts)
    oe.render()
  });
}

const removeWindLayer = () => {
  oe && oe.clear()
  oe = null
}

// 测距
const doLineMeasure = (callback) => {
  addInteraction(getMap(), 'LineString', (layer, overlay) => {
    callback(layer, overlay)
  })
}

// 测面
const doPolygonMeasure = (callback) => {
  addInteraction(getMap(), 'area', (layer, overlay) => {
    callback(layer, overlay)
  })
}

const createWMSLayer = ({ url, layerName, styles, isMask = true }) => {
  const layer = new TileLayer({
    source: new TileWMS({
      url,
      params: {
        'LAYERS': layerName,
        'TILED': true,
        'VERSION': '1.1.1',
        'SRS': 'EPSG:4490',
        styles
      },
      serverType: 'geoserver'
    })
  })
  if (isMask) {
    const mask = createMaskByGeoJson(require('@/components/Map/ruian.json'))
    layer.addFilter(mask)
  }
  return layer
}

export default {
  getMap,
  goHome,
  zoomToFeature,
  createMap,
  createWMSLayer,
  createTileSuperMapRestLayer,
  createTileSuperMapRestSource,
  createVectorLayer,
  createVectorLayerByDataRest,
  createVectorLayerByGeoJson,
  createFeatureByGeoJson,
  createMaskByGeoJson,
  createStaticImageLayer,
  addLayer,
  removeLayer,
  doInteractionDraw,
  addInteractionModify,
  removeInteractionModify,
  createFeature,
  createLineStringFeature,
  getFirePointStyle,
  getDiyPointStyle,
  getFhryStyle,
  getMonitorStyle,
  getLsgjStyle,
  getPolygonStyle,
  getAllFeaturesBySQL,
  getFeaturesByCoordinate,
  getWindLayer,
  removeWindLayer,
  doLineMeasure,
  getTerminalstylePointStyle,
  createTianDiTuLayer,
  doPolygonMeasure,
  wind,
  createTestLayer,
}
