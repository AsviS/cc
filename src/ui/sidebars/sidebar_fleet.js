import Fleet from '../../classes/Fleet';
import {bindable} from 'aurelia-framework';
import * as Signals from '../../util/signals';

export class FleetDetailPane {
	mode = 'fleet'; // 'fleet' for display only, 'awaiting_star_click' to be able to move fleet with rightclick.
	can_colonize = false;
	can_send = false;
	can_bomb = false;
	can_research = false;
	can_invade = false;
	can_pickup_troops = false;
	mission_turns = 10;
	selected_planet = null; // used for UI interaction
	starclick_subsc = null;
	@bindable fleet = null;
	app = null;

	trooplist = []; // temporary array when in troop-transfer UI
	
	activate(data) {
		this.app = data.app;
		this.fleet = data.obj;
		// manually trigger our binding function because
		// this element is normally built through <compose>
		this.fleetChanged( this.fleet, null );
		// listen for hotkeys
		window.addEventListener('keypress', this.keypressCallback, false);
		// listen for star clicks from the map
		this.starclick_subsc = Signals.Listen('starclick', 
			data => { if ( data.event.which > 1 ) { this.StarClickCallback(data.star) } }
			);
		}
		
	unbind() { 	
		// stop listening for starclicks
		this.starclick_subsc.dispose();
		// stop listening for hotkeys
		window.removeEventListener('keypress', this.keypressCallback);
		}
				
	constructor() { 
		this.keypressCallback = (e) => this.KeyPress(e);
		};
		
	CaptureStarClicks() { 
		this.mode = 'awaiting_star_click';
		}
	StopCaptureStarClicks() { 
		}
		
