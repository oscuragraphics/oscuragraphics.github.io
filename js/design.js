$(function() {
    const $cardElements = $('.card-container');
    const categories = {
        editorialDesign : {
            name: 'Diseño Editorial',
            contents: [
                '/assets/cats1.jpg',
                '/assets/cats2.jpg', 
                '/assets/cats3.jpg', 
                '/assets/cats4.jpg', 
                '/assets/cats5.jpg'
            ]
        },
        graphicProduction: {
            contents: [
                
            ]
        },
        texts: {
            contents: [
                
            ]
        },
        infographics: {
            contents: [
                
            ]
        },
        packaging : {
            contents: [
                
            ]
        }
    };

    $cardElements.click(function(ev) {
        var $element = $(this);
        var $popUpCard = $('.card-popup', $element);
        
        $element.toggleClass('active');
        killClass($cardElements, 'active', this.id);
        initImageSlider($popUpCard);
    });

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

    function initImageSlider(element) {
        var category = categories[element.data('category')];
        var contents = category.contents;
        var visible = 0;
        
        slidesAsCSSRule(element, visible, contents);
        
        var $leftControl = $('.slider-control.left', element)
            .click(function(event) {
                event.stopPropagation();
                element.addClass('animated-background');
                slidesAsCSSRule(element, ++visible, contents);
            });
        // var $rightControl = $('.slider-control.right', element)
        //     .click(function(event) {
        //         event.stopPropagation();
        //     });
    }

    function slidesAsCSSRule(element, visibleIndex, contents) {
        debugger;
        var value = `url('${contents[visibleIndex + 1]}'), url('${contents[visibleIndex]}')`;
        element.css({'background-image': value})
    }

});