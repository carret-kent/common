var j_flux = null;

function JFlux() {
    var flux = {
        /**
         * {
         *     action: string,
         *     next_action: string,
         *     store: callback(),
         *     view: callback()
         * }
         * @param obj
         */
        add: function (obj) {
            if (obj.action === obj.next_action) {
                console.log('Please set a different value for `action` and `next_action`.');
            }

            this.dispatcher.add(obj.action, obj.next_action, obj.store, obj.view);
        },
        force_add: function (obj) {
            if (obj.action === obj.next_action) {
                console.log('Please set a different value for `action` and `next_action`.');
            }

            this.dispatcher.force_add(obj.action, obj.next_action, obj.store, obj.view);
        },
        action: function (action) {
            if (!this.dispatcher.data.hasOwnProperty(action)) return false;

            this.dispatcher.data[action]();
            return true;
        },
        dispatcher: {
            data: {},
            add: function (action, next, store, view) {
                if (this.data.hasOwnProperty(action)) return false;

                this.data[action] = function () {
                    store();
                    view();

                    if (!this.hasOwnProperty(next)) return false;

                    this[next]();
                };
                return true;
            },
            force_add: function (action, next, store, view) {
                this.data[action] = function () {
                    store();
                    view();

                    if (!this.hasOwnProperty(next)) return false;

                    this[next]();
                };
                return true;
            }
        }
    };

    if (j_flux !== null) {
        return j_flux
    } else {
        j_flux = flux;
        return j_flux;
    }
}

