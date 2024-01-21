




require(["esri/Map", "esri/views/MapView","esri/widgets/Compass","esri/widgets/Fullscreen","esri/widgets/Zoom","esri/Graphic"],
function(Map, MapView,Compass,Fullscreen,Zoom,Graphic) { 
    const locations = document.getElementById('map').dataset.locations
    const locationss = JSON.parse(locations)
    let all_location = []
    let xcenter
    let ycenter
    let totalx = 0
    let totaly = 0
    for(x of locationss){
        totalx = x.coordinates[1]+ totalx
        totaly = -x.coordinates[0]+ totaly
        xcenter = totalx / locationss.length
        ycenter = totaly / locationss.length
        all_location.push(x.coordinates[0],x.coordinates[1])
    }
    var map = new Map({ basemap: "satellite" });
    var mapView = new MapView({ 
        container: "map",
        map: map,
        zoom: 6,
        center: [-ycenter, xcenter],
        navigation: false
    });  
    let compass = new Compass({
        view:mapView
    })
    let full = new Fullscreen({
        view:mapView
    })
    let zoom = new Zoom({
        view:mapView
    })
    mapView.on("mouse-wheel", function(event) {
        event.stopPropagation();
    });
    // Disable drag event
    mapView.on("drag", function(event) {
        event.stopPropagation();
    });
    mapView.ui.add(compass,"top-left")
    mapView.ui.add(full,"top-right")
    mapView.ui.add(zoom,"bottom-left")

    // ------------- Graphic -------------

    var result = [];
    for (var i = 0; i < all_location.length; i += 2) {
        result.push([all_location[i], all_location[i + 1]]);
    }
    
    
    
    
    
    
    var polyline = { type: "polyline"
        , paths: result 
    } 
    var lineSymbol = { type: "simple-line", color: "#F2D22D", width: 4 }
    var polylineGraphic = new Graphic({ geometry: polyline, symbol: lineSymbol, });
    mapView.graphics.add(polylineGraphic);


    for(let i = 0 ; i<=result.length ; i++){
    var point = { type: "point"
    , longitude: result[i][0]
    , latitude: result[i][1] };
    var markerSymbol = { type: "picture-marker"
    , url: "https://i.imgur.com/n9ZE9Hn.png" 
    , width: "20px"
    , height: "20px" };
    var pointGraphic = new Graphic({ geometry: point, symbol: markerSymbol });
    mapView.graphics.add(pointGraphic);
    }


});














