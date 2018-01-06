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

    canvasGrid.on('mousedown dblclick', function(pixelEvent) {
        const eventTarget = $(pixelEvent.target);    // 'eventTarget' is the pixel to be painted

        if (pixelEvent.type === 'mousedown') {
            eventTarget.css('background', pickedColor);    // paint the pixel on mousedown
        } else {
            eventTarget.css('background', '#ffffff');    // or unpaint the pixel on doubleclick
        }
    });

        widthInput.on('hover focus', function() {
        const pageWidth = $('body').width();    // get the current page width
        const pixelWidth = 20;
        const maxGridWidth = parseInt(pageWidth/pixelWidth);

        widthInput.attr('max', maxGridWidth);    // set the currently allowed max grid width
    });
}

const widthInput = $('#input_width');
const colorPicker = $('#colorPicker');
const canvasGrid = $('#pixel_canvas');
let pickedColor = colorPicker.val(); //'pickedColor' is global, to be available to multiple listeners

addListeners();    // add listeners on page startup
