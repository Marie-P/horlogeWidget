class horloge extends Widget {
	
	constructor(app) {
		super(horlogeModel, horlogeView, horlogeController, app);
	}
	
	setUp() {
		super.setUp();
		//this.header = true;
		//this.footer = true;
	}
	
	ready() {
		super.ready();
		
	}
	
}

class horlogeModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	timeZone(ville) {
		// trouve à quel fuseau horaire appartient la ville entrée
		// Conversion en nombre pour que l'on puisse utiliser l'heure 
	}
	
}

class horlogeView extends WidgetView {
	
	constructor() {
		super();
	}

	draw() {
		super.draw();
		
		//créer un canvas qui prendra toute la taille du widget
		// Faire un cercle dans le canvas

		function changeHours(h)
		{
			// Calcul d'angle (360/12) à partir de l'heure récupérée
		}

		function changeMinutes(min)
		{
			// Calcul d'angle (360/60) à partir des minutes
		}

		function radians(degrees)
		{
			// Convertit les degrés entrée en radian
		}

		function toVec(radians)
		{
			// le cosinus et le sinus
		}

		function needle(vec,length)
		{
			// On va dessiner les aiguilles
		}

	}
	
}

class horlogeController extends WidgetController {
	
	constructor() {
		super();
	}
	
	update() {
		// rafraichira le widget toutes les 1000 millisecondes
	}
	
}