import 'ol/ol.css'
import Feature from 'ol/Feature'
import Map from 'ol/Map'
import View from 'ol/View'
import Polyline from 'ol/format/Polyline'
import Point from 'ol/geom/Point'
import LineString from 'ol/geom/LineString'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import XYZ from 'ol/source/XYZ'
import VectorSource from 'ol/source/Vector'
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style'
import { getVectorContext } from 'ol/render'

var map

var route

var routeCoords
var routeLength

var routeFeature
var geoMarker
var startMarker
var endMarker

var styles = {
  'route': new Style({
    stroke: new Stroke({
      width: 6, color: [237, 212, 0, 0.8]
    })
  }),
  'icon': new Style({
    image: new Icon({
      anchor: [0.5, 1],
      src: 'data/icon.png'
    })
  }),
  'geoMarker': new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({ color: 'black' }),
      stroke: new Stroke({
        color: 'white', width: 2
      })
    })
  })
}

var animating = false
var speed, now

var vectorLayer

var moveFeature = function(event) {
  var vectorContext = getVectorContext(event)
  var frameState = event.frameState

  if (animating) {
    var elapsedTime = frameState.time - now
    // here the trick to increase speed is to jump some indexes
    // on lineString coordinates
    var index = Math.round(speed * elapsedTime / 1000)

    if (index >= routeLength) {
      stopAnimation(true)
      return
    }

    var currentPoint = new Point(routeCoords[index])
    var feature = new Feature(currentPoint)
    vectorContext.drawFeature(feature, styles.geoMarker)
  }
  // tell OpenLayers to continue the postrender animation
  map.render()
}

const init = (currPath) => {
  map = window.g.map
  route = new LineString(currPath)

  routeCoords = route.getCoordinates()[0]
  routeLength = routeCoords.length

  routeFeature = new Feature({
    type: 'route',
    geometry: route
  })
  geoMarker = /** @type Feature<import("../src/ol/geom/Point").default> */(new Feature({
    type: 'geoMarker',
    geometry: new Point(routeCoords[0])
  }))
  startMarker = new Feature({
    type: 'icon',
    geometry: new Point(routeCoords[0])
  })
  endMarker = new Feature({
    type: 'icon',
    geometry: new Point(routeCoords[routeLength - 1])
  })

  vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [routeFeature, geoMarker, startMarker, endMarker]
    }),
    style: function(feature) {
      // hide geoMarker if animation is active
      if (animating && feature.get('type') === 'geoMarker') {
        return null
      }
      return styles[feature.get('type')]
    }
  })

  map.addLayer(vectorLayer)
}

const startAnimation = () => {
  if (animating) {
    stopAnimation(false)
  } else {
    animating = true
    now = new Date().getTime()
    speed = 60
    // hide geoMarker
    geoMarker.setStyle(null)
    // just in case you pan somewhere else
    vectorLayer.on('postrender', moveFeature)
    map.render()
  }
}

/**
 * @param {boolean} ended end of animation.
 */
function stopAnimation(ended) {
  animating = false

  // if animation cancelled set the marker at the beginning
  var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0]
  var geometry = geoMarker.getGeometry()
  geometry.setCoordinates(coord)
  // remove listener
  vectorLayer.un('postrender', moveFeature)
}

export default {
  init,
  startAnimation,
  stopAnimation
}
