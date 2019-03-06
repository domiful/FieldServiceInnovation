const observableModule = require("tns-core-modules/data/observable");

function MapPageViewModel() {
    const viewModel = observableModule.fromObject({
        title: "Map",
        scrollEnabled: "true",
        items: [{
            name: "John Smith",
            description: "Senior Electrician"
        }, ],
        onScroll(args) {
            const page = args.object;
            const vm = page.bindingContext;
            console.log('poop');
            vm.set("status", "scrolling");
            setTimeout(() => {
                vm.set("status", "not scrolling");
            }, 300);

            console.log(`scrollX:  ${args.scrollX}`);
            console.log(`scrollY: ${args.scrollY}`);
        }
    });

    return viewModel;
}

module.exports = MapPageViewModel;