	// aurelia automatic function called when fleet object gets changed
	fleetChanged( new_fleet, old_fleet ) {
		if ( new_fleet instanceof Fleet ) { 
			new_fleet.SetOnUpdate( () => this.UpdateStats() );
			this.SelectAll(); 
			this.UpdateStats();
			}
		if ( old_fleet instanceof Fleet ) { 
			old_fleet.SetOnUpdate(null);
			}
		// assume we start in move-fleet mode to save clicks, unless we are en route
		if ( this.fleet.dest && !this.fleet.star ) {
			this.mode = 'fleet';
			}
		else {
			this.CaptureStarClicks();
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
	UpdateStats() { 
		// fleet will have killme flag if it needs to be treated as deleted
		if ( this.fleet.merged_with instanceof Fleet ) { 
			this.app.SwitchSideBar( this.fleet.merged_with );
			}
		else if ( this.fleet.killme == true ) { 
			this.mode = 'fleet';
			this.app.CloseSideBar();
			}
		else {
			this.Recalc();
			// TODO: speed, strength, etc
			}
		}
	SelectShip(ship) {
		ship.selected = !ship.selected;
		this.Recalc();
		}
	GetHealthClass(ship) {
		let pct = ship.hull / ship.bp.hull;
		if ( pct >= 0.7 ) { return 'h'; }
		else if ( pct >= 0.35 ) { return 'm'; }
		else { return 'l'; }
		}
	SelectAll() { 
		for ( let ship of this.fleet.ships ) { 
			ship.selected = true;
			}
		this.Recalc();
		}
	SelectNone() { 
		for ( let ship of this.fleet.ships ) { 
			ship.selected = false;
			}
		this.Recalc();
		}
	SelectInvert() { 
		for ( let ship of this.fleet.ships ) { 
			ship.selected = ship.selected ? false : true;
			}
		this.Recalc();
		}
	GetFirstColonyShip() {
		// we want either the first colony ship that is selected
		// or the first colony ship if there or no selections at all.
		let selected = null;
		let first = null;
		if ( this.fleet && this.fleet.ships.length ) { 
			for ( let ship of this.fleet.ships ) { 
				if ( ship.bp.colonize ) { 
					if ( !first ) { first = ship; }
					if ( ship.selected && !selected ) { selected = ship; }
					}
				if ( selected && first ) { break; } 
				}
			}
		return selected || first;
		}
	ChoosePlanetToColonize( p ) { 
		let ship = this.GetFirstColonyShip();
		if ( ship ) { 
			p.Settle( this.app.game.MyCiv() );
			// [!]OPTIMIZE: we only need to do this:
			// - if we dont already have a planet in this system
			// - only for our own civ, not all of them
// 			this.app.RecalcCivContactRange();
// 			this.app.RecalcStarRanges();
			
			this.fleet.RemoveShip( ship );
			if ( !this.fleet.ships.length ) { 
				this.fleet.Kill();
				}
			else {
				this.fleet.FireOnUpdate();
				}
			this.mode = 'fleet';
			this.app.CloseSideBar();
			this.app.SwitchMainPanel('colonize',p);
			}
		//
		// TODO: destroy all refs to the ship
		//
		}
	Recalc() { 
		// for each stat, distinguish between ability of the
		// fleet as a whole (1) or the specific selection (2)
		// or no ability at all (0)
		this.num_selected = 0;
		this.can_colonize = false;
		this.can_bomb = false;
		this.can_invade = false;
		this.can_research = this.fleet.star ? 0 : false; // is parked
		this.can_send = this.fleet.star ? 1 : false; // is parked
		this.can_pickup_troops = false;
		this.can_drop_troops = false;
		// some abilities depend on what we might be parked over.
		// mark abilites with ===0 as a signal to look further
		if ( this.fleet.star && 'planets' in this.fleet.star && this.fleet.star.planets.length ) {
			for ( let p of this.fleet.star.planets ) { 
				if ( p.owner === false && p.Habitable( this.fleet.owner.race ) ) { 
					this.can_colonize = 0; 
					}
				else if ( !p.owner.is_player ) { 
					this.can_bomb = 0; 
					this.can_invade = 0; 
					}
				else if ( p.owner.is_player ) {
					this.can_drop_troops = 0;
					if ( p.troops.length ) { 
						this.can_pickup_troops = 0; 
						}
					}
				}
			}
		// scan each ship to make a per-ship determination
		for ( let s of this.fleet.ships ) { 
			if ( this.can_send !== false && this.can_send < 2 ) 				{ 
				this.can_send = Math.max( this.can_send, (s.selected ? 2 : 1) ); 
				}
			if ( this.can_colonize !== false && this.can_colonize < 2 && s.bp.colonize )	{ 
				this.can_colonize = Math.max( this.can_colonize, (s.selected ? 2 : 1) ); 
				}
			if ( this.can_bomb !== false && this.can_bomb < 2 && s.bp.bomb_pow )		{ 
				this.can_bomb = Math.max( this.can_bomb, (s.selected ? 2 : 1) ); 
				}
			if ( this.can_research !== false && this.can_research < 2 && s.bp.research )	{ 
				this.can_research = Math.max( this.can_research, (s.selected ? 2 : 1) ); 
				}
			if ( this.can_invade !== false && this.can_invade < 2 && s.troops.length )		{ 
				this.can_invade = Math.max( this.can_invade, (s.selected ? 2 : 1) ); 
				}
			if ( this.can_drop_troops !== false && this.can_drop_troops < 2 && s.troops.length )		{ 
				this.can_drop_troops = Math.max( this.can_drop_troops, (s.selected ? 2 : 1) ); 
				}
			if ( s.selected ) { this.num_selected++; }
			}
		// finally, see if we have room for troops as a whole
		this.can_pickup_troops = 
			this.can_pickup_troops === 0 
			&& (this.fleet.troops < this.fleet.troopcap) 
			? true : false;
		}
	AnomalyResearch() { 
		if ( this.fleet.star && !this.fleet.dest && this.fleet.star.objtype == 'anom' ) { 
			return this.fleet.star.AmountResearched( this.fleet.owner ) / this.fleet.star.size;
			}
		return 0;
		}
	ClickColonize() {
		if ( this.can_colonize==2 ) { 
			this.StopCaptureStarClicks();
			this.mode = 'colonize';
			}
		}
	ClickChooseMission() {
		if ( this.can_research==2 ) { 
			this.mission_turns = 10;
			this.StopCaptureStarClicks();
			this.mode = 'mission';
			}
		}
	ClickStartMission() {
		if ( this.mode == 'mission' ) { 
			// if we are sending all ships, just move the entire fleet.
			// otherwise we have to split the fleet.
			let total_ships = this.fleet.ships.length;
			let ships_leaving = [];
			for ( let i=total_ships-1; i >= 0; i-- ) {
				if ( this.fleet.ships[i].selected ) { 
					//this.fleet.ships[i].selected = false;
					// tech note: using unshift instead of push maintains order
					ships_leaving.unshift( this.fleet.ships.splice( i, 1 )[0] );
					}
				}
			if ( ships_leaving.length ) { 
				// send the entire fleet
				if ( ships_leaving.length == total_ships ) { 
					this.fleet.ships = ships_leaving;
					this.app.SwitchSideBar( this.fleet.star );
					this.fleet.SendOnMission( this.app.game.galaxy, this.mission_turns );
					}
				// send a splinter fleet
				else {
					let f = new Fleet( this.fleet.owner, this.fleet.star );
					f.ships = ships_leaving;
					f.ReevaluateStats();
					this.app.SwitchSideBar( this.fleet.star );
					f.SendOnMission( this.app.game.galaxy, this.mission_turns );
					}
				this.Recalc();
				}
			this.fleet.FireOnUpdate();
			}
		// dont revert to move-fleet mode. we're done moving this fleet.
		this.mode = 'fleet'; 
		this.StopCaptureStarClicks();
		this.app.CloseSideBar();
		}
	ClickClose() {
		this.StopCaptureStarClicks();
		this.app.CloseSideBar();
		}
	ClickAttack() {
		if ( this.fleet.fp && this.fleet.star && this.fleet.star.fleets.length > 1 ) {
			this.mode = "attack";
			}
		}
	// for clicking attack target from player fleet
	SelectAttackTarget( target ) {
		// TODO: check if we have treaties, etc. in the future
		this.app.game.QueueShipCombat( this.fleet, target, null /* TODO:planet*/ );
		this.app.game.PresentNextPlayerShipCombat();
		}
	ClickCancelChooseAttackTarget() {
		this.mode = 'awaiting_star_click';
		}
	// for clicking attack fleet from star with a local player fleet
	AttackTargetWithLocalFleet() { 
		if ( !this.fleet || !this.fleet.star ) { return false; } 
		// TODO: check if we have treaties, etc. in the future
		// find my local fleet
		let myfleet = null;
		for ( let f of this.fleet.star.fleets ) { 
			if ( f.owner.is_player ) {
				myfleet = f; 
				break;
				}
			}
		if ( !myfleet ) { return false; } 
		this.app.game.QueueShipCombat( myfleet, this.fleet, null /* TODO:planet*/ );
		this.app.game.PresentNextPlayerShipCombat();
		}
	ClickCancel() {
		// revert to move-fleet mode
		this.CaptureStarClicks();
		}
	ClickScrap() {
		// first check if there is anything to scrap
		if ( this.num_selected ) {
			// TODO
			}
		// tell them nothing to scrap
		else {
			// TODO
			}
		}
	ClickInvade() {
		if ( this.can_invade ) { 
		
			}
		}
	// closes the troop transfer subscreen
	ClickAcceptTroopTransfer() { 
		this.mode = 'awaiting_star_click';
		}
	// switches into troop transfer mode
	ClickTransferTroops() {
		if ( this.can_pickup_troops || this.can_drop_troops ) { 
			this.trooplist = this.fleet.ListGroundUnits();
			// automatically select the first friendly planet as a move target,
			// and deselect all other friendly planets
			for ( let p of this.fleet.star.planets ) { 
				if ( p.owner.is_player ) { 
					this.selected_planet = p;
					}
				}
			this.mode = 'troopswap';
			}
		}
	// selects a planet
	ClickPlanetForTroops(target) {
		this.selected_planet = target;
		}
	// moves a specific troop
	ClickTroop( troop, objfrom ) { 
		// if `objfrom` is our fleet, move to planet, no size restrictions.
		if ( objfrom == this.fleet ) { 
			// remove unit from ship it rides on.
			for ( let s of this.fleet.ships ) { 
				let i = s.troops.indexOf(troop);
				if ( i >= 0 ) { 
					s.troops.splice(i,1);
					break;
					}
				}
			// remove from UI troop list
			let i = this.trooplist.indexOf(troop);
			if ( i >= 0 ) { this.trooplist.splice(i,1); }
			// move to selected planet
			this.selected_planet.troops.push(troop);
			}
		// if the objfrom is a planet, move into fleet, check capacity first
		else { 
			if ( this.fleet.troopcap > this.fleet.troops ) { 
				// find a ship that can hold this unit
				for ( let s of this.fleet.ships ) { 
					if ( s.bp.troopcap > s.troops.length ) { 
						s.troops.push( troop );
						// remove from planet
						let i = objfrom.troops.indexOf(troop);
						if ( i >= 0 ) { objfrom.troops.splice(i,1); }
						// add to UI troop list
						this.trooplist.push(troop);
						break;
						}
					}
				}
			}
		this.fleet.ReevaluateStats();
		}
	// dumps all troops from a planet into the fleet
	TransferTroopsFromPlanet() {
		while ( this.selected_planet.troops.length && this.fleet.troopcap > this.fleet.troops ) { 
			let t = this.selected_planet.troops[0];
			// find a ship that can hold this unit
			for ( let s of this.fleet.ships ) {
				if ( s.bp.troopcap > s.troops.length ) { 
					s.troops.push( t );
					// remove from planet
					this.selected_planet.troops.shift();
					// add to UI troop list
					this.trooplist.push(t);
					this.fleet.ReevaluateStats();
					}
				}
			}
		}
	// dumps all troops from a fleet onto a planet
	TransferTroopsToPlanet() {
		for ( let s of this.fleet.ships ) {
			if ( s.troops.length ) { 
				while ( s.troops.length ) { 
					this.selected_planet.troops.push(
						s.troops.pop()
						);
					}
				}
			}
		this.trooplist.splice(0,this.trooplist.length);
		this.fleet.ReevaluateStats();
		}
	StarClickCallback( star ) { 
		if ( this.mode == 'awaiting_star_click' && this.can_send==2 ) { 
			// dont let fleet route to the planet its parked at
			if ( !( star == this.fleet.star && !this.fleet.dest ) ) { 
			
				//
				// TODO: check for range
				//
				
				// if we are sending all ships, just move the entire fleet.
				// otherwise we have to split the fleet.
				let total_ships = this.fleet.ships.length;
				let ships_leaving = [];
				for ( let i=total_ships-1; i >= 0; i-- ) {
					if ( this.fleet.ships[i].selected ) { 
						//this.fleet.ships[i].selected = false;
						// tech note: using unshift instead of push maintains order
						ships_leaving.unshift( this.fleet.ships.splice( i, 1 )[0] );
						}
					}
				if ( ships_leaving.length ) { 
					// send the entire fleet
					if ( ships_leaving.length == total_ships ) { 
						this.fleet.ships = ships_leaving;
						this.fleet.SetDest( star );
						this.app.SwitchSideBar( this.fleet );
						}
					// send a splinter fleet
					else {
						let f = new Fleet( this.fleet.owner, this.fleet.star );
						f.ships = ships_leaving;
						f.SetDest( star );
						f.ReevaluateStats();
						this.app.SwitchSideBar( f );
						}
					this.Recalc();
					}
				this.fleet.FireOnUpdate();
				}
			}
// 		this.mode = 'fleet';
		}
		
	KeyPress( event ) { 
		switch ( event.keyCode || event.which ) { 
			case 27: { // escape
				this.app.CloseSideBar();
				event.preventDefault(); return false;
				}
			case 105: { // I
				this.SelectInvert();
				event.preventDefault(); return false;
				}
			case 97: { // A
				this.SelectAll();
				event.preventDefault(); return false;
				}
			case 110: { // N
				this.SelectNone();
				event.preventDefault(); return false;
				}
// 			default: { console.log(`${event.which} was pressed`); }
			}
		}
	}
