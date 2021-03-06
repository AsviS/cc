import Anom from './Anom';
import Star from './Star';
import Planet from './Planet';
import Civ from './Civ';
import Fleet from './Fleet';
import * as utils from '../util/utils';
import {Ship,ShipBlueprint} from './Ship';
import {App} from '../app';

export default class Galaxy {
	id = null;
	fleets = []; // maps to Fleet.all_fleets
	stars = [];
	civs = [];
	historical_civs = []; // for graphs
	anoms = [];
	width = 2000;
	height = 2000;
	age = 0.5;
	bg_img = 'img/map/bg/spacebg_031.jpg';
	
	stats = {
		x: 0,
		y: 0,
		sectors: 0,
		density: 0,
		stars: 0,
		planets: 0,
		anoms: 0,
		age: 0,
		crazy: 0
		};
		
	constructor( data ) { 
		this.id = utils.UUID();
		if ( data ) { Object.assign( this, data ); }
		this.fleets = Fleet.all_fleets;
		}
		
	toJSON() { 
		return {
			_classname: 'Galaxy',
			stats: this.stats,
			id: this.id,
			height: this.height,
			width: this.width,
			age: this.age,
			bg_img: this.bg_img,
			stars: this.stars.map( x => x.id ),
			anoms: this.anoms.map( x => x.id ),
			civs: this.civs.map( x => x.id ),
			// dont need to save fleets list
			};
		}
		
	Pack( catalog ) { 
		catalog[ this.id ] = this.toJSON();
		for ( let x of this.stars ) { x.Pack(catalog); }
		for ( let x of this.anoms ) { x.Pack(catalog); }
		for ( let x of this.civs ) { x.Pack(catalog); }
		} 	
		
	Unpack( catalog ) {
		this.stars = this.stars.map( x => catalog[x] );
		this.civs = this.civs.map( x => catalog[x] );
		this.anoms = this.anoms.map( x => catalog[x] );
		}
						
