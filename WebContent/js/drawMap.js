/**
 * 空の処理
 * @constructor
 * @classdesc 地図の描画に関するクラス
 * 
 */
function DrawMap(){
	
	/**
	 * focusとglueの描画
	 */
	this.drawFocusGlue = function(){
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
	 * @param lng {Number} 中心の経度
	 * @param lat {Number} 中心の緯度
	 * @param focus_zoom_level {Number} focusのズームレベル
	 * @param context_zoom_level {Number} contextのズームレベル
	 */
	this.drawGlue = function (lng, lat, focus_zoom_level, context_zoom_level){
		// 地図画像の描画.
	    var canvas = document.getElementById('layer1');
	    if ( ! canvas || ! canvas.getContext ) { return false; }
	    var context = canvas.getContext('2d');
	    var img = new Image();      //Image obj作成
	    
	    // 各GlueのリクエストURLを設定.
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
//	    console.log(img.src);
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
	 * @param lng {Number} 中心の経度
	 * @param lat {Number} 中心の緯度
	 * @param zoom_level {Number} ズームレベル
	 */
	this.drawFocus = function (lng, lat, zoom_level){
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
//	    console.log(img.src);
		// 画像読込みを待って、処理続行 
		img.onload = function() {
			//refer to http://www.html5.jp/canvas/how6.html
			context.scale(1,1);
			//console.log(context.drawImage(img, 0, 0, 400, 400));
			context.drawImage(img, 0, 0);
		};
	};
}

