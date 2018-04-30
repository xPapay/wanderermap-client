import { Component } from 'preact';
import backBtn from './back_btn.svg';

export default class Sidebar extends Component {
    renderChildren = (childNode) => {
        return childNode;
    }

    render() {
        const style = {
            sidebar: {
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                width: '250px',
                background: 'white',
                boxShadow: '6px 0 10px 0 rgba(51, 51, 51, .57)',
                zIndex: 300,
                transition: 'transform .3s ease-in-out',
                transform: this.props.open ? 'translateX(0)' : 'translateX(-110%)',
                padding: '10px'
            },
            backBtn: {
                position: 'absolute',
                right: '10px',
                top: '10px',
                zIndex: 400,
                cursor: 'pointer'
            }
        }

        return (
            <div className="sidebar" style={style.sidebar}>
                <div className="back-btn" style={style.backBtn} onClick={this.props.onClick}>
                    <img alt="Back button" src={backBtn} />
                </div>
                {this.props.children.map(this.renderChildren)}
            </div>
        )
    }
}
