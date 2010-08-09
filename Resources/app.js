Titanium.include("lib/bind.js");
Titanium.include("lib/inherit.js");
Titanium.include("lib/date.js");
Titanium.include("lib/eventmodel.js");
Titanium.include("lib/historymodel.js");
Titanium.include("lib/addevent.js");
Titanium.include("lib/eventleftnav.js");
Titanium.include("lib/eventrightnav.js");
Titanium.include("lib/eventgrid.js");
Titanium.include("lib/historyheader.js");
Titanium.include("lib/historygrid.js");

// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var eventModel = new EventModel();

var historyModel = new HistoryModel();

// create the grid tabs
var eventGrid = new EventGrid(eventModel);
var historyGrid = new HistoryGrid(historyModel);

// if they haven't created any actions, open the "Add Action" window
if (eventModel.getNumberOfEvents() == 0) {
    eventGrid.addEvent();
}

// initialize events on the tabs
eventGrid.addEventListener("eventPerformed", function(e) {
    historyGrid.addPerformedEvent(e.performedEvent);
    tabGroup.setActiveTab(historyGrid.tab);
});

// place the tabs in order
tabGroup.addTab(eventGrid.tab);
tabGroup.addTab(historyGrid.tab);

// open tab group
tabGroup.open();
