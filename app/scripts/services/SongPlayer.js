(function() {
    function SongPlayer(Fixtures) {
          /**
          * @desc Buzz object audio file
          * @type {Object}
          */
          var currentBuzzObject = null;
          var SongPlayer = {};
          var currentAlbum = Fixtures.getAlbum();
          /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */

          var setSong = function(song) {
             if (currentBuzzObject) {
               stopSong(SongPlayer.currentSong);
                //  currentBuzzObject.stop();
                //  SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             SongPlayer.currentSong = song;
          };

          var stopSong = function (song) {
            currentBuzzObject.stop();
            song.playing = null;
          };

          var playSong = function (song) {
              currentBuzzObject.play();
              song.playing = true;
          };

          SongPlayer.currentSong = null;
          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                  playSong(song);
                }
            }
          };

          SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
          };

          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            if (currentSongIndex < 0) {
              stopSong(SongPlayer.currentSong)
            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
          };

          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            // if the index goes beyond the length of the song array
            if (currentSongIndex > currentAlbum.songs.length - 1) {
              stopSong(SongPlayer.currentSong)
            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }

          };

          var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
          };

          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
