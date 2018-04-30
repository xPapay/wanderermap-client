import { Component } from 'preact';

export default class SidebarBody extends Component {
    renderChildren = (childNode) => {
        return childNode;
    }

    render() {
        const style = {
            
        }
        return (
            <div className="sidebar__body">
                {this.props.children.map(this.renderChildren)}
            </div>
        )
    }
}
