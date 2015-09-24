/**
 * 地図の描画に関するクラス
 */
function DrawMap(){
	
}
/**
 * focusとglueの描画
 */
DrawMap.prototype.drawFocusGlue = function(){
	g_drawMap.drawGlue(
			g_GlobalStaticNumber.upperLeftLngLat.lng + (g_GlobalStaticNumber.gluePositionXy.x+g_GlobalStaticNumber.glueOuterRadius) * g_GlobalStaticNumber.lnglatPer1px.lng, 
			g_GlobalStaticNumber.upperLeftLngLat.lat - (g_GlobalStaticNumber.gluePositionXy.y+g_GlobalStaticNumber.glueOuterRadius) * g_GlobalStaticNumber.lnglatPer1px.lat,
			g_GlobalStaticNumber.focusScale,
			g_GlobalStaticNumber.contextScale);
	g_drawMap.drawFocus(
			g_GlobalStaticNumber.upperLeftLngLat.lng + (g_GlobalStaticNumber.gluePositionXy.x+g_GlobalStaticNumber.glueOuterRadius) * g_GlobalStaticNumber.lnglatPer1px.lng, 
			g_GlobalStaticNumber.upperLeftLngLat.lat - (g_GlobalStaticNumber.gluePositionXy.y+g_GlobalStaticNumber.glueOuterRadius) * g_GlobalStaticNumber.lnglatPer1px.lat,
			g_GlobalStaticNumber.focusScale);
};

/**
 * glueの描画
 * lng,lat 中心の緯度経度
 * focus_zoom_level, context_zoom_level focus,contextのズームレベル
 */
DrawMap.prototype.drawGlue = function (lng, lat, focus_zoom_level, context_zoom_level){
	// 地図画像の描画.
    var canvas = document.getElementById('layer1');
    if ( ! canvas || ! canvas.getContext ) { return false; }
    var context = canvas.getContext('2d');
    var img = new Image();      //Image obj作成
    //ブラウザのcache対策 
    var elasticRoadCar = "http://133.68.13.112:8080/EmmaGlueMuraseOriginal/MainServlet?" +
    		"type="+"DrawElasticRoad"+
    		"&centerLngLat="+lng+","+lat+
    		"&focus_zoom_level="+focus_zoom_level+
    		"&context_zoom_level="+context_zoom_level+
    		"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+
    		"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+
    		"&roadType=" +"car";//+
    		//"?" + new Date().getTime();
    var elasticRoadAll = "http://133.68.13.112:8080/EmmaGlueMuraseOriginal/MainServlet?" +
	"type="+"DrawElasticRoad"+
	"&centerLngLat="+lng+","+lat+
	"&focus_zoom_level="+focus_zoom_level+
	"&context_zoom_level="+context_zoom_level+
	"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+
	"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+
	"&roadType=" +"all";//+
	//"?" + new Date().getTime();

    var elasticStroke = "http://133.68.13.112:8080/EmmaGlueMuraseOriginal/MainServlet?" +
	"type="+"DrawElasticStroke"+
	"&centerLngLat="+lng+","+lat+
	"&focus_zoom_level="+focus_zoom_level+
	"&context_zoom_level="+context_zoom_level+
	"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+
	"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+
	"&roadType=" +"car"+
	"?" + new Date().getTime();
    
    // ラジオボタンの選択状態でどのglueを使うか決める.
    switch($("select[name='glue_style'] option:selected").val()){
    case "roadGlueCar":
    	img.src = elasticRoadCar;
    	break;
    case "roadGlueAll":
    	img.src = elasticRoadAll;
    	break;
    case "strokeGlue":
    	img.src = elasticStroke;
    	break;
    }
    	
    console.log(img.src);
	// 画像読込みを待って、処理続行 
	img.onload = function() {
		//refer to http://www.html5.jp/canvas/how6.html
		context.scale(1,1);
		//console.log(context.drawImage(img, 0, 0, 400, 400));
		context.drawImage(img, 0, 0);
	};
};

/**
 * focusの描画
 */
DrawMap.prototype.drawFocus = function (lng, lat, zoom_level){
	// 地図画像の描画.
    var canvas = document.getElementById('layer2');
    if ( ! canvas || ! canvas.getContext ) { return false; }
    var context = canvas.getContext('2d');
    var img = new Image();      //Image obj作成
    //ブラウザのcache対策 
    img.src = "http://rain2.elcom.nitech.ac.jp/OsmStaticMap/staticmap.php?" +
    		"center="+lat+","+lng+"" +
    		"&zoom=" +zoom_level+
    		"&size="+(g_GlobalStaticNumber.glueInnerRadius*2)+"x"+(g_GlobalStaticNumber.glueInnerRadius*2)+"" +
    		"&maptype=mapnik_local"+
    		"?" + new Date().getTime();
    console.log(img.src);
	// 画像読込みを待って、処理続行 
	img.onload = function() {
		//refer to http://www.html5.jp/canvas/how6.html
		context.scale(1,1);
		//console.log(context.drawImage(img, 0, 0, 400, 400));
		context.drawImage(img, 0, 0);
	};

}

