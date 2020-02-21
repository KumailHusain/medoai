var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var radio1 = document.getElementById("intrstng");
var radio2 = document.getElementById("!intrstng");
var canvasImage;
let firstCorner;
let currentAnnot = { annotationID: null, lowerRight: null, upperLeft: null, type: null };
let outputFormat = { imageName: null, annotations: [] };
let isMouseDown = false;
let isImageInserted = false;
currentAnnot.type = (radio1.checked) ? "Interesting" : "Uninteresting";
ctx.textAlign = "center";
ctx.strokeText("Insert Image Here", 200, 200);
radio1.addEventListener("change", radioChangeListener);
radio2.addEventListener("change", radioChangeListener);
function radioChangeListener() {
    currentAnnot.type = (radio1.checked) ? "Interesting" : "Uninteresting";
}
document.getElementById("jsonbutton").addEventListener("click", function () {
    document.getElementById("jsonoutput").innerHTML = JSON.stringify(outputFormat);
});
canvas.addEventListener("click", handleImage);
document.getElementById("file_input").addEventListener("change", function (env) {
    let files = env.target.files;
    if (files.length == 0) {
        return;
    }
    let file = files[0];
    if (file.type !== '' && !file.type.match('image.*')) {
        return;
    }
    outputFormat.imageName = file.name;
    canvasImage = new Image();
    canvasImage.src = URL.createObjectURL(file);
    ;
    canvasImage.onload = () => {
        canvas.width = canvasImage.width;
        canvas.height = canvasImage.height;
        ctx.drawImage(canvasImage, 0, 0);
        canvas.removeEventListener("click", handleImage);
        canvas.addEventListener("mousedown", canvasMouseDown);
        canvas.addEventListener("mouseup", canvasMouseUp);
        canvas.addEventListener("mousemove", canvasMouseMove);
    };
});
function handleImage(e) {
    document.getElementById("file_input").click();
}
function canvasMouseDown(env) {
    isMouseDown = true;
    currentAnnot.upperLeft = getMousePosition(env);
}
function canvasMouseMove(env) {
    if (isMouseDown) {
        currentAnnot.lowerRight = getMousePosition(env);
        drawAllAnnotations(outputFormat.annotations);
        drawRectangle(currentAnnot);
    }
}
function canvasMouseUp(env) {
    if (isMouseDown) {
        isMouseDown = false;
        currentAnnot.lowerRight = getMousePosition(env);
        if (currentAnnot.lowerRight.pointID === currentAnnot.upperLeft.pointID) {
            return;
        }
        currentAnnot.annotationID = getAnnotationID(currentAnnot.upperLeft, currentAnnot.lowerRight, currentAnnot.type);
        outputFormat.annotations.push(Object.assign({}, currentAnnot));
        drawAllAnnotations(outputFormat.annotations);
    }
}
function getMousePosition(env) {
    let boundary = canvas.getBoundingClientRect();
    let x = Math.round(env.clientX - boundary.left);
    let y = Math.round(env.clientY - boundary.top);
    return {
        pointID: getPointID(x, y),
        x: x,
        y: y
    };
}
function getPointID(x, y) {
    return Number((x * 10000) + y).toString();
}
function getAnnotationID(corner1, corner2, type) {
    return type.charAt(0) + Number(Number(corner1.pointID) + (100000000 * Number(corner2.pointID))).toString();
}
function drawRectangle(annot) {
    if (annot.type == "Interesting") {
        ctx.strokeStyle = "green";
    }
    else {
        ctx.strokeStyle = "red";
    }
    let corner1 = annot.upperLeft;
    let corner2 = annot.lowerRight;
    ctx.strokeRect(Math.min(corner1.x, corner2.x), Math.min(corner1.y, corner2.y), Math.abs(corner1.x - corner2.x), Math.abs(corner1.y - corner2.y));
}
function drawAllAnnotations(annot) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(canvasImage, 0, 0);
    console.log("Size: " + annot.length);
    for (let i = 0; i < annot.length; ++i) {
        console.log("Point " + i + " (" + annot[i].lowerRight.x + "," + annot[i].lowerRight.y + "), (" + annot[i].upperLeft.x, "," + annot[i].upperLeft.y + ")");
        drawRectangle(annot[i]);
    }
}
//# sourceMappingURL=script.js.map