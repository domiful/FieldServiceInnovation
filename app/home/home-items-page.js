const frameModule = require("tns-core-modules/ui/frame");
const HomeItemsViewModel = require("./home-items-view-model");
const topmost = require("ui/frame").topmost;
const Kinvey = require('kinvey-nativescript-sdk').Kinvey;
const userService = require("~/services/user-service");
const fromObject = require("tns-core-modules/data/observable").fromObject;

const navigationEntry = {
    moduleName: "home/second-page",
    context: { info: "something you want to pass to your page" },
    animated: false
};

function onNavigatingTo(args) {
    const component = args.object;
    const page = args.object;
    const accountsStore = Kinvey.DataStore.collection('accounts', Kinvey.DataStoreType.Network);
    accountsStore.subscribe({
            onMessage: (m) => {
                alert(m);
            },
            onStatus: (s) => {
                // handle status events, which pertain to this collection
            },
            onError: (e) => {
                alert(e);
            }
        })
        .then(() => { /* success */ })
        .catch(e => { /* handle error */ });

    let activeUser = Kinvey.User.getActiveUser();
    console.log(activeUser);
    if (!activeUser) {

        topmost().navigate("login/login-page");
    }
    else {
        //source.set("items", { "name": activeUser });
        component.bindingContext = new HomeItemsViewModel();
    }
}

function onItemTap(args) {
    const view = args.view;
    const page = view.page;
    const tappedItem = view.bindingContext;
    console.log("hey");
    page.frame.navigate({
        moduleName: "home/home-item-detail/home-item-detail-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

function onTap(args) {
    console.log("bFUK");

    const view = args.view;
    const tappedItem = view.bindingContext;
}

function logOut() {
    userService.logout().then(() => {

            topmost().navigate({
                moduleName: "./login/login-page",
                clearHistory: true
            });

        })
        .catch((e) => {

            alert("Unfortunately we could not find your account.");
        });
}

exports.logOut = logOut;
exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
exports.onTap = onTap;
