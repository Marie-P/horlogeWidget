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
		this.try.footer.innerHTML = "Ville : ";
		SS.style(this.try.footer, {"userSelect": "none", "cursor": "pointer"});
		Events.on(this.try.footer, "click", event => this.try.mvc.controller.refreshClick());
		this.try.stage.appendChild(this.try.footer);

		// On crée un canvas dans le widget
		let toDraw = document.createElement("canvas");

		toDraw.width = 150 * this.try.mvc.main.sizeX;
		toDraw.height = 150 * this.try.mvc.main.sizeY - 50;
		this.try.stage.appendChild(toDraw);

		let clock = toDraw.getContext('2d');

		function drawAClock()
		{
			// to get time
			let time = new Date();
			let hours = time.getHours(); 
			let minutes = time.getMinutes();
			let seconds = time.getSeconds();

			// va effacer notre horloge à chaque fois pour la retracer
			clock.clearRect(0, 0, toDraw.width, toDraw.height);

			clock.beginPath(); 
			clock.arc(toDraw.width/2, toDraw.height/2, toDraw.height/2, 0, 2 * Math.PI);

			// Les chiffres de l'horloge
			clock.font = toDraw.height/10 + 'px arial';

			for(var i = 1; i <= 12; i++)
			{
				let numberClock = toVec(radians((360/12) * i - 90));
				clock.fillText(i, numberClock[0] * toDraw.width/3 + toDraw.width/2.1, numberClock[1] * toDraw.height/2.5 + toDraw.height/1.9);
			}

			// Trace les aiguilles
			needle(toVec(radians(changeMinutes(minutes))), toDraw.width/2.5);
			needle(toVec(radians(changeHours(hours))), toDraw.width/5);
			needle(toVec(radians(changeMinutes(seconds))), toDraw.width/2.5);

			clock.stroke();
		}

		function changeHours(h)
		{
			// Calcul d'angle (360/12) à partir de l'heure récupérée
			return (360/12) * h - 90;
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

	refreshClick()
	{
		let city = document.createElement('input');
		city.id = 'city';

		this.try.mvc.view.footer.appendChild(city);

		let cityEntered = document.getElementById('city');

		this.load();
	}

	async load()
	{
		let ville = 'singapore';
		let result = await this.mvc.main.dom("https://timeanddate.com/time/zone/singapore"); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		let article = new xph().doc(dom).ctx(dom).craft('/html/body/div[1]/section/div/div[1]/table/tbody/tr/th').firstResult; // find interesting things
		this.mvc.view.update(article.textContent, article.getAttribute("href"));
	}
}





