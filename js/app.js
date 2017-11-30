$(function() {
    //View handles
    const HOME = 'home';
    const ADVERTISING = 'advertising';
    const DESIGN = 'design'; 
    //Permanently cached DOM Elements.
    const $home = $(`#${HOME}`);
    const $design = $(`#${DESIGN}`);
    const $advertising = $(`#${ADVERTISING}`);
    //Hash of views
    const views = {
        [HOME]: { el: $home, fn: function(){}, started: false },
        [DESIGN]: { el: $design, fn: startCards, started: false },
        [ADVERTISING]: { el: $advertising, fn: startCards, started: false }
    };

    //Add Navigation Listeners
    $('.advertising', $home).click(navigationHandler(ADVERTISING));
    $('.design', $home).click(navigationHandler(DESIGN));
    $(window).on('popstate', popStateHandler);
    //Create the Home state
    window.history.replaceState({active: HOME}, HOME);

    /**
     * Handles the navigation events from the browser buttons:
     * Obtains the active view defined in the state object and activates it.
     * @param {PopStateEvent} event popStateEvent fired by the browser's navigation buttons.
     */
    function popStateHandler(event) {
        var stateData = event && event.originalEvent && event.originalEvent.state;
        if (stateData && stateData.active) {
            activateView(stateData.active);
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
            activateView(viewHandle);
            createHistoryEntry({active: viewHandle}, viewHandle);
        };        
    }

    /**
     * Shows the view identified by viewHandle
     * @param {String} viewHandle id of the view to activate
     */
    function activateView(viewHandle) {
        views[viewHandle].el.show();
        Object.keys(views).forEach(function(key) {
            var view = views[key];
            
            if (key === viewHandle) {
                view.el.show();
                if (!view.started) {
                    view.fn(view.el);
                    view.started = true;
                }
            } else {
                view.el.hide();
            }
        });
    }

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