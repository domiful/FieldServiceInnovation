const calendarModule = require("nativescript-ui-calendar");
const observableModule = require("tns-core-modules/data/observable");
const Kinvey = require("kinvey-nativescript-sdk").Kinvey;
const topmost = require("ui/frame").topmost;

function AppointmentsViewModel() {
    const viewModel = observableModule.fromObject({
        title: "Appointments",
        prop: 0,
        sbSelectedIndex: 0,
        calViewMode: "Month",
        visibility1: true,
        visibility2: false,
        events: [],
        items: {},
        sbLoaded: function (event) {
            const segmentedBarComponent = event.object;
            segmentedBarComponent.on("selectedIndexChange", (sbargs) => {
                //console.log(this.sbSelectedIndex);
                //let filteredList = [];
                if (this.sbSelectedIndex !== 0) {
                    console.log("Month");
                    this.calViewMode = "Month";
                }
                else {
                    this.calViewMode = "Day";

                }

                // this.items = filteredList;
            });

        },

        onDateSelected: function (args) {
            console.log("onDateSelected: " + args.date);
        },
        onNavigatedToDate: function (event) {
            console.log(event.object.view);
            this.navCal(event.eventData.title);
            //console.log("date: " +);
        },
        navCal: function (title) {
            const that = this;
            //const myPage = frame.topmost().currentPage;
            topmost().navigate({
                moduleName: "appointments/appt-item-detail/appts-item-detail-page",
                context: { data: that.items[title] },
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            });
        },
        onNavigatedTo: function (args) {
            const dataStore = Kinvey.DataStore.collection("Appointments", Kinvey.DataStoreType.Sync);

            dataStore.pull().then((entities) => {
                    //console.log(entities);
                    this.contentLoaded();

                })
                .catch((error) => {
                    console.log(`${error}`);
                });
        },
        contentLoaded: function () {
            let that = this;
            const dataStore = Kinvey.DataStore.collection("Appointments");
            const subscription = dataStore.find()
                .subscribe((entities) => {
                        console.log("Retrieved : " + JSON.stringify(entities));
                        let nitems = {};
                        let newEvents = entities.map((ent) => {
                            let newEnt = {};
                            console.log(ent);
                            let sdate = new Date(ent["date"]);
                            let calTitle = `${ent["custName"]}, ${ent["issueType"]}`;
                            const event = new calendarModule.CalendarEvent(calTitle, sdate, sdate);

                            newEnt["_id"] = ent["_id"];
                            newEnt["id"] = ent["custID"];
                            newEnt["status"] = ent["status"];
                            newEnt["techId"] = ent["tech_id"];
                            newEnt["address"] = ent["address1"];
                            newEnt["city"] = ent["city"];
                            newEnt["state"] = ent["state"];
                            newEnt["zip"] = ent["zip"];
                            newEnt["date"] = new Date(ent["date"]);
                            newEnt["cell"] = ent["cellphone"];
                            newEnt["email"] = ent["email"];
                            newEnt["cust"] = ent["custName"];
                            newEnt["company"] = ent["custCompany"];
                            newEnt["service"] = ent["serviceType"];
                            newEnt["issue"] = ent["issueType"];
                            newEnt["lat"] = ent["ackGeoLat"];
                            newEnt["long"] = ent["ackGeoLong"];
                            console.log(newEnt);
                            //let kvp = {};
                            nitems[calTitle] = newEnt;
                            //nitems.push(kvp);

                            return event;
                        });
                        that.events = newEvents;
                        that.items = nitems;
                        console.log(that.items);

                    },
                    (error) => {
                        console.log(error);
                    },
                    () => {
                        console.log('pulled accounts');
                    });
        }

    });

    return viewModel;
}

module.exports = AppointmentsViewModel;
