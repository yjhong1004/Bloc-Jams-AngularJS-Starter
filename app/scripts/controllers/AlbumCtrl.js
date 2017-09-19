(function() {
  function AlbumCtrl(Fixtures) {
       this.albumData = Fixtures.getAlbum();
   }

   angular
       .module('blocJams')
        .controller('Fixtures', AlbumCtrl);
})();
