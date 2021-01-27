/* eslint-disable no-undef */
import vue from '@/main'
import GeoJSON from 'ol/format/GeoJSON'
import { NetworkAnalystService, SuperMap, FeatureService } from '@supermap/iclient-ol'
// import { Message } from 'element-ui'
import * as turf from '@turf/turf'
// var local
// var layer
var lineLayers
var markerLayers
var drawPointw
var select
var nodeArray = []
var pathTime
var pathListIndex = 0
var routeCompsIndex = 0
var style = {
  strokeColor: '#304DBE',
  strokeWidth: 3,
  pointerEvents: 'visiblePainted',
  fill: false
}
var styleGuidePoint = {
  pointRadius: 10,
  externalGraphic: './theme/images/walk.png'
}
var styleGuideLine = {
  strokeColor: '#25FF25',
  strokeWidth: 6,
  fill: false
}

// var startPt = null
// var endPt = null

var serviceUrl =
  'http://10.36.234.81:8090/iserver/services/transportationAnalyst-ruian/rest/networkanalyst/BuildNetwork@MapManager'

// //////////////////////////////////////////--------- 加载地图图层---------//////////////////////////////////////////////////////////////////////////////////////
const init = () => {
  lineLayers = new VectorLayer({
    source: new VectorSource({
      features
    }),
    zIndex: 100,
    style: new Style({
      stroke: new Stroke({
        color: 'rgba(255, 0, 0, 1)',
        lineDash: [0],
        width: 2
      }),
      fill: new Fill({
        color: 'rgba(255,0, 0, 0.3)'
      })
    })
  }) // Vector：创建一个矢量图层。
  drawPointw = new SuperMap.Control.DrawFeature(
    lineLayers,
    SuperMap.Handler.Point
  )

  // DrawFeature：绘制要素类。通过事件处理器可以在vector图层上绘制点、线、面等要素
  // Handler实例化事件处理器类对象。//Handler.Path：地图上绘制路径的控制事件处理器。当按下鼠标后路径开始显示，随着鼠标移动而变化，当松开鼠标时完成。
  select = new SuperMap.Control.SelectFeature(lineLayers, {
    onSelect: onFeatureSelecter,
    onUnselect: onFeatureUnselect
  })
  // onSelect 当地物被选中时可以调用该方法，完成用户指定的任务。要求用户定义具体方法， 该方法接收当前选中要素作为参数。
  // onUnselect 当地物被取消选择时可以调用该方法，完成用户指定的任务。要求用户定义具体方法， 该方法接收地物要素作为参数。
  drawPointw.events.on({
    featureadded: drawCompleteder
  }) // SuperMap.Events.on 构造函数//on：在一个相同的范围内注册监听器的方法，此方法调用register函数。

  markerLayers = new SuperMap.Layer.Markers('Markers')
}

const selectPoints = () => {
  clearElements()
  drawPointw.activate()
}
// 添加坐标的小图标
const drawCompleteder = drawGeometryArgs => {
  var point = drawGeometryArgs.feature.geometry
  var size = new SuperMap.Size(44, 33)
  var offset = new SuperMap.Pixel(-(size.w / 2), -size.h)
  var icon = new SuperMap.Icon('./theme/images/marker.png', size, offset)
  markerLayers.addMarker(
    new SuperMap.Marker(new SuperMap.LonLat(point.x, point.y), icon)
  )
  nodeArray.push(point)
}

// 选中时显示路径指引信息
const onFeatureSelecter = feature => {
  if (feature.attributes.description) {
    popup = new SuperMap.Popup(
      'chicken',
      feature.geometry.getBounds().getCenterLonLat(),
      new SuperMap.Size(200, 30),
      "<div style='font-size:.8em; opacity: 0.8'>" +
        feature.attributes.description +
        '</div>',
      null,
      false
    )
    feature.popup = popup
    window.$map.getMap().addPopup(popup)
  }
  if (feature.geometry.CLASS_NAME !== 'SuperMap.Geometry.Point') {
    feature.style = styleGuideLine
    lineLayers.redraw()
  }
}

// 清除要素时调用此函数
const onFeatureUnselect = feature => {
  window.$map.getMap().removePopup(feature.popup)
  feature.popup.destroy()
  feature.popup = null
  if (feature.geometry.CLASS_NAME !== 'SuperMap.Geometry.Point') {
    feature.style = style
  }
  lineLayers.redraw()
}

// //////////////////////////////////////////--------- 进行最短路径计算---------//////////////////////////////////////////////////////////////////////////////////////

const selectStartPt = () => {
  window.$map.doInteractionDraw('Point', (geojson, feature) => {
    startPt = feature
  })
}

