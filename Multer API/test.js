// var expect  = require('chai').expect;
// var request = require('request');

// it('Main page content', function(done) {
//     request('http://localhost:5000/ee' , function(error, response, body) {
//         expect(body).to.equal('hello world');
//         done();
//     });
// });

// it('Main page status', function(done) {
//     request('http://localhost:5000' , function(error, response, body) {
//         expect(response.statusCode).to.equal(200);
//         done();
//     });
// });

// it('About page content', function(done) {
//     request('http://localhost:5000/about' , function(error, response, body) {
//         expect(response.statusCode).to.equal(404);
//         done();
//     });
// });

var expect  = require('chai').expect;
var request = require('request');

describe('Status and content', function() {
    describe ('Main page', function() {
        it('status', function(done){
            request('http://localhost:5000/ee', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('content', function(done) {
            request('http://localhost:5000/ee' , function(error, response, body) {
                expect(body).to.equal('hello world');
                done();
            });
        });
    });

    describe ('About page', function() {
        it('status', function(done){
            request('http://localhost:5000/about', function(error, response, body) {
                expect(response.statusCode).to.equal(404);
                done();
            });
        });

    });
});