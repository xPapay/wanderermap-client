import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import logo from './logo.svg';
import showersPin from './showers_pin.svg';
import washingMachinePin from './washing_machine_pin.svg';
import seasonalWorkPin from './seasonal_work_pin.svg';

export default class Home extends Component {
	render() {
		return (
			<div>
				<nav className={style.nav}>
					<Link className={style.nav__link} href="/map">Map</Link>
				</nav>
				<section className={style.content}>
					<img alt="wanderermap logo" src={logo} className={style.logo} />
					<h2 className={style.headline}>The most comprehensive map of public showers on internet</h2>
					<p className={style.paragraph}>
						Wanderermap is a map specifically tailored for hitchikers and backpackers.
                        In current version it helps you stay fresh on your journey across Europe.
                </p>
					<div className={style.stat}>
						<img className="stat__symbol" alt="showers pin" src={showersPin} />
						<div className={style.stat__counter}>878</div>
					</div>
					<p className={style.paragraph}>
						In next versions I'm planing to add location of wasching machines, so you don't have to rely on hostels ...
                </p>
					<div className={style.stat}>
						<img className="stat__symbol" alt="showers pin" src={washingMachinePin} />
						<div className={style.stat__counter}>0</div>
					</div>
					<p className={style.paragraph}>
						... and also short-term seasonal work so you can stay on your travel basically indefinetely.
                </p>
					<div className={style.stat}>
						<img className="stat__symbol" alt="showers pin" src={seasonalWorkPin} />
						<div className={style.stat__counter}>0</div>
					</div>
					<p className={style.paragraph}>
						The app is currently under active development. Adding new spots is currently not possible,
                        however for time being you can submit new spot via this form.
                </p>
				</section>
				<div className={style.author}>
					<small>by <a href="https://lukaspapay.com">lukaspapay.com</a></small>
				</div>
			</div>
		);
	}
}
