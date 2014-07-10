var deps = require('./../deps');
var config = require('./../config');
var __ = deps.underscore;
var rootpath = config.path.rootpath;
var datastore = deps.database;

var heroes = new datastore({filename: rootpath + '/server/database/heroes.db', autoload: true});

heroes.remove({side: 'radiant'}, {multi: true}, function(err, removed)
{
	
});

heroes.remove({side: 'dire'}, {multi: true}, function(err, removed)
{
	
});

var dataHeroes = [

	{
		name: "Admiral",
		otherName: 'Daelin Proudmoore',
		side: "radiant",
		attr: "str",
		baseStr: 24,
		baseAgi: 14,
		baseInt: 18,
		growStr: 3,
		growAgi: 1.3,
		growInt: 1.5,
		baseDamage: 55,
		baseArmor:1.96
	},

	{
		name: "Beastmaster",
		otherName: 'Rexxar',
		side: "radiant",
		attr: "str",
		baseStr: 23,
		baseAgi: 18,
		baseInt: 16,
		growStr: 2.2,
		growAgi: 1.6,
		growInt: 1.9,
		baseDamage: 58,
		baseArmor:4.52
	},

	{
		name: "Centaur",
		otherName: 'Bradwarden',
		side: "radiant",
		attr: "str",
		baseStr: 23,
		baseAgi: 15,
		baseInt: 15,
		growStr: 3.8,
		growAgi: 2,
		growInt: 1.6,
		baseDamage: 56,
		baseArmor:3.1
	},

	{
		name: "Earthshaker",
		otherName: 'Raigor Stonehoof',
		side: "radiant",
		attr: "str",
		baseStr: 22,
		baseAgi: 12,
		baseInt: 16,
		growStr: 2.9,
		growAgi: 1.2,
		growInt: 1.6,
		baseDamage: 51,
		baseArmor:2.68
	},

	{
		name: "Omniknight",
		otherName: 'Purist Thunderwrath',
		side: "radiant",
		attr: "str",
		baseStr: 33,
		baseAgi: 33,
		baseInt: 33,
		growStr: 33,
		growAgi: 33,
		growInt: 33,
		baseDamage: 33,
		baseArmor:33
	},
	
]

__.each(dataHeroes, function(value, key)
{
	heroes.insert(value, function(err, insertedData)
	{
		if(err)
		{
			console.log(err);
		}
	})
})