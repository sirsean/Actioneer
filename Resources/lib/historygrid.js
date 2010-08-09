
function HistoryGrid(historyModel) {
    this.historyModel = historyModel;

    this.buildUI();
}

HistoryGrid.prototype.buildUI = function() {
    var historyHeader = new HistoryHeader(function() {
        this.toggleEditingMode();
    }.bind(this));

    this.win = Titanium.UI.createWindow({
        title: "History",
        rightNavButton: historyHeader.getView(),
        backgroundColor: "#FFF"
    });
    this.tab = Titanium.UI.createTab({
        icon: "KS_nav_views.png",
        title: "History",
        window: this.win
    });

    this.table = Titanium.UI.createTableView({
    });
    this.table.addEventListener("delete", function(e) {
        this.historyModel.deleteHistoryRecord(this.history[e.index]);
        this.history.splice(e.index, 1);
    }.bind(this));
    this.win.add(this.table);

    this.reload();
};

HistoryGrid.prototype.toggleEditingMode = function() {
    this.table.editing = !this.table.editing;
};

HistoryGrid.prototype.addPerformedEvent = function(performedEvent) {
    var record = new HistoryRecord({
        name: performedEvent.name,
        time: new Date()
    });
    this.historyModel.addHistoryRecord(record);
    this.reload();
};

HistoryGrid.prototype.reload = function() {
    this.history = this.historyModel.getHistory();
    this.table.setData([]);
    for (var i=0; i < this.history.length; i++) {
        this.table.appendRow(this.history[i].getTableViewRow());
    }
};

