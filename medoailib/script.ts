import SimpleCanvas from "ts-simplecanvas/src/index";

// Define type definitions mentioned in specification
type Point = {
    pointID: string,
    x, y: number
};

type Annotation = {
    annotationID: string,
    upperLeft: Point,
    lowerRight: Point,
    type: "Interesting" | "Uninteresting"
};

type DesiredOutputFormat = {
    imageName: string,
    annotations: Annotation[]
};

// Set up objects to serialize to JSON later
var currentAnnot: Annotation = {
    annotationID: null, lowerRight: null,
    upperLeft: null, type: null
};
var outputFormat: DesiredOutputFormat = { imageName: null, annotations: [] };

// Get document element refrences to set up listeners
var imgcanvas = new SimpleCanvas("canvas");
var radio1 = document.getElementById("intrstng") as HTMLInputElement;
var radio2 = document.getElementById("!intrstng") as HTMLInputElement;
var input = document.getElementById("file_input") as HTMLInputElement;

// Set up variables to keep track of canvas state
var isMouseDown = false;
var canvasImage = {"img": null, "width": null, "height": null};

currentAnnot.type = (radio1.checked) ? "Interesting" : "Uninteresting";
imgcanvas.context.textAlign = "center";
imgcanvas.context.strokeText("Insert Image Here", 200, 200);

// Add event listeners
radio1.addEventListener("change", radioChangeListener);
radio2.addEventListener("change", radioChangeListener);
imgcanvas.canvas.addEventListener("click", callInputClickListener);

// Serialize and print to screen
document.getElementById("jsonbutton").addEventListener("click", function () {
    document.getElementById("jsonoutput").innerHTML =
        JSON.stringify(outputFormat);
});

/*
 * onChange listener for file_input element
 *      Handles loading local image and displaying it on canvas
 *      Sets up mouse listeners for bounding box drawing
 *
 */
input.addEventListener("change", function (env) {
    let files = (env.target as HTMLInputElement).files;
    // https://webplatform.github.io/docs/concepts/programming/drawing_images_onto_canvas/
    if (files.length == 0) {
        return;
    }
    let file = files[0];
    // Make sure file is image
    if (file.type !== '' && !file.type.match('image.*')) {
        return;
    }
    outputFormat.imageName = file.name;
    canvasImage["URL"] = URL.createObjectURL(file);
    let img = new Image();
    img.src = canvasImage["URL"];
    img.onload = () => {
        canvasImage["img"] = img;
        canvasImage["width"] = img.width;
        canvasImage["height"] = img.height;
        drawImageOnCanvas();
        imgcanvas.canvas.removeEventListener("click", callInputClickListener);
        imgcanvas.canvas.addEventListener("mousedown", canvasMouseDown);
        imgcanvas.canvas.addEventListener("mouseup", canvasMouseUp);
        imgcanvas.canvas.addEventListener("mousemove", canvasMouseMove);
    }
});

function callInputClickListener() { input.click(); }

/*
 * radioChangeListener
 *      Keeps track of current marking type
 *
 */
function radioChangeListener() {
    currentAnnot.type = (radio1.checked) ? "Interesting" : "Uninteresting";
}
/*
 * canvasMouseDown
 *      Handles drawing bounding boxes
 *
 * Parameters:
 *      env: Event object of the Event trigger
 */
function canvasMouseDown(env) {
    isMouseDown = true;
    currentAnnot.upperLeft = getMousePosition(env);
}

/*
 * canvasMouseMove
 *      Handles drawing bounding boxes
 *
 * Parameters:
 *      env: Event object of the Event trigger
 */
function canvasMouseMove(env) {
    if (isMouseDown) {
        currentAnnot.lowerRight = getMousePosition(env);
        drawAllAnnotations(outputFormat.annotations);
        drawRectangle(currentAnnot);
    }
}

/*
 * canvasMouseUp
 *      Handles drawing bounding boxes
 *
 * Parameters:
 *      env: Event object of the Event trigger
 */
function canvasMouseUp(env) {
    if (isMouseDown) {
        isMouseDown = false;
        currentAnnot.lowerRight = getMousePosition(env);
        if (currentAnnot.lowerRight.pointID === currentAnnot.upperLeft.pointID) {
            // Don't save boxes with 0 content
            return;
        }
        currentAnnot.annotationID = getAnnotationID(currentAnnot.upperLeft,
            currentAnnot.lowerRight, currentAnnot.type);
        outputFormat.annotations.push(Object.assign({}, currentAnnot));
        drawAllAnnotations(outputFormat.annotations);

    }
}

/*
 * getMousePosition
 *      Returns a Point object specifying the current location of mouse pointer
 *
 * Parameters:
 *      env: Event object of the Event trigger
 */
function getMousePosition(env): Point {
    let boundary = imgcanvas.canvas.getBoundingClientRect();
    let x: number = Math.round(env.clientX - boundary.left);
    let y: number = Math.round(env.clientY - boundary.top);
    return {
        pointID: getPointID(x, y),
        x: x,
        y: y
    }
}

/*
 * getPointiD
 *      Returns a unique string ID for the given point parameters
 *
 * Parameters:
 *      x: Point.x Number
 *      y: Point.y Number
 */
function getPointID(x: number, y: number): string {
    return Number((x * 10000) + y).toString();
}

/*
 * getAnnotationID
 *      Returns a unique string ID for the given annotation parameters
 *
 * Parameters:
 *      corner1: Annotation.upperLeft Point
 *      corner2: Annotation.lowerRight Point
 *      type: Annotation.type
 */
function getAnnotationID(corner1: Point, corner2: Point, type: "Interesting" | "Uninteresting"): string {
    return type.charAt(0) +
        Number(Number(corner1.pointID) +
            (100000000 * Number(corner2.pointID))).toString();
}

function drawImageOnCanvas(): void {
    imgcanvas.canvas.width = canvasImage["width"];
    imgcanvas.canvas.height = canvasImage["height"];
    imgcanvas.context.drawImage(canvasImage["img"], 0, 0)
}

/* 
 * drawRectangle
 *      Helper function to draw a bounding box for a given annotation.
 *      Draws green boxes for interesting annotation, red for uninteresting.
 *  
 * Parameters:
 *      annot: Annotation
 */
function drawRectangle(annot: Annotation): void {
    let corner1 = annot.upperLeft;
    let corner2 = annot.lowerRight;
    if (annot.type == "Interesting") {
        imgcanvas.drawRect(Math.min(corner1.x, corner2.x),
            Math.min(corner1.y, corner2.y),
            Math.abs(corner1.x - corner2.x),
            Math.abs(corner1.y - corner2.y), "green");
    } else {
        imgcanvas.drawRect(Math.min(corner1.x, corner2.x),
            Math.min(corner1.y, corner2.y),
            Math.abs(corner1.x - corner2.x),
            Math.abs(corner1.y - corner2.y), "red");
    }
}
/*
 * drawAllAnnotations
 *      Given an array of Annotations, draws bounding boxes for all annotations
 *      on the canvas
 * 
 * Parameters:
 *      annot: Array of Annotation type objects
 */
function drawAllAnnotations(annot: Annotation[]): void {
    drawImageOnCanvas();
    for (let i: number = 0; i < annot.length; ++i) {
        drawRectangle(annot[i]);
    }
}