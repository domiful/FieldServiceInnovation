const observable = require("data/observable");
const pageData = new observable.Observable();
const dialogs = require("tns-core-modules/ui/dialogs");
const nativescript_locate_address_1 = require("nativescript-locate-address");
// phone dialer
const platform_1 = require("platform");
const TNSPhone = require("nativescript-phone");
const permissions = require("nativescript-permissions");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;

// email plugin
var LocateAddress = require("nativescript-locate-address").LocateAddress;

const email = require("nativescript-email");

function onNavigatingTo(args) {
    const page = args.object;
    // instantiate the plugin
    var locator = new LocateAddress();

    locator.available().then(
        function (avail) {
            console.log(avail ? "Yes" : "No");
        }
    );
    //console.log(args);
    pageData.set("showAbove", true);
    pageData.set("showDP", false);
    pageData.set("cal", page.navigationContext);
    pageData.set("status", 1);
    //console.log(pageData.cal);
    args.object.bindingContext = pageData;

}

function onBackButtonTap(args) {
    const view = args.object;
    const page = view.page;

    page.frame.goBack();
}

function showDrawpad(args) {
    pageData.set("showAbove", !pageData.get("showAbove"));

    pageData.set("showDP", !pageData.get("showDP"));
}

function onSignTap(args) {
    dialogs.alert("Signed!").then(function () {
        console.log("Dialog closed!");
    });
    pageData.set("status", 0);
    pageData.set("showAbove", !pageData.get("showAbove"));

    pageData.set("showDP", !pageData.get("showDP"));
}

function onAckTap(args) {
    dialogs.alert("Marked Acknowledged!").then(function () {
        console.log("Marked Acknowledged!");
    });

    setTimeout(function () { pageData.set("status", 2); }, 2000);
    /*
    const dataStore = Kinvey.DataStore.collection("Appointments");

    const subscription = dataStore.findById(pageData.cal.data["_id"])
        .subscribe((ent) =>
            console.log(ent.status);
            //ent.status = 2;
            dataStore.save(
                ent
            )
            .then(function (entity) {
                // console.log(entity);
            })
            .catch(function (error) {
                console.log(`${error}`);
            }); dataStore.push();

        },
        (error) => {
            console.log(error);
        },
        () => {
            console.log('pulled accounts');
        });
*/
    // pageData.set("showAbove", !pageData.get("showAbove"));

    //pageData.set("showDP", !pageData.get("showDP"));
}

function onCancel(args) {
    pageData.set("showAbove", !pageData.get("showAbove"));

    pageData.set("showDP", !pageData.get("showDP"));
}

function onTapAddress(args) {
    var page = args.object;
    var task = page.bindingContext.cal.data;
    var addr = task.address + ", " + task.city + ", " + task.state + ", " + task.zip;
    //console.log("Address is " + addr);
    var locator = new nativescript_locate_address_1.LocateAddress();
    locator.locate({
        address: addr,
    }).then(function () {
        //console.log("Maps app launched.");
    }, function (error) {
        console.log(error);
    });
}
exports.onTapAddress = onTapAddress;
// get object, extract phone and call phone dialer for the device
function call(args) {
    var page = args.object;
    var task = page.bindingContext.cal.data;
    var phnum = task.cell;
    //console.log("Ready to dial " + phnum);
    if (platform_1.isAndroid) {
        permissions.requestPermission(android.Manifest.permission.CALL_PHONE, "App Needs This Permission To Make Phone Calls")
            .then(function () {
                TNSPhone.dial(String(phnum), false);
            })
            .catch(function () {
                console.log("Permission Denied!");
            });
    }
    else {
        TNSPhone.dial(String(phnum), false);
    }
}
exports.call = call;
// get object, extract email address and initiate email send
function mailTo(args) {
    var page = args.object;
    var task = page.bindingContext.cal.data;
    var addr = task.address1;
    var msg;
    msg = "Hello, this is your Technician.  I would like to talk to you about scheduling your appointment";
    if (email.available()) {
        email.compose({
            subject: "Message from Technician",
            to: addr,
            body: msg
        }).then(function (result) {}).catch(function (error) { return console.error(error); });
    }
}
exports.mailTo = mailTo;

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;
exports.onSignTap = onSignTap;
exports.onCancel = onCancel;
exports.showDrawpad = showDrawpad;
exports.onAckTap = onAckTap;
