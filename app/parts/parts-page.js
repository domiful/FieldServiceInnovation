const PartsViewModel = require("./parts-view-model");

function onNavigatingTo(args) {
    console.log("parts nav")
    const component = args.object;
    component.bindingContext = new PartsViewModel();
}

exports.onNavigatingTo = onNavigatingTo;

function onPageLoaded(args) {
    console.log("Page Loaded!");
    const page = args.object;
    console.log("Page reference from loaded event: ", page);
}
exports.onPageLoaded = onPageLoaded;

function onItemTap(args) {
    const view = args.view;
    const page = view.page;
    const tappedItem = view.bindingContext;

    page.frame.navigate({
        moduleName: "parts/parts-item-detail/parts-item-detail-page",
        context: tappedItem,
        animated: true,
        transition: {
            name: "slide",
            duration: 200,
            curve: "ease"
        }
    });
}

exports.onItemTap = onItemTap;
