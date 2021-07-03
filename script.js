// default variables
var lum_8bit = 13



//generic functions

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE11 */
		elem.msRequestFullscreen();
	}
}

/* Close fullscreen */
function closeFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) { /* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE11 */
		document.msExitFullscreen();
	}
}



//program specific functions
function setColor(color){
	lum_8bit = color
	document.getElementById("luminance_8bit").textContent = color
	document.getElementById("luminance_percent").textContent = Math.round(color/255*100)
	document.body.style.backgroundColor = "rgb("+color+","+color+","+color+")"
	slider.noUiSlider.set(color);
}

function setColorFromSlider(color){
	lum_8bit = color
	document.getElementById("luminance_8bit").textContent = color
	document.getElementById("luminance_percent").textContent = Math.round(color/255*100)
	document.body.style.backgroundColor = "rgb("+color+","+color+","+color+")"
}

function uncheckRadios(){
	let radios = document.getElementsByClassName("form-check-input")

	for (var i = 0; i < radios.length; i++) {
		radios.item(i).checked = false;
	}
}

function applyRadioValue(color){
	document.getElementById("textValue").value = "";
	setColor(color)
	document.activeElement.blur()
}

function applyTextValue(){
	if (document.getElementById("textValue").value == ""){
		return
	}

	lum_8bit = Math.round(document.getElementById("textValue").value)
	lum_8bit = Math.min(Math.max(lum_8bit, 0), 255);

	document.getElementById("textValue").value = lum_8bit
	if (!isNaN(lum_8bit)){
		uncheckRadios()
		setColor(lum_8bit)
	}
}

document.onkeydown = checkKey;
function checkKey(e) {
	e = e || window.event;
	var colorChange = 0


	//arrow keys
	if (e.keyCode == '38') {
		var colorChange = 1
	}
	else if (e.keyCode == '40') {
		var colorChange = -1
	}

	if (colorChange==1 || colorChange==-1){
		document.getElementById("textValue").value = "";
		uncheckRadios()

		var newColor = lum_8bit + colorChange
		newColor = Math.min(Math.max(newColor, 0), 255);
		setColor(newColor)
	}


	//space key
	if (e.keyCode == '32') {

		var panel = document.getElementById("panel")

		if (panel.classList.contains('hide')){
			closeFullscreen()
		} else {
			openFullscreen()
		}

		panel.classList.toggle('hide');

	}


}



function init(){
	var slider = document.getElementById('slider');
	// slider.noUiSlider.set(200);
	slider.noUiSlider.on('update', function (values, handle) {
		setColorFromSlider(Math.round(values))
	});
	slider.noUiSlider.on('start', function (values, handle) {
		// console.log("hello")
		uncheckRadios()
	});
}

window.onload = init;