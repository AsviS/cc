import {Mod,Modlist} from './Mods';
import {computedFrom} from 'aurelia-framework';
import * as utils from '../util/utils';


export class GroundUnit {

	// Use this constructor for behind the scenes work.
	// To "manufacture" units, use Make()
	// which also handles internal recordkeeping.
	constructor( blueprint ) { 
		// 'fromJSON' style data bundle as first arg
		if ( 'bp' in blueprint ) { 
			Object.assign( this, blueprint );
			}
		// regular constructor
		else {
			this.id = utils.UUID();
			this.bp = blueprint;
			this.hp = blueprint.hp;
			this.xp = 0; // experience
			this.xplevel = 0; // experience level
			}
		}

	toJSON() { 
		let obj = Object.assign( {}, this ); 
		obj._classname = 'GroundUnit';
		obj.bp = this.bp.id;
		return obj;
		}
		
	Pack( catalog ) { 
		if ( !( this.id in catalog ) ) { 
			catalog[ this.id ] = this.toJSON(); 
			this.bp.Pack(catalog);
			}
		}	

	Unpack( catalog ) {
		this.bp = catalog[this.bp];
		}
						
	AwardXP( xp ) {
		this.xp += xp;
		if 		( this.xp > 1000 ) { this.xplevel = 5; } 
		else if ( this.xp > 800 ) { this.xplevel = 4; } 
		else if ( this.xp > 500 ) { this.xplevel = 3; } 
		else if ( this.xp > 200 ) { this.xplevel = 2; } 
		else if ( this.xp > 100 ) { this.xplevel = 1; } 
		else { this.xplevel = 0; } 
		}
		
	// returns combat log
	Attack( target, modlist = null, enemy_modlist = null ) {
		if ( !target ) { return null; }
		let log = { unit:this, target:target, roll: 0, target_roll: 0, dmg_received: 0, target_dmg: 0, died: false, target_died: false };
		// damage rolls
		let roll1 = Math.ceil( (Math.random() * ( this.bp.maxdmg - this.bp.mindmg )) + this.bp.mindmg );
		let roll2 = Math.ceil( (Math.random() * ( target.bp.maxdmg - target.bp.mindmg )) + target.bp.mindmg );
		// modifiers
		if ( modlist ) { roll1 = modlist.Apply( roll1, 'ground_roll', true ); }
		if ( enemy_modlist ) { roll2 = enemy_modlist.Apply( roll2, 'ground_roll', true ); }
		// record result
		log.roll = Math.round(roll1,2);
		log.target_roll = Math.round(roll2,2);
		// damage
		if ( roll1 > roll2 ) { 
			target.hp--; 
			log.target_dmg++;
			} 
		else if ( roll1 < roll2 ) { 
			this.hp--; 
			log.dmg_received++;
			} 
		else { 
			this.hp--; 
			target.hp--; 
			log.target_dmg++;
			log.dmg_received++;
			} 
		if ( !target.hp ) { log.target_died = true; }
		if ( !this.hp ) { log.died = true; }
		return log;
		}
				
	};


export class GroundUnitBlueprint {
	constructor( data ) {
		// 'fromJSON' style single data bundle 
		if ( data ) { 
			Object.assign( this, data );
			}
		else {		
			this.id = utils.UUID();
			this.name = 'Ground Unit';
			this.mindmg = 0;
			this.maxdmg = 1;		
			this.mass = 0;
			this.cost = { labor:1 };
			this.hp = 1;
			this.img = 'img/ground/tank.png';
			this.num_built = 0;
			// this.bulk_discount = 0; // percentage, for UI only
			}
		}

	toJSON() { 
		let obj = Object.assign( {}, this ); 
		obj._classname = 'GroundUnitBlueprint';
		return obj;
		}
		
	Pack( catalog ) { 
		if ( !( this.id in catalog ) ) { 
			catalog[ this.id ] = this.toJSON(); 
			}
		}	

	Unpack( catalog ) {
		// nothing to unpack
		}
				
	Make() { 
		let s = new GroundUnit( this );
		this.IncNumBuilt();
		return s;
		};
	
	IncNumBuilt() { 
		this.num_built++;
		// TODO: maybe add bulk discount in future
		}
		
	};
