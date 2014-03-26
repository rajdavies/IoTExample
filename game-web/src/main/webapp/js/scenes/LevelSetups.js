(function() {
	window.breakout = window.breakout || {};

	var r = 'red';
	var b = 'blue';
	var o = 'orange';
	var g = 'green';
	var X = null;

	breakout.LevelSetups = [

		{
			name: 'swirl',
			bricks: [
				[r,g,o,b,r,g,o],
				[b,X,X,X,X,X,X],
				[o,X,o,b,r,g,o],
				[g,X,g,X,X,X,b],
				[r,X,r,X,r,X,r],
				[b,X,b,o,g,X,g],
				[o,X,X,X,X,X,o],
				[g,r,b,o,g,r,b]
			],
			powerUps: 2,
			powerDowns: 3
		}
	];
})();



