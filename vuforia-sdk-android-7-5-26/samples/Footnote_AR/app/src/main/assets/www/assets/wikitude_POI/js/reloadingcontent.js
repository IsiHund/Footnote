// implementation of AR-Experience (aka "World")
var World = {
  setToken(value) {
    World.jwttoken = value;
    World.reloadPlaces();
  },
  jwttoken: "",
  url: 'https://vm68.htl-leonding.ac.at/javaendpoint/footnote/',
  //url: 'http://localhost:8080/footnote/',
  //  user's latest known location, accessible via userLocation.latitude, userLocation.longitude, userLocation.altitude
  userLocation: null,

  // you may request new data from server periodically, however: in this sample data is only requested once
  isRequestingData: false,

  // true once data was fetched
  initiallyLoadedData: false,

  // different POI-Marker assets
  markerDrawable_idle: null,
  markerDrawable_selected: null,
  markerDrawable_directionIndicator: null,

  // list of AR.GeoObjects that are currently shown in the scene / World
  markerList: [],

  // The last selected marker
  currentMarker: null,

  locationUpdateCounter: 0,
  updatePlacemarkDistancesEveryXLocationUpdates: 10,

  // called to inject new POI data
  loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
    // destroys all existing AR-Objects (markers & radar)
    AR.context.destroyAll();

    // show radar & set click-listener
    PoiRadar.show();
    $('#radarContainer').unbind('click');
    $("#radarContainer").click(PoiRadar.clickedRadar);

    // empty list of visible markers
    World.markerList = [];

    // start loading marker assets
    World.markerDrawable_idle = new AR.ImageResource("assets/marker_idle.png");
    World.markerDrawable_selected = new AR.ImageResource("assets/marker_selected.png");
    World.markerDrawable_directionIndicator = new AR.ImageResource("assets/indi.png");

    // loop through POI-information and create an AR.GeoObject (=Marker) per POI
    for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
      var singlePoi = {
        "id": poiData[currentPlaceNr].id,
        "latitude": parseFloat(poiData[currentPlaceNr].latitude),
        "longitude": parseFloat(poiData[currentPlaceNr].longitude),
        "altitude": parseFloat(poiData[currentPlaceNr].altitude),
        "title": poiData[currentPlaceNr].name,
        "description": poiData[currentPlaceNr].description,
        "image": poiData[currentPlaceNr].image,
        "notes": poiData[currentPlaceNr].notes
      };

      World.markerList.push(new Marker(singlePoi));
    }

    // updates distance information of all placemarks
    World.updateDistanceToUserValues();

    World.updateStatusMessage(currentPlaceNr + ' places loaded');

    // set distance slider to 100%
    $("#panel-distance-range").val(100);
    $("#panel-distance-range").slider("refresh");
  },

  // sets/updates distances of all makers so they are available way faster than calling (time-consuming) distanceToUser() method all the time
  updateDistanceToUserValues: function updateDistanceToUserValuesFn() {
    for (var i = 0; i < World.markerList.length; i++) {
      World.markerList[i].distanceToUser = World.markerList[i].markerObject.locations[0].distanceToUser();
    }
  },

  // updates status message shown in small "i"-button aligned bottom center
  updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

    var themeToUse = isWarning ? "e" : "c";
    var iconToUse = isWarning ? "alert" : "info";

    $("#status-message").html(message);
    $("#popupInfoButton").buttonMarkup({
      theme: themeToUse
    });
    $("#popupInfoButton").buttonMarkup({
      icon: iconToUse
    });
  },

  // location updates, fired every time you call architectView.setLocation() in native environment
  locationChanged: function locationChangedFn(lat, lon, alt, acc) {

    // store user's current location in World.userLocation, so you always know where user is
    World.userLocation = {
      'latitude': lat,
      'longitude': lon,
      'altitude': alt,
      'accuracy': acc
    };


    // request data if not already present
    if (!World.initiallyLoadedData) {
      World.requestDataFromServer(lat, lon);
      World.initiallyLoadedData = true;
    } else if (World.locationUpdateCounter === 0) {
      // update placemark distance information frequently, you max also update distances only every 10m with some more effort
      World.updateDistanceToUserValues();
    }

    // helper used to update placemark information every now and then (e.g. every 10 location upadtes fired)
    World.locationUpdateCounter = (++World.locationUpdateCounter % World.updatePlacemarkDistancesEveryXLocationUpdates);
  },

  // fired when user pressed maker in cam
  onMarkerSelected: function onMarkerSelectedFn(marker) {
    World.currentMarker = marker;

    // update panel values
    //document.getElementById("img").src = World.url + "FileHandlerServlet?filename=" + poiData.image;
    $("#poi-detail-title").html(marker.poiData.title);
    $("#poi-detail-description").html(marker.poiData.description);
    var temp = "";
    for (var i = 0; i < marker.poiData.notes.length; i++) {
      temp = temp + '<tr><td>' + marker.poiData.notes[i].content + '</td></tr>';
    }
    $("#poi-detail-notes").html(temp);

    /* It's ok for AR.Location subclass objects to return a distance of `undefined`. In case such a distance was calculated when all distances were queried in `updateDistanceToUserValues`, we recalcualte this specific distance before we update the UI. */
    if (undefined == marker.distanceToUser) {
      marker.distanceToUser = marker.markerObject.locations[0].distanceToUser();
    }
    var distanceToUserValue = (marker.distanceToUser > 999) ? ((marker.distanceToUser / 1000).toFixed(2) + " km") : (Math.round(marker.distanceToUser) + " m");

    $("#poi-detail-distance").html(distanceToUserValue);

    // show panel
    $("#panel-poidetail").modal('show');

    $(".ui-panel-dismiss").unbind("mousedown");

    $("#panel-poidetail").on("hide.bs.modal", function (event, ui) {
      World.currentMarker.setDeselected(World.currentMarker);
    });
  },

  // screen was clicked but no geo-object was hit
  onScreenClick: function onScreenClickFn() {
    // you may handle clicks on empty AR space too
  },

  // returns distance in meters of placemark with maxdistance * 1.1
  getMaxDistance: function getMaxDistanceFn() {

    // sort places by distance so the first entry is the one with the maximum distance
    World.markerList.sort(World.sortByDistanceSortingDescending);

    // use distanceToUser to get max-distance
    var maxDistanceMeters = World.markerList[0].distanceToUser;

    // return maximum distance times some factor >1.0 so ther is some room left and small movements of user don't cause places far away to disappear
    return maxDistanceMeters * 1.1;
  },

  // udpates values show in "range panel"
  updateRangeValues: function updateRangeValuesFn() {

    // get current slider value (0..100);
    var slider_value = $("#panel-distance-range").val();

    // max range relative to the maximum distance of all visible places
    var maxRangeMeters = Math.round(World.getMaxDistance() * (slider_value / 100));

    // range in meters including metric m/km
    var maxRangeValue = (maxRangeMeters > 999) ? ((maxRangeMeters / 1000).toFixed(2) + " km") : (Math.round(maxRangeMeters) + " m");

    // number of places within max-range
    var placesInRange = World.getNumberOfVisiblePlacesInRange(maxRangeMeters);

    // update UI labels accordingly
    $("#panel-distance-value").html(maxRangeValue);
    $("#panel-distance-places").html((placesInRange != 1) ? (placesInRange + " Places") : (placesInRange + " Place"));

    // update culling distance, so only places within given range are rendered
    AR.context.scene.cullingDistance = Math.max(maxRangeMeters, 1);

    // update radar's maxDistance so radius of radar is updated too
    PoiRadar.setMaxDistance(Math.max(maxRangeMeters, 1));
  },

  // returns number of places with same or lower distance than given range
  getNumberOfVisiblePlacesInRange: function getNumberOfVisiblePlacesInRangeFn(maxRangeMeters) {

    // sort markers by distance
    World.markerList.sort(World.sortByDistanceSorting);

    // loop through list and stop once a placemark is out of range ( -> very basic implementation )
    for (var i = 0; i < World.markerList.length; i++) {
      if (World.markerList[i].distanceToUser > maxRangeMeters) {
        return i;
      }
    };

    // in case no placemark is out of range -> all are visible
    return World.markerList.length;
  },

  handlePanelMovements: function handlePanelMovementsFn() {

    $("#panel-distance").on("hide.bs.modal", function (event, ui) {
      $("#radarContainer").addClass("radarContainer_left");
      $("#radarContainer").removeClass("radarContainer_right");
      PoiRadar.updatePosition();
    });

    $("#panel-distance").on("show.bs.modal", function (event, ui) {
      $("#radarContainer").removeClass("radarContainer_left");
      $("#radarContainer").addClass("radarContainer_right");
      PoiRadar.updatePosition();
    });
  },

  // display range slider
  showRange: function showRangeFn() {
    if (World.markerList.length > 0) {

      // update labels on every range movement
      $('#panel-distance-range').change(function () {
        World.updateRangeValues();
      });

      World.updateRangeValues();
      World.handlePanelMovements();

      // open panel
      $("#panel-distance").trigger("updatelayout");
      $("#panel-distance").modal("show");
    } else {

      // no places are visible, because the are not loaded yet
      World.updateStatusMessage('No places available yet', true);
    }
  },

  /*
  	You may need to reload POI information because of user movements or manually for various reasons.
  	In this example POIs are reloaded when user presses the refresh button.
  	The button is defined in index.html and calls World.reloadPlaces() on click.
  */

  // reload places from content source
  reloadPlaces: function reloadPlacesFn() {
    if (!World.isRequestingData) {
      if (World.userLocation) {
        World.requestDataFromServer(World.userLocation.latitude, World.userLocation.longitude);
      } else {
        World.updateStatusMessage('Unknown user-location.', true);
      }
    } else {
      World.updateStatusMessage('Already requesing places...', true);
    }
  },

  // request POI data
  requestDataFromServer: function requestDataFromServerFn(lat, lon) {

    // set helper var to avoid requesting places while loading
    World.isRequestingData = true;
    World.updateStatusMessage('Requesting places from web-service');

    $.ajaxSetup({
      headers: {
        'Authorization': 'Bearer ' + World.jwttoken
      }
    });


    var jqxhr = $.getJSON(World.url + "rest/realObject", function (data) {
        World.loadPoisFromJsonData(data);
      })
      .error(function (err) {
        /*
        	Under certain circumstances your web service may not be available or other connection issues can occur.
        	To notify the user about connection problems a status message is updated.
        	In your own implementation you may e.g. use an info popup or similar.
        */
        World.updateStatusMessage("Invalid web-service response.", true);
        World.isRequestingData = false;
      })
      .complete(function () {
        World.isRequestingData = false;
      });
  },

  // helper to sort places by distance
  sortByDistanceSorting: function (a, b) {
    return a.distanceToUser - b.distanceToUser;
  },

  // helper to sort places by distance, descending
  sortByDistanceSortingDescending: function (a, b) {
    return b.distanceToUser - a.distanceToUser;
  }

};


/* forward locationChanges to custom function */
AR.context.onLocationChanged = World.locationChanged;

/* forward clicks in empty area to World */
AR.context.onScreenClick = World.onScreenClick;