const selectEndPt = () => {
  window.$map.doInteractionDraw('Point', (geojson, feature) => {
    endPt = feature
  })
}

const findPath = (startPt, endPt, serviceUrl) => {
  return new Promise((resolve, reject) => {
    // drawPointw.deactivate()
    if (!startPt) {
      vue.$message.info('请选择火灾点！')
    }
    if (!endPt) {
      vue.$message.info('请选择救援队伍！')
    }
    const [startX, startY] = startPt.getGeometry().getCoordinates()
    const [endX, endY] = endPt.getGeometry().getCoordinates()
    nodeArray = [
      new SuperMap.Geometry.Point(startX, startY),
      new SuperMap.Geometry.Point(endX, endY)
    ]
    var resultSetting = new SuperMap.TransportationAnalystResultSetting({
      returnEdgeFeatures: true, // 是否在分析结果中包含弧段要素集合。弧段要素包括弧段的空间信息和属性信息。
      returnEdgeGeometry: true, // 返回的弧段要素集合中是否包含几何对象信息。默认为 false。
      returnEdgeIDs: true, // 返回结果中是否包含经过弧段 ID 集合。默认为 false。
      returnNodeFeatures: true, // 是否在分析结果中包含结点要素集合。 结点要素包括结点的空间信息和属性信息。其中返回的结点要素是否包含空间信息可通过 returnNodeGeometry 字段设置。默认为 false。
      returnNodeGeometry: true, // 返回的结点要素集合中是否包含几何对象信息。默认为 false。
      returnNodeIDs: true, // 返回结果中是否包含经过结点 ID 集合。默认为 false。
      returnPathGuides: true, // 返回分析结果中是否包含行驶导引集合。
      returnRoutes: true // 返回分析结果中是否包含路由对象的集合。
    })
    var analystParameter = new SuperMap.TransportationAnalystParameter({
      resultSetting: resultSetting,
      // weightFieldName: "SmLength"//weightFieldName：阻力字段的名称，标识了进行网络分析时所使用的阻力字段，例如表示时间、长度等的字段都可以用作阻力字段。 该字段默值为服务器发布的所有耗费字段的第一个字段。
      weightFieldName: 'SmLength'
    })
    var findPathParameter = new SuperMap.FindPathParameters({
      isAnalyzeById: false, // isAnalyzeById:事件点和设施点是否通过节点 ID 号来指定，默认为 false，即通过坐标点指定事件点和设施点。
      nodes: nodeArray, // nodes:应为点的 ID 数组。 pointgeom
      hasLeastEdgeCount: false, // hasLeastEdgeCount:是否按照弧段数最少的进行最佳路径分析。
      parameter: analystParameter
    })
    if (nodeArray.length <= 1) {
      alert('站点数目有误')
    }
    // 进行查找
    new NetworkAnalystService(serviceUrl).findPath(findPathParameter, function(
      serviceResult
    ) {
      var guideLayerStyle = new ol.style.Style({
        image: new ol.style.Icon({
          src: require('@/assets/images/walk.png'),
          size: [20, 20]
        })
      })

      function getRouteLayerStyle(feature) {
        // console.log('getRouteLayerStyle')
        // console.log({feature})
        // DRIVING_PERMISSION ： 0--不能通车；1--可以通车
        const DRIVING_PERMISSION = feature.values_.DRIVING_PERMISSION
        if (DRIVING_PERMISSION) {
          return new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'rgba(153,18,241, 1)',
              width: 2
            }),
            fill: new ol.style.Fill({
              color: 'rgba(153,18,241, 1)'
            })
          })
        } else {
          return new ol.style.Style({
            stroke: new ol.style.Stroke({
              color: 'rgba(255, 0, 0, 1)',
              width: 10
            }),
            fill: new ol.style.Fill({
              color: 'rgba(255, 0, 0, 1)'
            })
          })
        }
      }
      if (serviceResult.error) {
        // Message.error('最近公路点分析失败!')
        return
      }
      serviceResult.result.pathList && serviceResult.result.pathList.map(function(result) {
        // 添加分析出的路线
        var routeSource = new ol.source.Vector({
          features: new ol.format.GeoJSON().readFeatures(result.edgeFeatures)
        })
        lineLayers = new ol.layer.Vector({
          source: routeSource,
          style: getRouteLayerStyle
        })
        // 添加分析出的引导点
        const pathGuideFeatures = new ol.format.GeoJSON().readFeatures(result.pathGuideItems)
        var guideSource = new ol.source.Vector({
          features: new ol.format.GeoJSON().readFeatures(result.pathGuideItems)
        })
        markerLayers = new ol.layer.Vector({
          source: guideSource,
          style: guideLayerStyle
        })
        resolve({ lineLayers, pathGuideFeatures })
      })
    })
  })
}

