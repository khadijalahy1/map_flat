// -----------------Require all modules

require([
    "esri/widgets/Sketch",
    "esri/Map",
    "esri/layers/GraphicsLayer",
    "esri/views/MapView",
    "esri/layers/BaseDynamicLayer",
    "esri/core/urlUtils"

], (Sketch, Map, GraphicsLayer, MapView) => {

    const graphicsLayer = new GraphicsLayer();

    const map = new Map({
      basemap: "hybrid",
      layers: [graphicsLayer]
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      zoom: 5,
      center: [90, 45]
    });
    // call custom Layer and pass cordiantes



    view.when(() => {
        const sketch = new Sketch({
            view: view,
            layer: graphicsLayer,
            layout: "vertical",
            id: "rubberBandSketch",
            // graphic will be selected as soon as it is created
            creationMode: "single",
            visibleElements: {
                selectionTools: {
                    "lasso-selection": false,
                    "rectangle-selection": false
                },
                settingsMenu: false,
                undoRedoMenu: false
            },
            availableCreateTools: ["rectangle"]
        });

        view.ui.add(sketch, "top-right");

        sketch.on("create", (event) => {
            if (event.state === "complete") {
                graphicsLayer.remove(event.graphic);
                view.goTo(event.graphic);
                console.log(event.graphic.geometry.extent.width / view.resolution, "pixels");
                console.log(event.graphic.geometry.extent.height / view.resolution, "pixels");
                console.log(event.graphic.geometry.extent.xmin / view.resolution, "pixels");
                console.log(event.graphic.geometry.extent.xmax / view.resolution, "pixels");
                console.log(event.graphic.geometry.extent.ymin / view.resolution, "pixels");
                console.log(event.graphic.geometry.extent.ymax / view.resolution, "pixels");
                // create new layer
                var urlG=new UrlGenerator("https://gibs.earthdata.nasa.gov/wms/epsg","1.3.0",4321,"image/png","default",event.graphic.geometry.extent.xmin ,event.graphic.geometry.extent.xmax,event.graphic.geometry.extent.ymin,event.graphic.geometry.extent.ymax,event.graphic.geometry.extent.width,event.graphic.geometry.extent.height);
                console.log(urlG.getCustomUrls(4326,"POLLUTION"));
              

            }
        });




    });







});




