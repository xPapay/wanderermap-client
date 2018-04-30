import { Component } from 'preact';
import SidebarHeader from '../../components/sidebarHeader';
import SidebarBody from '../../components/sidebarBody';
import Amenity from '../../components/amenity';

export default class PlaceInfoSidebar extends Component {
    handleAmenityClick = (action, amenity) => {
        if (! confirm(`${action} amenity?`)) {
            return;
        }
        this.props.onClick(action, amenity, this.props.place);
    }

    renderAmenity = (amenity) => {
        if (amenity.status === 'not available') {
            return;
        }
        return <Amenity onClick={this.handleAmenityClick} amenity={amenity} buttons={true} />
    }

    render() {
        const { place } = this.props;
        return (
            <div>
                <SidebarHeader title={place && place.name} />
                <SidebarBody>
                    <div className="sidebar__section">
                        <h4>Address</h4>
                        <p>{place && place.address}</p>
                    </div>
                    <div className="sidebar__section">
                        <h4>Amenities</h4>
                        {place && place.amenities.length > 0 &&
                            <div className="amenities">
                                {place.amenities.map(this.renderAmenity)}
                            </div>
                        }
                    </div>
                    <div className="sidebar__section">
                        <h4>Comments</h4>
                        <i>No comments yet</i>
                    </div>
                </SidebarBody>
            </div>
        )
    }
}
