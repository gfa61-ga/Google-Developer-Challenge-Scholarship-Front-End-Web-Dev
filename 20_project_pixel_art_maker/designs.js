/*
****    Pixel Art Maker project with extra features:
*
*           1. erase pixel color on doubleclick
*           2. hold down the mouse button for continuous drawing
*           3. set max allowed camvas width and height according to the current page length
*           4. add some basic responsiveness by defining viewport in .html file
*           5. delete helpText for continuous drawing when the device screen is touchable
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

    helpTextArea.show();    // show helpText, which is hidden before first grid creation
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
        const mouseButtonPressed = pixelEvent.buttons;    // mouseButtonPressed will become equal to 1, when left mouse button is pressed

        pixelEvent.preventDefault();    // prevent default mousedown dragging behavior
        switch (pixelEvent.type) {
            case 'mousemove':
                if (mouseButtonPressed != 1) {
                    break;    // dont paint if mousemove, but left mouse button is not pressed
                }
            case 'click':
                eventTarget.style.backgroundColor = colorPicker.val();    // paint the pixels on continuous mouseDraging or on mouse click
                break;
            case 'dblclick':
                eventTarget.style.backgroundColor = '#ffffff';    // unpaint the pixel on doubleclick
        }
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

function detectTouchable() {
    if ("ontouchstart" in document.documentElement) {
        dragHelpText.remove();    // hide DragHelpText on touchable devices, where continuous drawing doesn't work
    }
}

const pageBody = $('body');
const sizePicker = $('#sizePicker');
const inputWidth = $('#input_width');
const inputHeight = $('#input_height');
const colorPicker = $('#colorPicker');
const canvasGrid = $('#pixel_canvas');
const helpTextArea = $('#help_text');
const dragHelpText =$('#drag_help_text');

addListeners();    // add listeners on page startup
detectTouchable();    // adjust help text when touchable screen is detected
