var browser = require('cordova/platform');
var cordova = require('cordova');
var getAccounts = function(){
  return JSON.parse(localStorage.getItem('accountManager')||'[]');
}
setAccounts = function(arr){
  localStorage.setItem('accountManager',JSON.stringify(arr));
}
module.exports = {
  getAccountsByType : function (success, error, opts) {
    var accountType = opts[0];
    setTimeout(function () {
      success(getAccounts().filter(function(account){
        return account&& account.accountType == accountType;
      }));
    }, 0);
  },
  addAccountExplicitly : function (success, error, opts) {
    var accounts = getAccounts();
    accounts.push({
      _index: accounts.length,
      accountType:opts[0],
      username : opts[1],
      password : opts[2],
      userdata : opts[3]||{}
    });
    setAccounts(accounts);
    setTimeout(function () {
      success();
    }, 0);
  },
  removeAccount:function(success, error, opts){
    var index = opts[0];
    var accounts = getAccounts();
    accounts[index]=null;
    setAccounts(accounts);
    setTimeout(function () {
      success();
    }, 0);
  },
  clearPassword: function(success, error, opts){
    var _index = opts[0];
    var accounts = getAccounts();
    var account = accounts[_index];
    delete account.password;
    setAccounts(accounts);
    setTimeout(function () {
      success();
    }, 0);
  },
  setAuthToken: function(success, error, opts){
    var _index = opts[0];
    var authTokenType = opts[1];
    var authToken = opts[2];
    var accounts = getAccounts();
    var account = accounts[_index];
    account[authTokenType]=authToken;
    setAccounts(accounts);
    setTimeout(function () {
      success();
    }, 0);
  },
  peekAuthToken: function(success, error, opts){
    var _index = opts[0];
    var authTokenType = opts[1];
    var accounts = getAccounts();
    var account = accounts[_index];
    setTimeout(function () {
      success({value:account[authTokenType]});
    }, 0);
  },
  getAuthToken: function(success, error, opts){
    var account = opts[0];
    var authTokenType = opts[1];
    setTimeout(function () {
      success({value:account[authTokenType]});
    }, 0);
  },
  setPassword: function(success, error, opts){
    var _index = opts[0];
    var accounts = getAccounts();
    var account = accounts[_index];
    account.password=opts[1];
    setAccounts(accounts);
    setTimeout(function () {
      success();
    }, 0);
  },
  getPassword: function(success, error, opts){
    var _index = opts[0];
    var accounts = getAccounts();
    var account = accounts[_index];
    setAccounts(accounts);
    setTimeout(function () {
      success({value:account.password});
    }, 0);
  },
  setUserData: function(success, error, opts){
    var _index = opts[0];
    var accounts = getAccounts();
    var account = accounts[_index];
    account.userdata[opts[1]]=opts[2];
    setAccounts(accounts);
    setTimeout(function () {
      success();
    }, 0);
  },
  getUserData: function(success, error, opts){
    var _index = opts[0];
    var accounts = getAccounts();
    var account = accounts[_index];
    setAccounts(accounts);
    setTimeout(function () {
      success({value:account.userdata[opts[1]]});
    }, 0);
  },

};

require("cordova/exec/proxy").add("AccountManager", module.exports);