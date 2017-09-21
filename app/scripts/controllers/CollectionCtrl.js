(function() {
     function CollectionCtrl(Fixtures) {
       this.albums = Fixtures.getCollection(12);
       console.log(this.albums);
      //  this.albums = [];
      //  for (var i=0; i < 12; i++) {
      //      this.albums.push(angular.copy(albumPicasso));
      //  }
     }

     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();
