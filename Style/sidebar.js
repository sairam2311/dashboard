(function () {
  var map = new ol.Map({
      target: 'map_openlayers',
    layers: [
      new ol.layer.Group({
        // A layer must have a title to appear in the layerswitcher
        title: 'Base maps',
        layers: [
          new ol.layer.Group({
            // A layer must have a title to appear in the layerswitcher
            title: 'Water color with labels',
            // Setting the layers type to 'base' results
            // in it having a radio button and only one
            // base layer being visibile at a time
            type: 'base',
            // Setting combine to true causes sub-layers to be hidden
            // in the layerswitcher, only the parent is shown
            combine: true,
            visible: false,
            layers: [
              new ol.layer.Tile({
                  source: new ol.source.XYZ({
                      attributions:
                          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                          'rest/services/World_Imagery/MapServer">ArcGIS</a>',
                      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
                      maxZoom: 19
                })
              }),
              new ol.layer.Tile({
                source: new ol.source.Stamen({
                  layer: 'terrain-labels'
                })
              })
            ]
          }),
          new ol.layer.Tile({
            // A layer must have a title to appear in the layerswitcher
            title: 'Water color',
            // Again set this layer as a base layer
            type: 'base',
            visible: false,
            source: new ol.source.Stamen({
              layer: 'watercolor'
            })
          }),
          new ol.layer.Tile({
            // A layer must have a title to appear in the layerswitcher
            title: 'OSM',
            // Again set this layer as a base layer
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
          })
        ]
      }),

        new ol.layer.Group({
            title: 'Geo server Layers',

            fold: 'close',
            layers: [
                new ol.layer.Tile({
                    title: 'tiger-ny',
                    extent: [-13884991, 2870341, -7455066, 6338219],
                    source: new ol.source.TileWMS({
                        url: 'http://localhost:8080/geoserver/wms',
                        params: {
                            'LAYERS': 'tiger: giant_polygon'},
                        serverType: 'geoserver',
                        transition : 0,

                    }),

                }),

            ]

        }),



      new ol.layer.Group({
        // A layer must have a title to appear in the layerswitcher
        title: 'Overlays',
        // Adding a 'fold' property set to either 'open' or 'close' makes the group layer
        // collapsible
        fold: 'open',
        layers: [
          new ol.layer.Image({
            // A layer must have a title to appear in the layerswitcher
              title: 'District',
            source: new ol.source.ImageArcGISRest({
                ratio: 1,
                visible: false,
             // params: { LAYERS: 'show:3' },
                url: 'http://tracgis.telangana.gov.in/arcgis/rest/services/RIS_NEW/RIS_AdminLayers/MapServer',
                maxZoom: 19
            })
          }),
          new ol.layer.Group({
            // A layer must have a title to appear in the layerswitcher
              title: 'Admin',
            fold: 'open',
            layers: [
              new ol.layer.Image({
                // A layer must have a title to appear in the layerswitcher
                  title: 'State Boundary',
                source: new ol.source.ImageArcGISRest({
                  ratio: 1,
                    params: { LAYERS: 'show:0' },
                    zIndex: 10,
                  url:
                    'http://tracgis.telangana.gov.in/arcgis/rest/services/RIS_NEW/RIS_AdminLayers/MapServer'
                })
              }),
              new ol.layer.Image({
                // A layer must have a title to appear in the layerswitcher
                  title: 'District Boundary',
                visible: false,
                source: new ol.source.ImageArcGISRest({
                  ratio: 1,
                  params: { LAYERS: 'show:1' },
                  url:
                    'http://tracgis.telangana.gov.in/arcgis/rest/services/RIS_NEW/RIS_AdminLayers/MapServer'
                })
              }),
                new ol.layer.Image({
                    // A layer must have a title to appear in the layerswitcher
                    title: 'Mandal Boundary',
                    source: new ol.source.ImageArcGISRest({
                        ratio: 1,
                        params: { LAYERS: 'show:2' },
                        url:
                            'http://tracgis.telangana.gov.in/arcgis/rest/services/RIS_NEW/RIS_AdminLayers/MapServer'
                    })
                }),
                new ol.layer.Image({
                    // A layer must have a title to appear in the layerswitcher
                    title: 'Village Boundary',
                    source: new ol.source.ImageArcGISRest({
                        ratio: 1,
                        params: { LAYERS: 'show:3' },
                        minZoom: 25,

                        url:
                            'http://tracgis.telangana.gov.in/arcgis/rest/services/RIS_NEW/RIS_AdminLayers/MapServer'
                    })
                })
            ]
          })
        ]
      })
    ],
    view: new ol.View({
        center: ol.proj.transform([74, 17], 'EPSG:4326', 'EPSG:3857'),
      zoom: 8
    })
  });

  // Get out-of-the-map div element with the ID "layers" and renders layers to it.
  // NOTE: If the layers are changed outside of the layer switcher then you
  // will need to call ol.control.LayerSwitcher.renderPanel again to refesh
  // the layer tree. Style the tree via CSS.
  var sidebar = new ol.control.Sidebar({
    element: 'sidebar',
    position: 'left'
  });
  var toc = document.getElementById('layers');
  ol.control.LayerSwitcher.renderPanel(map, toc, { reverse: true });
  map.addControl(sidebar);
})();
