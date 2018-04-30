import { h, Component } from 'preact';
import style from './style';
import Sidebar from '../../components/sidebar';
import PlaceInfoSidebar from '../../components/placeInfoSidebar';
import MenuSidebar from '../../components/menuSidebar';
import Container from '../../components/container';
import { getApiHost } from '../../utils/helpers';

export default class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sidebarOpen: false,
			selectedPlace: null,
			searchedAmenities: [
				{ name: 'shower', status: null },
				{ name: 'washing machine', status: null },
				{ name: 'seasonal work', status: null },
				{ name: 'camping spot', status: null }
			]
		}
	}
	handleMarkerClick = (place) => {
		this.setState({
			sidebarOpen: true,
			selectedPlace: place
		});
	}

	handleMenuClick = () => {
		this.setState({
			sidebarOpen: !this.state.sidebarOpen,
			selectedPlace: null
		});
	}

	handleSidebarBackClick = (event) => {
		this.setState({ sidebarOpen: !this.state.sidebarOpen });
	}

	handleAmenityBtnClick = (action, amenity, place) => {
		let selectedPlace = { ...this.state.selectedPlace };

		this.postAmenityStatus(action, amenity.name, place._id).then((updatedAmenity) => {
			selectedPlace.amenities.find((a, index) => {
				if (a.name === amenity.name) {
					selectedPlace.amenities[index].status = updatedAmenity.status;
					return;
				}
			});
			this.setState({ selectedPlace });
		})
	}

	postAmenityStatus = async (action, amenityName, placeId) => {
		const response = await fetch(`${getApiHost()}/api/place/${placeId}/amenity/change_status?amenity_name=${amenityName}&action=${action}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error('Unsuccesfull post request. Response: ' + response.statusText);
		}

		const amenity = await response.json();

		return amenity;
	}

	handleChangeSearchedAmenities = (searchedAmenities) => {
		this.setState({ searchedAmenities });
	}

	render() {
		return (
			<div>
				<Sidebar open={this.state.sidebarOpen} onClick={this.handleSidebarBackClick}>
					{this.state.selectedPlace ?
						<PlaceInfoSidebar onClick={this.handleAmenityBtnClick} place={this.state.selectedPlace} />
						:
						<MenuSidebar
							searchedAmenities={this.state.searchedAmenities}
							onChangeSearchedAmenities={this.handleChangeSearchedAmenities}
						/>
					}
				</Sidebar>
				<Container
					onMarkerClick={this.handleMarkerClick}
					onMenuClick={this.handleMenuClick}
					searchedAmenities={this.state.searchedAmenities}
				/>
			</div>
		);
	}
}
