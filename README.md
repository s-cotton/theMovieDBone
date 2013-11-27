theMovieDBone
=============

Backbone Model that interacts with theMovieDB API v3

Usage:
------

```javascript
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

theMovieDb.getAllMovieChanges({
	page: 2,
	start_date: 'YYYY-MM-DD',
	end_date: 'YYYY-MM-DD'
},function(data){
	//Success!!
},function(xhr,textStatus,errorThrown){
	//Error!!
});

```

Internal Functions:
-------------------

* request: function(url,data,type,success_cb,error_cb)

		main Request Function, for sending all requests to the API

* sendDelete: function(url,data,success_cb,error_cb)

		sends a DELETE Request

* sendPut: function(url,data,success_cb,error_cb)

		sends a PUT Request

* sendPost: function(url,data,success_cb,error_cb)

		sends a POST Request

* sendGet: function(url,data,success_cb,error_cb)

		sends a GET Request

* getConfiguration: function()
	
		fetches and sets the current configuration for the site from the API

* imageSize: function(type,size)

		returns the first image of a specific type (backdrop,logo,poster,profile) that is larger than your requested size (width in pixels)

* imageUrl: function(file_path,size)

		returns a resolved Image URL


API Functions:
-------------

Go take a look at http://docs.themoviedb.apiary.io/

*	getAllMovieChanges: 
		
		function(options,success_cb,error_cb)

*	getAllPersonChanges: 
		
		function(options,success_cb,error_cb)

*	getCollection: 
		
		function(id,options,success_cb,error_cb)

*	getCollectionImages: 
		
		function(id,options,success_cb,error_cb)

*	getCompany: 
		
		function(id,options,success_cb,error_cb)

*	getCompanyMovies: 
		
		function(id,options,success_cb,error_cb)

*	getCredits: 
		
		function(id,success_cb,error_cb)

*	discoverMovies: 
		
		function(options,success_cb,error_cb)

*	discoverTv: 
		
		function(options,success_cb,error_cb)

*	find: 
		
		function(options,success_cb,error_cb)

*	getGenres: 
		
		function(success_cb,error_cb)

*	getGenreMovies: 
		
		function(id,options,success_cb,error_cb)

*	getJobs: 
		
		function(success_cb,error_cb)

*	getKeyword: 
		
		function(id,success_cb,error_cb)

*	getKeywordMovies: 
		
		function(id,options,success_cb,error_cb)

*	getList: 
		
		function(id,success_cb,error_cb)

*	getListStatus: 
		
		function(id,options,success_cb,error_cb)

*	getMovie: 
		
		function(id,options,success_cb,error_cb)

*	getMovieAltTitles: 
		
		function(id,options,success_cb,error_cb)

*	getMovieCredits: 
		
		function(id,options,success_cb,error_cb)

*	getMovieImages: 
		
		function(id,success_cb,error_cb)

*	getMovieKeywords: 
		
		function(id,options,success_cb,error_cb)

*	getMovieReleases: 
		
		function(id,options,success_cb,error_cb)

*	getMovieTrailers: 
		
		function(id,options,success_cb,error_cb)

*	getMovieTranslations: 
		
		function(id,options,success_cb,error_cb)

*	getSimilarMovies: 
		
		function(id,options,success_cb,error_cb)

*	getMovieReviews: 
		
		function(id,options,success_cb,error_cb)

*	getMovieLists: 
		
		function(id,options,success_cb,error_cb)

*	getMovieChanges: 
		
		function(id,options,success_cb,error_cb)

*	getLatestMovie: 
		
		function(success_cb,error_cb)

*	getUpcomingMovies: 
		
		function(options,success_cb,error_cb)

*	getNowPlayingMovies: 
		
		function(options,success_cb,error_cb)

*	getPopularMovies: 
		
		function(options,success_cb,error_cb)

*	getTopRatedMovies: 
		
		function(options,success_cb,error_cb)

*	getNetwork: 
		
		function(id,success_cb,error_cb)

*	getPerson: 
		
		function(id,options,success_cb,error_cb)

*	getPersonMovieCredits: 
		
		function(id,options,success_cb,error_cb)

*	getPersonTvCredits: 
		
		function(id,options,success_cb,error_cb)

*	getPersonCredits: 
		
		function(id,options,success_cb,error_cb)

*	getPersonImages: 
		
		function(id,options,success_cb,error_cb)

*	getPersonChanges: 
		
		function(id,options,success_cb,error_cb)

*	getPopularPeople: 
		
		function(options,success_cb,error_cb)

*	getLatestPerson: 
		
		function(success_cb,error_cb)

*	getReview: 
		
		function(id,success_cb,error_cb)

*	searchMovie: 
		
		function(options,success_cb,error_cb)

*	searchCollection: 
		
		function(options,success_cb,error_cb)

*	searchTv: 
		
		function(options,success_cb,error_cb)

*	searchPerson: 
		
		function(options,success_cb,error_cb)

*	searchList: 
		
		function(options,success_cb,error_cb)

*	searchCompany: 
		
		function(options,success_cb,error_cb)

*	searchKeyword: 
		
		function(options,success_cb,error_cb)

*	getTv: 
		
		function(id,options,success_cb,error_cb)

*	getTvCredits: 
		
		function(id,options,success_cb,error_cb)

*	getTvExternalIds: 
		
		function(id,options,success_cb,error_cb)

*	getTvImages: 
		
		function(id,options,success_cb,error_cb)

*	getTvTranslations: 
		
		function(id,options,success_cb,error_cb)

*	getTopRatedTv: 
		
		function(options,success_cb,error_cb)

*	getPopularTv: 
		
		function(options,success_cb,error_cb)

*	getTvSeason: 
		
		function(id,season,options,success_cb,error_cb)

*	getTvSeasonCredits: 
		
		function(id,season,options,success_cb,error_cb)

*	getTVSeasonExternalIds: 
		
		function(id,season,options,success_cb,error_cb)

*	getTvSeasonImages: 
		
		function(id,season,options,success_cb,error_cb)

*	getTvEpisode: 
		
		function(id,season,episode,options,success_cb,error_cb)

*	getTvEpisodeCredits: 
		
		function(id,season,episode,options,success_cb,error_cb)

*	getTvEpisodeExternalIds: 
		
		function(id,season,episode,options,success_cb,error_cb)

*	getTvEpisodeImages: 
		
		function(id,season,episode,options,success_cb,error_cb)



Todo:
-----

- [x] Initial Request Structure
- [x] Get Requests
- [ ] Single User Authentication
- [ ] Single User Post/Put/Delete Functions

