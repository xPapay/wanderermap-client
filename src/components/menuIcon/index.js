import { Component } from 'preact';
import menuIcon from './menu.svg';

export default class MenuIcon extends Component {
    render() {
        const style = {
            display: 'inline-block',
            verticalAlign: 'middle',
            cursor: 'pointer'
        }
        return (
            <div className="menu-icon" style={style}>
                <img alt="menu icon" src={menuIcon} onClick={this.props.onClick}/>
            </div>
        )
    }
}
