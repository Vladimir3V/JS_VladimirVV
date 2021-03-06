var Controller = {
	musicRoute: function () {
		return Model.getMusic().then(function (music) {
			results.innerHTML = View.render('music', {
				list: music
			});
		});
	},
	friendsRoute: function () {
		return Model.getFriends().then(function (friends) {
			results.innerHTML = View.render('friends', {
				list: friends
			});
		});
	},
	newsRoute: function () {
		return Model.getNews().then(function (news) {
			results.innerHTML = View.render('news', {
				list: news.items
			});
		});
	},
	groupsRoute: function () {
		return Model.getGroups().then(function (groups) {
			results.innerHTML = View.render('groups', {
				list: groups
			});
		});
	},
	
	photosRoute: function () {

		Model.getPhotos().then(function (photos) {
			Model.getComments().then(function (comments) {
				for (var id of photos) {
					id['com'] = 0;

					for (var pid of comments)
						if (pid.pid == id.pid) {
							id.com++;
						}
				}
				results.innerHTML = View.render('photos', {
					list: photos
				});
			});
		});
	},
	
	
	
//	photosProRoute: function () {
//
//		Model.getPhotos().then(function (photos) {
//			Model.getComments().then(function (comments) {
//				for (var id of photos) {
//					id ['com'] = {
//						count:0,
//						details:{}
//					};
//					
//					for (var pid of comments)
//						if (pid.pid == id.pid) {
//							
//							var i = id.com.count++;
//							id.com.details[i] = pid.message;
//							
//						}
//				}
//				
//				console.log(photos);
//				
//				
//
//				results.innerHTML = View.render('photosPro', {
//					list: photos
//				});
//			});
//		});
//	},
//	
	

};



