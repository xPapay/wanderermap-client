import { Component } from 'preact';
import washingMachine from './washing_machine.svg';
import { importAll, underscoreLowercase } from '../../utils/helpers';

export default class Amenity extends Component {
    render() {
        const { amenity, buttons, clickable } = this.props;
        const symbolFilename = amenity.name ? `${underscoreLowercase(amenity.name)}.svg` : null;
        const images = importAll(require.context('./', false, /\.(svg)$/));

        const style = {
            amenity: {
                display: 'inline-block',
                verticalAlign: 'top',
                margin: '5px',
                cursor: clickable ? 'pointer' : 'default'
            },
            amenity__background: {
                width: '52px',
                height: '52px',
                background: amenity.status === 'available' ? '#20CAAE' : '#C3C3C3',
                display: 'inline-block',
                verticalAlign: 'middle',
                borderRadius: '7px',
                position: 'relative'
            },
            amenity__symbol: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            },
            amenity__description: {
                width: '52px',
                display: 'block',
                textAlign: 'center',
                fontSize: '0.75rem'
            },
            amenity__buttons: {
                display: 'inline-block',
                verticalAlign: 'middle'
            },
            amenity__button: {
                cursor: 'pointer'
            },
            'amenity__button--invalidate': {
                marginTop: '8px'
            }
        }
        
        return (
            <div className="amenity" style={style.amenity} onClick={() => {this.props.onAmenityClick && this.props.onAmenityClick(amenity)}}>
                <div className="amenity__background" style={style.amenity__background}>
                    {symbolFilename &&
                        <div className="amenity__symbol" style={style.amenity__symbol}>
                            <img alt={amenity.name} className={symbolFilename} src={images[symbolFilename]} />
                        </div>
                    }
                </div>
                {buttons &&
                    <div className="amenity__buttons" style={style.amenity__buttons}>
                        <div className="amenity__button" style={style.amenity__button}>
                            <img 
                                onClick={() => this.props.onClick('validate', amenity)} 
                                alt="Button confiriming amedity is present" 
                                src={amenity.status === 'available' ? images['confirmed.svg'] : images['confirm.svg']} 
                            />
                        </div>
                        <div 
                            className="amenity__button amenity__button--invalidate" 
                            style={{...style.amenity__button, ...style['amenity__button--invalidate']}}>
                            <img 
                                onClick={() => this.props.onClick('invalidate', amenity)} 
                                alt="Button confiriming amedity is present" 
                                src={images['invalidate.svg']} 
                            />
                        </div>
                    </div>
                }
                <div className="amenity__description" style={style.amenity__description}>{amenity.name}</div>
            </div>
        )
    }
}
