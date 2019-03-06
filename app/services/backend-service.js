const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const kinveyAppKey = "kid_SJOST_NHV";
const kinveyAppSecret = "0660252a25a046148553de8914ac0468";
const kinveyUsername = "admin";
const kinveyPassword = "admin";

exports.setup = function () {
    Kinvey.init({
        appKey: kinveyAppKey,
        appSecret: kinveyAppSecret
    });
};
