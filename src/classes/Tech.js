
import {WeaponList} from './WeaponList';
import {ZoneList} from './Zones';
import {ShipComponentList} from './ShipComponentList';

export let Techs = {
	
	// STARTING TECHS ---------\/--------------------
	
	BASE: {
		name: "Base Technologies",
		onComplete( civ ) { 
			// zones
			civ.avail_zones.push(ZoneList.HOUSING0A);
			civ.avail_zones.push(ZoneList.MINE0A);
			civ.avail_zones.push(ZoneList.RES0);
			civ.avail_zones.push(ZoneList.ECON0);
			civ.avail_zones.push(ZoneList.SHIP0);
			// starting ship bits:
			civ.avail_ship_comps = [
				ShipComponentList.ENGINE1,
				ShipComponentList.ARMOR1,
				ShipComponentList.SHIELD1,
				ShipComponentList.COLONY1,
				ShipComponentList.RESEARCHLAB1,
				];
			civ.avail_ship_weapons = [
				WeaponList.LASER,
				WeaponList.RAYGUN,
				WeaponList.MISSILE
				];			
			}
		},		
		
	// ZONES ---------\/-----------------------------
	
	ZONE_HOUSING0A: {
		name: ZoneList.HOUSING0A.name,
		desc: ZoneList.HOUSING0A.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.HOUSING0A); }
		},
	ZONE_HOUSING0B: {
		name: ZoneList.HOUSING0B.name,
		desc: ZoneList.HOUSING0B.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.HOUSING0B); }
		},
	ZONE_HOUSING1A: {
		name: ZoneList.HOUSING1A.name,
		desc: ZoneList.HOUSING1A.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.HOUSING1A); }
		},
	ZONE_HOUSING1B: {
		name: ZoneList.HOUSING1B.name,
		desc: ZoneList.HOUSING1B.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.HOUSING1B); }
		},
	ZONE_HOUSING2A: {
		name: ZoneList.HOUSING2A.name,
		desc: ZoneList.HOUSING2A.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.HOUSING2A); }
		},
	ZONE_HOUSING2B: {
		name: ZoneList.HOUSING2B.name,
		desc: ZoneList.HOUSING2B.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.HOUSING2B); }
		},
	ZONE_HOUSING3A: {
		name: ZoneList.HOUSING3A.name,
		desc: ZoneList.HOUSING3A.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.HOUSING3A); }
		},
	ZONE_HOUSING3B: {
		name: ZoneList.HOUSING3B.name,
		desc: ZoneList.HOUSING3B.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.HOUSING3B); }
		},
	ZONE_HOUSING4A: {
		name: ZoneList.HOUSING4A.name,
		desc: ZoneList.HOUSING4A.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.HOUSING4A); }
		},
		
	ZONE_MINE0A: {
		name: ZoneList.MINE0A.name,
		desc: ZoneList.MINE0A.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.MINE0A); }
		},
	ZONE_MINE0B: {
		name: ZoneList.MINE0B.name,
		desc: ZoneList.MINE0B.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.MINE0B); }
		},
	ZONE_MINE0C: {
		name: ZoneList.MINE0C.name,
		desc: ZoneList.MINE0C.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.MINE0C); }
		},
	ZONE_MINE1A: {
		name: ZoneList.MINE1A.name,
		desc: ZoneList.MINE1A.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.MINE1A); }
		},
	ZONE_MINE1B: {
		name: ZoneList.MINE1B.name,
		desc: ZoneList.MINE1B.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.MINE1B); }
		},
	ZONE_MINE1C: {
		name: ZoneList.MINE1C.name,
		desc: ZoneList.MINE1C.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.MINE1C); }
		},
	ZONE_MINE2A: {
		name: ZoneList.MINE2A.name,
		desc: ZoneList.MINE2A.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.MINE2A); }
		},
	ZONE_MINE2B: {
		name: ZoneList.MINE2B.name,
		desc: ZoneList.MINE2B.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.MINE2B); }
		},
	ZONE_MINE2C: {
		name: ZoneList.MINE2C.name,
		desc: ZoneList.MINE2C.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.MINE2C); }
		},
		
	ZONE_RES0: {
		name: ZoneList.RES0.name,
		desc: ZoneList.RES0.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.RES0); }
		},
	ZONE_RES1: {
		name: ZoneList.RES1.name,
		desc: ZoneList.RES1.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.RES1); }
		},
	ZONE_RES2: {
		name: ZoneList.RES2.name,
		desc: ZoneList.RES2.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.RES2); }
		},
	ZONE_RES3: {
		name: ZoneList.RES3.name,
		desc: ZoneList.RES3.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.RES3); }
		},
	
	ZONE_ECON0: {
		name: ZoneList.ECON0.name,
		desc: ZoneList.ECON0.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.ECON0); }
		},
	
	ZONE_SHIP0: {
		name: ZoneList.SHIP0.name,
		desc: ZoneList.SHIP0.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.SHIP0); }
		},
	ZONE_SHIP1: {
		name: ZoneList.SHIP1.name,
		desc: ZoneList.SHIP1.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.SHIP1); }
		},
	ZONE_SHIP2: {
		name: ZoneList.SHIP2.name,
		desc: ZoneList.SHIP2.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.SHIP2); }
		},
	ZONE_SHIP3: {
		name: ZoneList.SHIP3.name,
		desc: ZoneList.SHIP3.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.SHIP3); }
		},
	ZONE_SHIP4: {
		name: ZoneList.SHIP4.name,
		desc: ZoneList.SHIP4.desc,
		onComplete( civ ) { civ.avail_zones.push(ZoneList.SHIP4); }
		},		

	
	
	
	SHIPSPEED1: {
		name: "Warp Booster",
		desc: '<b>+200 Ship Speed</b>. Makes ships go faster.',
		onComplete( civ ) { civ.ship_speed += 75; }
		},
	SHIPSPEED2: {
		name: "Warp Blaster",
		desc: '<b>+300 Ship Speed</b>. Makes ships go way faster.',
		onComplete( civ ) { civ.ship_speed += 100; }
		},
	SHIPSPEED3: {
		name: "HyperBlaster",
		desc: '<b>+400 Ship Speed</b>. Makes ships go screaming fast.',
		onComplete( civ ) { civ.ship_speed += 125; }
		},
		
	SHIPRANGE1: {
		name: "Improved Warp Drive",
		desc: '<b>1000 Ship Range</b>. Basic FTL, or "warp drive", got us into deep space. Now improvements on this basic system will allows us to explore further into space.',
		onComplete( civ ) { civ.ship_range = 1000; civ.RecalcEmpireBox(); }
		},
	SHIPRANGE2: {
		name: "Advanced Warp Drive",
		desc: '<b>1250 Ship Range</b>. Further refinements in warp drive technology have yielded this pinnacle achievement. This is likely as far as we can take warp technology without rethinking FTL entirely.',
		onComplete( civ ) { civ.ship_range = 1250; civ.RecalcEmpireBox(); }
		},
	SHIPRANGE3: {
		name: "Hyperdrive",
		desc: '<b>1750 Ship Range</b>. Hyperdrives work on entirely different principal than Warp Drives, using low areas in hypersapce topology to quickly navigate through normal space.',
		onComplete( civ ) { civ.ship_range = 1750; civ.RecalcEmpireBox(); }
		},
	SHIPRANGE4: {
		name: "Turbo Hyperdrive",
		desc: '<b>2500 Ship Range</b>. This ultra-advanced Hyperdrive uses predictive hyperspace pathfinding to squeeze every bit of efficiency out of hyperspace travel. In a nutshell, it\'s wicked fast.',
		onComplete( civ ) { civ.ship_range = 2500; civ.RecalcEmpireBox(); }
		},
		
	HABITATION1: {
		name: "Improved Habitation",
		desc: '<b>+1 Habitation</b>. Living on alien planets can be difficult and expensive. These new habitation techniques will allow us to colonize even more hostile planets. With further refinements, we can live just about anywhere.',
		onComplete( civ ) { civ.race.env.habitation += 1; } /* TODO: hibitation tech should not affect the civ's race directly */
		},
	HABITATION2: {
		name: "Advanced Habitation",
		desc: '<b>+1 Habitation</b>. Breakthroughs in engineering and materials science has given us the ability to settle on particularly ugly planets. They are ugly now, but someday they will be wonderful.',
		onComplete( civ ) { civ.race.env.habitation += 1; } /* TODO: hibitation tech should not affect the civ's race directly */
		},
	HABITATION3: {
		name: "Superior Habitation",
		desc: '<b>+1 Habitation</b>. Living on alient planets is easy with new pre-fabricated, self-assembling shelters. It\'s still a dismal life, but it\'s one less colony our neighbors will get.',
		onComplete( civ ) { civ.race.env.habitation += 1; } /* TODO: hibitation tech should not affect the civ's race directly */
		},
		
	ADAPTATION1: {
		name: "Basic Terraforming",
		desc: '<b>+1 Adaptation</b>.',
		onComplete( civ ) { civ.race.env.adaptation += 1; } /* TODO: hibitation tech should not affect the civ's race directly */
		},
	ADAPTATION2: {
		name: "Advanced Terraforming",
		desc: '<b>+1 Adaptation</b>.',
		onComplete( civ ) { civ.race.env.adaptation += 1; } /* TODO: hibitation tech should not affect the civ's race directly */
		},
	ADAPTATION3: {
		name: "Superior Terraforming",
		desc: '<b>+1 Adaptation</b>.',
		onComplete( civ ) { civ.race.env.adaptation += 1; } /* TODO: hibitation tech should not affect the civ's race directly */
		},
		
	XENOCOMM1: {
		name: "Xeno Communication Skills",
		desc: '<b>+1 Communication</b>.',
		onComplete( civ ) { 
			civ.diplo.skill += 0.1; 
			for ( let [contact,acct] of civ.diplo.contacts ) {
				const overlap = civ.CommOverlapWith(contact);
				acct.comm = overlap;
				contact.diplo.contacts.get(civ).comm = overlap;
				}
			} 
		},
	XENOCOMM2: {
		name: "Xeno Linguistic Mastery",
		desc: '<b>+1 Communication</b>.',
		onComplete( civ ) { 
			civ.diplo.skill += 0.1; 
			for ( let [contact,acct] of civ.diplo.contacts ) {
				const overlap = civ.CommOverlapWith(contact);
				acct.comm = overlap;
				contact.diplo.contacts.get(civ).comm = overlap;
				}
			} 
		},
	XENOCOMM3: {
		name: "Alien Negotiation Skills",
		desc: '<b>+1 Communication</b>.',
		onComplete( civ ) { 
			civ.diplo.skill += 0.1; 
			for ( let [contact,acct] of civ.diplo.contacts ) {
				const overlap = civ.CommOverlapWith(contact);
				acct.comm = overlap;
				contact.diplo.contacts.get(civ).comm = overlap;
				}
			} 
		}

	};
	
