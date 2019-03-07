const observable = require("data/observable");
const pageData = new observable.Observable();

function onNavigatingTo(args) {
    pageData.set("showAbove", true);
    pageData.set("showDP", false);
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
    pageData.set("showAbove", !pageData.get("showAbove"));

    pageData.set("showDP", !pageData.get("showDP"));
}

function onCancel(args) {
    pageData.set("showAbove", !pageData.get("showAbove"));

    pageData.set("showDP", !pageData.get("showDP"));
}

exports.onNavigatingTo = onNavigatingTo;
exports.onBackButtonTap = onBackButtonTap;
exports.onSignTap = onSignTap;
exports.onCancel = onCancel;
exports.showDrawpad = showDrawpad;
