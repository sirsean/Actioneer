
function HistoryRecord(params) {
    params = params || {};
    this.id = params.id || null;
    this.name = params.name || "";
    this.time = params.time || new Date();
    this.milliseconds = this.time.getTime();
}

HistoryRecord.prototype.getRowData = function() {
    return { title: this.name + " " + this.time };
};

HistoryRecord.prototype.getTableViewRow = function() {
    var row = Titanium.UI.createTableViewRow();
    var label1 = Titanium.UI.createLabel({
        text: this.name,
        font: { fontSize: 18 },
        left: 5,
        width: "65%"
    });
    var label2 = Titanium.UI.createLabel({
        text: this.time.format("m/d/Y\nh:i:s a"),
        font: { fontSize: 12 },
        color: "#444444",
        right: 5,
        bottom: 0,
        width: "auto"
    });
    row.add(label1);
    row.add(label2);
    return row;
};

function HistoryModel() {
    this.db = Titanium.Database.open("history");

    this.initiateDatabase();
}

HistoryModel.prototype.initiateDatabase = function() {
    //this.db.execute("DROP TABLE IF EXISTS history;");
    this.db.execute("CREATE TABLE IF NOT EXISTS history ( id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, milliseconds TEXT NOT NULL );");
};

HistoryModel.prototype.getHistory = function() {
    var rs = this.db.execute("SELECT * FROM history ORDER BY milliseconds DESC");
    var history = [];
    while (rs.isValidRow()) {
        history.push(new HistoryRecord({
            id: rs.fieldByName("id"),
            name: rs.fieldByName("name"),
            time: new Date(parseInt(rs.fieldByName("milliseconds"), 10))
        }));
        rs.next();
    }
    rs.close();
    return history;
};

HistoryModel.prototype.getNumberOfHistoryRecords = function() {
    var numHistoryRecords = 0;
    var rs = this.db.execute("SELECT count(*) as num FROM history");
    if (rs.isValidRow()) {
        numHistoryRecords = rs.fieldByName("num");
    }
    rs.close();
    return numHistoryRecords;
};

HistoryModel.prototype.addHistoryRecord = function(record) {
    if (record.id == null) {
        this.db.execute("INSERT INTO history (name, milliseconds) VALUES (?,?);", record.name, record.milliseconds);
    } else {
        this.db.execute("UPDATE history SET name=?, milliseconds=? WHERE id=?;", record.name, record.milliseconds, record.id);
    }
};

HistoryModel.prototype.deleteHistoryRecord = function(record) {
    if (record.id != null) {
        this.db.execute("DELETE FROM history WHERE id=?", record.id);
    }
};