export let TechNodes = {
	
	BASE: {
		rp: 0,
		},
			
		
	// ZONES ---------\/-----------------------------
	
	ZONE_HOUSING0B: {
		rp: 5,
		},
	ZONE_HOUSING1A: {
		rp: 10,
		},
	ZONE_HOUSING1B: {
		rp: 25,
		requires: ['ZONE_HOUSING1A'], 
		},
	ZONE_HOUSING2A: {
		rp: 50,
		requires: ['ZONE_HOUSING1A'], 
		},
	ZONE_HOUSING2B: {
		rp: 100,
		requires: ['ZONE_HOUSING2A'], 
		},
	ZONE_HOUSING3A: {
		rp: 250,
		requires: ['ZONE_HOUSING2A'], 
		},
	ZONE_HOUSING3B: {
		rp: 400,
		requires: ['ZONE_HOUSING3A'], 
		},
	ZONE_HOUSING4A: {
		rp: 800,
		requires: ['ZONE_HOUSING3A'], 
		},
		
	ZONE_MINE0B: {
		rp: 75,
		},
	ZONE_MINE0C: {
		rp: 50,
		},
	ZONE_MINE1A: {
		rp: 200,
		},
	ZONE_MINE1B: {
		rp: 550,
		requires: ['ZONE_MINE1A'], 
		},
	ZONE_MINE1C: {
		rp: 400,
		requires: ['ZONE_MINE1A'], 
		},
	ZONE_MINE2A: {
		rp: 800,
		requires: ['ZONE_MINE1A'], 
		},
	ZONE_MINE2B: {
		rp: 1400,
		requires: ['ZONE_MINE2A'], 
		},
	ZONE_MINE2C: {
		rp: 1000,
		requires: ['ZONE_MINE2A'], 
		},
		
	ZONE_RES1: {
		rp: 40,
		},
	ZONE_RES2: {
		rp: 100,
		requires: ['ZONE_RES1'], 
		},
	ZONE_RES3: {
		rp: 400,
		requires: ['ZONE_RES2'], 
		},
	
	ZONE_SHIP1: {
		rp: 40,
		},
	ZONE_SHIP2: {
		rp: 100,
		requires: ['ZONE_SHIP1'], 
		},
	ZONE_SHIP3: {
		rp: 300,
		requires: ['ZONE_SHIP2'], 
		},
	ZONE_SHIP4: {
		rp: 900,
		requires: ['ZONE_SHIP3'], 
		},
	
					
	// SHIP ENGINES --------------\/-------------
	
	SHIPSPEED1: { 
		rp: 5,
		requires: [], 
		},
	SHIPSPEED2: { 
		rp: 50,
		requires: ['SHIPSPEED1'], 
		},
	SHIPSPEED3: { 
		rp: 100,
		requires: ['SHIPSPEED2','SHIPRANGE3'], 
		},

	SHIPRANGE1: { 
		rp: 4,
		requires: [], 
		},
	SHIPRANGE2: { 
		rp: 40,
		requires: ['SHIPRANGE1'], 
		},
	SHIPRANGE3: { 
		rp: 150,
		requires: ['SHIPRANGE2'], 
		},
	SHIPRANGE4: { 
		rp: 300,
		requires: ['SHIPRANGE3'], 
		},
		
	HABITATION1: { 
		rp: 20,
		requires: [], 
		},
	HABITATION2: { 
		rp: 120,
		requires: ['HABITATION1'], 
		yields: ['HABITATION2'],
		},
	HABITATION3: { 
		rp: 220,
		requires: ['HABITATION2'], 
		},
		
	ADAPTATION1: { 
		rp: 140,
		requires: [], 
		},
	ADAPTATION2: { 
		rp: 480,
		requires: ['ADAPTATION1'], 
		},
	ADAPTATION3: { 
		rp: 900,
		requires: ['ADAPTATION2'], 
		},
		
	XENOCOMM1: { 
		rp: 35,
		requires: [], 
		},
	XENOCOMM2: { 
		rp: 95,
		requires: ['XENOCOMM1'], 
		},
	XENOCOMM3: { 
		rp: 225,
		requires: ['XENOCOMM2'], 
		}

	};
	
