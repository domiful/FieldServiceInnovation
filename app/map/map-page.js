var frameModule = require("tns-core-modules/ui/frame");
const MapPageViewModel = require("./map-page-view-model");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new MapPageViewModel();

}

function onItemTap(args) {
    const view = args.view;
    const page = view.page;
    const tappedItem = view.bindingContext;
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

exports.onItemTap = onItemTap;
exports.onNavigatingTo = onNavigatingTo;
exports.onTap = onTap;
