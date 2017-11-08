var database = firebase.database().ref();
var like = $('#like');
var dislike = $('#dislike');
var thelike;
var thedislike;
var thelikecounter = $('#likecounter');
var thedislikecounter = $('#dislikecounter');

// J'invoque Firebase
database.on('value', function(datasnapshot){
  data = datasnapshot.val();
  thelike = data.thelike;
  thedislike = data.thedislike;
});

// J'incrémente le like dans la BDD, je descends le nombre de dislikes si il est supérieur à 0 et je l'affiche dans la console
like.click(function() {
  if(thedislike > 0){
    database.update({
      thedislike : thedislike - 1
    });
  } else {
    database.update({
    thelike : thelike + 1
  });
  }
  $('#likecounter').html(thelike);
  $('#dislikecounter').html(thedislike);
  console.log("Number of likes:" + thelike);
  console.log("Number of dislikes:" + thedislike);
});

// J'incrémente le dislike dans la BDD, je descends le nombre de likes si il est supérieur à 0 et je l'affiche dans la console
dislike.click(function() {
  if (thelike > 0) {
    database.update({
      thelike : thelike -1
    });
  } else {
      database.update({
      thedislike : thedislike + 1
    });
  }
  $('#dislikecounter').html(thedislike);
  $('#likecounter').html(thelike);
  console.log("Number of likes:" + thelike);
  console.log("Number of dislikes:" + thedislike);
});

//J'affiche les likes et dislikes sur mes boutons
database.once('value').then(function(datasnapshot){
  $('#likecounter').html(thelike);
  $('#dislikecounter').html(thedislike);
})