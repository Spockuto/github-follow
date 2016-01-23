github-follow
=============
A Dynamic Follow button for Github users.

Usage
=====
*	Register your Webpage at github at https://github.com/settings/applications/new
        
*	Change the following variables to your values
  
```
   client_id  = YOUR_GITHUB_APP_CLIENT_ID
   client_secret = YOUR_GITHUB_APP_CLIENT_SECRET_ID
   origin = WEBSITE_DOMAIN
   redirect_uri = WEBSITE_URL_ON_WHICH_BUTTON_IS_USED
   username = YOUR_GITHUB_USERNAME
```
 
*	Now add the following lines to your html page.
``` 
<script src = "follow.js"></script>
<button id="github-follow" onclick="getAccessCode()"></button>
```