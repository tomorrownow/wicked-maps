import React, {Component} from 'react';
import ReactMapGL, {FullscreenControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

class Map extends Component {

   state = {
    viewport: {
      width: 800,
      height: 800,
      latitude: 35.7099,
      longitude: -78.6319,
      zoom: 8
    }
  };

  render() {
    return (
      <ReactMapGL 
        mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
        mapStyle={'mapbox://styles/mapbox/satellite-streets-v9'}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      >
      <div style={{position: 'absolute', right: 0}}>
          <FullscreenControl container={document.querySelector('body')}/>
        </div>
      </ReactMapGL>
    );
  }
}

export default Map;
