import { Component } from 'preact';

export default class SidebarHeader extends Component {
    render() {
        const backgroundUrl = this.props.backgroundUrl || 'https://images.unsplash.com/photo-1516024851043-da0e0fba8983?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6a8a896c343f914843daf3fb5af5bb69&auto=format&fit=crop&w=1050&q=80';
        const style = {
            sidebar__header: {
                width: '250px',
                height: '200px',
                transform: 'skew(0, 12deg)',
                overflow: 'hidden',
                margin: '-40px 0 30px -10px'
            },
            header__background: {
                transform: 'skew(0, -12deg)',
                height: '240px',
                background: `url('${backgroundUrl}') center center #999`,
                backgroundSize: 'cover',
                position: 'relative'
            },
            header__title: {
                position: 'absolute',
                bottom: '70px',
                left: '20px',
                color: 'white',
                textShadow: '2px 2px rgba(51, 51, 51, .57)',
                fontSize: '1.25rem'
            }
        }
        return (
            <div className="sidebar__header header" style={style.sidebar__header}>
                <div className="header__background" style={style.header__background}>
                    <h3 className="header__title" style={style.header__title}>{this.props.title}</h3>
                </div>
            </div>
        )
    }
}
