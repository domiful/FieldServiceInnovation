const dialogs = require("tns-core-modules/ui/dialogs");

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
    dialogs.alert("Request Sent!").then(function () {
        console.log("Dialog closed!");
    });
}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;
exports.onRequestTap = onRequestTap;
