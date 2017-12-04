$(function() {
    const $cardElements = $('.card-container');

    $cardElements.click(function(ev) {
        var $element = $(this);
        
        killClass($cardElements, 'active', this.id);
        if (!$element.hasClass('active')) {
            $element.addClass('active');
            initSlider($element);
        }
    });

    function initSlider($element) {
        var $popUpCard = $('.card-popup', $element);

        var $closingButton = $('.closing-button', $popUpCard);
        var $slides = $('.slide-image', $popUpCard);
        var $slider = $('.slider', $popUpCard);

        $closingButton.click(function(ev) {
            ev.stopPropagation();
            $slider.slick('unslick');
            $element.removeClass('active');
        });

        if ($slides.length > 1) {
            $slider.slick({
                draggable: false, 
                infinite: true,
                slidesToShow: 1,
                variableWidth: true
            });
        }
    }

    /**
     * Removes the given className from Elements matching selector.
     * If idToExclude is supplied, the class won't be removed from the Element with that id 
     * @param {jQuery} elements a collection of Elements 
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