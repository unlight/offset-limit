'use strict';

function offsetLimit(offsetOrPage, limitOrSize, throwException) {
	offsetOrPage = String(offsetOrPage);
	if (limitOrSize === undefined) limitOrSize = 50;
	if (throwException === undefined) throwException = true;
	var matches;
	var page, offset, limit;
	if (matches = offsetOrPage.match(/^\d+$/)) {
		offset = +offsetOrPage;
		limit = limitOrSize;
	} else if (matches = offsetOrPage.match(/^p(\d+)$/i)) {
		page = matches[1];
		offset = limitOrSize * (page - 1);
		limit = limitOrSize;
	} else if (matches = offsetOrPage.match(/^(\d+)-(\d+)$/)) {
		offset = +matches[1] - 1;
		limit = +matches[2] - matches[1] + 1;
	} else if (matches = offsetOrPage.match(/^(\d+)lim(\d*)$/i)) {
		offset = +matches[1];
		limit = +matches[2];
		if (!limit) {
			limit = limitOrSize;
		}
	} else if (matches = offsetOrPage.match(/^(\d+)lin(\d*)$/i)) {
		offset = matches[1] - 1;
		limit = +matches[2];
		if (!limit) {
			limit = limitOrSize;
		}
	} else if (offsetOrPage && throwException) {
		throw new TypeError('Some unrecognized page string was passed.');
	} else {
		offset = 0;
		limit = limitOrSize;
	}
	if (offset < 0) {
		offset = 0;
	}
	if (limit < 0) {
		limit = 50;
	}
	return [offset, limit];
}

module.exports = offsetLimit;