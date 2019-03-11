const AppointmentsViewModel = require("./appointments-view-model");

function onNavigatingTo(args) {
    const component = args.object;
    component.bindingContext = new AppointmentsViewModel();
}

exports.onNavigatingTo = onNavigatingTo;
