
import {WeaponList} from './WeaponList';
import {ZoneList} from './Zones';
import {ShipComponentList} from './ShipComponentList';
import {Mod} from './Mods';
import {GroundUnitBlueprint} from './GroundUnit';
import {ShipBlueprint} from './Ship';

export let Techs = {
	
	// STARTING TECHS ---------\/--------------------
	
	BASE: {
		name: "Base Technologies",
		onComplete( civ ) { 
			// zones
			civ.AddAvailZoneType(ZoneList.MINE0A);
			civ.AddAvailZoneType(ZoneList.RES0);
			civ.AddAvailZoneType(ZoneList.ECON0);
			civ.AddAvailZoneType(ZoneList.SHIP0);
			civ.AddAvailZoneType(ZoneList.MIL0); // NOTE: TESTING ONLY
			// starting ship bits:
			civ.avail_ship_comps = [
				ShipComponentList.ENGINE1,
				ShipComponentList.COLONY1,
				ShipComponentList.RESEARCHLAB1,
				];
			civ.avail_ship_weapons = [
				WeaponList.LASER
				];			

			// default ship set
			let colonizer = new ShipBlueprint();
			colonizer.name = 'Colony Ship';
			colonizer.img = 'img/ships/ship003_mock.png';
			colonizer.AddComponent( 'ENGINE1' );
			colonizer.AddComponent( 'RESEARCHLAB1' );
			colonizer.AddComponent( 'COLONY1' );
			civ.ship_blueprints.push(colonizer);
		
			let fighter = new ShipBlueprint();
			fighter.name = 'Fighter';
			fighter.img = 'img/ships/ship002_mock.png';
			fighter.AddComponent( 'ENGINE1' );
			fighter.AddWeapon( 'LASER', 1 );
			fighter.AddComponent( 'ARMOR1' );
			civ.ship_blueprints.push(fighter);
		
			let carrier = new ShipBlueprint();
			carrier.name = 'Troop Carrier'; 
			carrier.img = 'img/ships/ship021_mock.png';
			carrier.AddComponent( 'CARRIER1' );
			carrier.AddComponent( 'ENGINE1' );
			carrier.AddComponent( 'ARMOR1' );
			carrier.AddComponent( 'SHIELD1' );
			civ.ship_blueprints.push(carrier);
				
			// default militia unit
			let troop1 = new GroundUnitBlueprint();
			troop1.name = 'Militia';
			troop1.mindmg = 0;
			troop1.maxdmg = 2;
			troop1.mass = 3
			troop1.img = 'img/icons/svg/spacesuit.svg';
			troop1.cost.labor = 5;
			troop1.hp = 1;
			civ.groundunit_blueprints.push( troop1 );				
			}
		},		
	
	BASE_ORGANIC: {
		name: "Base Organic Technologies",
		onComplete( civ ) {
			civ.AddAvailZoneType(ZoneList.HOUSING_BASE_ORGANIC);
			}
		},		
	BASE_PLANT: {
		name: "Base Plant Technologies",
		onComplete( civ ) { 
			civ.AddAvailZoneType(ZoneList.HOUSING_BASE_PLANT);
			}
		},		
	BASE_SILICATE: {
		name: "Base Silicate Technologies",
		onComplete( civ ) { 
			civ.AddAvailZoneType(ZoneList.HOUSING_BASE_SILICATE);
			civ.AddAvailZoneType(ZoneList.MINE0_OMNIMINER);
			}
		},		
	BASE_ROBOTIC: {
		name: "Base Robotic Technologies",
		onComplete( civ ) { 
			civ.AddAvailZoneType(ZoneList.HOUSING_BASE_ROBOTIC);
			}
		},		
	BASE_CYBERNETIC: {
		name: "Base Cybernetic Technologies",
		onComplete( civ ) { 
			civ.AddAvailZoneType(ZoneList.HOUSING_BASE_CYBERNETIC);
			}
		},		
	BASE_ASTRAL: {
		name: "Base Astral Technologies",
		onComplete( civ ) { 
			civ.AddAvailZoneType(ZoneList.HOUSING_BASE_ASTRAL);
			}
		},		
	BASE_TRANSDIMENSIONAL: {
		name: "Base Transdimensional Technologies",
		onComplete( civ ) { 
			civ.AddAvailZoneType(ZoneList.HOUSING_BASE_TRANSDIMENSIONAL);
			}
		},		

	FLEETSPEED1: {
		name: "Fleet Warp Bubble",
		desc: '<b>+50 Ship Speed</b>. Makes all ships go faster.',
		tags: ['propulsion'],
		onComplete( civ ) { 
			civ.mods.Add( new Mod('mapspeed', '+', 50, this.name) );
			civ.fleets.forEach( f => f.ReevaluateStats() );
			}
		},
	FLEETSPEED2: {
		name: "Fleet Warp Booster",
		desc: '<b>+100 Ship Speed</b>. Makes all ships go even faster.',
		tags: ['propulsion'],
		onComplete( civ ) { 
			civ.mods.Add( new Mod('mapspeed', '+', 100, this.name) );
			civ.fleets.forEach( f => f.ReevaluateStats() );
			}
		},
	FLEETSPEED3: {
		name: "Fleet HyperWarp",
		desc: '<b>+200 Ship Speed</b>. Makes all ships go screaming fast.',
		tags: ['propulsion'],
		onComplete( civ ) { 
			civ.mods.Add( new Mod('mapspeed', '+', 200, this.name) );
			civ.fleets.forEach( f => f.ReevaluateStats() );
			}
		},
	FLEETSPEED4: {
		name: "Fleet MegaWarp",
		desc: '<b>+350 Ship Speed</b>. Makes all ships go like a flying mammal out of the underworld.',
		tags: ['propulsion'],
		onComplete( civ ) { 
			civ.mods.Add( new Mod('mapspeed', '+', 350, this.name) );
			civ.fleets.forEach( f => f.ReevaluateStats() );
			}
		},
		
	TROOPS1: {
		name: "Basic Infantry",
		desc: 'Our first invasion-ready ground forces.',
		tags: ['weapons'],
		onComplete( civ ) { 
			let bp = new GroundUnitBlueprint();
			bp.name = 'Basic Infantry';
			bp.mindmg = 0;
			bp.maxdmg = 5;
			bp.mass = 5;
			bp.cost.labor = 10;
			bp.hp = 1;
			bp.img = 'img/icons/svg/walker.svg';
			civ.groundunit_blueprints.push( bp );
			}
		},
	TROOPS2: {
		name: "Advanced Infantry",
		desc: 'Improved invasion forces handily take on the opposition.',
		tags: ['weapons'],
		onComplete( civ ) { 
			let bp = new GroundUnitBlueprint();
			bp.name = 'Advanced Infantry';
			bp.mindmg = 2;
			bp.maxdmg = 8;
			bp.mass = 8;
			bp.cost.labor = 20;
			bp.hp = 1;
			bp.img = 'img/ground/tank_transp.png';
			civ.groundunit_blueprints.push( bp );
			}
		},
	TROOPS3: {
		name: "Battleoids",
		desc: 'Massive hybrid war machines capable of handling entire battles by themselves.',
		tags: ['weapons'],
		onComplete( civ ) { 
			let bp = new GroundUnitBlueprint();
			bp.name = 'Battleoids';
			bp.mindmg = 4;
			bp.maxdmg = 12;
			bp.mass = 30;
			bp.cost.labor = 50;
			bp.hp = 2;
			bp.img = 'img/icons/svg/robot.svg';
			civ.groundunit_blueprints.push( bp );
			}
		},
	TROOPS4: {
		name: "Droid Army",
		desc: 'An overwhelming flood of robotic militants to do your dirty work.',
		tags: ['weapons'],
		onComplete( civ ) { 
			let bp = new GroundUnitBlueprint();
			bp.name = 'Droid Army';
			bp.mindmg = 8;
			bp.maxdmg = 20;
			bp.mass = 80;
			bp.cost.labor = 100;
			bp.hp = 3;
			bp.img = 'img/icons/svg/mech.svg';
			civ.groundunit_blueprints.push( bp );
			}
		},
		
	HULL1: {
		name: "Starship Engineering 1",
		desc: '<b>Allows B-Class starships</b>.',
		tags: ['engineering'],
		onComplete( civ ) { civ.max_hull_size = 100; }
		},
	HULL2: {
		name: "Starship Engineering 2",
		desc: '<b>Allows C-Class starships</b>.',
		tags: ['engineering'],
		onComplete( civ ) { civ.max_hull_size = 200; }
		},
	HULL3: {
		name: "Starship Engineering 3",
		desc: '<b>Allows D-Class starships</b>.',
		tags: ['engineering'],
		onComplete( civ ) { civ.max_hull_size = 400; }
		},
	HULL4: {
		name: "Starship Engineering 4",
		desc: '<b>Allows E-Class starships</b>.',
		tags: ['engineering'],
		onComplete( civ ) { civ.max_hull_size = 800; }
		},
	HULL5: {
		name: "Starship Engineering 5",
		desc: '<b>Allows F-Class starships</b>.',
		tags: ['engineering'],
		onComplete( civ ) { civ.max_hull_size = 1200; }
		},
	HULL6: {
		name: "Starship Engineering 6",
		desc: '<b>Allows G-Class starships</b>.',
		tags: ['engineering'],
		onComplete( civ ) { civ.max_hull_size = 2000; }
		},
	HULL7: {
		name: "Starship Engineering 7",
		desc: '<b>Allows H-Class starships</b>.',
		tags: ['engineering'],
		onComplete( civ ) { civ.max_hull_size = 3000; }
		},
		
	VIS1: {
		name: "Hyperspace Observation",
		desc: 'Allows us to view hyperspace objects on the map and see predictive paths of enemy fleets.',
		tags: ['physics'],
		onComplete( civ ) { civ.vis_level = Math.max( 1, civ.vis_level ); }
		},
	VIS2: {
		name: "Subspace Observation",
		desc: 'Allows us to view subspace objects on the map and see predictive paths of enemy fleets.',
		tags: ['physics'],
		onComplete( civ ) { civ.vis_level = Math.max( 1, civ.vis_level ); }
		},
		
	SHIPRANGE1: {
		name: "Improved Warp Drive",
		desc: '<b>1000 Ship Range</b>. Basic FTL, or "warp drive", got us into deep space. Now improvements on this basic system will allows us to explore further into space.',
		tags: ['propulsion'],
		onComplete( civ ) { civ.ship_range += 250; civ.RecalcEmpireBox(); }
		},
	SHIPRANGE2: {
		name: "Advanced Warp Drive",
		desc: '<b>1250 Ship Range</b>. Further refinements in warp drive technology have yielded this pinnacle achievement. This is likely as far as we can take warp technology without rethinking FTL entirely.',
		tags: ['propulsion'],
		onComplete( civ ) { civ.ship_range += 250; civ.RecalcEmpireBox(); }
		},
	SHIPRANGE3: {
		name: "Hyperdrive",
		desc: '<b>1750 Ship Range</b>. Hyperdrives work on entirely different principal than Warp Drives, using low areas in hypersapce topology to quickly navigate through normal space.',
		tags: ['propulsion'],
		onComplete( civ ) { civ.ship_range += 500; civ.RecalcEmpireBox(); }
		},
	SHIPRANGE4: {
		name: "Turbo Hyperdrive",
		desc: '<b>2500 Ship Range</b>. This ultra-advanced Hyperdrive uses predictive hyperspace pathfinding to squeeze every bit of efficiency out of hyperspace travel. In a nutshell, it\'s wicked fast.',
		tags: ['propulsion'],
		onComplete( civ ) { civ.ship_range += 750; civ.RecalcEmpireBox(); }
		},
	SHIPRANGE5: {
		name: "Ultimate Drive",
		desc: '<b>3500 Ship Range</b>. It just works.',
		tags: ['propulsion'],
		onComplete( civ ) { civ.ship_range += 2000; civ.RecalcEmpireBox(); }
		},
		
	ADAPTATION1: {
		name: "Basic Terraforming",
		desc: '<b>+1 Adaptation</b>.',
		tags: ['biology'],
		onComplete( civ ) { 
			civ.mods.Add( new Mod('adaptation', '+', 1, this.name, 'technology' ) );
			// civ.race.env.adaptation = civ.mods.Apply( 1, 'adaptation' );
			}
		},
	ADAPTATION2: {
		name: "Advanced Terraforming",
		desc: '<b>+2 Adaptation</b>.',
		tags: ['biology'],
		onComplete( civ ) { 
			civ.mods.Add( new Mod('adaptation', '+', 2, this.name, 'technology' ) );
			// civ.race.env.adaptation = civ.mods.Apply( 1, 'adaptation' );
			}		},
	ADAPTATION3: {
		name: "Superior Terraforming",
		desc: '<b>+3 Adaptation</b>.',
		tags: ['biology'],
		onComplete( civ ) { 
			civ.mods.Add( new Mod('adaptation', '+', 3, this.name, 'technology' ) );
			// civ.race.env.adaptation = civ.mods.Apply( 1, 'adaptation' );
			}		},
	ADAPTATION4: {
		name: "Ultra Terraforming",
		desc: '<b>+3 Adaptation</b>.',
		tags: ['biology'],
		onComplete( civ ) { 
			civ.mods.Add( new Mod('adaptation', '+', 3, this.name, 'technology' ) );
			// civ.race.env.adaptation = civ.mods.Apply( 1, 'adaptation' );
			}		},
	ADAPTATION5: {
		name: "Perfect Terraforming",
		desc: '<b>+6 Adaptation</b>.',
		tags: ['biology'],
		onComplete( civ ) { 
			civ.mods.Add( new Mod('adaptation', '+', 6, this.name, 'technology' ) );
			// civ.race.env.adaptation = civ.mods.Apply( 1, 'adaptation' );
			}		
		},
	ADAPTATION_SILICATE: {
		name: "Silicate Subterraneanism",
		desc: '<b>+1 Adaptation</b>.',
		tags: ['biology'],
		untradeable: true,
		onComplete( civ ) { 
			// civ.race.mods.RemoveMatching( 'adaptation', '=' );
			civ.mods.Add( new Mod('adaptation', '=', 2, this.name, 'technology' ) );
			// civ.race.env.adaptation = civ.mods.Apply( 1, 'adaptation' );
			}		
		},
		
	XENOCOMM1: {
		name: "Xeno Communication Skills",
		desc: '<b>+1 Communication Skills</b>.',
		tags: ['socialogy'],
		onComplete( civ ) {
			// civ.mods.Add( new Mod('diplo_skill', '+', 0.1, this.name, 'technology' ) );
			// civ.diplo.skill = civ.mods.Apply( 0, 'diplo_skill' );
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
		desc: '<b>+1 Communication Skills</b>.',
		tags: ['socialogy'],
		onComplete( civ ) { 
			// civ.mods.Add( new Mod('diplo_skill', '+', 0.1, this.name, 'technology' ) );
			// civ.diplo.skill = civ.mods.Apply( 0, 'diplo_skill' );
			civ.diplo.skill += 0.1;
			for ( let [contact,acct] of civ.diplo.contacts ) {
				const overlap = civ.CommOverlapWith(contact);
				acct.comm = overlap;
				contact.diplo.contacts.get(civ).comm = overlap;
				}
			} 
		},
	XENOCOMM3: {
		name: "Universal Communications",
		desc: '<b>Communicate with any civilization.</b>.',
		tags: ['socialogy'],
		onComplete( civ ) { 
			// civ.mods.Add( new Mod('diplo_skill', '=', 1, this.name, 'technology' ) );
			// civ.diplo.skill = civ.mods.Apply( 0, 'diplo_skill' );
			civ.diplo.skill = 1;
			for ( let [contact,acct] of civ.diplo.contacts ) {
				const overlap = civ.CommOverlapWith(contact);
				acct.comm = overlap;
				contact.diplo.contacts.get(civ).comm = overlap;
				}
			} 
		}

	};
	
// bulk generate the weapon techs
for ( let k of Object.keys(WeaponList) ) { 
	Techs[k] = {
		name: WeaponList[k].name,
		desc: WeaponList[k].desc,
		tags: ['weapons'],
		onComplete( civ ) { civ.avail_ship_weapons.push( WeaponList[k] ); }
		};
	}
	
// bulk generate the ship components
for ( let k of Object.keys(ShipComponentList) ) { 
	Techs[k] = {
		name: ShipComponentList[k].name,
		desc: ShipComponentList[k].desc,
		tags: ['engineering'], // TODO differentiate
		onComplete( civ ) { civ.avail_ship_comps.push( ShipComponentList[k] ); }
		};
	}
	
// bulk generate zones
for ( let k of Object.keys(ZoneList) ) { 
	Techs['ZONE_' + k] = {
		name: ZoneList[k].name,
		desc: ZoneList[k].desc,
		tags: [ZoneList[k].type],
		onComplete( civ ) { civ.AddAvailZoneType(ZoneList[k]); }
		};
	}
	
export let TechNodes = {
	
	BASE: {
		rp: 0,
		hidden: true, // dont display in UI
		},
	BASE_ORGANIC: {
		rp: -1, // prevents it from autoloading for everyone. require manual assignment
		hidden: true, // dont display in UI
		},
	BASE_PLANT: {
		rp: -1,
		hidden: true,
		},
	BASE_ROBOTIC: {
		rp: -1,
		hidden: true,
		},
	BASE_CYBERNETIC: {
		rp: -1,
		hidden: true,
		},
	BASE_SILICATE: {
		rp: -1,
		hidden: true,
		},
	BASE_ASTRAL: {
		rp: -1,
		hidden: true,
		},
	BASE_TRANSDIMENSIONAL: {
		rp: -1,
		hidden: true,
		},
			
		
	// ZONES ---------\/-----------------------------
	
	ZONE_HOUSING0B: {
		rp: 300,
		},
	ZONE_HOUSING1A: {
		rp: 900,
		requires: ['ZONE_HOUSING0B','MINE1A'], 
		},
	ZONE_HOUSING2A: {
		rp: 2000,
		requires: ['ZONE_HOUSING1A','MINE2A'], 
		},		

	ZONE_MINE1A: {
		rp: 200,
		},
	ZONE_MINE2A: {
		rp: 800,
		requires: ['ZONE_MINE1A'], 
		},
		
	ZONE_RES1: {
		rp: 500,
		requires: ['ZONE_MINE1A'],
		},
	ZONE_RES2: {
		rp: 1400,
		requires: ['ZONE_RES1','ZONE_MINE2A'], 
		},
	
	ZONE_SHIP1: {
		rp: 600,
		requires: ['ZONE_MINE1A'],
		},
	ZONE_SHIP2: {
		rp: 1600,
		requires: ['ZONE_SHIP1','ZONE_MINE2A'], 
		},

	ZONE_MIL1: {
		rp: 1300,
		requires: ['ZONE_MINE2A'],
		},
			
	// SHIP ENGINES --------------\/-------------
	
	FLEETSPEED1: { 
		rp: 50,
		requires: [], 
		},
	FLEETSPEED2: { 
		rp: 300,
		requires: ['FLEETSPEED1'], 
		},
	FLEETSPEED3: { 
		rp: 1000,
		requires: ['FLEETSPEED2','SHIPRANGE3'], 
		},
	FLEETSPEED4: { 
		rp: 2000,
		requires: ['FLEETSPEED3','SHIPRANGE3'], 
		},

	SHIPRANGE1: { 
		rp: 40,
		requires: [], 
		},
	SHIPRANGE2: { 
		rp: 400,
		requires: ['SHIPRANGE1'], 
		},
	SHIPRANGE3: { 
		rp: 1050,
		requires: ['SHIPRANGE2'], 
		},
	SHIPRANGE4: { 
		rp: 2300,
		requires: ['SHIPRANGE3'], 
		},
	SHIPRANGE5: { 
		rp: 6000,
		requires: ['SHIPRANGE4'], 
		},
		
	HULL1: { 
		rp: 15,
		requires: [], 
		},
	HULL2: { 
		rp: 60,
		requires: ['HULL1'], 
		},
	HULL3: { 
		rp: 150,
		requires: ['HULL2'], 
		},
	HULL4: { 
		rp: 400,
		requires: ['HULL3'], 
		},
	HULL5: { 
		rp: 1600,
		requires: ['HULL4'], 
		},
	HULL6: { 
		rp: 6000,
		requires: ['HULL5'], 
		},
	HULL7: { 
		rp: 20000,
		requires: ['HULL6'], 
		},
		
	ADAPTATION1: { 
		rp: 30,
		requires: [], 
		},
	ADAPTATION2: { 
		rp: 210,
		requires: ['ADAPTATION1'], 
		},
	ADAPTATION3: { 
		rp: 600,
		requires: ['ADAPTATION2'], 
		},
	ADAPTATION4: { 
		rp: 2400,
		requires: ['ADAPTATION3'], 
		},
	ADAPTATION5: { 
		rp: 9500,
		requires: ['ADAPTATION4'], 
		},
	ADAPTATION_SILICATE: { 
		rp: 650,
		requires: ['BASE_SILICATE'], 
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
		},

	// SHIP COMPONENTS - these are temporary techs until we come up with something more thematic
	SHIPPARTS1: {
		name: 'Spaceship Parts 1',
		desc: 'Entry-level spaceship bits.' ,
		rp: 80,
		yields: ['ENGINE2','ARMOR1','SHIELD1','THRUSTERS1','TARGETTING1'],
		requires: []
		},
	SHIPPARTS2: {
		name: 'Spaceship Parts 2',
		desc: 'Improved spaceship bits.' ,
		rp: 300,
		yields: ['ENGINE3','ARMOR2','SHIELD2','THRUSTERS2','CLOAK1','TARGETTING2'],
		requires: ['SHIPPARTS1']
		},
	SHIPPARTS3: {
		name: 'Spaceship Parts 3',
		desc: 'Advanced spaceship bits.' ,
		rp: 900,
		yields: ['ARMOR3','SHIELD3','THRUSTERS3'],
		requires: ['SHIPPARTS2']
		},
	SHIPPARTS4: {
		name: 'Spaceship Parts 4',
		desc: 'Superior spaceship bits.' ,
		rp: 2600,
		yields: ['THRUSTERS4','CLOAK2','TARGETTING3'],
		requires: ['SHIPPARTS3']
		},
	SHIPPARTS5: {
		name: 'Spaceship Parts 5',
		desc: 'Ultimate spaceship bits.' ,
		rp: 4800,
		yields: ['THRUSTERS5','CLOAK3'],
		requires: ['SHIPPARTS4']
		},

	// WEAPONS - these are temporary techs until we come up with something more thematic
	WEAPONS1: {
		name: 'Space Weapons 1',
		desc: 'Entry-level space weapons.' ,
		rp: 50,
		yields: ['LIGHTNINGSTRIKER','TURBOLASER','SPACECANNON','BUCKSHOT','MISSILE'],
		requires: []
		},
	WEAPONS2: {
		name: 'Space Weapons 2',
		desc: 'Improved space weapons.' ,
		rp: 200,
		yields: ['NUCLEARMISSILE','RAILGUN','PULSECANNON'],
		requires: ['WEAPONS1']
		},
	WEAPONS3: {
		name: 'Space Weapons 3',
		desc: 'Advanced space weapons.' ,
		rp: 600,
		yields: ['GRAVITONBEAM','NEUTRONIUMGUN','FUSIONMISSILE'],
		requires: ['WEAPONS2']
		},
	WEAPONS4: {
		name: 'Space Weapons 4',
		desc: 'Superior space weapons.' ,
		rp: 2000,
		yields: ['DISINTEGRATER','ANTIMATTERCANNON','VORTEXTORPEDO'],
		requires: ['WEAPONS3']
		},
	WEAPONS5: {
		name: 'Space Weapons 5',
		desc: 'Ultimate space weapons.' ,
		rp: 6000,
		yields: ['DESYNCHRONIZER','KUGELBLITZER','BLACKHOLETORPEDO'],
		requires: ['WEAPONS4']
		},
		
	VIS1: {
		rp: 400,
		requires: []
		},
	VIS2: {
		rp: 2500,
		requires: ['VIS1']
		},

	// WEAPONS - these are temporary techs until we come up with something more thematic
	TROOPS1: {
		rp: 300,
		// requires: []
		},
	TROOPS2: {
		rp: 600,
		requires: ['TROOPS1']
		},
	TROOPS3: {
		rp: 1800,
		requires: ['TROOPS2']
		},
	TROOPS4: {
		rp: 3500,
		requires: ['TROOPS3']
		},
	
	};
	
//  Sane defaults for missing values
for ( let k in Techs ) { 
	Techs[k].key = k; 
	Techs[k].img = Techs[k].img || 'img/workshop/tech/techmock.jpg';
	Techs[k].icon = Techs[k].icon || 'img/workshop/icons/star.png';
	Techs[k].name = Techs[k].name || 'UNKNOWN';	
	Techs[k].desc = Techs[k].desc || 'Missing Description';	
	Techs[k].tags = Techs[k].tags || [];	
	}
	
for ( let k in TechNodes ) { 
	TechNodes[k].key = k; 
	TechNodes[k].img = TechNodes[k].img || 'img/workshop/tech/techmock.jpg';
	TechNodes[k].icon = TechNodes[k].icon || 'img/workshop/icons/star.png';
	TechNodes[k].rp = TechNodes[k].rp || 0;	
	TechNodes[k].requires = TechNodes[k].requires || [];
	TechNodes[k].tags = TechNodes[k].tags || [];
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
	// merge tags from all provided techs
	for ( let y of TechNodes[k].yields ) { 
		TechNodes[k].tags.push( ...Techs[y].tags );
		}
	TechNodes[k].tags = TechNodes[k].tags.unique();
	}