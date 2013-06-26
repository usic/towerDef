function getBezierBasis(i, n, t) {
	
	function f(n) {
		return (n <= 1) ? 1 : n * f(n - 1);
	};
	
	return (f(n)/(f(i)*f(n - i)))* Math.pow(t, i)*Math.pow(1 - t, n - i);
}

// arr - dots.  (x = arr[0], y = arr[1])
// step -  (0 < step < 1)
function getBezierPath(arr, step) {
	if (step == undefined) {
		step = 0.01;
	}
	
	var res = new Array()
	
	for (var t = 0; t < 1 + step; t += step) {
		if (t > 1) {
			t = 1;
		}
		
		var ind = res.length;
		
		res[ind] = new Array(0, 0);
		
		for (var i = 0; i < arr.length; i++) {
			var b = getBezierBasis(i, arr.length - 1, t);
			
			res[ind][0] += arr[i][0] * b;
			res[ind][1] += arr[i][1] * b;
		}
	}
	
	return res;
}

var arr = Array();
arr[0] = new Array(0, 65);
arr[1] = new Array(0, 65);
arr[2] = new Array(105, 65);
arr[3] = new Array(105, 65);
arr[4] = new Array(210, 65);
arr[5] = new Array(160, 350);
arr[6] = new Array(100, 400);
arr[7] = new Array(100, 420);
arr[8] = new Array(0, 510);
arr[9] = new Array(310, 545);
arr[10] = new Array(295, 525);
arr[11] = new Array(300, 290);
arr[12] = new Array(290, 100);
arr[13] = new Array(529, 355);
arr[14] = new Array(510, 280);
arr[15] = new Array(540, 660);
arr[16] = new Array(590, 580);
arr[17] = new Array(625, 610);

var pathAr = Array();
pathAr = getBezierPath(arr);