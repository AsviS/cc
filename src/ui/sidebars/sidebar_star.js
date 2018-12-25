// import Planet from './classes/Planet';
// import {bindable} from 'aurelia-framework';
import * as Signals from '../../util/signals';

export class StarDetailPane {
	star = null;
	app = null;
	editing_name = false;
	// used for stuff that needs to be computed when UI changes.
	// changes in player's technology can affect the results, so
	// we use signals from the turn processor to update this
	// after each turn completed.
	calc_vals = {}; 
	playerHasLocalFleet = false;
	
	activate(data) {
		this.app = data.app;
		this.star = data.obj;
		this.turn_subscription = Signals.Listen('turn', data => this.Update(data) );
		this.Update();
		}
		
	unbind() { 	
		this.turn_subscription.dispose();
		}
		
	Update( turn_num ) { 
		this.calc_vals = {};
		if ( this.star ) { 
			for ( let p of this.star.planets ) { 
				this.calc_vals[p.id] = {
					adapt: p.Adaptation( this.app.game.myciv.race ),
					hab: p.Habitable( this.app.game.myciv.race )
					};
				}
			this.playerHasLocalFleet = this.star.PlayerHasLocalFleet;
			}
		}
		
	PlanetSizeCSS( planet ) {
		let size = Math.round(planet.size * 0.572);
		if ( planet.size < 130 ) {
			let pos = 35 - (size * 0.5);
			return `background-size: ${size}px; background-position: ${pos}px 0%`;
			}
		else {
			let pos = 0; //75 - size;
			return `background-size: ${size}px; background-position: ${pos}px 0%`;
			}
		}
		
	ToggleNameEdit() { 
		this.editing_name = !this.editing_name;
		}
	}
