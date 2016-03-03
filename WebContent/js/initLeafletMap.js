/**
 * 基本的な地図の描画
 *
 */
$(function(){
	// 初期の地図位置スケールを指定
	var map = L.map('map_element');
	map.setView([35.157789, 136.93096], 15);
	//map.setView([35.172220, 137.0845], 16);
	
	// 自作のOSMタイルサーバを使う.
	var tile2Layer = L.tileLayer('http://tsgMapServer.elcom.nitech.ac.jp/osm/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
	tile2Layer.addTo(map);// このレイヤーをデフォルトで表示する.
	// // OSMのタイルレイヤーを追加
	var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});

	// レイヤーの構成
	// ベースレイヤー(デフォルト表示).
	var baseLayers = {
//			"gray":grayLayer,
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
//	map.on('moveend', drawStroke);
	
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

});