	// size is in number of sectors, 
	// where sector is 400px and max one star per sector
	// strategy can be [attraction,shuffle,heightmap,random]
	Make( sectors, density, galaxy_age = 0.5, crazy = 0, strategy = 'heightmap' ) {
		
		const sectors_requested = sectors;
		const cell_size = 400;
		const min_edge = 4;
		
		if ( strategy == 'random' ) {
			strategy = ['attraction','shuffle','heightmap'].pickRandom();
			}
		
		// reset data
		this.stars = [];
		this.anoms = [];
		
		// random background wallpaper
		this.bg_img = 'img/map/bg/spacebg_' + ("000" + utils.RandomInt(0,75)).slice(-3) + '.jpg';
		
		// sane limits
		sectors = Math.min( 10000, Math.max( 16, sectors ) );
		
		// take sqrt of the number of sectors for the ideal square edge
		let map_size_x = Math.ceil( Math.sqrt( sectors ) * 2 );
		let map_size_y = Math.ceil( utils.BiasedRand(min_edge, (map_size_x-min_edge), (map_size_x*0.5), (1.0-crazy)  ) );
		map_size_x -= map_size_y;
		// actual square should always be bigger than requested number of sectors
		while ( map_size_x * map_size_y < sectors_requested ) { ++map_size_y; }
		sectors = Math.ceil( map_size_x * map_size_y ); // finalize
		// make sure we always have horizontal galaxies
		if ( map_size_x < map_size_y ) {
			[map_size_x,map_size_y] = [map_size_y,map_size_x];
			}			
		
		// for aesthetics and UI reasons, 
		// we want an empty padded border.
		this.width = ((map_size_x+2) * cell_size) + 1 + cell_size; // leave room for sidebar
		this.height = ((map_size_y+2) * cell_size) + 1; // +1 is to get the sector overlay graphic border
		this.age = galaxy_age;
		
		// represent the galaxy as an array of bools, 
		// where the 1D array is the flattened version of a 2D array of sectors.
		// We assign the first X slots to be a star ("true")
		let stars_wanted = Math.ceil( sectors * Math.max( 0.05, density ) );
		if ( sectors < stars_wanted ) { stars_wanted = sectors; }
		let remainder = sectors - stars_wanted;
		// anomalies cover 50% of un-starred space or 30% of stars, 
		// whichever is less.
		let num_anoms = Math.min( Math.floor( remainder * 0.5 ), Math.floor( stars_wanted * 0.3) );
		remainder -= num_anoms;
		let arr = [];
		
		// this is where the shape of the galaxy is determined. 
		if ( strategy == 'heightmap' ) { 
				
			// random attractors
			let num_attractors = 3 + 10 * crazy; // need at least 3 for interesting results	
			let attractors = [];
			for ( let a=0; a < num_attractors ; a++ ) { 
				let attractor = { 
					x: utils.RandomInt( 2, map_size_x-2 ), 
					y: utils.RandomInt( 2, map_size_y-2 ), 
					s: utils.BiasedRandInt( 
						(( map_size_x + map_size_y ) * -1),
						// 0,
						(( map_size_x + map_size_y ) * 2 ),
						// (( map_size_x + map_size_y ) ),
						0,
						0.5
						)
					}; 
				attractors.push( attractor );			
				}
			
			// make a list of points with associated "height" value
			let points = [];
			for ( let x = 0; x < map_size_x; x++ ) { 
				for ( let y = 0; y < map_size_y; y++ ) { 
					let h = Math.random() * 6 - 3; // random wobble
					for ( let attractor of attractors ) { 
						let dx = Math.abs( x - attractor.x ); 
						let dy = Math.abs( y - attractor.y );
						let dist = Math.sqrt( dx*dx + dy*dy );
						let force = attractor.s / Math.pow(dist,1.1);
						h += force;
						}
					h /= attractors.length;
					points.push({x,y,h});
					}
				}
			// sort all of the points by height and populate the galaxy
			points.sort( (a,b) => a.h - b.h );			
			let num_blanks = Math.min( remainder, stars_wanted * 0.1 ); // shooting blanks makes it less dense
			let things_to_place = [];
			for ( let i=0; i < stars_wanted; i++ ) { things_to_place.push(1); }
			for ( let i=0; i < num_anoms; i++ ) { things_to_place.push(2); }
			for ( let i=0; i < num_blanks; i++ ) { things_to_place.push(0); }
			things_to_place.shuffle();
			for ( let i=0; i < things_to_place.length; i++ ) {
				let p = points.pop();
				let index = p.x * map_size_y + p.y;
				arr[index] = things_to_place[i];
				}
					
			// random scattering
			for ( let i = 0; i < sectors*0.14; i++ ) {
				let one = utils.RandomInt( 0, sectors-1 );
				let two = utils.RandomInt( 0, sectors-1 );
				let temp = arr[two];
				arr[two] = arr[one];
				arr[one] = temp;
				}
			}
		
		// this is where the shape of the galaxy is determined. 
		else if ( strategy == 'attraction' ) { 
				
			arr = new Array(sectors);
			let avail_indexes = new Array(sectors);
			for ( let i=0; i < sectors; i++  ) { avail_indexes[i] = i; }
			avail_indexes.shuffle();
			
			let num_attractors = 1 + 10 * crazy;	
			let attractors = [];
			for ( let a=0; a < num_attractors ; a++ ) { 
				let attractor = { 
					x: utils.RandomInt( 2, map_size_x-2 ), 
					y: utils.RandomInt( 2, map_size_y-2 ), 
					s: utils.BiasedRandInt( 
						(( map_size_x + map_size_y ) * -1),
						// 0,
						(( map_size_x + map_size_y ) * 2 ),
						// (( map_size_x + map_size_y ) ),
						0,
						0.5
						)
					}; 
				attractors.push( attractor );			
				}
			
			// returns next open spot in a spiral
			let NextInSpiral = function ( px, py ) {
				var x = 0;
				var y = 0;
				var delta = [0, -1];
				for ( let i = Math.pow(Math.max(map_size_x, map_size_y), 2); i>0; i--) {
					if ( px+x > 0 && px+x < map_size_x && py+y > 0 && py+y < map_size_y ) {
						let index = (px+x)*map_size_y + (py+y);
						if ( !arr[index] ) { return index; }
						}
					// change direction
					if ( x === y || (x < 0 && x === -y) || (x > 0 && x === 1-y) ){
						delta = [-delta[1], delta[0]];
						}
					x += delta[0];
					y += delta[1];        
					}	
				return 0;		
				}
				
			let PlaceGalacticObject = function ( objtype = 1 ) {
				// random starting point
				let px = utils.RandomInt(0,map_size_x);
				let py = utils.RandomInt(0,map_size_y);
				// attract point
				let vectors = [];
				for ( let attractor of attractors ) { 
					let dx = Math.abs( px - attractor.x ); 
					let dy = Math.abs( py - attractor.y );
					let dist = Math.sqrt( dx*dx + dy*dy );
					let force = attractor.s / Math.pow(dist,1.1);
					let new_dist = Math.max( dist - force, 0 );
					let dist_ratio = new_dist / dist;
					vectors.push( [
						( attractor.x - px ) * (1-dist_ratio),
						( attractor.y - py ) * (1-dist_ratio)
						] );
					}
				
				// add vectors
				let baricenter = [0,0];
				for ( let v of vectors ) {
					baricenter[0] += v[0];
					baricenter[1] += v[1];
					}	
				let new_x = utils.Clamp( Math.floor( baricenter[0] + px ), 0, map_size_x-1 );
				let new_y = utils.Clamp( Math.floor( baricenter[1] + py ), 0, map_size_y-1 );
				
				// if point is taken, find something nearby
				let index = new_x*map_size_y + new_y;
				if ( arr[index] ) {
					index = NextInSpiral( new_x, new_y );
					}
				// gotcha
				if ( !arr[index] ) {
					arr[index] = objtype;
					let i = avail_indexes.indexOf( index );
					if ( i >= 0 ) { avail_indexes.splice(i,0); }
					}
				// backup plan: just pick a random spot
				else {
					arr[ avail_indexes.pop() ] = objtype;
					}
				}
			
			for ( let i=0; i < stars_wanted; i++ ) { PlaceGalacticObject(1); }
			for ( let i=0; i < num_anoms; i++ ) { PlaceGalacticObject(2); }
			
			// random scattering
			for ( let i = 0; i < sectors*0.1; i++ ) {
				let one = utils.RandomInt( 0, sectors-1 );
				let two = utils.RandomInt( 0, sectors-1 );
				let temp = arr[two];
				arr[two] = arr[one];
				arr[one] = temp;
				}
			}

		// this produces a random view of a 2 different julia sets,
		// and then averages them together. Using two gives a better chance of getting something
		// that isn't just a giant blob. We place stars OUTSIDE of the julia set, which means
		// that the we get natural holes INSIDE the julia set. 
		else if ( strategy == 'julia' ) { 
				
			let r1 = Math.random()*2 - 1;
			let im1 = Math.random()*2 - 1;
			let r2 = Math.random()*2 - 1;
			let im2 = Math.random()*2 - 1;
			
			function remap( x, t1, t2, s1, s2 ) {
				var f = ( x - t1 ) / ( t2 - t1 ),
					g = f * ( s2 - s1 ) + s1;
				return g;
			}
			
			function julia2( x, y, w, h, r, im ) {
				let maxrounds = 25;
				let minX = -1, maxX = 1;
				let minY = -1, maxY = 1;
				var a, as, za, b, bs, zb, cnt;
				a = remap( x, 0, w, minX, maxX )
				b = remap( y, 0, h, minY, maxY )
				cnt = 0;
				while ( ++cnt < maxrounds ) {
					za = a * a; zb = b * b;
					if ( za + zb > 4 ) break;
					as = za - zb; 
					bs = 2 * a * b;
					a = as + r; 
					b = bs + im;
				}
				if ( cnt < maxrounds ) { return cnt; }
				return 0;
			}
						
			// make a list of points with associated "height" value
			let points = [];
			for ( let x = 0; x < map_size_x; x++ ) { 
				for ( let y = 0; y < map_size_y; y++ ) { 
					let h = (julia2( x, y, map_size_x, map_size_y, r1, im1 ) 
						+ julia2( y, x, map_size_y, map_size_x, r2, im2 )) / 2;
					// if it comes back zero, give it the tiniest random wobble to prevent "caking"
					if ( !h ) { h = Math.random() * 0.1 - 0.05; }
					points.push({x,y,h});
					}
				}
				
			// sort all of the points by height and populate the galaxy
			points.sort( (a,b) => a.h - b.h );			
			let num_blanks = Math.min( remainder, stars_wanted * 0.1 ); // shooting blanks makes it less dense
			let things_to_place = [];
			for ( let i=0; i < stars_wanted; i++ ) { things_to_place.push(1); }
			for ( let i=0; i < num_anoms; i++ ) { things_to_place.push(2); }
			for ( let i=0; i < num_blanks; i++ ) { things_to_place.push(0); }
			things_to_place.shuffle();
			for ( let i=0; i < things_to_place.length; i++ ) {
				let p = points.pop();
				let index = p.x * map_size_y + p.y;
				arr[index] = things_to_place[i];
				}
					
			// random scattering
			for ( let i = 0; i < sectors*0.14; i++ ) {
				let one = utils.RandomInt( 0, sectors-1 );
				let two = utils.RandomInt( 0, sectors-1 );
				let temp = arr[two];
				arr[two] = arr[one];
				arr[one] = temp;
				}
			}
			
		else /*if ( strategy == 'shuffle' )*/ { 
			arr = new Array( stars_wanted ).fill(1).concat( // stars
				new Array( num_anoms ).fill(2).concat( // anomalies
					new Array( remainder ).fill(0) // empty space
					)
				) ;
			arr.shuffle();
			}
				
 		// loop over the array and create map objects
		let jitter = 135; // values 100..150 work well
		for ( let x = 0; x < map_size_x; x++ ) { 
			for ( let y = 0; y < map_size_y; y++ ) { 
				let cell = arr[ x*map_size_y + y ];
				if ( cell==1 ) {
					this.stars.push( Star.Random( 
						((x+1)*cell_size) + (cell_size*0.5) + Math.floor((Math.random() * jitter * 2) - jitter), 
						((y+1)*cell_size) + (cell_size*0.5) + Math.floor((Math.random() * jitter * 2) - jitter),  
						galaxy_age 
						) );					
					}
				else if ( cell==2 ) {
					this.anoms.push( Anom.Random( 
						((x+1)*cell_size) + (cell_size*0.5) + Math.floor((Math.random() * jitter * 2) - jitter), 
						((y+1)*cell_size) + (cell_size*0.5) + Math.floor((Math.random() * jitter * 2) - jitter)
						) );					
					}
				}
			}
			
		this.stats.x = map_size_x;
		this.stats.y = map_size_y;
		this.stats.sectors = sectors;
		this.stats.density = density;
		this.stats.stars = this.stars.length;
		this.stats.anoms = this.anoms.length;
		this.stats.age = galaxy_age;
		this.stats.crazy = crazy;
		this.stats.planets = 0;
		for ( let s of this.stars ) { this.stats.planets += s.planets.length; }
		}
				
