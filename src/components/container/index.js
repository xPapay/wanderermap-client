import { Component } from 'preact';
import GoogleApiComponent from '../googleApiComponent';
import Map from '../map';

export class Container extends Component {
    render() {
        return (
            <div>
                <Map
                    onMarkerClick={this.props.onMarkerClick}
                    onMenuClick={this.props.onMenuClick}
                    google={this.props.google}
                    initialCenter={{ lat: 51, lng: 11 }}
                    searchedAmenities={this.props.searchedAmenities}
                />
            </div>
        )
    }
}

export default GoogleApiComponent({
    apiKey: 'AIzaSyARSItSi1n7vfXW5TPnDuiuASfnbbnK34Q'
})(Container);
