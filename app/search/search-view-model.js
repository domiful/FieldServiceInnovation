const observableModule = require("tns-core-modules/data/observable");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const segmentedBarModule = require("tns-core-modules/ui/segmented-bar");

function SearchViewModel() {
    const viewModel = observableModule.fromObject({
        title: "Parts",
        scrollEnabled: "true",
        archive: [],
        items: [{
            name: "Loading",
            manufacturer: "................",
            image: "https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif"
        }],
        filterSegment: 'collapsed',
        sbSelectedIndex: 0,
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
        filter: function () {
            //console.log("filtered");
            if (this.filterSegment == 'collapsed') {
                this.filterSegment = 'visible';
                let filteredList = [];
                if (this.sbSelectedIndex === 0) {
                    this.archive.forEach((i) => {
                        if (i.cat2.toLowerCase() !== "plug") {
                            filteredList.push(i);
                        }
                    });
                }
                else {
                    this.archive.forEach((i) => {
                        if (i.cat2.toLowerCase() == "plug") {
                            filteredList.push(i);
                        }
                    });
                }
                this.items = filteredList;
            }
            else {
                this.filterSegment = 'collapsed'
                this.items = this.archive;
            }
            //this.filterSegment = 'collapsed' ? this.filterSegment = 'visible' : this.filterSegment = 'collapsed';
        },
        sbLoaded: function (event) {
            const segmentedBarComponent = event.object;
            segmentedBarComponent.on("selectedIndexChange", (sbargs) => {
                //console.log(this.sbSelectedIndex);
                let filteredList = [];
                if (this.sbSelectedIndex === 0) {
                    this.archive.forEach((i) => {
                        if (i.cat2.toLowerCase() == "plug") {
                            filteredList.push(i);
                        }
                    });
                }
                else {
                    this.archive.forEach((i) => {
                        if (i.cat2.toLowerCase() !== "plug") {
                            filteredList.push(i);
                        }
                    });
                }

                this.items = filteredList;
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
                        newEnt["vendorSKU"] = ent["VendorSKU"];
                        newEnt["cat1"] = ent["Category1"];
                        newEnt["cat2"] = ent["Category2"];
                        newEnt["det1"] = ent["Detail1"];
                        newEnt["det2"] = ent["Detail2"];
                        newEnt["weight"] = ent["Weight"];
                        newEnt["stock"] = ent["OnHand"];
                        newEnt["price"] = `$${parseFloat(Math.round(ent["Price"] * 100) / 100).toFixed(2)}`;

                        return newEnt;
                    });
                    that.archive = newItems;
                    that.items = newItems;
                    // console.log(that.items);

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
