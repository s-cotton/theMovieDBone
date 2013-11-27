var theMovieDbApiModel = Backbone.Model.extend({

	base_url: 'http://api.themoviedb.org/3/',

	defaults: {
		apikey: '',
		lang: "en"
	},

	types: {
		put   : 'PUT',
		post  : 'POST',
		get   : 'GET',
		delete: 'DELETE'
	},

	initialize: function(){
		this.getConfiguration();
	},

	request: function(url,data,type,success_cb,error_cb){
		var _this = this;

		if( _.isUndefined(error_cb) || _.isNull(error_cb) ){
			var error_cb = function( jqXHR, textStatus, errorThrown ){ 
				_this.trigger('error', { 
					jqXHR: jqXHR, 
					textStatus: textStatus, 
					errorThrown: errorThrown 
				}); 
			}
		}

		if( _.isUndefined(success_cb) || _.isNull(success_cb) ){
			var success_cb = function(data){ 
				_this.trigger('request',data); 
			};
		}

		if( _.isUndefined(data) || _.isNull(data) ) var data = {};

		if( url.indexOf('://') < 0) var url = this.base_url+url;

		if( ! data.hasOwnProperty('api_key') ) data.api_key = _this.get("apikey");
		if( ! data.hasOwnProperty('language') ) data.language = _this.get("lang");

		$.ajax({
			url: url,
			type: type,
			data: data,
			dataType: 'json',
			success: success_cb,
			error: error_cb
		});
	},

	sendDelete: function(url,data,success_cb,error_cb){
		this.request(url,data,this.types.delete,success_cb,error_cb);
	},

	sendPut: function(url,data,success_cb,error_cb){
		this.request(url,data,this.types.put,success_cb,error_cb);
	},

	sendPost: function(url,data,success_cb,error_cb){
		this.request(url,data,this.types.post,success_cb,error_cb);
	},

	sendGet: function(url,data,success_cb,error_cb){
		this.request(url,data,this.types.get,success_cb,error_cb);	
	},
	
	getConfiguration: function(){
		var _this = this;
		this.sendGet('configuration',{},function(data){
			_this.set("config",data);
			console.log('config data for themoviedb',data);
		});
	},

	imageSize: function(type,size){
		var config = this.get("config");
		switch( type ){
			case 'backdrop': 	var sizes_array = config.backdrop_sizes; 	break;
			case 'logo':		var sizes_array = config.logo_sizes;		break; 
			case 'poster':		var sizes_array = config.poster_sizes;		break;
			case 'profile':		var sizes_array = config.profile_sizes;		break;
			default: return false;
		}
		var valid_sizes = array();
		for( var size_key in sizes_array ){
			var the_size = sizes_array[size_key];
			if( the_size.indexOf('w') == 0){
				valid_sizes.push( parseInt( the_size.replace('w','') ) );
			}
		}
		valid_sizes.sort();
		for( var size_key in sizes_array ){
			if( sizes_array[size_key] > parseInt(size) ) return 'w'+sizes_array[size_key];
		}
		return 'original';
	},

	imageUrl: function(file_path,size){
		var config = this.get("config");
		var base_url = config.images.base_url
		return base_url+size+file_path;
	},

	getAllMovieChanges: function(options,success_cb,error_cb){
		var date = new Date();
		date.setDate(date.getDate() - 1);
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		if( ! options.hasOwnProperty('start_date') || _.isNull(options.start_date) ) options.start_date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		if( ! options.hasOwnProperty('end_date') || _.isNull(options.end_date) ) { date.setDate(date.getDate() + 1); var end = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();}
		this.sendGet('movies/changes',options,success_cb,error_cb);
	},

	getAllPersonChanges: function(options,success_cb,error_cb){
		var date = new Date();
		date.setDate(date.getDate() - 1);
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		if( ! options.hasOwnProperty('start_date') || _.isNull(options.start_date) ) options.start_date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		if( ! options.hasOwnProperty('end_date') || _.isNull(options.end_date) ) { date.setDate(date.getDate() + 1); var end = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();}
		this.sendGet('movies/changes',options,success_cb,error_cb);
	},

	getCollection: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('collection/'+id,options,success_cb,error_cb);
	},

	getCollectionImages: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('collection/'+id+'/images',options,success_cb,error_cb);	
	},

	getCompany: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('company/'+id,options,success_cb,error_cb);
	},

	getCompanyMovies: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('collection/'+id+'/movies',options,success_cb,error_cb);
	},

	getCredits: function(id,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		this.sendGet('credit/'+id,{},success_cb,error_cb);
	},

	discoverMovies: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = page;
		this.sendGet('discover/movie',options,success_cb,error_cb);
	},

	discoverTv: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = page;
		this.sendGet('discover/tv',options,success_cb,error_cb);	
	},

	find: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('external_id') || _.isNull(options.external_id) ) return false;
		if( ! options.hasOwnProperty('external_source') || _.isNull(options.external_source) ) return false;
		this.sendGet('find/'+external_id,options,success_cb,error_cb);
	},

	getGenres: function(success_cb,error_cb){
		this.sendGet('genre/list',{},success_cb,error_cb);
	},

	getGenreMovies: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') ) options.page = page;
		this.sendGet('genre/'+id+'/movies',options,success_cb,error_cb);
	},

	getJobs: function(success_cb,error_cb){
		this.sendGet('job/list',{},success_cb,error_cb);
	},

	getKeyword: function(id,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		this.sendGet('keyword/'+id,{},success_cb,error_cb);
	},

	getKeywordMovies: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('keyword/'+id+'/movies',options,success_cb,error_cb);
	},

	getList: function(id,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		this.sendGet('list/'+id,{},success_cb,error_cb);
	},

	getListStatus: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('movie_id') || _.isNull(options.movie_id) ) return false;
		this.sendGet('list/'+id+'/item_status',options,success_cb,error_cb);
	},

	getMovie: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('movie/'+id,options,success_cb,error_cb);
	},

	getMovieAltTitles: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('movie/'+id+'/alternative_titles',options,success_cb,error_cb);
	},

	getMovieCredits: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('movie/'+id+'/credits',options,success_cb,error_cb);
	},

	getMovieImages: function(id,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('movie/'+id+'/images',options,success_cb,error_cb);
	},

	getMovieKeywords: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('movie/'+id+'/keywords',options,success_cb,error_cb);
	},

	getMovieReleases: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('movie/'+id+'/releases',options,success_cb,error_cb);
	},

	getMovieTrailers: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('movie/'+id+'/trailers',options,success_cb,error_cb);
	},

	getMovieTranslations: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('movie/'+id+'/translations',options,success_cb,error_cb);
	},

	getSimilarMovies: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('movie/'+id+'/similar_movies',options,success_cb,error_cb);
	},

	getMovieReviews: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('movie/'+id+'/reviews',options,success_cb,error_cb);	
	},

	getMovieLists: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('movie/'+id+'/lists',options,success_cb,error_cb);
	},

	getMovieChanges: function(id,options,success_cb,error_cb){
		var date = new Date();
		date.setDate(date.getDate() - 1);
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		if( ! options.hasOwnProperty('start_date') || _.isNull(options.start_date) ) options.start_date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		if( ! options.hasOwnProperty('end_date') || _.isNull(options.end_date) ) { date.setDate(date.getDate() + 1); var end = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();}
		this.sendGet('movie/'+id+'/changes',options,success_cb,error_cb);
	},

	getLatestMovie: function(success_cb,error_cb){
		this.requst('movie/latest',{},success_cb,error_cb);
	},

	getUpcomingMovies: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('movie/upcoming',options,success_cb,error_cb);
	},

	getNowPlayingMovies: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('movie/now_playing',options,success_cb,error_cb);	
	},

	getPopularMovies: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('movie/popular',options,success_cb,error_cb);
	},

	getTopRatedMovies: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('movie/top_rated',options,success_cb,error_cb);
	},

	getNetwork: function(id,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		this.sendGet('network/'+id,{},success_cb,error_cb);
	},

	getPerson: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('person/'+id,options,success_cb,error_cb);
	},

	getPersonMovieCredits: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('person/'+id+'/movie_credits',options,success,error_cb);
	},

	getPersonTvCredits: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('person/'+id+'/tv_credits',options,success,error_cb);	
	},

	getPersonCredits: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('person/'+id+'/combined_credits',options,success,error_cb);	
	},

	getPersonImages: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('person/'+id+'/images',options,success,error_cb);
	},

	getPersonChanges: function(id,options,success_cb,error_cb){
		var date = new Date();
		date.setDate(date.getDate() - 1);
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		if( ! options.hasOwnProperty('start_date') || _.isNull(options.start_date) ) options.start_date = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();
		if( ! options.hasOwnProperty('end_date') || _.isNull(options.end_date) ) { date.setDate(date.getDate() + 1); var end = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate();}
		this.sendGet('person/'+id+'/changes',options,success_cb,error_cb);
	},

	getPopularPeople: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('person/popular',options,success_cb,error_cb);
	},

	getLatestPerson: function(success_cb,error_cb){
		this.sendGet('person/latest',{},success_cb,error_cb);
	},

	getReview: function(id,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		this.sendGet('review/'+id,{},success_cb,error_cb);
	},

	searchMovie: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('query') || _.isNull(options.query) ) return false;
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('search/movie',options,success_cb,error_cb);
	},

	searchCollection: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('query') || _.isNull(options.query) ) return false;
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('search/collection',options,success_cb,error_cb);	
	},

	searchTv: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('query') || _.isNull(options.query) ) return false;
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('search/tv',options,success_cb,error_cb);
	},

	searchPerson: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('query') || _.isNull(options.query) ) return false;
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('search/person',options,success_cb,error_cb);
	},

	searchList: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('query') || _.isNull(options.query) ) return false;
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('search/list',options,success_cb,error_cb);
	},

	searchCompany: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('query') || _.isNull(options.query) ) return false;
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('search/compay',options,success_cb,error_cb);
	},

	searchKeyword: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('query') || _.isNull(options.query) ) return false;
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('search/keyword',options,success_cb,error_cb);
	},

	getTv: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id,options,success_cb,error_cb);
	},

	getTvCredits: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/credits',options,success_cb,error_cb);
	},

	getTvExternalIds: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/external_ids',options,success_cb,error_cb);
	},

	getTvImages: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/images',options,success_cb,error_cb);
	},

	getTvTranslations: function(id,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/translations',options,success_cb,error_cb);
	},

	getTopRatedTv: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('tv/top_rated',options,success_cb,error_cb);
	},

	getPopularTv: function(options,success_cb,error_cb){
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		if( ! options.hasOwnProperty('page') || _.isNull(options.page) ) options.page = 1;
		this.sendGet('tv/popular',options,success_cb,error_cb);	
	},

	getTvSeason: function(id,season,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(season) || _.isNull(season) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/season/'+season,options,success_cb,error_cb);
	},

	getTvSeasonCredits: function(id,season,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(season) || _.isNull(season) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/season/'+season+'/credits',options,success_cb,error_cb);
	},

	getTVSeasonExternalIds: function(id,season,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(season) || _.isNull(season) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/season/'+season+'/external_ids',options,success_cb,error_cb);
	},

	getTvSeasonImages: function(id,season,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(season) || _.isNull(season) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/season/'+season+'/images',options,success_cb,error_cb);
	},

	getTvEpisode: function(id,season,episode,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(season) || _.isNull(season) ) return false;
		if( _.isUndefined(episode) || _.isNull(episode) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/season/'+season+'/episode/'+episode,options,success_cb,error_cb);
	},

	getTvEpisodeCredits: function(id,season,episode,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(season) || _.isNull(season) ) return false;
		if( _.isUndefined(episode) || _.isNull(episode) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/season/'+season+'/episode/'+episode+'/credits',options,success_cb,error_cb);
	},

	getTvEpisodeExternalIds: function(id,season,episode,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(season) || _.isNull(season) ) return false;
		if( _.isUndefined(episode) || _.isNull(episode) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/season/'+season+'/episode/'+episode+'/external_ids',options,success_cb,error_cb);
	},

	getTvEpisodeImages: function(id,season,episode,options,success_cb,error_cb){
		if( _.isUndefined(id) || _.isNull(id) ) return false;
		if( _.isUndefined(season) || _.isNull(season) ) return false;
		if( _.isUndefined(episode) || _.isNull(episode) ) return false;
		if( _.isUndefined(options) || _.isNull(options) || ! _.isObject(options) ) var options = {};
		this.sendGet('tv/'+id+'/season/'+season+'/episode/'+episode+'/images',options,success_cb,error_cb);
	}


});