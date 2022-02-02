
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
callbacks: {
signInSuccessWithAuthResult: function(authResult, redirectUrl) {
    
    // User successfully signed in.
    // Return type determines whether we continue the redirect automatically
    // or whether we leave that to developer to handle.
    
    return true;
},
uiShown: function() {
    // The widget is rendered.
    // Hide the loader.
    document.getElementById('loader').style.display = 'none';
}
},
// Will use popup for IDP Providers sign-in flow instead of the default, redirect.
signInFlow: 'redirect',
signInSuccessUrl: '/account/',
signInOptions: [
// Leave the lines as is for the providers you want to offer your users.
firebase.auth.GoogleAuthProvider.PROVIDER_ID,
{
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    requireDisplayName: false
}
],
// Terms of service url.
tosUrl: '/term-of-service/',
// Privacy policy url.
privacyPolicyUrl: '/privacy-policy/'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);