var AktualnivozyApi = require(__dirname + '/../lib/index');
var expect = require('chai').expect;


// Obviously we need to set our credentials

var login = '***',
  password = '***';


var api = new AktualnivozyApi(login, password);

describe('Aktualnivozy API tests', function() {

  this.timeout(60000);

  describe('helpers', function() {

    it('should construct URL', function() {

      var url = 'http://www.aktualnivozy.cz/import/get-advertisements/?username=' + login + '&password=' + password;

      expect(api.url('get-advertisements')).to.be.equal(url);
      expect(api.url('get-advertisements', 'http://www.google.cz')).to.be.equal(url + '&xml=http://www.google.cz');

    });

  });


  describe('own api', function() {


    it('should test login', function(done) {

      api
        .login()
        .done(function(status) {
          expect(status).to.be.equal(200);
          done();
        });
    });


    it('should get list of advertisements', function(done) {
      api
        .getAdvertisements()
        .done(function(vehicles) {
          expect(vehicles).to.instanceOf(Array);
          done();
        })
    });

    it('should get list of photos', function(done) {
      api
        .getPhotos()
        .done(function(photos) {
          expect(photos).to.instanceOf(Array);
          done();
        })
    });



    // TODO: implement
    it('should edit an advertisement');
    it('should delete an advertisement');
    it('should delete a photo');

  });


});

