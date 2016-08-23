HTMLWidgets.widget({

  name: 'forceMap',

  type: 'output',

  initialize: function(el, width, height) {

     d3.select(el).append("svg")
      .attr("width", width)
      .attr("height", height);

  },

  resize: function(el, width, height, force) {

     d3.select(el).select("svg")
      .attr("width", width)
      .attr("height", height);

  },

   renderValue: function(el, x, force) {
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    var padding = 10;
    var k;
    var node;

    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Country: </strong> " + d.name + "<br> <strong>Values: </strong>" + d.values;
    })

    var pixelLoc = d3.geo.mercator();
    pixelLoc.scale(2000);

    var svg = d3.select(el).select("svg");
    svg.selectAll("*").remove();
	   
	svg.call(tip);

    var coordinates = {"HKG":[114.18514,22.33739],"AFG":[65.953,33.81789],"ALB":[20.05381,41.13981],"ALG":[2.61889,28.09333],"AND":[1.56037,42.54166],"ANG":[17.52424,-12.27611],"ANT":[-61.81234,17.13602],"ARG":[-64.68358,-35.04191],"ARM":[44.93486,40.28632],"AUS":[134.06216,-25.54998],"AUT":[14.12392,47.58376],"AZE":[47.54172,40.28582],"BRN":[50.54424,26.04957],"BAN":[90.23954,23.83488],"BAR":[-59.55974,13.18016],"BLR":[28.02204,53.52057],"BEL":[4.64329,50.63625],"BIZ":[-88.70516,17.19661],"BEN":[2.32795,9.63923],"BHU":[90.40393,27.41005],"BOL":[-64.65699,-16.68428],"BIH":[17.77591,44.16888],"BOT":[23.79613,-22.17262],"BRA":[-52.97675,-10.64158],"BRU":[114.72659,4.51711],"BUL":[25.21439,42.76592],"BUR":[-1.75813,12.26718],"BDI":[29.87528,-3.35715],"CAM":[104.89709,12.71436],"CMR":[12.72988,5.6889],"CAN":[-96.15424,60.07915],"CPV":[-23.1719,15.28753],"CAF":[20.46133,6.56552],"CHA":[18.6251,15.30713],"CHI":[-69.4363,-25.09632],"CHN":[103.16494,36.24003],"COL":[-73.032,3.90682],"COM":[43.34171,-11.77238],"CRC":[-84.18999,9.97436],"CRO":[15.32002,44.91873],"CUB":[-79.0156,21.62477],"CYP":[32.99236,34.91509],"CZE":[15.31708,49.73065],"COD":[23.61893,-2.87219],"DEN":[10.05325,55.96125],"DJI":[42.56628,11.7505],"DMA":[-61.35647,15.43747],"DOM":[-70.49457,18.89534],"TLS":[125.85309,-8.82315],"ECU":[-78.76978,-1.42455],"EGY":[29.84889,26.46437],"ESA":[-88.8693,13.73731],"GEQ":[10.33422,1.70718],"ERI":[38.85544,15.35356],"EST":[25.53527,58.66861],"ETH":[39.59028,8.61313],"FSM":[158.23131,6.88151],"FIJ":[177.933,-17.83403],"FIN":[26.21424,64.39735],"GAB":[11.79101,-0.58664],"GAM":[-15.39973,13.44943],"GEO":[43.51309,42.1671],"GER":[10.36998,51.07675],"GHA":[-1.21638,7.95021],"GRE":[22.97146,39.03829],"GRN":[-61.65832,12.14593],"GUA":[-90.35963,15.69084],"GUI":[-10.94103,10.43323],"GBS":[-14.97813,12.02649],"GUY":[-58.96719,4.79528],"HAI":[-72.68948,18.93612],"HON":[-86.6196,14.82233],"HUN":[19.38882,47.16057],"ISL":[-18.60054,64.99382],"IND":[79.44557,22.79164],"INA":[113.45878,-0.98878],"IRI":[54.30629,32.51014],"IRQ":[43.74488,33.01951],"IRL":[-8.14457,53.17248],"ISR":[34.8561,31.06329],"ITA":[12.11742,42.74224],"CIV":[-5.56826,7.62579],"JAM":[-77.31856,18.1548],"JPN":[139.01415,36.67071],"JOR":[36.76227,31.24159],"KAZ":[67.20939,48.10068],"KEN":[37.78519,0.59635],"KIR":[-157.38191,1.83885],"KUW":[47.59074,29.33678],"KGZ":[74.52193,41.45783],"LAO":[103.72868,18.47984],"LAT":[24.91079,56.8504],"LIB":[35.87909,33.92012],"LES":[28.22868,-29.57866],"LBR":[-9.3184,6.45165],"LBA":[18.01273,27.00295],"LIE":[9.54109,47.13882],"LTU":[23.89032,55.32385],"LUX":[6.07115,49.76799],"MKD":[21.68314,41.59461],"MAD":[46.69117,-19.34235],"MAW":[34.27915,-13.21164],"MAS":[102.27495,3.5276],"MDV":[73.41163,3.25926],"MLI":[-3.55494,17.32072],"MLT":[14.40233,35.92116],"MHL":[171.08177,7.12946],"MTN":[-10.34685,20.23367],"MRI":[57.56966,-20.28033],"MEX":[-102.22244,23.91871],"MDA":[28.46385,47.19077],"MON":[7.3965,43.74491],"MGL":[103.0363,46.78946],"MNE":[19.23867,42.78492],"MAR":[-8.55871,29.77909],"MOZ":[35.53179,-17.22616],"MYA":[96.40333,21.12166],"NAM":[17.19186,-22.09712],"NRU":[166.93289,-0.51976],"NEP":[83.9293,28.24143],"ARU":[-69.97322,12.5162],"NED":[5.04475,52.02888],"AHO":[-63.0704,18.03989],"COK":[-159.77891,-21.21685],"NZL":[171.57649,-41.77498],"NCA":[-85.02901,12.84287],"NIG":[9.35995,17.4051],"NGR":[8.08541,9.59082],"PRK":[127.15123,40.15899],"NOR":[24.65511,69.82261],"OMA":[56.06485,20.59182],"PAK":[69.2117,29.90883],"PLW":[134.56611,7.49219],"PLE":[35.24474,31.94504],"PAN":[-80.12332,8.51046],"PNG":[145.1974,-6.46756],"PAR":[-58.4018,-23.20979],"PER":[-74.30893,-9.11484],"PHI":[121.25972,17.59892],"POL":[19.40238,52.10934],"POR":[-8.59957,39.57628],"QAT":[51.18702,25.31194],"SRB":[20.79563,44.21558],"CGO":[15.21485,-0.83666],"ROU":[24.97485,45.84519],"RUS":[93.44382,61.62942],"RWA":[29.91936,-1.99246],"SKN":[-62.78419,17.35411],"LCA":[-60.96974,13.9029],"VIN":[-61.19568,13.24077],"SAM":[-172.40674,-13.68597],"SMR":[12.44126,43.93612],"STP":[6.64652,0.36021],"KSA":[44.56066,24.07331],"SEN":[-14.46896,14.36541],"SEY":[55.43078,-4.62291],"SLE":[-11.79534,8.5621],"SIN":[103.81424,1.35812],"SVK":[19.47663,48.70467],"SLO":[14.80654,46.1157],"SOL":[160.83819,-8.67007],"SOM":[45.66806,4.75007],"RSA":[25.11813,-28.96531],"KOR":[127.81922,36.34457],"ESP":[-3.67792,40.20706],"SRI":[80.70022,7.61716],"SUD":[29.90814,15.96641],"SUR":[-55.9089,4.12845],"SWZ":[31.48028,-26.56121],"SWE":[16.53836,62.63076],"SUI":[8.21438,46.79769],"SYR":[38.49274,35.01733],"TPE":[120.94553,23.75089],"TJK":[71.01912,38.52482],"THA":[100.92744,15.09093],"BAH":[-77.9286,24.48341],"TOG":[0.9626,8.52504],"TGA":[-175.15909,-21.19225],"TRI":[-61.25681,10.46767],"TUN":[9.55095,34.10307],"TUR":[35.16803,39.0547],"TKM":[59.39971,39.09942],"UGA":[32.36391,1.27602],"UKR":[31.40916,48.97864],"UAE":[54.29821,23.90651],"BER":[-64.76883,32.29519],"CAY":[-81.39748,19.35812],"IVB":[-64.41168,18.46796],"GBR":[-1.52026,52.14175],"TAN":[34.7958,-6.27202],"ASA":[-170.76129,-14.33177],"GUM":[144.77208,13.44363],"PUR":[-66.46675,18.22617],"USA":[-105.59203,44.14974],"URU":[-56.015,-32.79348],"UZB":[63.19126,41.73225],"VAN":[169.10503,-18.81943],"VEN":[-66.15274,7.12393],"VIE":[107.43987,11.47421],"YEM":[47.58073,15.90433],"ZAM":[27.78124,-13.44893],"ZIM":[29.84733,-18.99623],"FRA":[2.796175,46.589945],"ISV":[-64.861908,18.375379]};

    var countries = x;

    console.log(countries)

    var coords = [];
    var xs = [];
    var ys = []
    for (alias in coordinates) {
      coords.push(coordinates[alias]);
      xs.push(coordinates[alias][0]);
      ys.push(coordinates[alias][1]);
    }

    var minX = d3.min(xs);
    var maxX = d3.max(xs);
    var xScale = d3.scale.linear().domain([minX, maxX]).range([-50, -30]);

    var minY = d3.min(ys);
    var maxY = d3.max(ys);
    var yScale = d3.scale.linear().domain([minY, maxY]).range([-10, 0]);

	var minRad = d3.min(countries, function(d) { return d.values;} );
    var maxRad = d3.max(countries, function(d) { return d.values;} );
	   
    var pointScale = d3.scale.linear().domain([minRad, maxRad]).range([25, 100]);

      nodes = []
      for (i=0; i < countries.length; i++) {
        node = countries[i];
        node.coordinates = coordinates[node.alias];
        node.cx = xScale(pixelLoc(node.coordinates)[0]);
        node.cy = yScale(pixelLoc(node.coordinates)[1]);
        node.radius = pointScale(node.values);
        nodes.push(node);
      }
	   
      force = d3.layout.force()
                .nodes(nodes)
                .links([])
                .size([width, height])
                .charge(function(d) {
                  -Math.pow(d.radius*5.0, 2.0) / 8
                })
                .gravity(1.7)
                .on('tick', function(e) {
                  k = 10 * e.alpha;
                  for (i=0; i < nodes.length; i++) {
                    nodes[i].x += k * nodes[i].cx
                    nodes[i].y += k * nodes[i].cy
                  }
                  svg.selectAll('circle')
                     .each(collide(.1, nodes, pointScale))
                     .attr('cx', function(node) { return node.x; })
                     .attr('cy', function(node) { return node.y; });

                  svg.selectAll('text')
                     .attr('x', function(node) { return node.x; })
                     .attr('y', function(node) { return node.y+5; })
                     .attr('opacity', function(node) {
                       if (node.radius < 17) {
                         return 0;
                       }
                       return 1;
                     });
                     ;
                })
                .start();

      svg.selectAll('circle')
          .data(nodes)
        .enter().append('svg:circle')
          .attr('cx', function(node) {
            return node.cx;
          })
          .attr('cy', function(node) {
            return node.cy;
          })
          .attr('r', function(node) {
            return node.radius;
          })
          .attr('class', function(node) {
            return node.continent.replace(' ', '');
          })
          .on('mouseover', function(d){
		    tip.show(d);
		    d3.select(this).style("opacity",1);
	      })
          .on('mouseout', function(d){
		    tip.hide(d);
		    d3.select(this).style("opacity",0.75);
	      });

    svg.selectAll('text')
        .data(nodes)
      .enter().append('svg:text')
        .text(function(node) {
          return node.alias;
        });

  // Adapted from http://bl.ocks.org/3116713
  var collide = function (alpha, nodes, scale) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      var r = d.radius + scale.domain()[1] + padding;
      var nx1 = d.x - r;
      var nx2 = d.x + r;
      var ny1 = d.y - r;
      var ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && quad.point !== d) {
          var x = d.x - quad.point.x;
          var y = d.y - quad.point.y;
          var l = Math.sqrt(x * x + y * y)
          var r = d.radius + quad.point.radius + padding;
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    }
  }


}


});
