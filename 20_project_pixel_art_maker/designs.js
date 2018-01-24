/*
****    Pixel Art Maker project with extra features:
*
*           1. erase pixel color on doubleclick
*           2. hold down the mouse button for continuous drawing
*           3. set max allowed camvas width and height according to the current page length
*
*/

function makeGrid() {
    const gridHeight = inputHeight.val();
    const gridWidth = inputWidth.val();

    canvasGrid.html('');    // erase previous canvas

    const canvasTable = canvasGrid.get(0);    // get() function returns the DOM <table> element
    for (let row = 0; row < gridHeight; row++) {
        const newRow = canvasTable.insertRow(row);    // insert newRows in canvasTable
        for (let column = 0; column < gridWidth; column++) {
            newRow.insertCell(column);    // insert newCells in each newRow
        }
    }

    helpTextArea.show();    // show helpText after grid creation
}

function addListeners() {
    /**** sizePicker-form listener ****/
    sizePicker.submit(function(submitEvent) {
        submitEvent.preventDefault();   // prevent default submit action, which reloads the html page
        makeGrid();     // redesign grid when new dimensions are submitted
    });

    /**** canvasGrid-pixels listener ****/
    canvasGrid.on('mousedown mousemove click dblclick', 'td', function(pixelEvent) {
        const eventTarget = pixelEvent.target;    // 'eventTarget' is the pixel to be painted

        switch (pixelEvent.type) {
            case 'mousedown':
                continuousDrag = true;    // set continuous dragging
                pixelEvent.preventDefault();    // prevent default mousedown dragging behavior
                break;
            case 'mousemove':    // paint the pixel on continuousDrag state AND mousemove event OR on click event
                if (!continuousDrag) {
                    break;
                }
            case 'click':
                eventTarget.style.backgroundColor = colorPicker.val();
                break;
            case 'dblclick':
                eventTarget.style.backgroundColor = '#ffffff';    // unpaint the pixel on doubleclick
        }
    });

    /**** canvasGrid listener ****/
    canvasGrid.on('mouseup mouseleave', function () {    // cancel continuous dragging
        continuousDrag = false;
    });

    /**** sizePicker-focus listener ****/
    sizePicker.on('pointerenter keyup', function() {    // listen for mouse or keyboard focus on sizePicker form
        const pageWidth = pageBody.width();    // get the current page width
        const pixelWidth = 20;
        const maxGridWidth = parseInt(pageWidth / pixelWidth);
        const maxGridHeight = parseInt(maxGridWidth * 1.414);    // 1.414 is A4-paper aspect-ratio

        inputWidth.attr('max', maxGridWidth);    // set the currently allowed max grid width
        inputHeight.attr('max', maxGridHeight);    // and max grid height
    });
}

const pageBody = $('body');
const sizePicker = $('#sizePicker');
const inputWidth = $('#input_width');
const inputHeight = $('#input_height');
const colorPicker = $('#colorPicker');
const canvasGrid = $('#pixel_canvas');
const helpTextArea = $('#help_text');
const dragHelpText =$('#drag_help_text');

let continuousDrag = false;    //  'continuousDrag' is global, to be available to multiple listeners

addListeners();    // add listeners on page startup

if ("ontouchstart" in document.documentElement)    //  hide DragHelpText on touchable devices
    {
        dragHelpText.remove();
    }
