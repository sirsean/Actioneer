
function HistoryHeader(callback) {
    this.callback = callback;

    this.buildUI();
}

HistoryHeader.prototype.buildUI = function() {
    this.button = Titanium.UI.createButton({
        title: "Edit"
    });
    this.button.addEventListener("click", function(e) {
        this.callback.call(this);
    }.bind(this));
};

HistoryHeader.prototype.getView = function() {
    return this.button;
};

