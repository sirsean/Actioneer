
function EventLeftNav(callback) {
    this.callback = callback;

    this.buildUI();
}

EventLeftNav.prototype.buildUI = function() {
    this.button = Titanium.UI.createButton({
        title: "Add"
    });
    this.button.addEventListener("click", function(e) {
        Titanium.API.info("left nav button clicked");
        this.callback.call(this);
        Titanium.API.info("left nav call complete");
    }.bind(this));
};

EventLeftNav.prototype.getView = function() {
    return this.button;
};

