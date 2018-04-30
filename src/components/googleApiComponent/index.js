import React, { PropTypes as T } from 'react'
import ReactDOM from 'react-dom'

import cache from '../../utils/cache'
import GoogleApi from '../../utils/GoogleApi'

const defaultMapConfig = {}
export const wrapper = (options) => (WrappedComponent) => {
  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];

  class Wrapper extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.mapRef = null;

      this.setMapRef = element => {
        this.mapRef = element;
      }

      this.state = {
        loaded: false,
        map: null,
        google: null
      }
    }

    componentDidMount() {
      this.scriptCache.google.onLoad((err, tag) => {
        const maps = window.google.maps;
        const props = Object.assign({}, this.props, {
          loaded: this.state.loaded
        });

        const node = ReactDOM.findDOMNode(this.mapRef);
        let center = new maps.LatLng(this.props.lat, this.props.lng)

        let mapConfig = Object.assign({}, defaultMapConfig, {
          center, zoom: this.props.zoom
        })

        this.map = new maps.Map(node, mapConfig);

        this.setState({
          loaded: true,
          map: this.map,
          google: window.google
        })
      });
    }

    componentWillMount() {
      this.scriptCache = cache({
        google: GoogleApi({
          apiKey: apiKey,
          libraries: libraries
        })
      });
    }

    render() {
      const props = Object.assign({}, this.props, {
        loaded: this.state.loaded,
        map: this.state.map,
        google: this.state.google,
        mapComponent: this.mapRef
      })
      return (
        <div>
          <WrappedComponent {...props} />
          <div ref={this.setMapRef} />
        </div>
      )
    }
  }

  return Wrapper;
}

export default wrapper;

