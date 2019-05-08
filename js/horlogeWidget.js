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
		let values = ['','-12','-11','-10','-9.5','-9','-8','-7','-6','-5','-4','-3','-2','-1','0','+1','+2','+3','+4','+5','+5.5','+5.75','+6','+6.5','+7','+8','+8.75','+9','+9.5','+10','+10.5','+11','+12','+12.75','+13','+14'] 
		let options = 
		[
			'--Please choose an option--',
			'(UTC -12:00) Ligne de date internationale (Ouest)',
			'(UTC -11:00) Temps universel coordonnée -11',
			'(UTC -10:00) Hawaï',
			'(UTC -09:30) Îles Marquises, Polynésie française',
			'(UTC -09:00) Temps universel coordonnée -09',
			'(UTC -08:00) Alaska, Etats-Unis',
			'(UTC -07:00) Phoenix, Arizona',
			'(UTC -06:00) Île de pâques',
			'(UTC -05:00) Guadalajara, Mexique',
			'(UTC -04:00) Haïti, La Havane, Cuba',
			'(UTC -03:00) Brasilia, Brésil',
			'(UTC -02:00) Groenland',
			'(UTC -01:00) Cap-vert',
			'(UTC 00:00) Açores',
			'(UTC +01:00) Douala, Londres, Irlande',
			'(UTC +02:00) Bruxelles, Madrid, Paris',
			'(UTC +03:00) Beyrouth, Liban',
			'(UTC +04:00) Abou Dabi, Russie',
			'(UTC +05:00) Achgabat, Turkménistan',
			'(UTC +05:30) Bombay, Maharashtra, Inde',
			'(UTC +05:45) Katmandou, Népal',
			'(UTC +06:00) Dacca, Bangladesh',
			'(UTC +06:30) Rangoun, Birmanie',
			'(UTC +07:00) Bangkok, Thaïlande, Vietnam',
			'(UTC +08:00) Kuala Lumpur, Singapour',
			'(UTC +08:45) Eucla Australie-Occidentale',
			'(UTC +09:00) Tokyo, Séoul, Corée du Sud',
			'(UTC +09:30) Darwin',
			'(UTC +10:00) Brisbane, Australie',
			'(UTC +10:30) Île Lord Howe',
			'(UTC +11:00) Nouvelle-Calédonie',
			'(UTC +12:00) Fidji',
			'(UTC +12:45) Îles Chatham',
			'(UTC +13:00) Nuku alofa, Tonga',
			'(UTC +14:00) Kiritimati'
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