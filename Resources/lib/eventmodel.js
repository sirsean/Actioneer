
function LifeEvent(params) {
    params = params || {};
    this.name = params.name || "";
}

LifeEvent.prototype.getRowData = function() {
    return { title: this.name };
};

function EventModel() {
    this.db = Titanium.Database.open("events");

    this.initiateDatabase();
}

EventModel.prototype.initiateDatabase = function() {
    var sql = "CREATE TABLE IF NOT EXISTS events ( name TEXT NOT NULL PRIMARY KEY );";
    this.db.execute(sql);
};

EventModel.prototype.getEventByName = function(name) {
    var rs = this.db.execute("SELECT * FROM events WHERE name=?;", name);
    if (rs.isValidRow()) {
        var event = new LifeEvent({
            name: rs.fieldByName("name")
        });
        rs.close();
        return event;
    } else {
        rs.close();
        return null;
    }
};

EventModel.prototype.getEvents = function() {
    var sql = "SELECT * FROM events;";
    var rs = this.db.execute(sql);
    var events = [];
    while (rs.isValidRow()) {
        events.push(new LifeEvent({
            name: rs.fieldByName("name")
        }));
        rs.next();
    }
    rs.close();

    return events;
};

EventModel.prototype.getNumberOfEvents = function() {
    var numEvents = 0;
    var rs = this.db.execute("SELECT count(*) AS num FROM events");
    if (rs.isValidRow()) {
        numEvents = rs.fieldByName("num");
    }
    rs.close();
    return numEvents;
};

EventModel.prototype.addEvent = function(event) {
    this.db.execute("REPLACE INTO events (name) VALUES (?);", event.name);
};

EventModel.prototype.deleteEvent = function(event) {
    this.db.execute("DELETE FROM events WHERE name=?;", event.name);
};

