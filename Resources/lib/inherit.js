
var Inherit = {

    inheritPrototype: function(myClass, prototypeToInherit) {
        for (var functionName in prototypeToInherit) {
            if (true) {
                myClass.prototype[functionName] = prototypeToInherit[functionName];
            }
        }
    }

};

var Listener = {

    addEventListener: function(eventName, callback) {
        this.win.addEventListener(eventName, callback);
    },

    fireEvent: function(eventName, obj) {
        this.win.fireEvent(eventName, obj);
    }
};

var SubWindow = {
    open: function(params) {
        if (!this.numOpened) {
            this.numOpened = 0;
        }
        this.numOpened++;
        Titanium.API.info("opened: " + this.numOpened);
        params = params || {modal:true};
        this.win.open(params);
    },

    close: function() {
        if (!this.numClosed) {
            this.numClosed = 0;
        }
        this.numClosed++;
        Titanium.API.info("closed: " + this.numClosed);
        this.win.close();
    }
};

