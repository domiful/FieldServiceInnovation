const SearchViewModel = require("./search-view-model");

function onNavigatingTo(args) {
    console.log("parts nav")
    const component = args.object;
    component.bindingContext = new SearchViewModel();
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
        moduleName: "search/parts-item-detail/parts-item-detail-page",
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
