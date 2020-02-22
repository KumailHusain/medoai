# Simple Image Annotation Tool

## Instructions
Make sure you have cloned the repository and you're inside the `medoai/medoai` directory:

```bash
git clone https://github.com/KumailHusain/medoai.git
cd medoai/medoai
```
If you haven't already, install the typescript package:

```bash
npm install -g typescript
```

Compile the typescript script using the compiler:

```bash
tsc
```

Open `index.htm` to start using the tool

## Using the tool
- Click on the canvas to load an image from local storage
- Pick the marking type from the toolbar above the canvas
- Draw bounding boxes on the canvas
- Press the `JSON Output` button when you are done annotating the image

## Limitations
- To keep the tool simple, only a single image file can be loaded into the tool at a time. For multiple image files, reload the webpage for each image.
- The json output is simply written to a paragraph element of `index.htm`.  The output does not have pretty-printing
- Currently, the canvas dimensions are set to the loaded image dimensions. For image with large dimensions, this may be a problem

## Future features
To keep the program simple, some features were excluded. The following features may be added to the tool:
- Drag/drop image to canvas
- Lasso tool for marking parts of image