// pt--[lon,lat]
// buffer--半径 千米
const findBuffer = (pt, url, buffer) => {
  // debugger
  //指定点查询处理
  const point = new ol.geom.Point(pt);
  // 查询参数
  const bufferParam = new SuperMap.GetFeaturesByBufferParameters({
      datasetNames: ["MapManager:roadnoother"],
      bufferDistance: buffer,
      geometry: point
  });
  // 创建缓冲区查询实例
  new FeatureService(url).getFeaturesByBuffer(bufferParam, function (serviceResult) {
      //获取features数据
      const features = serviceResult.result.features;
      console.log({features})
  });
  return new Promise((resolve, reject) => {
    const buffered = turf.buffer(
      turf.point(pt),
      buffer,
      {
        units: 'kilometers'
      }
    )
    var format = new GeoJSON()
    var f = format.readFeature(buffered)

    const geometryParam = new SuperMap.GetFeaturesByGeometryParameters({
      toIndex: 999999,
      geometry: f.getGeometry(),
      spatialQueryMode: 'INTERSECT', // 相交空间查询模式
      datasetNames: ['MapManager:roadnoother']
    })
    new FeatureService(url).getFeaturesByGeometry(geometryParam, serviceResult => {
      resolve(serviceResult.result.features.features || [])
    })
  })
}

// 调用方法
// const processCompleted = findPathEventArgs => {
//   var result = findPathEventArgs.result
//   allScheme(result)
// }

// 错误调试代码
// const processFailed = e => {
//   alert(e.error.errorMsg)
// }

const allScheme = result => {
  if (pathListIndex < result.pathList.length) {
    addPath(result)
  } else {
    pathListIndex = 0
    // 线绘制完成后会绘制关于路径指引点的信息
    addPathGuideItems(result)
  }
}
// 以动画效果显示分析结果
const addPath = result => {
  if (
    routeCompsIndex <
    result.pathList[pathListIndex].route.components[0].components.length
  ) {
    var pathFeature = new SuperMap.Feature.Vector()
    var points = []
    for (var k = 0; k < 2; k++) {
      if (
        result.pathList[pathListIndex].route.components[0].components[
          routeCompsIndex + k
        ]
      ) {
        points.push(
          new SuperMap.Geometry.Point(
            result.pathList[pathListIndex].route.components[0].components[
              routeCompsIndex + k
            ].x,
            result.pathList[pathListIndex].route.components[0].components[
              routeCompsIndex + k
            ].y
          )
        )
      }
    }
    var curLine = new SuperMap.Geometry.LinearRing(points)
    pathFeature.geometry = curLine
    pathFeature.style = style
    lineLayers.addFeatures(pathFeature)
    // 每隔0.001毫秒加载一条弧段
    pathTime = setTimeout(function() {
      addPath(result)
    }, 0.001)
    routeCompsIndex++
  } else {
    clearTimeout(pathTime)
    routeCompsIndex = 0
    pathListIndex++
    allScheme(result)
  }
}

// 显示拐点的导航信息
const addPathGuideItems = result => {
  lineLayers.removeAllFeatures()
  // 显示每个pathGuideItem和对应的描述信息
  for (var k = 0; k < result.pathList.length; k++) {
    var pathGuideItems = result.pathList[pathListIndex].pathGuideItems
    var len = pathGuideItems.length
    for (var m = 0; m < len; m++) {
      var guideFeature = new SuperMap.Feature.Vector()
      guideFeature.geometry = pathGuideItems[m].geometry
      guideFeature.attributes = {
        description: pathGuideItems[m].description
      }
      if (guideFeature.geometry.CLASS_NAME === 'SuperMap.Geometry.Point') {
        guideFeature.style = styleGuidePoint
      } else {
        guideFeature.style = style
      }
      lineLayers.addFeatures(guideFeature)
    }
  }
  select.activate()
}

// 清除所有的坐标图层
const clearElements = () => {
  pathListIndex = 0
  routeCompsIndex = 0
  nodeArray = []
  // select.deactivate();
  // if (lineLayers.selectedFeatures.length > 0) {
  //   vue.$map.getMap().removePopup(lineLayers.selectedFeatures[0].popup);
  // }
  // lineLayers.removeAllFeatures();
  // markerLayers.clearMarkers();
  window.$map.removeLayer(markerLayers)
  window.$map.removeLayer(lineLayers)
}

export default {
  selectPoints,
  findPath,
  findBuffer,
  clearElements,
  init,
  selectStartPt,
  selectEndPt
}
