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
        [HOME]: $home,
        [DESIGN]: $design,
        [ADVERTISING]: $advertising
    };

    //Add Navigation Listeners
    $('.advertising', $home).click(navigationHandler.bind(this, ADVERTISING));
    $('.design', $home).click(navigationHandler.bind(this, DESIGN));
    $(window).on('popstate', popStateHandler);

    /**
     * Goes to the view identified by viewHandle and creates a browser history entry
     * @param {String} viewHandle id of the view to go to.
     * @param {Event} event event object associated with the click
     */
    function navigationHandler(viewHandle, event) {
        event.preventDefault();
        activateView(viewHandle);
        createHistoryEntry({active: viewHandle}, viewHandle);
    }

    /**
     * Shows the view identified by viewHandle
     * Hides all the other views
     * @param {String} viewHandle id of the view to activate
     */
    function activateView(viewHandle) {
        viewHandle = viewHandle || HOME;
        Object.keys(views).forEach(function(key) {
            if (key === viewHandle) {
                views[key].show();
            } else {
                views[key].hide();
            }
        });
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

    //Create the Home state
    window.history.replaceState({active: HOME}, HOME);
});