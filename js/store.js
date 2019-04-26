/**
* @export
* @nocollapse
*/
class Store {
	
	/**
	* @export
	* @method set: set storage field value
	* @param field: data field
	* @param value: data value
	*/
	static set(field, value) {
		window.localStorage.setItem(field, value);
	}
	
	/**
	* @export
	* @method get: get storage field value
	* @param field: data field
	*/
	static get(field) {
		if(this.has(field)) return window.localStorage.getItem(field);
		return null;
	}
	
	/**
	* @export
	* @method has: check storage field key exists
	* @param field: data field
	*/
	static has(field) {
		return window.localStorage.getItem(field) !== null;
	}
	
	/**
	* @export
	* @method destroy: destroy storage field
	* @param field: data field
	*/
	static destroy(field) {
		if(this.has(field)) window.localStorage.removeItem(field);
	}
	
	/**
	* @export
	* @method clear: clear all storage
	*/
	static clear() {
		window.localStorage.clear();
	}
	
}

class Session {
	
	/**
	* @export
	* @method set: set session field value
	* @param field: data field
	* @param value: data value
	*/
	static set(field, value) {
		window.sessionStorage.setItem(field, value);
	}
	
	/**
	* @export
	* @method get: get session field value
	* @param field: data field
	*/
	static get(field) {
		if(this.has(field)) return window.sessionStorage.getItem(field);
		return null;
	}
	
	/**
	* @export
	* @method has: check session field key exists
	* @param field: data field
	*/
	static has(field) {
		return window.sessionStorage.getItem(field) !== null;
	}
	
	/**
	* @export
	* @method destroy: destroy session field
	* @param field: data field
	*/
	static destroy(field) {
		if(this.has(field)) window.sessionStorage.removeItem(field);
	}
	
	/**
	* @export
	* @method clear: clear all session
	*/
	static clear() {
		window.sessionStorage.clear();
	}
	
}

class Cook {
	
	/**
	* @export
	* @method set: set cookie field value
	* @param field: data field
	* @param value: data value
	* @param expires: expire date (hours) / default 24h
	*/
	static set(field, value, expires) {
		if(expires) expires = new Date(Date.now() + expires * 60 * 60 * 1000);
		else expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
		document.cookie = field + "=" + value + "; expires=" + expires.toGMTString() + "; path=" + location.host + "; SameSite=strict";// + "; HttpOnly" ;
		return value;
	}
	
	/**
	* @export
	* @method get: get cookie field value
	* @param field: data field
	*/
	static get(field) {
		if(this.has(field)) return new RegExp(field + "=([^;]+)").exec(document.cookie)[1];
		return null;
	}
	
	/**
	* @export
	* @method has: check cookie field key exists
	* @param field: data field
	*/
	static has(field) {
		return new RegExp(field + "=([^;]+)").test(document.cookie);
	}
	
	/**
	* @export
	* @method destroy: destroy cookie field
	* @param field: data field
	*/
	static destroy(field) {
		if(this.has(field)) return this.set(field, "", -1);
		return false;
	}
	
	/**
	* @export
	* @method clear: clear all cookies
	*/
	static clear() {
		
	}
	
}