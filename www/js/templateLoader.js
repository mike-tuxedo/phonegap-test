//lade alle Templates
//Home Template
$.ajax({
	url: 'templates/home.html', 
	success: function(data){
		window.appviewTemplate = data;
	},
	async: false
});

//addGig Template
$.ajax({
	url: 'templates/addGig.html', 
	success: function(data){
		window.gigviewTemplate = data;
	},
	async: false
});

//Details Template
$.ajax({
	url: 'templates/details.html', 
	success: function(data){
		window.detailsviewTemplate = data;
	},
	async: false
});