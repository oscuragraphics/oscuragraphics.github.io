// (function(_$){

// }($))

$(function() {
    debugger;
    class View {
        constructor(selector, initFunction, images, name) {
            this.name = name || selector;
            this._el = $(`#${selector}`);
            this._fn = initFunction;
            this._started = false;
            this._images = images;
        }

        show() {
            this._el.show();
        }

        hide() {
            this._el.hide();
        }

        run() {
            this.show();
            if (!this._started) {
                this._started = true;
                this._fn(this._el);
            }
            window.location.hash = this.name;
        }
    }

    class Views {
        constructor(views) {
            this._views = views;
            views.forEach(view => {
                this[view.name] = view._el;
                this[`_${view.name}`] = view;
            });
        }

        activateView(viewName) {
            this._views.forEach(view => {
                if (view.name === viewName) {
                    view.run();
                } else {
                    view.hide();
                }
            });
        }
    }

    
    //View handles
    const HOME = 'home';
    const ADVERTISING = 'advertising';
    const DESIGN = 'design'; 
    const DESIGN_IMAGES = ['cats1.jpg', 'cats2.jpg', 'cats3.jpg', 'cats4.jpg', 'cats5.jpg'];
    const views = new Views([
        new View(HOME, () => {}),
        new View(DESIGN, startCards),
        new View(ADVERTISING, startCards)
    ]);

    //Add Navigation Listeners
    // $('.advertising', views[HOME]).click(navigationHandler(ADVERTISING));
    // $('.design', views[HOME]).click(navigationHandler(DESIGN));
    // $(window).on('popstate', popStateHandler);
    // window.history.replaceState({active: HOME}, HOME);
    

    /**
     * Handles the navigation events from the browser buttons:
     * Obtains the active view defined in the state object and activates it.
     * @param {PopStateEvent} event popStateEvent fired by the browser's navigation buttons.
     */
    function popStateHandler(event) {
        var stateData = event && event.originalEvent && event.originalEvent.state;
        if (stateData && stateData.active) {
            views.activateView(stateData.active);
        }
    }

    /**
     * Creates a browser history item represented by given stateData and named name.
     * @param {Object} stateData data that represents the state being saved into history 
     * @param {String} name name to give to the history item 
     */
    function createHistoryEntry(stateData, name) {
        window.history.pushState(stateData, name);
    }

    /**
     * Takes in a viewHandle and returns a function to be used as eventHandler
     * @param {String} viewHandle id of the view to go to.
     * @returns {Function} an eventHandler function
     */
    function navigationHandler(viewHandle) {
        /**
         * @param {Event} event event object associated with the event
         */
        return function(event) {
            event.preventDefault();
            views.activateView(viewHandle);
            createHistoryEntry({active: viewHandle}, viewHandle);
        };        
    }


    

    function initImageSlider() {
        $('.slider-control.right').click((ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            console.log('Right');
        });
        $('.slider-control.left').click((ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            console.log('Left');
        });
    }

    
});
