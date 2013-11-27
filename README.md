MovieBoneDB

Backbone Model that connects to theMovieDB API v3

Usage:

var theMovieDb = new theMovieDbApiModel({
	api_key: "####################"
});

theMovieDb.getSimilarMovies(movieId,{
	page: 2
},function(data){
	//Success!!
},function(xhr,textStatus,errorThrown){
	//Error!!
});

