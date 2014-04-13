var Q = require('q'),
  _ = require('underscore'),
  Krawler = require('krawler');


var krawler = new Krawler({
  parser: 'xml'
});


/**
 *
 * @param {string} user
 * @param {string} password
 * @param {string=} web
 * @constructor
 */
function AktualnivozyApi(user, password, web) {
  this.user_ = user;
  this.password_ = password;
  this.web = web || 'aktualnivozy';
}

/**
 * @type {Object}
 * @private
 */
AktualnivozyApi.prototype.config_;

/**
 * @type {string}
 * @private
 */
AktualnivozyApi.prototype.user_;

/**
 * @type {string}
 * @private
 */
AktualnivozyApi.prototype.password_;


/**
 *
 * @param {string} action
 * @param {string=} xmlUrl
 * @returns {string}
 */
AktualnivozyApi.prototype.url = function(action, xmlUrl) {
  var url = 'http://www.' + this.web + '.cz/import/' + action + '/?username=' + this.user_ + '&password=' + this.password_;

  if(xmlUrl !== undefined) {
    url += '&xml=' + xmlUrl;
  }

  return url;
};


/**
 *
 * @returns {Q.promise}
 */
AktualnivozyApi.prototype.login = function() {
  var self = this,
    deferred = Q.defer();

  krawler
    .fetchUrl(self.url('login'))
    .then(function(result) {

      var xml = result.data;
      if(xml.response.status == 200) {
        deferred.resolve(200);
      } else {
        deferred.reject(xml.response.message);
      }

    }, function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
};


/**
 *
 * @returns {Q.promise}
 */
AktualnivozyApi.prototype.getAdvertisements = function() {
  var self = this,
    deferred = Q.defer();

  krawler
    .fetchUrl(self.url('get-advertisements'))
    .then(function(result) {
      deferred.resolve(_.toArray(result.data.advertisements.advertisement));
    }, function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
};


/**
 *
 * @returns {Q.promise}
 */
AktualnivozyApi.prototype.getPhotos = function() {
  var self = this,
    deferred = Q.defer();

  krawler
    .fetchUrl(self.url('get-photos'))
    .then(function(result) {
      deferred.resolve(_.toArray(result.data.photos.photo));
    }, function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
};


/**
 *
 * @param {string} xmlUrl
 * @returns {Q.promise}
 */
AktualnivozyApi.prototype.editAdvertisement = function(xmlUrl) {
  var self = this,
    deferred = Q.defer();

  krawler
    .fetchUrl(self.url('edit-advertisement', xmlUrl))
    .then(function(result) {

      var xml = result.data;
      if(xml.response.status == 200) {
        deferred.resolve(200);
      } else {
        deferred.reject(xml.response.message);
      }

    }, function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
};


/**
 *
 * @param {string} xmlUrl
 * @returns {Q.promise}
 */
AktualnivozyApi.prototype.deleteAdvertisement = function(xmlUrl) {
  var self = this,
    deferred = Q.defer();

  krawler
    .fetchUrl(self.url('delete-advertisement', xmlUrl))
    .then(function(result) {

      var xml = result.data;
      if(xml.response.status == 200) {
        deferred.resolve(200);
      } else {
        deferred.reject(xml.response.message);
      }

    }, function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
};


/**
 *
 * @param {string} xmlUrl
 * @returns {Q.promise}
 */
AktualnivozyApi.prototype.deletePhoto = function(xmlUrl) {
  var self = this,
    deferred = Q.defer();

  krawler
    .fetchUrl(self.url('delete-photo', xmlUrl))
    .then(function(result) {

      var xml = result.data;
      if(xml.response.status == 200) {
        deferred.resolve(200);
      } else {
        deferred.reject(xml.response.message);
      }

    }, function(err) {
      deferred.reject(err);
    });

  return deferred.promise;
};


module.exports = AktualnivozyApi;
