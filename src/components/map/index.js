import { Component } from 'preact';
import ReactDOM from 'react-dom';
import SearchBox from '../searchBox';
import Markers from '../markers';
import { getApiHost } from '../../utils/helpers';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.mapRef = null;
        this.searchedPlaces = [];

        this.setMapRef = element => {
            this.mapRef = element;
        }

        const { lat, lng } = this.props.initialCenter || { lat: 51, lng: 11 };

        this.state = {
            places: [],
            currentLocation: {
                lat,
                lng
            }
        }
    }

    componentDidMount() {
        this.getUsersLocation();
        this.loadMap();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }

        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    getUsersLocation = () => {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude: lat, longitude: lng } = pos.coords;
                this.setState({ currentLocation: { lat, lng } });
            });
        }
    }

    loadMap = () => {
        if (this.props && this.props.google) {
            const { google } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const maps = google.maps;

            const node = ReactDOM.findDOMNode(this.mapRef);

            this.map = new maps.Map(node, {
                center: { lat, lng },
                zoom: 7,
                mapTypeControlOptions: {
                    position: maps.ControlPosition.LEFT_BOTTOM
                }
            });

            this.map.addListener('idle', this.handleIdle);
        }
    }

    handleIdle = async () => {
        try {
            const places = await this.fetchPlacesBetweenCoords(this.getBoundaries());
            this.setState({ places });
        } catch (e) {
            console.error(e);
        }
    }

    recenterMap = () => {
        const { google } = this.props;
        const { currentLocation } = this.state;

        if (this.map) {
            let center = new google.maps.LatLng(currentLocation.lat, currentLocation.lng);
            this.map.panTo(center);
        }
    }

    fetchPlacesBetweenCoords = async (coordinates) => {
        const url = new URL(`${getApiHost()}/api/places`);
        Object
            .keys(coordinates)
            .forEach(key => url.searchParams.append(key, coordinates[key]));
        let response = await fetch(url);

        if (response.status !== 200) {
            throw `Error. Got response ${response.status}`;
        }

        let places = await response.json();
        return places;
    }

    getBoundaries = () => {
        if (!this.map) {
            return;
        }

        const bounds = this.map.getBounds();
        const southWest = bounds.getSouthWest();
        const northEast = bounds.getNorthEast();

        const coordinates = {
            southWest: `${southWest.lat()},${southWest.lng()}`,
            northEast: `${northEast.lat()},${northEast.lng()}`
        }

        return coordinates;
    }

    handleMarkerClick = (event, place) => {
        this.map.setZoom(9);
        this.map.panTo(event.latLng);
        this.props.onMarkerClick(place);
    }

    filterOut = (place) => {
        // filter place out if it doesn't have at least one available amenity
        if (!place.amenities.find(amenity => ((amenity.status === 'available') || (amenity.status === 'not verified')))) {
            return true;
        }

        // filter place out if it does't match search filter
        let searchedAmenities = this.props.searchedAmenities.filter((amenity) => {
            return amenity.status;
        });

        let results = searchedAmenities.filter((amenity) => {
            return place.amenities.find((a) => {
                return ((a.name === amenity.name) && a.status !== 'not available');
            })
        });

        if (results.length !== searchedAmenities.length) {
            return true;
        }
    }

    getSearchedPlaces = () => {
        let places = [];
        this.state.places.map((place) => {
            if (this.filterOut(place)) {
                return;
            }

            places.push(place);
        });

        return places;
    }

    render() {
        const style = {
            width: '100%',
            height: '100vh'
        }
        return (
            <div style={style} ref={this.setMapRef}>
                Loading map...
                <SearchBox google={this.props.google} map={this.map} onMenuClick={this.props.onMenuClick} />
                {this.map &&
                <Markers 
                    map={this.map} 
                    google={this.props.google} 
                    places={this.getSearchedPlaces()}
                    onClick={this.handleMarkerClick}
                />
                }
            </div>
        )
    }
}
