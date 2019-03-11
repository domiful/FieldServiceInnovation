const observableModule = require("tns-core-modules/data/observable");
const userService = require("~/services/user-service");
const Kinvey = require('kinvey-nativescript-sdk').Kinvey;

const topmost = require("ui/frame").topmost;

function HomeItemsViewModel() {
    const viewModel = observableModule.fromObject({
        title: "Home",
        scrollEnabled: "true",
        items: [{
            name: "Dan Mitchell",
            description: "Senior Electrician"
        }],
        logOut: function () {
            userService.logout().then(() => {

                    topmost().navigate({
                        moduleName: "./login/login-page",
                        clearHistory: true
                    });

                })
                .catch((e) => {

                    alert("Unfortunately we could not find your account.");
                });
        },
        contentLoaded: function () {
            let activeUser = Kinvey.User.getActiveUser();
            console.log(activeUser.data);
            let username = activeUser.data.username === 'dom.raymond@progress.com' ? "Dom Raymond" : "Dan Mitchell";
            this.items = [{ name: username, description: "Senior Electrician" }];

        }
    });

    return viewModel;
}

module.exports = HomeItemsViewModel;
/*
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
*/
