$(document).ready(function() {

var page = window.location.pathname;
     if(page == '/Commencer'){

var enjoyhint_instance = new EnjoyHint({});

var enjoyhint_script_steps = [
  {
  	'next .sous-menu-rub-contenus-tour-guide' : 'Bienvenue sur le site Guidelines, vous trouverez dans ce menu les différentes fonctionnalités personnalisables du CMS',
  	'nextButton' : {className: "myNext", text: "Suivant"},
  	'skipButton' : {className: "mySkip", text: "Stop"}
  },
  {
  	'next .bloc-h2-tour-guide' : "Vous trouverez ces fonctionnalités par section. ",
        'nextButton' : {className: "myNext", text: "Suivant"},
  	'skipButton' : {className: "mySkip", text: "Stop"}
  },
  {
  	'next .container-rub-middle-tour-guide' : 'A gauche vous trouverez la vue framework non personnalisé.',
  	'nextButton' : {className: "myNext", text: "Suivant"},
  	'skipButton' : {className: "mySkip", text: "Stop"}
  },
  {
  	'next .container-rub-right-tour-guide' : 'A droite une vue personnalisé avec une surcharge CSS.',
  	'nextButton' : {className: "myNext", text: "Suivant"},
  	'skipButton' : {className: "mySkip", text: "Stop"}
  },
  {
  	'click .button-pop-art-tour-guide' : 'Ce bouton vous permet de visualiser le CSS modifiable du framework',
  	'shape': 'circle'
  },
  {
  	'next .pop-dl-tour-css' : 'Vous pouvez télécharger les fichiers CSS...',
  	'nextButton' : {className: "myNext", text: "Suivant"},
  	'skipButton' : {className: "mySkip", text: "Stop"}
  },
 {
  	'next .pop-dl-tour-less' : 'ou les fichier less...',
  	'nextButton' : {className: "myNext", text: "Suivant"},
  	'skipButton' : {className: "mySkip", text: "Stop"}
  },
  {
  	'next .pre-container-tour-guide' : 'Ou encore visualiser le code.',
  	'showSkip' : false,
  	'nextButton' : {className: "myNext", text: "OKIDOKI !"}
  }

];

enjoyhint_instance.set(enjoyhint_script_steps);
enjoyhint_instance.run();

}
});
