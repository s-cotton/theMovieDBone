MovieBoneDB
===========

Backbone Model that connects to theMovieDB API v3

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

Todo:
-----

- [x] Initial Request Structure
- [x] Get Requests
- [ ] Single User Authentication
- [ ] Single User Post/Put/Delete Functions