	ForcePlanetEnvToMatchRace( p, civ ) { 
		p.atm = civ.race.env.atm;
		p.temp = civ.race.env.temp;
		p.grav = civ.race.env.grav;
		}
		
	AddStandardSetup( num_civs=1 ) {
		this.MakeCivs( num_civs );
		// settle some planets
		let star_i = this.stars.length;
		this.stars.shuffle();
		for ( let c of this.civs ) { 
			while ( --star_i >= 0 ) { 
				let s = this.stars[star_i];
				if ( s.planets.length ) { 
					let p = s.planets[0];
					this.ForcePlanetEnvToMatchRace( p, c );
					p.resources.o = 3;
					p.resources.s = 3;
					p.resources.m = 3;
					p.size = 20;
					p.Settle( c );
					p.total_pop = 10;
					if ( c.is_player ) { s.explored = true; }
					else { p.ZonePlanet(); }
					this.AssignStartingFleet( c, s );
					c.homeworld = p;
					break;
					}
				}
			}
		// no homeworld, no shoes, no service
		this.civs = this.civs.filter( c => c.homeworld );
		return this.civs[0].homeworld.star;
		}	
		
	MakeCivs( num_civs, difficulty ) {
		this.civs = [];
		// the first civ needs to use player's settings
		let player = new Civ( { type: App.instance.options.setup.racetype } );
		this.civs.push( player );
		// races are loaded by the main app from config/races.json
		let race_list = App.instance.configs.races.slice().shuffle();
		for ( let i=0; i < num_civs-1; i++ ) {
			let civ = new Civ( race_list.pop() );
			this.civs.push( civ );
			}
		this.historical_civs = [...this.civs];
		}
		
	AssignStartingFleet( owner, star ) { 
		let f = new Fleet( owner, star );
		f.ships = [
			new Ship( owner.ship_blueprints[0] ),
			new Ship( owner.ship_blueprints[1] ),
			new Ship( owner.ship_blueprints[1] ),
			];
		f.ReevaluateStats();
		f.SortShips();
		return f;
		}
		
	}
