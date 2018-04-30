import { Component } from 'preact';
import MarkerClusterer from '../../utils/markerClusterer';
import { underscoreLowercase } from '../../utils/helpers';

export default class Markers extends Component {
    constructor(props) {
        super(props);
        this.markers = [];
        this.markerClusterer = new MarkerClusterer(this.props.map, this.markers, {
            gridSize: 40,
            maxZoom: 8,
            imagePath: '/assets/pins/cluster',
            imageExtension: 'svg',
            imageSizes: [48, 48]
        });        
    }

    componentDidMount() {
        this.updateMarkers();
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.places.length !== this.props.places.length || prevProps.places[0] !== this.props.places[0]) {
            this.updateMarkers();
        }
    }

    updateMarkers = () => {
        const { places, google, onClick } = this.props;

        // detach all event listeners on all markers
        this.markers.map(marker => google.maps.event.clearInstanceListeners(marker));
        
        this.markerClusterer.clearMarkers();
        this.markers = [];

        places.map((place) => {
            const icon = this.getIcon(place);
            let marker = new google.maps.Marker({
                position: { lat: place.lat, lng: place.lng },
                title: place.name,
                icon
            });

            marker.addListener('click', (event) => onClick(event, place));
            this.markers.push(marker);     
        })

        this.markerClusterer.addMarkers(this.markers);
    }

    getIcon = (place) => {
        const url = this.getIconUrl(place);
        const icon = {
            url,
            size: new google.maps.Size(64, 79),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(32, 79)
        }

        return icon;
    }

    getIconUrl = (place) => {
        const availableAmenitiesCount = place.amenities.filter((amenity) => {
            return amenity.status !== 'not available';
        }).length;
        let pinBasePath = '/assets/pins';
        return availableAmenitiesCount > 1 ? `${pinBasePath}/many_pin.svg` : `${pinBasePath}/${underscoreLowercase(place.amenities[0].name)}_pin.svg`;
    }

    render() {
        return null;
    }
}
