/**
 * 基本的な地図の描画
 *
 */
$(function(){
	// 初期の地図位置スケールを指定
	var map = L.map('map_element');
	map.setView([35.157789, 136.93096], 14);
	//map.setView([35.172220, 137.0845], 16);
	
	// 自作のOSMタイルサーバを使う.
	var tile2Layer = L.tileLayer('http://tsgMapServer.elcom.nitech.ac.jp/osm/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
//	tile2Layer.addTo(map);// このレイヤーをデフォルトで表示する.
	// // OSMのタイルレイヤーを追加
	var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
//	tileLayer.addTo(map);
	// ただのグレーの画像.
	var grayLayer = L.tileLayer('http://localhost/myTile/background.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
	grayLayer.addTo(map);	// このレイヤーをデフォルトで表示する.



	
	
	// 描画のスタイル設定.
	var strokeStyle = {	// 外枠　黒.
	    "color": "#BDBDBD",
	    "weight": 6,
	    "opacity": 1
	};
	var strokeStyle_blackDash = {	// rail, 黒の点線.
			"stroke": true,
		    "color": "#8C8C8C",
		    "weight": 3,
		    "opacity": 1,
		    "dashArray":"10, 10",
		    "lineCap":"butt"
		};
	var strokeStyle_whiteShort = {	// rail 白線.
			"stroke": true,
		    "color": "#ffffff",
		    "weight": 3,
		    "opacity": 1,
		};
	var strokeStyle_blue = {	// mortorway, 青線.
			"stroke": true,
		    "color": "#89A3CA",
		    "weight": 5,
		    "opacity": 1
		};
	var strokeStyle_green = {	// trunk, 緑.
		    "color": "#94D394",
		    "weight": 5,
		    "opacity": 1
		};
	var strokeStyle_red = {		// primary, 赤.
		    "color": "#DC9E9E",
		    "weight": 5,
		    "opacity": 1
		};
	var strokeStyle_orange = {	// secondary オレンジ.
		    "color": "#F8D6AA",
		    "weight": 5,
		    "opacity": 1
		};
	var strokeStyle_yellow = {	// tertiary 黄色.
		    "color": "#F8F8BA",
		    "weight": 5,
		    "opacity": 1
		};
	var strokeStyle_white = {	// その他道路　白.
		    "color": "#ffffff",
		    "weight": 5,
		    "opacity": 1
		};
	// ストロークの表示.
	var newStroke_blackDash;
	var previousStroke_blackDash;
	var newStroke_whiteShort;
	var previousStroke_whiteShort;
	var newStroke_blue;
	var previousStroke_blue;
	var newStroke_green;
	var previousStroke_green;
	var newStroke_red;
	var previousStroke_red;
	var newStroke_orange;
	var previousStroke_orange;
	var newStroke_yellow;
	var previousStroke_yellow;
	var newStroke_yellow;
	var previousStroke_yellow;
	var newStroke_white;
	var previousStroke_white;


	// ストロークの表示(初回).
	// 中身.
	newStroke_white = new L.GeoJSON.AJAX(drawStrokeUrl("32,41,42") ,{style:strokeStyle_white});
	newStroke_white.addTo(map);
	newStroke_yellow = new L.GeoJSON.AJAX(drawStrokeUrl("31") ,{style:strokeStyle_yellow});
	newStroke_yellow.addTo(map);
	newStroke_orange = new L.GeoJSON.AJAX(drawStrokeUrl("21,22") ,{style:strokeStyle_orange});
	newStroke_orange.addTo(map);
	newStroke_red = new L.GeoJSON.AJAX(drawStrokeUrl("15,16") ,{style:strokeStyle_red});
	newStroke_red.addTo(map);
	newStroke_green = new L.GeoJSON.AJAX(drawStrokeUrl("13,14") ,{style:strokeStyle_green});
	newStroke_green.addTo(map);
	newStroke_blue = new L.GeoJSON.AJAX(drawRoadUrl("car") ,{style:strokeStyle_blue});
	newStroke_blue.addTo(map);
	newStroke_whiteShort = new L.GeoJSON.AJAX(drawRoadUrl("rail") ,{style:strokeStyle_whiteShort});
	newStroke_whiteShort.addTo(map);
	newStroke_blackDash = new L.GeoJSON.AJAX(drawRoadUrl("rail") ,{style:strokeStyle_blackDash});
	newStroke_blackDash.addTo(map);
	
/*	// オーバーレイレイヤー(表示するかの選択可能).
	var overlays = {
//			"stroke": newStroke,
			"stroke_white": newStroke_white,
			"stroke_yellow": newStroke_yellow,
			"stroke_orange": newStroke_orange,
			"stroke_red": newStroke_red,
			"stroke_green": newStroke_green,
			"stroke_blue": newStroke_blue,
			"white":newStroke_whiteShort,
			"stroke_blackDash": newStroke_blackDash,
	};
*/	
	// レイヤーをまとめる.
//	var vectorGroupLayer = L.layerGroup(newStroke_white, newStroke_yellow, newStroke_orange, newStroke_red, newStroke_green, newStroke_blue, newStroke_whiteShort, newStroke_blackDash);
	
	
	// レイヤーの構成
	// ベースレイヤー(デフォルト表示).
	var baseLayers = {
			"gray":grayLayer,
			"OpenStreetMap": tileLayer,
			"localOSM":tile2Layer,
//			"vector":vectorGroupLayer,
	};
	
	L.control.layers(baseLayers).addTo(map);

	// add control scale
	L.control.scale().addTo(map);

	// 各種パラメータの取得.
	getParams();

	///////////////////////////
	// イベント関係///////////////
	///////////////////////////
	/**
	 * 移動が完了したときの処理
	 */
	map.on('moveend', getParams);
	map.on('zoomend', getParams);
	map.on('moveend', moveEndDrawGlue);
	map.on('zoomend', moveEndDrawGlue);
	map.on('moveend', drawStroke);
	
	/**
	 * 各種パラメータの取得
	 */
	function getParams(){
		g_GlobalStaticNumber.centerLngLat = {lng: map.getCenter().lng, lat: map.getCenter().lat};
		g_GlobalStaticNumber.upperLeftLngLat = {lng: map.getBounds().getWest(), lat: map.getBounds().getNorth()};
		g_GlobalStaticNumber.lowerRightLngLat = {lng: map.getBounds().getEast(), lat: map.getBounds().getSouth()};
		g_GlobalStaticNumber.contextScale = map.getZoom();
		g_GlobalStaticNumber.lnglatPer1px = {
				lng: (g_GlobalStaticNumber.lowerRightLngLat.lng - g_GlobalStaticNumber.upperLeftLngLat.lng)  / g_GlobalStaticNumber.windowSize.x, 
				lat: (g_GlobalStaticNumber.upperLeftLngLat.lat  - g_GlobalStaticNumber.lowerRightLngLat.lat) / g_GlobalStaticNumber.windowSize.y};
		//console.info(map.getSize());
	}
	/**
	 * glueの描画
	 */
	function moveEndDrawGlue(){
		g_drawMap.drawFocusGlue();
	}
	
	
	/**
	 * 道路の再描画
	 */
	function drawStroke(){
		console.log('drawStroke');
		previousStroke_blackDash = newStroke_blackDash;
		previousStroke_whiteShort = newStroke_whiteShort;
		previousStroke_blue = newStroke_blue;
		previousStroke_green = newStroke_green;
		previousStroke_red = newStroke_red;
		previousStroke_orange = newStroke_orange;
		previousStroke_yellow = newStroke_yellow;
		previousStroke_white = newStroke_white;
		
		map.removeLayer(previousStroke_blackDash);
		map.removeLayer(previousStroke_whiteShort);
		map.removeLayer(previousStroke_blue);
		map.removeLayer(previousStroke_green);
		map.removeLayer(previousStroke_red);
		map.removeLayer(previousStroke_orange);
		map.removeLayer(previousStroke_yellow);
		map.removeLayer(previousStroke_white);
		// コンソールにurlを表示.
		console.log(drawStrokeUrl());
		// // ストロークの表示(再描画).
		// 中身.
		newStroke_white = new L.GeoJSON.AJAX(drawStrokeUrl("32,41,42") ,{style:strokeStyle_white});
		newStroke_white.addTo(map);
		newStroke_yellow = new L.GeoJSON.AJAX(drawStrokeUrl("31") ,{style:strokeStyle_yellow});
		newStroke_yellow.addTo(map);
		newStroke_orange = new L.GeoJSON.AJAX(drawStrokeUrl("21,22") ,{style:strokeStyle_orange});
		newStroke_orange.addTo(map);
		newStroke_red = new L.GeoJSON.AJAX(drawStrokeUrl("15,16") ,{style:strokeStyle_red});
		newStroke_red.addTo(map);
		newStroke_green = new L.GeoJSON.AJAX(drawStrokeUrl("13,14") ,{style:strokeStyle_green});
		newStroke_green.addTo(map);
		newStroke_blue = new L.GeoJSON.AJAX(drawRoadUrl("car") ,{style:strokeStyle_blue});
		newStroke_blue.addTo(map);
		newStroke_whiteShort = new L.GeoJSON.AJAX(drawRoadUrl("rail") ,{style:strokeStyle_whiteShort});
		newStroke_whiteShort.addTo(map);
		newStroke_blackDash = new L.GeoJSON.AJAX(drawRoadUrl("rail") ,{style:strokeStyle_blackDash});
		newStroke_blackDash.addTo(map);

	}
	/**
	 * 道路を取得するためのURL
	 */
	function drawStrokeUrl(clazz){
		var url = "http://"+location.host+"/EmmaMuraseAllStroke/MainServlet?type=GetStrokeServlet&upperLeftLng="+map.getBounds().getWest()+"&upperLeftLat="+map.getBounds().getNorth()+"&lowerRightLng="+map.getBounds().getEast()+"&lowerRightLat="+map.getBounds().getSouth()+"&width="+g_GlobalStaticNumber.windowSize.x+"&height="+g_GlobalStaticNumber.windowSize.y+"&roadClazz="+clazz;
		console.log(url);
		return url;
	}
	/**
	 * 道路を取得するためのURL
	 */
	function drawRoadUrl(clazz){
		var url = "http://"+location.host+"/EmmaMuraseAllStroke/MainServlet?type=GetRoadServlet&upperLeftLng="+map.getBounds().getWest()+"&upperLeftLat="+map.getBounds().getNorth()+"&lowerRightLng="+map.getBounds().getEast()+"&lowerRightLat="+map.getBounds().getSouth()+"&width="+g_GlobalStaticNumber.windowSize.x+"&height="+g_GlobalStaticNumber.windowSize.y+"&roadClazzName="+clazz;
		console.log(url);
		return url;
	}

});