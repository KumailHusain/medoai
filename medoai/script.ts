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
var canvas = document.getElementById("canvas") as HTMLCanvasElement;
var ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
var radio1 = document.getElementById("intrstng") as HTMLInputElement;
var radio2 = document.getElementById("!intrstng") as HTMLInputElement;
var input = document.getElementById("file_input") as HTMLInputElement;

// Set up variables to keep track of canvas state
var isMouseDown = false;
var isImageInserted = false;
var canvasImage;

currentAnnot.type = (radio1.checked) ? "Interesting" : "Uninteresting";
ctx.textAlign = "center";
ctx.strokeText("Insert Image Here", 200, 200);

// Add event listeners
radio1.addEventListener("change", radioChangeListener);
radio2.addEventListener("change", radioChangeListener);
canvas.addEventListener("click", callInputClickListener);

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
    if (files.length == 0) {
        return;
    }
    let file = files[0];
    // Make sure file is image
    if (file.type !== '' && !file.type.match('image.*')) {
        return;
    }
    outputFormat.imageName = file.name;
    canvasImage = new Image();
    canvasImage.src = URL.createObjectURL(file);;
    canvasImage.onload = () => {
        canvas.width = canvasImage.width;
        canvas.height = canvasImage.height;
        ctx.drawImage(canvasImage, 0, 0);
        canvas.removeEventListener("click", callInputClickListener);
        canvas.addEventListener("mousedown", canvasMouseDown);
        canvas.addEventListener("mouseup", canvasMouseUp);
        canvas.addEventListener("mousemove", canvasMouseMove);
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
function getMousePosition(env):Point {
    let boundary = canvas.getBoundingClientRect();
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

/* 
 * drawRectangle
 *      Helper function to draw a bounding box for a given annotation.
 *      Draws green boxes for interesting annotation, red for uninteresting.
 *  
 * Parameters:
 *      annot: Annotation
 */
function drawRectangle(annot: Annotation): void {
    if (annot.type == "Interesting") {
        ctx.strokeStyle = "green";
    } else {
        ctx.strokeStyle = "red";
    }
    let corner1 = annot.upperLeft;
    let corner2 = annot.lowerRight;
    ctx.strokeRect(Math.min(corner1.x, corner2.x),
        Math.min(corner1.y, corner2.y),
        Math.abs(corner1.x - corner2.x),
        Math.abs(corner1.y - corner2.y));
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasImage, 0, 0);
    for (let i: number = 0; i < annot.length; ++i) {
        drawRectangle(annot[i]);
    }
}
