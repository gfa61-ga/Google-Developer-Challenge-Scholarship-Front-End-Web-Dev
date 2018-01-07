/*
****    Pixel Art Maker project with extra features:
*
*           1. erase pixel color on doubleclick
*           2. hold down the mouse button for continuous drawing
*           3. set max allowed camvas width for the current page length
*
*/

function makeGrid() {
    const gridHeight = $('#input_height').val();
    const gridWidth = widthInput.val();

    canvasGrid.text('');    // erase previous canvas

    let gridHtmlString = '';
    for (let row = 1; row <= gridHeight; row++) {    // for each row
        gridHtmlString += '<tr>';    // add the beginning of row
        for (let column = 1; column <= gridWidth; column++) {
            gridHtmlString += '<td></td>';    // add each column
        }
        gridHtmlString += '</tr>';    // and finally add the end of row
    }

    canvasGrid.html(gridHtmlString);    // design new canvas
}

function addListeners() {
    $('#sizePicker').submit(function(submitEvent) {
        submitEvent.preventDefault();   // prevent default submit action, which reloads the html page
        makeGrid();     // redesign grid when new dimensions are submitted
    });

    colorPicker.change(function() {
        pickedColor = colorPicker.val();    // update color value, when it is changed
    });

    canvasGrid.on('mousedown mouseup mousemove dblclick', 'td', function(pixelEvent) {
        const eventTarget = $(pixelEvent.target);    // 'eventTarget' is the pixel to be painted

        if (pixelEvent.type === 'mousedown') {    //  update mouse status
            mouseDown = true;
        } else if (pixelEvent.type === 'mouseup') {
            mouseDown = false;
        } else if (pixelEvent.type === 'dblclick') {
            eventTarget.css('background', '#ffffff');    //  unpaint the pixel on doubleclick
        }

        // paint the pixel on mousedown event  OR  on continuous mouseDown AND mousemove event
        if (pixelEvent.type === 'mousedown' || mouseDown && pixelEvent.type === 'mousemove') {
            eventTarget.css('background', pickedColor);
        }
    });

    widthInput.on('click input', function() {    // listen for mouse or keyboard input
        const pageWidth = $('body').width();    // get the current page width
        const pixelWidth = 20;
        const maxGridWidth = parseInt(pageWidth / pixelWidth);

        widthInput.attr('max', maxGridWidth);    // set the currently allowed max grid width
    });
}

const widthInput = $('#input_width');
const colorPicker = $('#colorPicker');
const canvasGrid = $('#pixel_canvas');
let pickedColor = colorPicker.val(); //'pickedColor' is global, to be available to multiple listeners
let mouseDown = false;    //  'mouseDown' is global, to be available to multiple listeners
addListeners();    // add listeners on page startup
