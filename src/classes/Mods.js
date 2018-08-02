//////////  Value Mods  ////////////
/*
Value Mods ("mods") perform specific mathmatical 
operations on a value supplied as a parameter. Mods
can be collected into a Mod List to perform many 
operations in a chain with a single evaluation call.
Mod Lists themselves can be chained together into a
parent-child relationship for a cascade of operations.

Example: Ships have a Modlist full of Mods that can 
augment the ship's natural stats. A Fleet can also 
have a Modlist that augments all ships in the Fleet.

Usage: 
	let ship = new Ship(...);
	let modlist = Modlist;
	modlist.Add( new Mod('attack', '*', 2, 'Super Power Upgrade', ship) );
	modlist.Add( new Mod('attack', '+', 0.5, 'Laser Amp', ship) );
	let modded_attack_pow = modlist( ship.attack_pow, 'attack' );
	// consider adding adding a fleet, planet, or race parent modlist:
	let parent_list = Modlist;
	modlist.parent = parent_list;
*/

export class Modlist {
	mods = [];
	parent = null;
	
	Add( mod ) {
		this.mods.push(mod);
		this.mods.sort( Modlist.SortMods );
		}
		
	Remove( ability, op, value ) { 
		let k = this.mods.length;
		while ( k-- ) { 
			let m = this.mods[k];
			if ( m.abil == ability && m.val == value && m.op == op ) {
				this.mods.splice( k, 1 );
				// do not break; there may be duplicates
				}
			}
		}
		
	// get a list of mods
	Query( ability, include_parent = true ) { 
		let mods = [];
		// if i have a parent modlist, query it also
		if ( this.parent && include_parent ) { 
			mods = this.parent.Query( ability );
			}
		for ( let m of this.mods ) {
			if ( m.abil == ability ) {
				mods.push(m);
				}
			}
		return mods;
		}
		
	// modify a value by all applicable mods in the list.
	// use_parent: if TRUE, uses builtin this.parent.
	// 	if set to Modlist object, uses that object directly :-)
	Apply( value, ability, use_parent = true ) { 
		// if i have a parent modlist, apply those first
		if ( use_parent instanceof Modlist ) { 
			value = use_parent.Apply( value, ability );
			}
		else if ( use_parent && this.parent ) { 
			value = this.parent.Apply( value, ability );
			}
		for ( let m of this.mods ) {
			if ( m.abil == ability ) {
				value = m.Apply(value);
				}
			}
		return value;
		}
		
	static SortMods( a, b ) {
		let op_order = ['B','^','*','/','+','-','L','H','=']; // first .. last
		let a_op = op_order.indexOf( a.op );
		let b_op = op_order.indexOf( b.op );
		// ability 
		if ( a.abil > b.abil ) { return 1; }
		else if ( a.abil < b.abil ) { return -1; }
		// operator 
		if ( a_op > b_op ) { return 1; }
		else if ( a_op < b_op ) { return -1; }
		// value
		if ( a.val > b.val ) { return 1; }
		else if ( a.val < b.val ) { return -1; }
		return 0;
		}
	
	};

export class Mod { 
	abil = null; // (string) what this mod affects
	label = ''; // (string)
	val = 0; // (number) value to operate on
	op = '='; // (char) operator
	prov = null; // reference to object which is providing this mod (e.g. a technology)
	constructor( ability, op, value, label, provider ) {
		this.abil = ability;
		this.val = parseFloat(value);
		this.op = op;
		this.label = label;
		this.prov = provider;
		}
	Apply( value ) { 
		switch ( this.op ) { 
			case 'H': { return this.val > value ? this.val : value; } // highest of
			case 'L': { return this.val < value ? this.val : value; } // lowest of
			case '^': { return Math.pow( value, this.val ); } // to the power of (i.e. "exponent")
			case '*': { return value * this.val; }
			case '/': { return value / this.val; }
			case '+': { return value + this.val; }
			case '-': { return value - this.val; }
			case '=': { return this.val; } // per se "is" (i.e. "ends with")
			case 'B': { return this.val; } // [B]ase value (i.e. "starts with")
			default: { return value; }
			}
		}
	};
	
