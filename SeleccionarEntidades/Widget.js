define(['dojo/_base/declare', 'jimu/BaseWidget', 'esri/symbols/SimpleFillSymbol', "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/layers/FeatureLayer", 'dojo/_base/lang', 'dojo/dom', 'esri/graphic', 'esri/Color', "esri/toolbars/draw", "dojo/store/Memory", "esri/tasks/query", "dgrid/OnDemandGrid", "dgrid/Selection", "dojo/_base/array",], function (declare, BaseWidget, SimpleFillSymbol, SimpleMarkerSymbol, SimpleLineSymbol, FeatureLayer, lang, dom, Graphic, Color, Draw,  Memory, Query, Grid, Selection, array) {
  return declare([BaseWidget], {
    baseClass: 'add-graphic',    
    
    onOpen: function() {      

      // var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255, 255, 0]), 2), new Color([255, 255, 0, 0.2]));    

      console.log("Parte1");

      var featurelayer = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/0";

      var outFieldsUrban = ["ID", "Estado"];

            
            var lyrUrban = new FeatureLayer(featurelayer, {
                
                outFields: outFieldsUrban

            });            
            this.map.addLayers([lyrUrban]);              

      // this.map.graphics.show();
      
      // this.map.on('click', lang.hitch(this, function (evt) {
      //   if (dom.byId('activado').checked) {

      //     console.log("EVT", evt)

      //     this.map.graphics.clear();

      //     var geometryInput = evt.mapPoint;

      //     var graphic = new Graphic(geometryInput, symbol);

      //     this.map.graphics.add(graphic);

      //     selectPoint(geometryInput)
      //   };
      // }));
      var tbDraw = new Draw(this.map);

                tbDraw.on("draw-complete", selectPoint);

                tbDraw.activate(Draw.POLYGON);

      function selectPoint(geometryInput) {

        console.log("Geometry", geometryInput)
          
          var symbolSelected = new SimpleMarkerSymbol({
              "type": "esriSMS",
              "style": "esriSMSCircle",
              "color": [255, 115, 0, 128],
              "size": 6,
              "outline": {
                  "color": [255, 0, 0, 214],
                  "width": 1
              }
          });
          
          lyrUrban.setSelectionSymbol(symbolSelected);
          
          
          var queryUrban = new Query();

                queryUrban.geometry = geometryInput.geometry;

                
                lyrUrban.on("selection-complete", populateGrid);

                
                lyrUrban.selectFeatures(queryUrban, FeatureLayer.SELECTION_NEW);

          };

      function populateGrid(results) {

        console.log(results)

        var gridUrbanismo = new (declare([Grid, Selection]))({
          bufferRows: Infinity,
          columns: {
              objeto: "ID",              
              estado: "Estado"              
          }
      }, "divGrid");
         
          
          var dataUrbanismo = array.map(results.features, function (feature) {
              var outFieldsUrban = ["objeto", "estado"];
              return {              
                  /*
                   * Step: Reference the attribute field values
                   */
                  "objeto": feature.attributes[outFieldsUrban[0]],
                  "estado": feature.attributes[outFieldsUrban[1]]
              }
          });
          console.log(dataUrbanismo)

          // Pass the data to the grid
          var memStore = new Memory({
              data: dataUrbanismo
          });
          gridUrbanismo.set("store", memStore);

          console.log("Hola")
      };
    }

    
  });
});