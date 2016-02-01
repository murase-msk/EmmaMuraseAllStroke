/**
 * 地図の描画に関するクラス
 */
function DrawMap(){
	
}
/**
 * focusとglueの描画
 */
DrawMap.prototype.drawFocusGlue = function(){
//	g_drawMap.drawGlue(
//			g_GlobalStaticNumber.upperLeftLngLat.lng + (g_GlobalStaticNumber.gluePositionXy.x+g_GlobalStaticNumber.glueOuterRadius) * g_GlobalStaticNumber.lnglatPer1px.lng, 
//			g_GlobalStaticNumber.upperLeftLngLat.lat - (g_GlobalStaticNumber.gluePositionXy.y+g_GlobalStaticNumber.glueOuterRadius) * g_GlobalStaticNumber.lnglatPer1px.lat,
//			g_GlobalStaticNumber.focusScale,
//			g_GlobalStaticNumber.contextScale);
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
    var glueImageArray = {
    		roadGlueCar: "http://rain2.elcom.nitech.ac.jp:8080/EmmaGlueMuraseOriginal/MainServlet?" +
    		"type="+"DrawElasticRoad"+
    		"&centerLngLat="+lng+","+lat+
    		"&focus_zoom_level="+focus_zoom_level+
    		"&context_zoom_level="+context_zoom_level+
    		"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+
    		"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+
    		"&roadType=" +"car",
    		roadGlueAll : "http://rain2.elcom.nitech.ac.jp:8080/EmmaGlueMuraseOriginal/MainServlet?" +
    		"type="+"DrawElasticRoad"+
    		"&centerLngLat="+lng+","+lat+
    		"&focus_zoom_level="+focus_zoom_level+
    		"&context_zoom_level="+context_zoom_level+
    		"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+
    		"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+
    		"&roadType=" +"all&isDrawPolygon=true",
    		strokeGlue : "http://rain2.elcom.nitech.ac.jp:8080/EmmaGlueMuraseOriginal/MainServlet?" +
    		"type="+"DrawElasticStroke_v2"+
    		"&centerLngLat="+lng+","+lat+
    		"&focus_zoom_level="+focus_zoom_level+
    		"&context_zoom_level="+context_zoom_level+
    		"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+
    		"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+
    		"&roadType=" +"car",
    		strokeGlueConn : "http://rain2.elcom.nitech.ac.jp:8080/EmmaGlueMuraseOriginal/MainServlet?" +
    		"type="+"DrawElasticStrokeConnectivity"+
    		"&centerLngLat="+lng+","+lat+
    		"&focus_zoom_level="+focus_zoom_level+
    		"&context_zoom_level="+context_zoom_level+
    		"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+
    		"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+
    		"&roadType=" +"car",
    		mitinari : "http://rain2.elcom.nitech.ac.jp:8080/EmmaGlueMuraseOriginal/MainServlet?" +
    		"type="+"DrawMitinariSenbetuAlgorithm"+
    		"&centerLngLat="+lng+","+lat+
    		"&focus_zoom_level="+focus_zoom_level+
    		"&context_zoom_level="+context_zoom_level+
    		"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+
    		"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+
    		"&roadType=" +"car",
    		drawGlue_v2 : "http://rain2.elcom.nitech.ac.jp:8080/EmmaGlueMuraseOriginal/MainServlet?" +
    		"type="+"DrawGlue_v2"+
    		"&centerLngLat="+lng+","+lat+
    		"&focus_zoom_level="+focus_zoom_level+
    		"&context_zoom_level="+context_zoom_level+
    		"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+
    		"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+
    		"&roadType=" +"car",
    };
    
    // ラジオボタンの選択状態でどのglueを使うか決める.
    img.src = glueImageArray[$("select[name='glue_style'] option:selected").val()];
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
 * glueを描画(ベクターをレンダリング)
 */
DrawMap.prototype.drawGlue2 = function(lng, lat, focus_zoom_level, context_zoom_level){
	console.log("drawGlue2");
	console.log("http://133.68.13.112:8080/EmmaGlueMuraseOriginal/MainServlet?type=DrawGlue_v2" +
			"&centerLngLat="+lng+","+lat+"" +
			"&focus_zoom_level="+focus_zoom_level+"&context_zoom_level="+context_zoom_level+"" +
			"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+"&roadType=car&option=vector2");
	$.ajax({
		type:'GET',
		url:"http://133.68.13.112:8080/EmmaGlueMuraseOriginal/MainServlet?type=DrawGlue_v2" +
				"&centerLngLat="+lng+","+lat+"" +
				"&focus_zoom_level="+focus_zoom_level+"&context_zoom_level="+context_zoom_level+"" +
				"&glue_inner_radius="+g_GlobalStaticNumber.glueInnerRadius+"&glue_outer_radius="+g_GlobalStaticNumber.glueOuterRadius+"&roadType=car&option=vector2",
		dataType:'json',
		success: function(json){
//			console.log("success ajax");
			
			// canvasで描画.
			var canvas = document.getElementById('layer1');
			if ( ! canvas || ! canvas.getContext ) { return false; }
			var context = canvas.getContext('2d');
			// 色をすべてクリアする.
			context.fillStyle = "rgb(241,238,232)";
			context.fillRect(0, 0, g_GlobalStaticNumber.glueOuterRadius*2, g_GlobalStaticNumber.glueOuterRadius*2);
			//色を指定する
			context.strokeStyle = 'rgb(00,00,00)'; //枠線の色は黒
			context.lineWidth = 4;// 線の太さ.

			for(var i=0; i<json.data.length; i++){
//			for(var i=0; i<1; i++){
				// 再描画.
				var line = json.data[i].selectedTransformedPoint;
				 //新しいパスを開始する
				context.beginPath();
				//パスの開始座標を指定する
				context.moveTo(line[0].x, line[0].y);
				
				for(var j=1; j<line.length; j++){
					//座標を指定してラインを引いていく
					context.lineTo(line[j].x, line[j].y);
//					console.info(" line "+line[j].x+"  "+ line[j].y);
				}
				//現在のパスを輪郭表示する
				context.stroke();
			}
		},
	 error: function(XMLHttpRequest, textStatus, errorThrown) {
         console.log("XMLHttpRequest : " + XMLHttpRequest.status);
         console.log("textStatus : " + textStatus);
         console.log("errorThrown : " + errorThrown.message);
      },
	});
};

/**
 * 描画
 * @param aLine=[{x:...,y:...}, {x:...,y:...}, ...]
 */
DrawMap.prototype.drawLine = function(aLine){
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
    		"&maptype=mapnik_local";//+
    		//"?" + new Date().getTime();
//    console.log(img.src);
	// 画像読込みを待って、処理続行 
	img.onload = function() {
		//refer to http://www.html5.jp/canvas/how6.html
		context.scale(1,1);
		//console.log(context.drawImage(img, 0, 0, 400, 400));
		context.drawImage(img, 0, 0);
	};
};

