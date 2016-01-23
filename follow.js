/*
 * Github Follow by Venkkatesh Sekar
 *
 * Designed for Dynamic Github Follow buttons
 * ----------------------------------------------------------------------------
 * License
 * ----------------------------------------------------------------------------
 *
 * This code is licensed using GNU Public License
 * 
 * ////////////////////////////////////////////////////////////////////////////
 * 
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * ----------------------------------------------------------------------------
 * Usage
 * ----------------------------------------------------------------------------
 *  Register your Webpage at github at https://github.com/settings/applications/new
 *        
 *  Change the following variables to your values
 *  client_id  = YOUR_GITHUB_APP_CLIENT_ID
 *  client_secret = YOUR_GITHUB_APP_CLIENT_SECRET_ID
 *  origin = WEBSITE_DOMAIN
 *  redirect_uri = WEBSITE_URL_ON_WHICH_BUTTON_IS_USED
 *  username = YOUR_GITHUB_USERNAME
 *
 *  Now add the following lines to your html page.
 *
 *  <script src = "follow.js"></script>
 *  <button id="github-follow" onclick="getAccessCode()"></button>
 * 
 */

  var client_id     = 'e644584e5ceb8a2eb2c1';
  var client_secret = '9509bfb80f2faf2453553f4d8048519ddb263039';
  var redirect_uri  = 'http://www.venkkateshsekar.me/follow/';
  var origin        = 'http://www.venkkateshsekar.me' ;
  var random        = (Math.random() + 1).toString(36).substring(7);
  var username      = "Spockuto";

  window.onload = queryStringParse ;

  function queryStringParse(){
    if (localStorage.getItem("follow-" + username)){
      document.getElementById("github-follow").innerHTML = localStorage.getItem("follow-" + username);
    }
    else {
      document.getElementById("github-follow").innerHTML = "Follow";
    }
    var code = getParameterByName("code");
    if(code){
      getAccessToken(code);
    }
  }

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  function getAccessCode(){
    if(!localStorage.getItem("access_token" + username)) {
    window.open("http://github.com/login/oauth/authorize?client_id="+ client_id 
      +"&scope=user:follow&redirect_uri=" + redirect_uri + "&state=" +random, "_self");
    }
    else{
      Follow(localStorage.getItem("access_token" + username));
    }
  }

  function getAccessToken(code){

    var xhr = new XMLHttpRequest();
    var url  = "https://crossorigin.me/http://github.com/login/oauth/access_token?client_id=" + client_id + "&client_secret=" + client_secret + 
    "&code=" + code + "&redirect_uri=" + redirect_uri + "&state=" + random;

    xhr.open('POST', url , true); 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if(xhr.status == 200){
          var access_token = xhr.responseText.slice(13,53);
          localStorage.setItem("access_token" + username , access_token);
          Follow(access_token);
        } 
        else {
          alert("Error loading page\n");
        }
      }
    };
    xhr.send(true);     
  }

  function Follow(access_token){

    var xmlHttp = new XMLHttpRequest(); 
    var mimeType = "text/plain";  

    if (document.getElementById("github-follow").innerHTML == "Follow"){
      xmlHttp.open('PUT', 'https://api.github.com/user/following/' + username, true);
      localStorage.setItem("follow-"+username, "Unfollow");
    }
    else{
      xmlHttp.open('DELETE', 'https://api.github.com/user/following/' + username, true);
      localStorage.setItem("follow-"+username, "Follow");
    }

    xmlHttp.setRequestHeader('Content-Type', mimeType);  
    xmlHttp.setRequestHeader('Authorization','token '+ access_token);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4) {
        if(xmlHttp.status == 204) {
          document.getElementById("github-follow").innerHTML = localStorage.getItem("follow-" + username) ;
          location.href = redirect_uri ;
        }
        else
          window.open("https://www.github.com/" + username , "_self");
      }
    };
  } 