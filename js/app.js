$(function() {
    class View {
        constructor(selector, initFunction, name) {
            this.name = name || selector;
            this._el = $(`#${selector}`);
            this._fn = initFunction;
            this._started = false;
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
    const views = new Views([
        new View(HOME, () => {}),
        new View(DESIGN, startCards),
        new View(ADVERTISING, startCards)
    ]);

    //Add Navigation Listeners
    $('.advertising', views[HOME]).click(navigationHandler(ADVERTISING));
    $('.design', views[HOME]).click(navigationHandler(DESIGN));
    $(window).on('popstate', popStateHandler);
    window.history.replaceState({active: HOME}, HOME);

    /**
     * Handles the navigation events from the browser buttons:
     * Obtains the active view defined in the state object and activates it.
     * @param {PopStateEvent} event popStateEvent fired by the browser's navigation buttons.
     */
    function popStateHandler(event) {
        debugger;
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
            debugger;
            event.preventDefault();
            views.activateView(viewHandle);
            createHistoryEntry({active: viewHandle}, viewHandle);
        };        
    }


    /**
     * Starts the cards present within context
     * @param {jQueryElement} context 
     */
    function startCards(context) {
        var cardElements = $('.card-container', context);
        cardElements.click(function(ev) {
            var element = ev.currentTarget;
            element.classList.toggle('active');
            killClass(cardElements, 'active', element.id);
        });
    }

    /**
     * Removes the given className from Elements matching selector.
     * If idToExclude is supplied, the class won't be removed from the Element with that id 
     * @param {Element} elements a collection of Elements 
     * @param {String} className name of class to remove from elements matched by selector
     * @param {String} idToExclude id of the Element to exclude from removal of the class
     */
    function killClass(elements, className, idToExclude) {
        elements.each(function(index, element) {
            if (element.id !== idToExclude) {
                element.classList.remove(className);
            }
        });
    }
});
