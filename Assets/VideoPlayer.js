
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      var socket;
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player
      
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          playerVars: {
            'playsinline': 1,
            'controls': 0
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {

        event.target.playVideo();
        var buffer = document.getElementById("buffer")
        buffer.max = player.getDuration()
          
        MessageHandlingInit()
        pauseVideoInit()
        playVideoInit()
        bufferSeekInit()
        
      }

      const MessageHandlingInit = function(){

        socket.on("play", () => {
          player.playVideo();
        })

        socket.on("pause", () => {
          player.pauseVideo()
        })

        socket.on("seek", data => {
          player.seekTo(data, true)
        })

        socket.on("time query", () => {
          socket.emit("time synch", player.getCurrentTime())
        })
        socket.on("time synch", data => {
          player.seekTo(data, true)
        })
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          //setTimeout(stopVideo, 6000);
          done = true;
        }
      }

      function stopVideoInit() {
        /*document.getElementById("pauseBtn").addEventListener("click", ev => {
          player.stopVideo()
        })*/
      }
      const pauseVideoInit = function(){
        document.getElementById("pauseBtn").addEventListener("click", ev => {
          player.pauseVideo()
          socket.emit("pause")
        })
      }

      const playVideoInit = function (){
        document.getElementById("playBtn").addEventListener("click", ev => {
          player.playVideo()
          socket.emit("play")
          console.log("Play hit")
        })
      }
      const bufferSeekInit = function(){
        
        document.getElementById("buffer").addEventListener("change", ev => {
          player.seekTo(ev.currentTarget.value, true)
          socket.emit("seek", ev.currentTarget.value)
        })

        document.getElementById("buffer").addEventListener("input", ev => {
          player.seekTo(ev.currentTarget.value, false)
        })
      }
      //used to change video
      function UpdateVideo(videoId){
        
        player.videoId = videoId
      }