//  Sane defaults for missing values
for ( let k in Techs ) { 
	Techs[k].key = k; 
	Techs[k].img = Techs[k].img || 'img/workshop/tech/techmock.jpg';
	Techs[k].icon = Techs[k].icon || 'img/workshop/icons/star.png';
	Techs[k].name = Techs[k].name || 'UNKNOWN';	
	Techs[k].desc = Techs[k].desc || 'Missing Description';	
	}
	
for ( let k in TechNodes ) { 
	TechNodes[k].key = k; 
	TechNodes[k].img = TechNodes[k].img || 'img/workshop/tech/techmock.jpg';
	TechNodes[k].icon = TechNodes[k].icon || 'img/workshop/icons/star.png';
	TechNodes[k].rp = TechNodes[k].rp || 0;	
	TechNodes[k].requires = TechNodes[k].requires || [];
	// if there is no yield, look for a similarly named tech (usually the same anyway)
	if ( !TechNodes[k].yields && Techs.hasOwnProperty(k) ) {
		TechNodes[k].yields = [k];	
		}
	// names and descriptions can fall back to the yielded tech since these are
	// usually the same and only need to be overridden for group techs.
	if ( !TechNodes[k].name ) {
		TechNodes[k].name = Techs[ TechNodes[k].yields[0] ].name;	
		}
	if ( !TechNodes[k].desc ) {
		TechNodes[k].desc = Techs[ TechNodes[k].yields[0] ].desc;	
		}
	}