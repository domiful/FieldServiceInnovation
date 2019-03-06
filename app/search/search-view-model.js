const observableModule = require("tns-core-modules/data/observable");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;

function SearchViewModel() {
    const viewModel = observableModule.fromObject({
        title: "Parts",
        scrollEnabled: "true",
        items: [{
            name: "Loading",
            manufacturer: "................",
            image: "https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif"
        }],
        onNavigatedTo: function () {
            const dataStore = Kinvey.DataStore.collection("items", Kinvey.DataStoreType.Sync);

            dataStore.pull().then((entities) => {
                    console.log(entities);
                    this.contentLoaded();

                })
                .catch(function (error) {
                    console.log(`${error}`);
                });
        },
        contentLoaded: function () {
            let that = this;
            const dataStore = Kinvey.DataStore.collection("items");
            const subscription = dataStore.find()
                .subscribe(function (entities) {
                    console.log("Retrieved : " + JSON.stringify(entities));
                    let newItems = entities.map(ent => {
                        let newEnt = {};
                        newEnt["name"] = ent["ItemName"];
                        newEnt["image"] = ent["ImageURL"];
                        newEnt["manufacturer"] = ent["Manufacturer"];
                        newEnt["manufacturerSKU"] = ent["ManufacturerSKU"];
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
                    console.log(that.items);

                }, function (error) {
                    console.log(error);
                }, function () {
                    console.log('pulled accounts');
                });
        }
    });

    return viewModel;
}

module.exports = SearchViewModel;
