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

	photosProRoute: function () {

		Model.getPhotos().then(function (photos) {

			Model.getAlbum().then(function (albums) {

				let x = 1;

				setTimeout(function getCom() {


					Model.getComments(photos[x].pid).then(function (comments) {
						photos[x]['com'] = arguments[0];
						var co = photos[x].com;
						for (let y = 0; y < co.items.length; y++) {
							for (let z = 0; z < co.profiles.length; z++) {
								if (co.items[y].from_id == co.profiles[z].id) {

									co.items[y]['name'] = co.profiles[z].first_name + ' ' + co.profiles[z].last_name;
									co.items[y]['photo'] = co.profiles[z].photo_50;
								}
							}

						}



						for (let y = 0; y < albums.length; y++) {
							albums[y]['photos'] = {
								likes: [],
								reposts: [],
								coments: [],
							};
							var i = 0
							for (let z = 0; z < photos.length; z++) {
								if (photos[z].aid == albums[y].aid) {
									albums[y].photos.likes[i] = photos[z];
									albums[y].photos.reposts[i] = photos[z];
									albums[y].photos.coments[i] = photos[z];

									i++;
								}
							}
							
							
							
							albums[y].photos.likes.sort ( (a,b) => {
								 return (b.likes.count - a.likes.count);
							});
							albums[y].photos.reposts.sort ( (a,b) => {
								 return (b.reposts.count - a.reposts.count);
							});
							albums[y].photos.coments.sort ( (a,b) => {
								if (a.com && b.com) {
									return (b.com.count - a.com.count);
								} else {
									return 1;
								}
							});
						}

						x++;
						if (x == photos.length) {
							
							
							
							
														console.log(albums);
							results.innerHTML = View.render('photosPro', {
								list: albums
							});
							return

						}


						setTimeout(getCom(), 500);
					});
				}, 500);

			});



		});
	}

};

			

