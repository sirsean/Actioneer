
function AddEvent() {
    Titanium.API.info("creating AddEvent");
    this.buildUI();
}

Inherit.inheritPrototype(AddEvent, Listener);
Inherit.inheritPrototype(AddEvent, SubWindow);

AddEvent.prototype.buildUI = function() {
    this.win = Titanium.UI.createWindow({
        title: "Add Action",
        backgroundColor: "#FFF"
    });
    this.textField = Titanium.UI.createTextField({
        color: "#336699",
        height: 35,
        top: 5,
        left: 5,
        right: 5,
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_BEZEL
    });
    this.win.add(this.textField);

    this.saveButton = Titanium.UI.createButton({
        title: "Save",
        backgroundImage: "clear.png",
        top: 50,
        right: 5,
        width: 80,
        height: 30
    });
    this.saveButton.addEventListener("click", function(e) {
        this.fireEvent("eventAdded", { name: this.textField.value });
        this.close();
    }.bind(this));
    this.cancelButton = Titanium.UI.createButton({
        title: "Cancel",
        backgroundImage: "gray.png",
        top: 50,
        right: 90,
        width: 80,
        height: 30
    });
    this.cancelButton.addEventListener("click", function(e) {
        this.close();
    }.bind(this));

    this.win.add(this.saveButton);
    this.win.add(this.cancelButton);

    this.win.addEventListener("open", function(e) {
        this.textField.value = "";
        this.textField.focus();
    }.bind(this));
};

