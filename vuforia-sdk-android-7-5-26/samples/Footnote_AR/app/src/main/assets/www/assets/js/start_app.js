module.exports = {
  packageLaunch: function (appSchemeStr, jwt) {
    // launch app using action name (for Android devices)
    window.plugins.launcher.launch({
      actionName: appSchemeStr,
      extras: [{
        "name": "jwt",
        "value": jwt,
        "dataType": "String"
      }],
      successCallback: function (json) {
        console.log('App opened')
      },
      function () {
        console.log('Failed to open app')
      }
    });
  },
}
