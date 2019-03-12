const dialogs = require("tns-core-modules/ui/dialogs");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const nativescript_locate_address_1 = require("nativescript-locate-address");

function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = args.context;
}

function onBackButtonTap(args) {
    const view = args.object;
    const page = view.page;

    page.frame.goBack();
}

function onRequestTap(args) {
    dialogs.confirm({
        title: "Address Found",
        message: "Nearest Address: 8104 n academy blvd, colorado springs, co 80920",
        okButtonText: "Take Me There",
        cancelButtonText: "Maybe Later",
    }).then(function (result) {
        //console.lo
        if (result) {
            var locator = new nativescript_locate_address_1.LocateAddress();
            locator.locate({
                address: "8104 n academy blvd, colorado springs, co 80920",
            }).then(function () {
                //console.log("Maps app launched.");
            }, function (error) {
                console.log(error);
            });
        }
        console.log("Dialog result: " + result);
    });

    setTimeout(function () {
        Kinvey.CustomEndpoint.execute('SendPushNotification', {
                type: "Infor Notification",
                msg: "A closer store location has been found."
            })
            .then(function (response) {
                // ...
            })
            .catch(function (error) {
                // ...
            });
    }, 15000);

}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;
exports.onRequestTap = onRequestTap;
