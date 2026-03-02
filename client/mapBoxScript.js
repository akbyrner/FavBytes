<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Mapbox Test</title>

  <link href="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.css" rel="stylesheet">
  <script src="https://api.mapbox.com/mapbox-gl-js/v3.0.0/mapbox-gl.js"></script>

  <style>
    body { margin: 0; }
    #map { width: 100%; height: 100vh; }
    #properties {
      position: absolute;
      top: 10px;
      left: 10px;
      background: white;
      padding: 10px;
      display: none;
      max-height: 300px;
      overflow: auto;
    }
  </style>
</head>
<body>

<div id="map"></div>
<div id="properties"></div>

<script>
mapboxgl.accessToken = '';

const map = new mapboxgl.Map({
    container: 'map',
    center: [-74, 40.72],
    zoom: 12,
    style: 'mapbox://styles/mapbox/standard'
});
</script>

</body>
</html>