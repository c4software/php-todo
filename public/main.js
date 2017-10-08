var app = new Vue({
  el: '.container',
  data:{
    todos: []
  },
  created: function () {
    console.log("Démarrage TODO-APP");
  },
  beforeMount: function() {
    this.recupererListe();
  },
  methods:{
    recupererListe: function (){
      // Récupération des todos
      get_data("api/liste.php").then(function(todos){
        // Après la réussite de l’appel, sauvegarde des todos
        app.todos = todos;
      }).catch(function(e){
        show_error("Récupération impossible");
      });
    },
    ajout: function () {
      var data = {"texte": document.getElementById("texte").value}
      post_data("api/creation.php", data).then(function(r){
        if(r){
          app.recupererListe();
        }else{
          show_error("Création impossible");
        }
      }).catch(function(e){
        show_error("Création impossible");
      });
    },
    terminerSupprimer: function(action, id){
      // Action must be « terminer » or « suppression »
      if(["terminer", "suppression"].indexOf(action) < 0){
        return;
      }

      get_data("api/" + path + ".php?id=" + id).then(function(s){
        if(s.success){
          app.recupererListe();
        }else{
          show_error("Erreur de traitement de l’id : " + id);
        }
      }).catch(function(e){
        show_error("Erreur de traitement de l’id : " + id);
      });
    }
  }
});

function show_error(message){
  swal("Désolé", message, "error");
}

/**
 * GET Ajax
 */
function get_data(uri){
  return new Promise(function(resolve, reject){
    fetch(uri).then(function(response){
      // On décode le JSON, et on continue
      return response.json();
    }).then(function(response) {
      resolve(response);
    }).catch(function(error) {
      reject(error);
    });
  });
}

/**
 * POST Ajax
 */
function post_data(uri, data){
  // Construction des parametres pour la requete.
  var form = new FormData();
  for(var k in data){
    form.append(k, data[k]);
  }

  return new Promise(function(resolve, reject){
    fetch("api/creation.php", {
      method: "POST",
      body: form
    })
    .then(function(response){
      return response.json();
    })
    .then(function(response) {
      resolve(response);
    })
    .catch(function(error) {
      reject(error);
    });
  })
}
