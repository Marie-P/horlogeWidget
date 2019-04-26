class horlogeWidget extends Widget {
	
	constructor(id,app) {
		super(id,horlogeModel, horlogeView, horlogeController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = true;
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

		// Le footer
		this.try.footer.innerHTML = "";
		SS.style(this.try.footer, {"userSelect": "none", "cursor": "pointer"});
		this.try.stage.appendChild(this.try.footer);

		// Les UTC
		let values = ['','-4','+1','+2','+8'] 
		let options = 
		[
			'--Please choose an option--',
			'(UTC -04:00) Haïti',
			'(UTC +01:00) Douala, Londres',
			'(UTC +02:00) Bruxelles, Madrid, Paris',
			'(UTC +08:00) Kuala Lumpur, Singapour'
		]

		// Sélection de l'UTC par l'utilisateur
		let city = HH.create('select');
		this.try.footer.appendChild(city);
		SS.style(city, {"userSelect": "none", "cursor": "pointer", "textAlign": "center","backgroundColor": "#0072ff"});
		for (var i = 0; i < options.length; i++) 
		{
			let option = HH.create("option");
			option.value = values[i];
			option.text = options[i];
			city.appendChild(option); 
		}

		// Enregistrement de l'UTC
		let saveData = event => 
		{
	        this.try.mvc.main.store("UTC",city.value);
		}
		city.onchange = saveData;

		// Création et ajout du canvas
		let toDraw = document.createElement("canvas");
		toDraw.width = 150 * this.try.mvc.main.sizeX;
		toDraw.height = 150 * this.try.mvc.main.sizeY - 50;
		this.try.stage.appendChild(toDraw);
		let ctx = toDraw.getContext('2d');

		let drawAClock = () =>
		{
			// to get time
			let time = new Date();
			let utc = time.getTime() + (time.getTimezoneOffset() * 60000);
			let newTime = new Date(utc + (3600000*this.try.mvc.main.restore("UTC")));
			let hours = newTime.getHours(); 
			let minutes = newTime.getMinutes();
			let seconds = newTime.getSeconds();

			// to clear canvas to redraw
			ctx.clearRect(0, 0, toDraw.width, toDraw.height);

			// draw
			ctx.beginPath(); 
			ctx.arc(toDraw.width/2, toDraw.height/2, toDraw.height/2, 0, 2 * Math.PI);

			// Les chiffres de l'horloge
			ctx.font = toDraw.height/10 + 'px arial';
			for(var i = 1; i <= 12; i++)
			{
				let numberClock = toVec(radians((360/12) * i - 90));
				ctx.fillText(i, numberClock[0] * toDraw.width/3 + toDraw.width/2.1, numberClock[1] * toDraw.height/2.5 + toDraw.height/1.9);
			}

			// Les aiguilles (heures et minutes)
			needle(toVec(radians(changeMinutes(minutes))), toDraw.width/2.5);
			needle(toVec(radians(changeHours(hours))), toDraw.width/5);
			ctx.strokeStyle = '#000000';
			ctx.stroke();

			// L'aiguille des secondes
			ctx.beginPath(); 
			needle(toVec(radians(changeMinutes(seconds))), toDraw.width/2.5);
			ctx.strokeStyle = '#FF0000';
			ctx.stroke();
		}

		// Calcul d'angle (360/12) à partir de l'heure récupérée
		function changeHours(h)
		{
			return (360/12) * h - 90;
		}

		// Calcul d'angle (360/60) à partir des minutes
		function changeMinutes(min)
		{
			return (360/60) * min - 90;
		}

		// Convertit les degrés entrée en radian
		function radians(degrees)
		{
			return degrees * Math.PI / 180;
		}

		// le cosinus et le sinus
		function toVec(radians)
		{
			return [
			Math.cos(radians),
			Math.sin(radians)
			];

		}

		// On va dessiner les aiguilles
		function needle(vec,length)
		{
			vec[0] *= length;
			vec[1] *= length;

			ctx.moveTo(toDraw.width/2, toDraw.height/2);
			ctx.lineTo(vec[0] + toDraw.width/2,vec[1] + toDraw.height/2);
		}

		// Relance la fonction toutes les secondes
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
}