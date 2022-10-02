    // to be imported right before the main script
    
    // -----------------Create a Class URL generator
    class UrlGenerator {
      constructor(api, version, projection, format, style, xmin, xmax, ymin, ymax, height, width) {
          this.api = api;
          this.version = version;
          this.projection = projection;
          this.format = format;
          this.style = style;
          this.xmin = xmin;
          this.xmax = xmax;
          this.ymin = ymin;
          this.ymax = ymax;
          this.height = height;
          this.width = width;
          this.layer = null;
          this.time = null;


      }
      getDate() {
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth() + 1).padStart(2, '0'); //janvier = 0
          let yyyy = today.getFullYear();

          return `${yyyy}-${mm}-${dd}`;
          //return dd + '/' + mm + '/' + yyyy; // change form if you need
      }

      
      getUrlFromPara() {
          var url = this.api + this.projection + "/best/wms.cgi?TIME="+this.time+"T00:00:00Z&LAYERS="+this.layer+"&REQUEST=GetMap&SERVICE=WMS&FORMAT="+this.format+"&STYLES=&HEIGHT="+this.height+"&VERSION="+this.version+"&CRS=epsg:"+this.projection+"&WIDTH="+this.width+"&BBOX="+this.xmin+","+this.ymin+","+this.xmax+","+this.ymax+"&TRANSPARENT=TRUE";
          return url


      }
      //returns the three urls
      getCustomUrls(projection, model) {
          this.projection = projection;
          // update layer based on model
          switch (model) {
              case "FIRES":
                  this.layer = "MODIS_Aqua_Thermal_Anomalies_All";
                  break;
              case "WATER":
                  this.layer = "MERRA2_Convective_Rainwater_Source_700hPa_Monthly";
              default:
                  this.layer = "AIRS_L3_Carbon_Dioxide_AIRS_AMSU_Monthly"
          }
          //get the three urls based on date
          var images = { past: null, present: null, future: null };
          images.past = this.getUrlPast();
          images.present = this.getUrlPresent();
          images.future = this.getUrlFuture();
          return images
      }
      //get the date of today 
      getUrlPresent() {
          this.time =this.getDate();
          return this.getUrlFromPara();

      }
      // get the url of an image in the past
      getUrlPast() {
          this.time="2004-10-01";
          return this.getUrlFromPara();


      }
      // get the url of the image after processing
      getUrlFuture() {
          // call preprocessing
          this.time="2020-10-01";
          return this.getUrlFromPara();
          

      }
  }

//var urlG=new UrlGenerator("https://gibs.earthdata.nasa.gov/wms/epsg","1.3.0",4321,"image/png","default","-180","180","-40","40",600,600);
//console.log(urlG.getCustomUrls(4326,"POLLUTION"));



