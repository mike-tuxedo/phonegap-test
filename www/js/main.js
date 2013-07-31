/*------------------------
 		Backbone App
 -------------------------*/
function initiateBackboneApp(){

	/*----------------
	 		MODEL
	 -----------------*/
	Gig = Backbone.Model.extend({
		url: "./save.php",
		defaults:{
			id: null,
			Veranstaltung: "keine Angabe",
			Ort: "keine Angabe",
			Kilometer: 0,
			Datum: null,
			Hannes: null,
			Kiebe: null,
			Mike: null,
			Reini: null,
			Till: null,
			Bus: "keine Angabe",
			Gage: 0,
			Bett: "keine Angabe",
			Bewertung: null,
			Anmerkung: null
		}
	});
	
	
	/*---------------
	 	COLLECTION
	-----------------*/
	Gigs = Backbone.Collection.extend({
		url: "./save.php",
		model: Gig,
		initialize: function (models, options) {
				//this.listenTo(this, 'add', options.view.addGigLi);
			}
	});


	/*-----------------
	 		VIEWS
	-------------------*/
	window.AppView = Backbone.View.extend({
	  	el: $("#content"),
	  	gigs: null,
	  	initialize: function () {
	  		console.log('initialize');
			this.gigs = new Gigs( null, { view: this });
		},
		render: function(data){
			console.log('fetch data...');
        	var that = this;

        	this.gigs.fetch({
        		success: function(){
        			console.log('successfully fetched data');
        			var template = _.template( window.appviewTemplate, {gigs : that.gigs} );
        			$(that.el).html(template);

        			$('.details:odd').css('background-color', 'rgba(255,255,255,0.5)');
        		}
        	});

	        return this;
	   	},
	 	events: {
	    	"click #neuer_eintrag":  "showAddGig",
	    	"click .details":  "showDetails"
	  	},
	  	showAddGig: function(e){
	  		e.preventDefault();
	        app_router.navigate("addGig", {trigger: true});
	  	},
		showDetails: function(e){
			e.preventDefault();

	        var id = $(e.currentTarget).data("id");
	        var model = this.gigs.get('id');
			app_router.navigate("details/" + id, {trigger: true});
		}
	});

	window.NewGigView = Backbone.View.extend({
		el: $("#content"),
		initialize: function(){},
		render: function(data){
			var template = _.template( window.gigviewTemplate, data ? "data" : {} );
	        $(this.el).html( template );

	        return this;
	   	},
		events:{
			"click #save_entry": "saveEntry",
			"click #cancel_entry": "cancelEntry",
			"click #drivers_button": "toggleDrivers",
			"click #optionals_button": "toggleOptionals"
		},
	  	saveEntry: function(e){
	  		e.preventDefault();

	  		if($('input[name=bett]:checked').val() === undefined){
	  			var unterkunft = 'keine Angabe';
	  		}
	  		else{
	  			var unterkunft = $('input[name=bett]:checked').val();
	  		}

	  		var gig = new Gig({
				Veranstaltung: $('#veranstaltung').val() || "keine Angabe",
				Ort: $('#ort').val() || "keine Angabe",
				Kilometer: $('#kilometer').val() || 0,
				Datum: $('#datum').val(),
				Hannes: $('#hannes').is(":checked"),
				Kiebe: $('#kiebe').is(":checked"),
				Mike: $('#mike').is(":checked"),
				Reini: $('#reini').is(":checked"),
				Till: $('#till').is(":checked"),
				Bus: $('input[name=bus]:checked').val() || "keine Angabe",
				Gage: $('#gage').val() || "keine Angabe",
				Bett: unterkunft,
				Bewertung: $('#bewertung').val() || "keine Angabe",
				Anmerkung: $('#anmerkung').val() || "keine Angabe"
	  		});

			$("#saveAnimation").fadeIn();

	  		gig.save({},{
	  			success: function(model, response){
	  				$("#saveAnimation").fadeOut();
		  			app_router.navigate("home", {trigger: true});
		  			console.log('successfull saved'); 
	  			}, 
	  			error: function(model, error){ 
	  				console.log("Error:", error); 
	  			}
	  		});

	  		
	  	},
	  	cancelEntry: function(e){
	  		e.preventDefault();
	  		console.log('saving process canceled');

	  		app_router.navigate("home", {trigger: true});
	  	},
	  	toggleDrivers: function(){
	  		$('#drivers').slideToggle();

	  		var offset = $("#drivers_button").offset();
			$("html,body").animate({
			    scrollTop: (offset.top - 70)
			});
			console.log(offset.top);
	  	},	  	
	  	toggleOptionals: function(){
	  		$('#optionals').slideToggle();

	  		var offset = $("#optionals_button").offset();
			$("html,body").animate({
			    scrollTop: (offset.top - 70)
			});
	  	}
	});


	window.DetailsView = Backbone.View.extend({
		el: $("#content"),
		initialize: function(){},
		render: function(id){
			var model = appview.gigs.get(id);
			var template = _.template( window.detailsviewTemplate, {model: model} );
	        $(this.el).html( template );

	        return this;
	   	},
		events:{
			"click #back": "back",
		},
		back: function(e){
			e.preventDefault();
			app_router.navigate("home", {trigger: true});
		}
	});

	var detailsview = new DetailsView;
	var gigview = new NewGigView;
	var appview = new AppView;

	/*---------------
	 	  Router
	-----------------*/

 	var AppRouter = Backbone.Router.extend({ 
 		routes: {
 			"" : "home",
 			"home": "home",
 			"addGig": "addGig",
 			"details/:id": "details"
 		} 
 	}); 
 	
 	// Initiate the router 
 	var app_router = new AppRouter;
 	
 	app_router.on('route:home', function(actions) {
 		appview.render();
 	});
 	
 	app_router.on('route:addGig', function(actions) {
 		gigview.render(); 
 	});

 	app_router.on('route:details', function(id) {
 		detailsview.render(id); 
 	});
 	
 	// Start Backbone history a necessary step for bookmarkable URL's 
 	Backbone.history.start();

};

/*---------------
 	Bottommenu bei Focus ausblenden
-----------------*/

$('input, textarea').focusin(function() {
	$('#bottom_section').hide();
	$('#top_section').hide();
});

$('input, textarea').focusout(function() {
	$('#bottom_section').show();
	$('#top_section').show();
});
