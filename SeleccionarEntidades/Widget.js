define(['dojo/_base/declare', 'jimu/BaseWidget', "esri/symbols/SimpleMarkerSymbol", "esri/layers/FeatureLayer", "esri/toolbars/draw", "dojo/store/Memory", "esri/tasks/query", "dgrid/OnDemandGrid", "dgrid/Selection", "dojo/_base/array"], function (declare, BaseWidget, SimpleMarkerSymbol, FeatureLayer, Draw,  Memory, Query, Grid, Selection, array) {
    return declare([BaseWidget], {
      baseClass: 'add-graphic',    
  
      startup: function() {             
  
        console.log("Parte1");
  
        var outFieldsUrban = ["objeto", "estado"];
        
  
        var featurelayer = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/0";      
  
              
              var lyrUrban = new FeatureLayer(featurelayer, {
                  
                  outFields: outFieldsUrban
  
              });            
        var featurelayer1 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/1";
              
              var lyrUrban1 = new FeatureLayer(featurelayer1, {
                  
                  outFields: outFieldsUrban
  
              });            
        var featurelayer2 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/2";
              
              var lyrUrban2 = new FeatureLayer(featurelayer2, {
                  
                  outFields: outFieldsUrban
  
              });            
        var featurelayer3 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/3";
              
              var lyrUrban3 = new FeatureLayer(featurelayer3, {
                  
                  outFields: outFieldsUrban
  
              });            
        var featurelayer4 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/4";
              
              var lyrUrban4 = new FeatureLayer(featurelayer4, {
                  
                  outFields: outFieldsUrban
  
              });            
        var featurelayer5 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/5";
              
              var lyrUrban5 = new FeatureLayer(featurelayer5, {
                  
                  outFields: outFieldsUrban
  
              });            
              this.map.addLayers([lyrUrban]);             
              this.map.addLayers([lyrUrban1]);             
              this.map.addLayers([lyrUrban2]);             
              this.map.addLayers([lyrUrban3]);             
              this.map.addLayers([lyrUrban4]);             
              this.map.addLayers([lyrUrban5]);
  
      },
  
      onOpen: function(){
          console.log("Abrir")
  
          var outFieldsUrban = ["objeto", "estado"];
        
  
          var featurelayer = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/0";      
    
                
                var lyrUrban = new FeatureLayer(featurelayer, {
                    
                    outFields: outFieldsUrban
    
                });            
          var featurelayer1 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/1";
                
                var lyrUrban1 = new FeatureLayer(featurelayer1, {
                    
                    outFields: outFieldsUrban
    
                });            
          var featurelayer2 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/2";
                
                var lyrUrban2 = new FeatureLayer(featurelayer2, {
                    
                    outFields: outFieldsUrban
    
                });            
          var featurelayer3 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/3";
                
                var lyrUrban3 = new FeatureLayer(featurelayer3, {
                    
                    outFields: outFieldsUrban
    
                });            
          var featurelayer4 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/4";
                
                var lyrUrban4 = new FeatureLayer(featurelayer4, {
                    
                    outFields: outFieldsUrban
    
                });            
          var featurelayer5 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/5";
                
                var lyrUrban5 = new FeatureLayer(featurelayer5, {
                    
                    outFields: outFieldsUrban
    
                });   
                           
  
        var tbDraw = new Draw(this.map);
  
                  tbDraw.on("draw-complete", selectPoint);
  
                  tbDraw.activate(Draw.POLYGON);
        
  
        function selectPoint(geometryInput) {
  
          console.log("Geometry", geometryInput)
            
            var symbolSelected = new SimpleMarkerSymbol({
                "type": "esriSMS",
                "style": "esriSMSCircle",
                "color": [255, 115, 0, 128],
                "size": 8,
                "outline": {
                    "color": [255, 0, 0, 214],
                    "width": 1
                }
            });
            
            lyrUrban.setSelectionSymbol(symbolSelected);
            lyrUrban1.setSelectionSymbol(symbolSelected);
            lyrUrban2.setSelectionSymbol(symbolSelected);
            lyrUrban3.setSelectionSymbol(symbolSelected);
            lyrUrban4.setSelectionSymbol(symbolSelected);
            lyrUrban5.setSelectionSymbol(symbolSelected);
            
            
            var queryUrban = new Query();
  
                  queryUrban.geometry = geometryInput.geometry;
  
                  
                  lyrUrban.on("selection-complete", populateGrid);
                  lyrUrban1.on("selection-complete", populateGrid1);
                  lyrUrban2.on("selection-complete", populateGrid2);
                  lyrUrban3.on("selection-complete", populateGrid3);
                  lyrUrban4.on("selection-complete", populateGrid4);
                  lyrUrban5.on("selection-complete", populateGrid5);
  
                  
                  lyrUrban.selectFeatures(queryUrban, FeatureLayer.SELECTION_NEW);
                  lyrUrban1.selectFeatures(queryUrban, FeatureLayer.SELECTION_NEW);
                  lyrUrban2.selectFeatures(queryUrban, FeatureLayer.SELECTION_NEW);
                  lyrUrban3.selectFeatures(queryUrban, FeatureLayer.SELECTION_NEW);
                  lyrUrban4.selectFeatures(queryUrban, FeatureLayer.SELECTION_NEW);
                  lyrUrban5.selectFeatures(queryUrban, FeatureLayer.SELECTION_NEW);
  
            };   
                 
  
        function populateGrid(results) {
  
          // arrayNuevo.push(results.features)
  
          console.log("Results", results)
  
          var gridUrbanismo = new (declare([Grid, Selection]))({
            bufferRows: Infinity,
            columns: {
                objeto: "Sanecan",              
                estado: "Estado"              
            }
        }, "divGrid");
           
            
            var dataUrbanismo = array.map(results.features, function (feature) {
              console.log("Feature", feature)
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
        function populateGrid1(results) {
  
          // arrayNuevo.push(results.features)
  
          console.log("Results", results)
  
          var gridUrbanismo = new (declare([Grid, Selection]))({
            bufferRows: Infinity,
            columns: {
                objeto: "Papeleras",              
                estado: "Estado"              
            }
        }, "divGrid1");         
            
            var dataUrbanismo = array.map(results.features, function (feature) {
              console.log("Feature", feature)
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
        function populateGrid2(results) {
  
          // arrayNuevo.push(results.features)
  
          console.log("Results", results)
  
          var gridUrbanismo = new (declare([Grid, Selection]))({
            bufferRows: Infinity,
            columns: {
                objeto: "Fuentes",              
                estado: "Estado"              
            }
        }, "divGrid2");
           
            
            var dataUrbanismo = array.map(results.features, function (feature) {
              console.log("Feature", feature)
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
        function populateGrid3(results) {
  
          // arrayNuevo.push(results.features)
  
          console.log("Results", results)
  
          var gridUrbanismo = new (declare([Grid, Selection]))({
            bufferRows: Infinity,
            columns: {
                objeto: "Bancos",              
                estado: "Estado"              
            }
        }, "divGrid3");         
            
            var dataUrbanismo = array.map(results.features, function (feature) {
              console.log("Feature", feature)
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
        function populateGrid4(results) {
  
          // arrayNuevo.push(results.features)
  
          console.log("Results", results)
  
          var gridUrbanismo = new (declare([Grid, Selection]))({
            bufferRows: Infinity,
            columns: {
                objeto: "Arbolado",              
                estado: "Estado"              
            }
        }, "divGrid4");         
            
            var dataUrbanismo = array.map(results.features, function (feature) {
              console.log("Feature", feature)
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
        function populateGrid5(results) {
  
          // arrayNuevo.push(results.features)
  
          console.log("Results", results)
  
          var gridUrbanismo = new (declare([Grid, Selection]))({
            bufferRows: Infinity,
            columns: {
                objeto: "Parques Infantiles",              
                estado: "Estado"              
            }
        }, "divGrid5");         
            
            var dataUrbanismo = array.map(results.features, function (feature) {
              console.log("Feature", feature)
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
        };
      
  },
  
  onClose: function(){
  
      console.log("Cerrar")
  
      var outFieldsUrban = ["objeto", "estado"];
        
  
        var featurelayer = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/0";      
  
              
              var lyrUrban = new FeatureLayer(featurelayer, {
                  
                  outFields: outFieldsUrban
  
              });            
        var featurelayer1 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/1";
              
              var lyrUrban1 = new FeatureLayer(featurelayer1, {
                  
                  outFields: outFieldsUrban
  
              });            
        var featurelayer2 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/2";
              
              var lyrUrban2 = new FeatureLayer(featurelayer2, {
                  
                  outFields: outFieldsUrban
  
              });            
        var featurelayer3 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/3";
              
              var lyrUrban3 = new FeatureLayer(featurelayer3, {
                  
                  outFields: outFieldsUrban
  
              });            
        var featurelayer4 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/4";
              
              var lyrUrban4 = new FeatureLayer(featurelayer4, {
                  
                  outFields: outFieldsUrban
  
              });            
        var featurelayer5 = "https://desktop-smcdlo2/server/rest/services/PFM/Servicios_Empleados/FeatureServer/5";
              
              var lyrUrban5 = new FeatureLayer(featurelayer5, {
                  
                  outFields: outFieldsUrban
  
              }); 
  
      lyrUrban.visible() = false
      lyrUrban1.visible() = false
      lyrUrban2.visible() = false
      lyrUrban3.visible() = false
      lyrUrban4.visible() = false
      lyrUrban5.visible() = false
  }
    });
  });