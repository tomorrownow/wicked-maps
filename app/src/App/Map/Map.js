import React, {Component} from 'react';
import {render} from 'react-dom';
import ReactMapGL from 'react-map-gl';
import {PhongMaterial} from '@luma.gl/core';
import {AmbientLight, PointLight, LightingEffect} from '@deck.gl/core';
import {HexagonLayer} from '@deck.gl/aggregation-layers';
import DeckGL from '@deck.gl/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.scss';

class Map extends Component {

   state = {
    viewport: {
      height: "100vh",
      width: "100%",
      zoom: 12,
      latitude: 35.7099,
      longitude: -78.6319,
      // center: [-78.6319,35.7099],
      pitch: 45,
      hash: true
    }
  };

  render() {
    return (
      <ReactMapGL className="map"
        mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
        mapStyle={'mapbox://styles/ctwhite/cjtnhxudz2j4l1fs74h5hygce'}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      ></ReactMapGL>
    );
  }
}

export default Map;
