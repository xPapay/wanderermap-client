import { Component } from 'preact';
import SidebarHeader from '../../components/sidebarHeader';
import SidebarBody from '../../components/sidebarBody';
import Amenity from '../../components/amenity';

export default class MenuSidebar extends Component {
    constructor(props) {
        super(props);
    }

    handleAmenityClick = (amenity) => {
        let amenities = [ ...this.props.searchedAmenities ];
        amenities.find((a, index) => {
            if (a.name === amenity.name) {
                let status = amenity.status ? null : 'available';
                amenities[index].status = status;
                return;
            }
        });
        this.props.onChangeSearchedAmenities(amenities);
    }

    renderAmenity = (amenity) => {
        return (
            <Amenity 
                amenity={amenity} 
                buttons={false}
                clickable={true}
                onAmenityClick={this.handleAmenityClick} 
            />
        )
    }

    render() {
        const style = {
            sidebar__section: {
                textAlign: 'center',
                marginTop: '40px',
            },
            sidebar__button: {
                background: '#20CAAE',
                borderRadius: '7px',
                border: 'none',
                outline: 'none',
                padding: '8px 16px',
                color: 'white',
                cursor: 'pointer'
            }
            
        }

        return (
            <div>
                <SidebarHeader />
                <SidebarBody>
                    <div className="sidebar__section">
                        <h4>Filter places having (and)</h4>
                        <div className="amenities">
                            {this.props.searchedAmenities.map(this.renderAmenity)}
                        </div>
                    </div>
                </SidebarBody>
            </div>
        )
    }
}
