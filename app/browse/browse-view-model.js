//import * as calendarModule from "nativescript-ui-calendar";
const observableModule = require("tns-core-modules/data/observable");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;

function BrowseViewModel() {
    const viewModel = observableModule.fromObject({
        title: "Appointments",
        prop: 0,
        sbSelectedIndex: 0,
        visibility1: true,
        visibility2: false,
        events: [],
        sbLoaded: function () {
            console.log("high");
            // handle selected index change
            const segmentedBarComponent = args.object;
            segmentedBarComponent.on("selectedIndexChange", (sbargs) => {
                const page = sbargs.object.page;
                const vm = page.bindingContext;
                const selectedIndex = sbargs.object.selectedIndex;
                vm.set("prop", selectedIndex);
                switch (selectedIndex) {
                case 0:
                    vm.set("visibility1", true);
                    vm.set("visibility2", false);
                    break;
                case 1:
                    vm.set("visibility1", false);
                    vm.set("visibility2", true);
                    break;
                default:
                    break;
                }
            });
        },
        onNavigatedTo: function () {
            const dataStore = Kinvey.DataStore.collection("appointments", Kinvey.DataStoreType.Sync);

            dataStore.pull().then((entities) => {
                    //console.log(entities);
                    this.contentLoaded();

                })
                .catch(function (error) {
                    console.log(`${error}`);
                });
        },
        contentLoaded: function () {
            let that = this;
            const dataStore = Kinvey.DataStore.collection("appointments");
            const subscription = dataStore.find()
                .subscribe(function (entities) {
                    console.log("Retrieved : " + JSON.stringify(entities));
                    /*  let newItems = entities.map(ent => {
                           let newEnt = {};
                           newEnt["name"] = ent["ItemName"];
                           newEnt["image"] = ent["ImageURL"];
                           newEnt["manufacturer"] = ent["Manufacturer"];
                           newEnt["manufacturerSKU"] = ent["ManufacturerSKU"];
                           newEnt["vendorSKU"] = ent["VendorSKU"];
                           newEnt["cat1"] = ent["Category1"];
                           newEnt["cat2"] = ent["Category2"];
                           newEnt["det1"] = ent["Detail1"];
                           newEnt["det2"] = ent["Detail2"];
                           newEnt["weight"] = ent["Weight"];
                           newEnt["stock"] = ent["OnHand"];
                           newEnt["price"] = ent["Price"];

                           return newEnt;
                       });
                       that.items = newItems;
                       console.log(that.items);*/

                }, function (error) {
                    console.log(error);
                }, function () {
                    console.log('pulled accounts');
                });
        }

    });

    return viewModel;
}

module.exports = BrowseViewModel;
