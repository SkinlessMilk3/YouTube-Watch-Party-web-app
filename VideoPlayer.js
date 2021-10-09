
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

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
        playerReady = true
        event.target.playVideo();
        var buffer = document.getElementById("buffer")
        buffer.max = player.getDuration()

        pauseVideoInit()
        playVideoInit()
        bufferSeekInit()
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
        })
      }

      const playVideoInit = function (){
        document.getElementById("playBtn").addEventListener("click", ev => {
          player.playVideo()
        })
      }
      const bufferSeekInit = function(){
        
        document.getElementById("buffer").addEventListener("change", ev => {
          player.seekTo(ev.currentTarget.value, true)
        })

        document.getElementById("buffer").addEventListener("input", ev => {
          player.seekTo(ev.currentTarget.value, false)
        })
      }
      //used to change video
      function UpdateVideo(videoId){
        
        player.videoId = videoId
      }