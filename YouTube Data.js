function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey(process.env.API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

const Search = function(keyword){
    document.getElementById("test").innerHTML = "entered search"
    var yList = YouTube.Search.list("id,snippet", {q:keyword, maxResults:5})
    
    for(var i in yLIst.items){
        var item = results.items[i]
        document.getElementById("test").innerHTML = `${item.snippet.title}`
    }
    document.getElementById("test").innerHTML = "finished search"
}
authenticate().then(loadClient)
Search("cat")