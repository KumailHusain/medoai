# Simple Image Annotation Tool

## Instructions
Make sure you have cloned the repository and you're inside the `medoai/medoailib` directory:

```bash
git clone https://github.com/KumailHusain/medoai.git
cd medoai/medoailib
```

If you haven't already, install the typescript package:

```bash
npm install -g typescript
```

Install the npm dependencies for this project:

```bash
npm install
```

Compile the typescript script using the compiler:

```bash
tsc
```

Use the webpack module loader to bundle all js files together:
```bash
npx webpack
```

Open `index.htm` to start using the tool

## Using the tool
- Click on the canvas to load an image from local storage
- Pick the marking type from the toolbar above the canvas
- Draw bounding boxes on the canvas
- Press the `JSON Output` button when you are done annotating the image

## Dependencies
- `ts-simplecanvas`: Wrapper for HTML canvas element to draw on canvas
- `webpack`: Server-side module loader to bundle js files
- `webpack-cli`: Used to compile typescript files and modules into one js file
- `awesome-typescript-loader`: Typescript loader for webpack

## Limitations
- To keep the tool simple, only a single image file can be loaded into the tool at a time. For multiple image files, reload the webpage for each image.
- The json output is simply written to a paragraph element of `index.htm`.  The output does not have pretty-printing
- Currently, the canvas dimensions are set to the loaded image dimensions. For image with large dimensions, this may be a problem
- The `ts-simplecanvas.SimpleCanvas.drawImage` method loads the image every time the method is called. This causes stuttering because the image needs to be drawn every time the mouse moves (inside the `mousemove` event listener of the canvas). Therefore, this method is not used and instead the `canvas.getContext().drawImage` is used. 

## Future features
To keep the program simple, some features were excluded. The following features may be added to the tool:
- Drag/drop image to canvas
- Lasso tool for marking parts of image
