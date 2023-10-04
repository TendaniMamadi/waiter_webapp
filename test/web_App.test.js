import assert from 'assert';
import frontEnd from '../services/web_App.js';

describe('web-App', function () {
    const webApp = frontEnd();
    let storedUsername;
    let storedPassword;

    beforeEach(function () {
        // Reset storedUsername and storedPassword before each test
        storedUsername = 'testUser';
        storedPassword = 'testPassword';
    });

    describe('setUsername(username)', function () {
        
        it('should set the username', function () {
            webApp.setUsername('testUser');
            assert.strictEqual(storedUsername, webApp.getUsername());
        });
    });

    describe('getUsername()', function () {
        it('should return the stored username', function () {
            storedUsername = 'testUser';
            const result = webApp.getUsername();
            assert.strictEqual(result, 'testUser');
        });
    });

    describe('setPassword(password)', function () {
        it('should set the password', function () {
            webApp.setPassword('testPassword');
            assert.strictEqual(storedPassword, webApp.getPassword());
        });
    });

    describe('getPassword()', function () {
        it('should return the stored password', function () {
            storedPassword = 'testPassword';
            const result = webApp.getPassword();
            assert.strictEqual(result, 'testPassword');
        });
    });

    describe('login(username, password)', function () {

        it('should return true for correct credentials', function () {
           storedUsername = 'testUser';
           storedPassword = 'testPassword';
            const result = webApp.login('testUser', 'testPassword');
            assert.strictEqual(result, true);
        });

        it('should return false for incorrect username', function () {
            storedUsername = 'testUser';
            storedPassword = 'testPassword';
            const result = webApp.login('wrongUser', 'testPassword');
            assert.strictEqual(result, false);
        });

        it('should return false for incorrect password', function () {
            storedUsername = 'testUser';
            storedPassword = 'testPassword';
            const result = webApp.login('testUser', 'wrongPassword');
            assert.strictEqual(result, false);
        });

        it('should return false for missing credentials', function () {
            const result = webApp.login('', '');
            assert.strictEqual(result, false);
        });
    });
});
