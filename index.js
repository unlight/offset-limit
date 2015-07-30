"use strict";

function offsetLimit(offsetOrPage, limitOrPageSize, throw) {
	limitOrPageSize = is_numeric(limitOrPageSize) ? (int) limitOrPageSize : 50;
	if (is_numeric(offsetOrPage)) {
		Offset = (int) offsetOrPage;
		Limit = limitOrPageSize;
	}
	elseif(preg_match('/p(\d+)/i', offsetOrPage, Matches)) {
		Page = Matches[1];
		Offset = limitOrPageSize * (Page - 1);
		Limit = limitOrPageSize;
	}
	elseif(preg_match('/(\d+)-(\d+)/', offsetOrPage, Matches)) {
		Offset = Matches[1] - 1;
		Limit = Matches[2] - Matches[1] + 1;
	}
	elseif(preg_match('/(\d+)lim(\d*)/i', offsetOrPage, Matches)) {
		Offset = (int) Matches[1];
		Limit = (int) Matches[2];
		if (!is_numeric(Limit)) {
			Limit = limitOrPageSize;
		}
	}
	elseif(preg_match('/(\d+)lin(\d*)/i', offsetOrPage, Matches)) {
		Offset = Matches[1] - 1;
		Limit = (int) Matches[2];
		if (!is_numeric(Limit)) {
			Limit = limitOrPageSize;
		}
	}
	elseif(offsetOrPage &&
		throw) {
		// Some unrecognized page string was passed.
		throw NotFoundException();
	} else {
		Offset = 0;
		Limit = limitOrPageSize;
	}
	if (Offset < 0) {
		Offset = 0;
	}
	if (Limit < 0) {
		Limit = 50;
	}
	return array(Offset, Limit);
}

module.exports = offsetLimit;