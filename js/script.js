$(function(){

	//tableaux contenant tous les clients
	var clients = [];
	//tableaux contenant toutes les locations
	var locations = [];
	//tableaux contenant toutes les motos
	var motos = [];

	//objet client
	var clientObjet = {
		init: function(a,b,c,d,e,f){
			this.nomC = a;
			this.prenomC = b;
			this.telephoneC = c;
			this.emailC = d;
			this.adresseC = e;
			this.statutC = f;
		},
		louerMoto: function(){}
	}


	//objet moto
	var motoObjet = {
		init: function(a,b,c,d,e){
			this.marqueC = a;
			this.modelC= b;
			this.typeC= c;
			this.prixC= d;
			this.nombreC = e;
			this.seuil = 3;
			//calcul du stock initial apres ajout de nouvel moto
			this.dispo = this.nombreC-this.seuil;
			
		},
		louerMoto: function(){}
	}

	//objet location
	var locationObjet = {
		init: function(a,b,c,d,e,f){
			this.locClientC = a;
			this.locMotoC= b;
			this.dataDebutC= c;
			this.dataFinC= d;
			this.dureeC = e;
			this.motoid = f;
			
		},
		louerMoto: function(){}
	}




	//fonction pour afficher la liste de tous les clients
	var afficherClients = function(){

		//vider l'élément qui affiche les clients
		$('#listClient').html('');
		//vider le champs client de location
		$('#locClient').html('');
		//vider le champ moto de location
		$('#locMoto').html('');

		//récupération de client engistrer ds localeStorege(google chrome)
		clients=JSON.parse(localStorage.getItem('clients'));

		//boucle de répétition
		$.each(clients, function(i,c){
			$('#listClient').append('\
			    <a href="#" class="list-group-item">\
			      <h4 class="list-group-item-heading"><span class="text-primary">'+c.nomC+'</span></h4>\
			      <p class="list-group-item-text">\
			      <strong>Email:</strong> '+c.emailC+' <strong>Tél:</strong> '+c.telephoneC+' <strong>Adresse:</strong> '+c.adresseC+'</p>\
			      <p class="list-group-item-text"> <strong>Statut:</strong>'+c.statutC+'</p>\
			    </a>\
				');
			//remplir au fur amure quand il ajout de nouvo client(non et prenom seul)  le champ client de location
			$('#locClient').append('<option>  '+c.nomC+' '+c.prenomC+'<option>');
			
		});
	};

	//fonction pour afficher la liste de toutes les motos
	var affichermotos = function(){

		//vider l'élément qui affiche les motos
		$('#listeMoto').html('');


		motos=JSON.parse(localStorage.getItem('motos'));

		//boucle de répétition
		$.each(motos, function(i,c){
			$('#listeMoto').append('\
				<a href="#" class="list-group-item">\
      <h4 class="list-group-item-heading"><span class="text-primary">'+c.marqueC+'</span></h4>\
      <p class="list-group-item-text">\
      <strong>Model:</strong>'+c.modelC+'<strong>Type:</strong>'+c.typeC+'<strong>Nombre:</strong> '+c.nombreC+' <strong>Prix:</strong> <span class="text-danger">'+c.prixC+'</span><strong>Disponible:</strong> <span class="text-danger">'+c.dispo+'</span><strong>Seuil:</strong> <span class="text-danger">'+c.seuil+'</span>\
      </p>\
    </a>\
				')
		//remplir au fur amure quand il ajout de nouvo marque moto(marque seul)  le champ moto de location
								//recupération des idex de chaque element du tableux(0 1 2 ....)
			$('#locMoto').append('<option value="'+i+'">'+c.marqueC+'<option>');
		});
	};


	//fonction pour afficher la liste de toutes les locations
	var afficherlocations = function(){

		//vider l'élément qui affiche les location
		$('#listLocation').html('');


		locations=JSON.parse(localStorage.getItem('locations'));

		//boucle de répétition
		$.each(locations, function(i,c){
			$('#listLocation').append('\
				<a href="#" class="list-group-item">\
      <h4 class="list-group-item-heading"><span class="text-primary">'+c.locClientC+'</span> a louer une <span class="text-primary">'+c.locMotoC+'</span></h4>\
      <p class="list-group-item-text">Durée:<span class="text-warning">'+c.dureeC+'</span>  Du '+c.dataDebutC+' au <span class="text-danger">'+c.dataFinC+'</span></p>\
    <button class="btn btn-xs btn-danger fl" data-id="'+i+'">Fin Location</button></a>\
			 ');
		});

		//detecter le click sur les boutton qui ont pour classe .fl
		$('.fl').on('click', function(){
			//recuperation de lindex de la location à supprimé
			//lindex est sotcké dans l'attribut data-id
			//le $(this) représente l'éléme,t html qui a declencher l'evenement
			var lid = $(this).attr('data-id');
			///récupération de l'id de la motot louée
			var mid = locations[lid].motoid;
			//incrementation du stock disponible de la motos
			motos[mid].dispo++;
			//rafraishissement de la liste des motos
			affichermotos();
			//suppression de la location 
			locations.splice(lid,1);
			//rafraishissement de la liste des locations
			afficherlocations();
		});
	};

	//affichage dynamique de la valeur du champ de selection de la durée
	$('#duree').on('change',function(){
		$('#valDuree').html('Durée '+this.value+' Jours');
	});

	//enreristrement d'un client suite au click du button enregistrer du formulaire client
	$('#saveClient').on('click',function(){

		//récupération des valeurs des champs du formulaire
		var nom = $('#nom').val();
		var prenom = $('#prenom').val();
		var telephone = $('#telephone').val();
		var email = $('#email').val();
		var adresse = $('#adresse').val();
		var statut = $('#statut').val();

		//création de l'objet client
		var client = Object.create(clientObjet);

		//remplissages des propriétés de l'objet client par les valeurs récupérés
		client.init(nom,prenom,telephone,email,adresse,statut);
		if (clients===null) {clients=[]};

		//ajout de l'objet client au tableaux CLIENTS qui contient tous les clients
		clients.push(client);

		//Insertion de client  ds localeStorege(google chrome)

		localStorage.setItem('clients',JSON.stringify(clients))

		//fermetture du modale du formulaire client
		$('#modalClient').modal('hide')

		//appel de la fonction d'affichage des clients après mise à jours

		afficherClients();
	});

	//enreristrement d'une moto suite au click du button enregistrer du formulaire moto
	$('#saveMoto').on('click',function(){

		//récupération des valeurs des champs du formulaire
		var marque = $('#marque').val();
		var model = $('#model').val();
		var type = $('#type').val();
		var prix = $('#prix').val();
		var nombre = $('#nombre').val();
		

		//création de l'objet moto
		var moto = Object.create(motoObjet);

		//remplissages des propriétés de l'objet moto par les valeurs récupérés
		moto.init(marque,model,type,prix,nombre);

		if (motos===null) {motos=[]};

		//ajout de l'objet moto au tableaux CLIENTS qui contient tous les clients
		motos.push(moto);

		localStorage.setItem('motos',JSON.stringify(motos))

		//fermetture du modale du formulaire moto
		$('#modalMoto').modal('hide')

		//appel de la fonction d'affichage des motos après mise à jours

		affichermotos();
	});

	//enreristrement d'une location suite au click du button enregistrer du formulaire loacation
	$('#saveLocation').on('click',function(){

		//récupération des valeurs des champs du formulaire moto
		var locClient = $('#locClient').val();
		//récuperer uniquement le libele de loption selectionne
		var locMoto = $('#locMoto option:selected').text();
		//recuperation de la valeur du champs moto
		var mid = $('#locMoto').val();
		var dataDebut = $('#dataDebut').val();
		var dataFin = $('#dataFin').val();
		var duree = $('#duree').val();
		

		//création de l'objet location
		var location = Object.create(locationObjet);

		//remplissages des propriétés de l'objet location par les valeurs récupérés
		location.init(locClient,locMoto,dataDebut,dataFin,duree,mid);

		//ajout de l'objet location au tableaux CLIENTS qui contient tous les locations
		locations.push(location);

		localStorage.setItem('locations',JSON.stringify(locations))

		/// traitement stock moto
		//setectioner un element du tableau et appel a la proprieté dispo du tableau
		motos[mid].dispo--;
		

		affichermotos();

		//fermetture du modale du formulaire location
		$('#modalLocation').modal('hide')

		//appel de la fonction d'affichage des locations après mise à jours

		afficherlocations();
	});

		//afficher touts les clients engistrer ds Base de donnée localeStorege(google chrome) 
		afficherClients();
		affichermotos();
		afficherlocations();

})


	