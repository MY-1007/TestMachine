var encoder;

function createGIF()
{
	//canvasの取得
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	//GIFEncoderの初期処理
	encoder = new GIFEncoder();
	encoder.setRepeat(0); //繰り返し回数 0=無限ループ
	encoder.setDelay(document.getElementById('anime_speed').value); //1コマあたりの待機秒数（ミリ秒）
	encoder.start();
	//画像ファイル一覧を取得
	frames = document.getElementById('anime').getElementsByTagName('img');
	//canvasのサイズを1枚目のコマに合わせる
	canvas.width = frames[0].naturalWidth;
	canvas.height = frames[0].naturalHeight;
	//全ての画像をcanvasへ描画
	for (var frame_no = 0; frame_no < frames.length; frame_no++) {
        console.log(frame_no);
		ctx.drawImage(frames[frame_no], 0, 0);
		encoder.addFrame(ctx); //コマ追加
	}
	//アニメGIFの生成
	encoder.finish();
    console.log(encode64(encoder.stream().getData()));
	document.getElementById('anime_gif').src = 'data:image/gif;base64,' + encode64(encoder.stream().getData());
	//ダウンロードボタンを表示
	document.getElementById('download').style.display = 'block';
}
function downloadGIF()
{
	encoder.download("download.gif");
}