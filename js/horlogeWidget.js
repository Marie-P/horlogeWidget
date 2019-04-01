class horlogeWidget extends Widget {
	
	constructor(id,app) {
		super(id,horlogeModel, horlogeView, horlogeController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = false;
		this.sizeX = 2;
		this.sizeY = 2;
		this.radius = 15;
	}
	
	ready() {
		super.ready();
		
	}
	
}

class horlogeModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
}

class horlogeView extends WidgetView {
	
	constructor() {
		super();
	}

	draw() {
		super.draw();

		this.try.input = document.createElement("input");

		
		let toDraw = document.createElement("canvas");
		toDraw.width = 150 * this.try.mvc.main.sizeX;
		toDraw.height = 150 * this.try.mvc.main.sizeY - 25;
		this.try.stage.appendChild(toDraw);

		let clock = toDraw.getContext('2d');


		function changeHours(h)
		{
			return (360/12) * h - 90; // Calcul d'angle (360/12) à partir de l'heure récupérée

		}

		function changeMinutes(min)
		{
			// Calcul d'angle (360/60) à partir des minutes
			return (360/60) * min - 90;
		}

		function radians(degrees)
		{
			// Convertit les degrés entrée en radian
			return degrees * Math.PI / 180;
		}

		function toVec(radians)
		{
			// le cosinus et le sinus
			return [
			Math.cos(radians),
			Math.sin(radians)
			];

		}

		function needle(vec,length)
		{
			// On va dessiner les aiguilles
			vec[0] *= length;
			vec[1] *= length;

			clock.moveTo(toDraw.width/2, toDraw.height/2);
			clock.lineTo(vec[0] + toDraw.width/2,vec[1] + toDraw.height/2);
		}

		function drawAClock()
		{
		
			clock.clearRect(0, 0, toDraw.width, toDraw.height);
			clock.beginPath(); 
			clock.arc(toDraw.width/2, toDraw.height/2, toDraw.height/2, 0, 2 * Math.PI);

			clock.stroke();
			let time = new Date();
			let hours = time.getHours(); 
			let minutes = time.getMinutes();
			let seconds = time.getSeconds();

			clock.restore();
			clock.beginPath(); 
		

			needle(toVec(radians(changeMinutes(minutes))), toDraw.width/2.5);
			needle(toVec(radians(changeHours(hours))), toDraw.width/5);
			needle(toVec(radians(changeMinutes(seconds))), toDraw.width/2.5);

			clock.stroke();
		}

		function update()
		{
			var intervalID = window.setInterval(drawAClock, 1000);	
		}

		drawAClock();
		update();

	}
	
}

class horlogeController extends WidgetController {
	
	constructor() {
		super();
	}

	async refreshDate()
	{
		let ville = this.try.mvc.view.input.value;
		let result = await this.mvc.main.dom("https://maps.googleapis.com/maps/api/geocode/json?address="
										 + ville + "%20CA&sensor=false&key=AIzaSyBx-n626fUnoG-w26khNIiCF7J4lkSe5xE");
		/// faire requête à google maps avec la ville
	}

}