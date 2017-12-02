$(function() {
    const $cardElements = $('.card-container');

    $cardElements.click(function(ev) {
        var $element = $(this);
        var $popUpCard = $('.card-popup', $element);
        
        $element.toggleClass('active');
        killClass($cardElements, 'active', this.id);
        initSlider($popUpCard);
    });

    function initSlider($element) {
        var $slides = $('.slide-image', $element);
        // $slides.show();
        $('.slider', $element).slick({
            draggable: false, 
            accessibility: true,
            variableWidth: true
        });
        $cardElements.off('click');
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

    // function initImageSlider(element) {
    //     debugger;
    //     var category = categories[element.data('category')];
    //     var contents = category.contents;
    //     var $leftControl = $('.slider-control.left', element);
    //     var $rightControl = $('.slider-control.right', element);

    //     if (contents.length > 1) {
    //         var visible = 0;
            
    //         slidesAsCSSRule(element, visible, contents);
            
    //         $leftControl.click(function(event) {
    //                 event.stopPropagation();
    //                 element.removeClass('animation-reverse');
    //                 element.addClass('animated-background');
    //                 setTimeout(function() {
    //                     element.removeClass('animated-background');
    //                     slidesAsCSSRule(element, ++visible, contents);
    //                 }, 2000);
    //             });

    //         $rightControl.click(function(event) {
    //             event.stopPropagation();
    //             element.addClass('animation-reverse');
    //             element.addClass('animated-background');
    //             setTimeout(function() {
    //                 element.removeClass('animated-background');
    //                 slidesAsCSSRule(element, --visible, contents);
    //             }, 200);
    //         })
    //     } else {
    //         $leftControl.hide();
    //         $rightControl.hide();

    //         singleSlideAsCSSRule(element, contents);
    //     }
    // }

    // function slidesAsCSSRule(element, visibleIndex, contents) {
    //     var current, next;
    //     current = visibleIndex % contents.length;
    //     next = (visibleIndex + 1) % contents.length;
    //     var value = `url('${contents[next]}'), url('${contents[current]}')`;
    //     element.css({'background-image': value})
    // }

    // function singleSlideAsCSSRule(element, contents) {
    //     var value = `url('${contents[0]}')`;
    //     var positionValue = '0px 0px';
    //     element.css({
    //         'background-image': value,
    //         'background-position': positionValue
    //     });
    // }

});