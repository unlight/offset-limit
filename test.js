var test = require('tape');
var offsetLimit = require('./index');

test('Get page x', function(t) {

	var result = offsetLimit('p1');
	t.equal(result[0], 0);

	var result = offsetLimit('p2');
	t.equal(result[0], 50);

	var result = offsetLimit('p2', 10);
	t.equal(result[0], 10);
	t.equal(result[1], 10);

	t.end();
});


test('Limit where offset is given in the next parameter', function(t) {

	var result = offsetLimit('20', 10);
	t.equal(result[0], 20);
	t.equal(result[1], 10);

	t.end();
});

test('Range viewing records x through y', function(t) {

	var result = offsetLimit('11-20');
	t.equal(result[0], 10);
	t.equal(result[1], 10);

	var result = offsetLimit('1-50');
	t.equal(result[0], 0);
	t.equal(result[1], 50);

	var result = offsetLimit('51-100');
	t.equal(result[0], 50);
	t.equal(result[1], 50);

	t.end();
});


test('Limit/offset pair', function(t) {

	var result = offsetLimit('0lim50');
	t.equal(result[0], 0);
	t.equal(result[1], 50);

	t.end();
});