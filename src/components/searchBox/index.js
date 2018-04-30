import { Component } from 'preact';
import MenuIcon from '../menuIcon';
import searchIcon from './search.svg';

export default class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.inputRef = null;

        this.setInputRef = element => {
            this.inputRef = element;
        }
    }

    componentDidMount() {
        if (!this.props || !this.props.google) {
            return;
        }
        const { google, map } = this.props;
        this.searchBox = new google.maps.places.Autocomplete(this.inputRef);
        this.searchBox.addListener('place_changed', (event) => {
            let place = this.searchBox.getPlace();
            map.panTo(place.geometry.location);
        });
    }

    render() {
        const style = {
            searchBox: {
                zIndex: 250,
                position: 'absolute',
                left: '10px',
                top: '10px',
                width: '250px',
                padding: '12px 10px',
                background: 'white',
                boxShadow: '2px 2px 8px 0 rgba(51, 51, 51, .57)'
            },
            searchBox__input: {
                border: 'none',
                lineHeight: '22px',
                maxWidth: '174px',
                marginLeft: '10px'
            },
            searchBox__icon: {
                display: 'inline-block',
                float: 'right',
                cursor: 'pointer'
            }
        }

        return (
            <div className="search-box" style={style.searchBox}>
                <MenuIcon onClick={this.props.onMenuClick} />
                <input className="search-box__input" type="text" ref={this.setInputRef} style={style.searchBox__input} />
                <div className="search-icon" style={style.searchBox__icon}>
                    <img alt="search icon" src={searchIcon} />
                </div>
            </div>
        )
    }
}
