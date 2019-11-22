var url = new URL(window.location.href);
var teacherSearch = url.searchParams.get("teacher");
var themeSearch = url.searchParams.get("theme");

$( document ).ready(function() {
    init_getOwnThemes();
});



function init_getOwnThemes(){  
    firebase.auth().onAuthStateChanged(function(user) {
        userS.uid = user.uid;
        if (user) {
            firebase.database().ref('Users/' + user.uid + '/themes').once('value', function(snapshot) {
                ownThemes = []
                if(snapshot.exists()){
                    snapshot.forEach(theme => {
                        var tempTheme = new Themes(theme.val().uid,theme.val().name,theme.val().description,[],theme.val().file,theme.val().link,theme.val().teacher);
                        ownThemes.push(tempTheme)
                    });
                    init_getAllContent();
                }
            })
        } else {
            window.location.replace('login.html');
        }
      });
   
}

function init_getAllContent(){
    ownThemes.forEach(theme =>{
        console.log(theme)
        if(theme.id === themeSearch){
            firebase.database().ref('Homeworks/').on('value', function(snapshot) {
                if(snapshot.exists()){
                    snapshot.forEach(work => {
                        console.log(work.val())
                        if(work.val().idTheme == themeSearch && work.val().idAlumno ==  userS.uid){
                            $(".individualTheme-grade").text("Calificación: " + work.val().calificacion);
                        }
                    });
                }
            })
            $(".individualTheme-name").text(theme.name);
            $(".individualTheme-description").text(theme.description);
            $(".Theme-video").html("<iframe width='65%' class='Theme-reproducer'src='"+theme.link+"'> </iframe>");
            $(".Theme-filesDownload").attr("href",theme.file)
        }
    })
}