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

    canvasGrid.on('mousedown click mousemove dblclick', 'td', function(pixelEvent) {
        const eventTarget = $(pixelEvent.target);    // 'eventTarget' is the pixel to be painted
        const pickedColor = colorPicker.val();    // update color value

        switch (pixelEvent.type) {
            case 'mousedown':
                continuousDrag = true;    // set continuous drag
                pixelEvent.preventDefault();    // prevent default mousedown dragging behavior
                break;
            case 'dblclick':
                eventTarget.css('background', '#ffffff');    // unpaint the pixel on doubleclick
                break;
            // paint the pixel on continuousDrag state AND mousemove event OR on click event
            case 'mousemove':
                if (!continuousDrag) {
                    break;
                }
            case 'click':
                eventTarget.css('background', pickedColor);
        }
    });

    widthInput.on('click input', function() {    // listen for mouse or keyboard input
        const pageWidth = $('body').width();    // get the current page width
        const pixelWidth = 20;
        const maxGridWidth = parseInt(pageWidth / pixelWidth);

        widthInput.attr('max', maxGridWidth);    // set the currently allowed max grid width
    });

    canvasGrid.on('mouseup mouseleave', function () {    // cancel continuous drag
      continuousDrag = false;
   });
}

const widthInput = $('#input_width');
const colorPicker = $('#colorPicker');
const canvasGrid = $('#pixel_canvas');

let continuousDrag = false;    //  'continuousDrag' is global, to be available to multiple listeners

addListeners();    // add listeners on page startup
