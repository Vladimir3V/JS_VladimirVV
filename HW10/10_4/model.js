var Model = {
    login: function(appId, perms) {
        return new Promise(function(resolve, reject) {
            VK.init({
                apiId: appId
            });

            VK.Auth.login(function(response) {
                if (response.session) {
                    resolve(response);
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, perms);
        });
    },
    callApi: function(method, params) {
        return new Promise(function(resolve, reject) {
            VK.api(method, params, function(response) {
                if (response.error) {
                    reject(new Error(response.error.error_msg));
                } else {
                    resolve(response.response);
                }
            });
        });
    },
    getUser: function() {
        return this.callApi('users.get', {});
    },
    getMusic: function() {
        return this.callApi('audio.get', {});
    },
    getFriends: function() {
        return this.callApi('friends.get', { fields: 'photo_100' });
    },
    getNews: function() {
        return this.callApi('newsfeed.get', { filters: 'post', count: 20 });
    },
    getGroups: function () {
   		return this.callApi('groups.get', { extended: 1, fields: 'name, photo_100' });
   	},
   	getPhotos: function () { 
			
	return this.callApi('photos.getAll', {
		extended: 1
	})
   	},
	getComments: function (photoId) {
		return this.callApi('photos.getComments', {photo_id: photoId, extended: 1, fields: 'photo_50', v:5.60 });		
   	},
	
	getAlbum: function() {
		return this.callApi('photos.getAlbums', {need_system: 1});
	}
	
	
	
};
