


/**
 * 初期処理
 */
$(function(){
// ウインドウサイズを設定する.
ResizeEvent.prototype.resizeWindow();
// 初期のglueの位置設定.
g_GlobalStaticNumber.gluePositionXy={
		x:(Math.floor(g_GlobalStaticNumber.windowSize.x/2)-g_GlobalStaticNumber.glueOuterRadius), 
		y:(Math.floor(g_GlobalStaticNumber.windowSize.y/2)-g_GlobalStaticNumber.glueOuterRadius)};
});



/**
 * グローバル変数
 */
/** glueの更新間隔(ms) */
const GLUE_UPDATE_INTARVAL = 100;
/** focusの更新間隔 */
const FOCUS_UPDATE_INTARVAL = 100;
/** glueの大きさ変更間隔 */
const GLUE_CHANGE_RADIUS_INTARVAL = 100;
var g_dragDropEvent;
var g_mouseMoveEvent;
var g_resizeEvent;
var g_wheelEvent;
var g_drawMap;
/**
 * 初期処理
 */
$(function(){
	g_dragDropEvent = new DragDropEvent();
	g_mouseMoveEvent = new MouseMoveEvent();
	g_resizeEvent = new ResizeEvent();
	g_resizeEvent = new ResizeEvent();
	g_resizeEvent = new ResizeEvent();
	g_wheelEvent = new WheelEvent();
	g_drawMap = new DrawMap();
});

