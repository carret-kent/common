jFlux = {
    data: {},
    dispatcher: {
        add: function (action, store) {
            if (jFlux.data.hasOwnProperty(action)) return false;

            jFlux.data[action] = store;
            return true;
        },
        force_add: function(action, store) {
            jFlux.data[action] = store;
            return true;
        },
        action: function (action) {
            if (!jFlux.data.hasOwnProperty(action)) return false;

            jFlux.data[action]();
            return true;
        }
    }
};

jVirtualDom = {
    data: {},
    store: {
        add: function () {

        }
    }
};

