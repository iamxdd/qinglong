var mBaseUrl = "http://192.168.1.249:91/api/gw/";
//var rBaseUrl = "http://192.168.1.249:91/res/gw/";
var getNewUrl = function(_string) {
	return mBaseUrl + "api/" + _string + "/api/";
};
var retNewUrl = function(_string) {
	return rBaseUrl + "res/" + _string + "/";
};
var apiAdds3 = getNewUrl("information");
var apiAddsd = getNewUrl("advertisement");
var apiAddsg = getNewUrl("construction");
var apiAdds4 = getNewUrl("point");
var apiAdds6 = getNewUrl("member");
var apiAddsi = getNewUrl("newpoint");