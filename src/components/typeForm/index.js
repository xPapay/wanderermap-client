import { Component } from 'preact';
import style from './style.css';

export default class TypeForm extends Component {
    componentDidMount() {
        this.loadScript();
    }

    loadScript = () => {
        var qs, js, q, s, d = document, gi = d.getElementById, ce = d.createElement, gt = d.getElementsByTagName, id = "typef_orm_share", b = "https://embed.typeform.com/";
        if (!gi.call(d, id)) {
            js = ce.call(d, "script");
            js.id = id;
            js.src = b + "embed.js";
            q = gt.call(d, "script")[0];
            q.parentNode.insertBefore(js, q)
        }
    }

    render() {
        return (
            <a
                className={"typeform-share button " + style.typeform}
                href="https://lukaspapay.typeform.com/to/Bd9bSI"
                data-mode="popup"
            >
                {this.props.children.length > 0 ? this.props.children : <span>Launch me</span>}
            </a>
        )
    }
}
