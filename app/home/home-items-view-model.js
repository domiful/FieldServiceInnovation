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

        },
        categoricalSource: [{
                name: "Item 1",
                description: "Description for Item 1"
            },
            {
                name: "Item 2",
                description: "Description for Item 2"
            },
            {
                name: "Item 3",
                description: "Description for Item 3"
            },
            {
                name: "Item 4",
                description: "Description for Item 4"
            },
            {
                name: "Item 5",
                description: "Description for Item 5"
            },
            {
                name: "Item 6",
                description: "Description for Item 6"
            },
            {
                name: "Item 7",
                description: "Description for Item 7"
            },
            {
                name: "Item 8",
                description: "Description for Item 8"
            },
            {
                name: "Item 9",
                description: "Description for Item 9"
            },
            {
                name: "Item 10",
                description: "Description for Item 10"
            },
            {
                name: "Item 11",
                description: "Description for Item 11"
            },
            {
                name: "Item 12",
                description: "Description for Item 12"
            }
        ]
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
