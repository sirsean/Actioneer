
function EventRightNav(callback) {
    this.callback = callback;

    this.buildUI();
}

EventRightNav.prototype.buildUI = function() {
    this.button = Titanium.UI.createButton({
        title: "Edit"
    });
    this.button.addEventListener("click", function(e) {
        this.callback.call(this);
    }.bind(this));
};

EventRightNav.prototype.getView = function() {
    return this.button;
};

