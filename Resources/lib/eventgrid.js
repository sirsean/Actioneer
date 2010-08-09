
function EventGrid(eventModel) {
    this.eventModel = eventModel;

    this.buildUI();
}

Inherit.inheritPrototype(EventGrid, Listener);

EventGrid.prototype.buildUI = function() {
    var leftNavButton = new EventLeftNav(function() {
        this.addEvent();
    }.bind(this));
    var rightNavButton = new EventRightNav(function() {
        this.toggleEditingMode();
    }.bind(this));

    this.win = Titanium.UI.createWindow({
        title: "Actions",
        rightNavButton: rightNavButton.getView(),
        leftNavButton: leftNavButton.getView(),
        backgroundColor: "#FFF"
    });
    this.tab = Titanium.UI.createTab({
        icon: "KS_nav_ui.png",
        title: "Actions",
        window: this.win
    });

    this.table = Titanium.UI.createTableView({
        allowsSelection: true,
        editable: true,
        bottom: 55
    });
    this.table.addEventListener("click", function(e) {
        this.selectedEvent = this.events[e.index];
        this.fireEvent("eventSelected", { selectedEvent: this.selectedEvent });
    }.bind(this));
    this.table.addEventListener("delete", function(e) {
        this.eventModel.deleteEvent(this.events[e.index]);
        this.events.splice(e.index);
        this.fireEvent("dataChanged");
    }.bind(this));
    this.win.add(this.table);

    var performButton = Titanium.UI.createButton({
        title: "Perform",
        backgroundImage: "clear.png",
        height: 50,
        left: 5,
        right: 5,
        bottom: 5,
        visible: false
    });
    performButton.addEventListener("click", function(e) {
        if (this.selectedEvent) {
            this.fireEvent("eventPerformed", { performedEvent: this.selectedEvent });
        }
    }.bind(this));
    this.addEventListener("eventSelected", function(e) {
        if (e.selectedEvent != null) {
            performButton.show();
        } else {
            performButton.hide();
        }
    }.bind(this));
    this.win.add(performButton);

    // load the data from the database
    this.reload();
};

EventGrid.prototype.toggleEditingMode = function() {
    this.table.editing = !this.table.editing;
    this.fireEvent("eventSelected", { selectedEvent: null });
};

EventGrid.prototype.addEvent = function() {
    if (!this.addEventWindow) {
        this.addEventWindow = new AddEvent();
        this.addEventWindow.addEventListener("eventAdded", function(e) {
            Titanium.API.info("eventAdded event");
            this.eventModel.addEvent(new LifeEvent({name: e.name}));
            this.reload();
        }.bind(this));
    }
    this.addEventWindow.open();
};

EventGrid.prototype.reload = function() {
    this.events = this.eventModel.getEvents();
    this.data = [];
    for (var i=0; i < this.events.length; i++) {
        this.data.push(this.events[i].getRowData());
    }
    this.table.setData(this.data);

    this.fireEvent("dataLoaded");
    this.fireEvent("dataChanged");
    this.fireEvent("eventSelected", { selectedEvent: null });
};

