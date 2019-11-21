$( document ).ready(function() {
    var globalTeacherId;
    var globalThemeId;
    init_studentControls();
    init_getAllThemes();
    init_addTheme();
    init_fileListener();
    init_themeListener()
});

function init_studentControls(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            firebase.database().ref('Users/' + firebase.auth().currentUser.uid).on('value', function(snapshot) {
               if(snapshot.val().type === 'teacher'){

               }else{
                userS.name = snapshot.val().name;
                userS.uid = snapshot.val().uid;
                userS.type = snapshot.val().type;
                if(snapshot.val().homeworks !== undefined){
                    userS.homework = snapshot.val().homework;
                    
                }
                if(snapshot.val().themes !== undefined){
                    userS.themes = snapshot.val().themes;
                }
                init_getOwnThemes();
               }
            });
        } else {
          // regresar a index.html
        }
    });
    $(".Student-ownThemes").click(function (){
        $(".Student-myListGlobal").css('display','none');  
        $(".Student-myList").css("display","block");  
   });

   $(".Student-globalReseach").click(function (){
        $(".Student-myListGlobal").css("display","block");  
        $(".Student-myList").css("display",'none');  
    });
}

function init_getAllThemes(){
    firebase.database().ref('Themes/').once('value', function(snapshot) {
        globalThemes = []
        snapshot.forEach(theme => {
            var tempTheme = new Themes(theme.key,theme.val().name,theme.val().description,[],theme.val().file,theme.val().link,theme.val().teacher);
            globalThemes.push(tempTheme)
        });
        globalThemes.forEach(themes =>{
            $( ".Student-myListGlobalAppend" ).append( "<a href='#' class='list-group-item list-group-item-action'><div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>"+themes.name+"</h5><small>Tema</small></div><p class='mb-1'>"+themes.description+"</p><small> <button type='button' class='btn btn-outline-secondary globalIndividualTheme' name='"+themes.name+"' data-toggle='modal' data-target='#exampleModalScrollable3'>Añadir tema</button></small></a>" );  
        })
         
    })
}

function init_getOwnThemes(){  
    firebase.database().ref('Users/' + userS.uid + '/themes').once('value', function(snapshot) {
        ownThemes = []
        if(snapshot.exists()){
            snapshot.forEach(theme => {
                var tempTheme = new Themes(theme.key,theme.val().name,theme.val().description,[],theme.val().file,theme.val().link,theme.val().teacher);
                ownThemes.push(tempTheme)
            });
            ownThemes.forEach(themes =>{
                $( ".Student-myListOwnAppend" ).append( "<a href='theme.html' class='list-group-item list-group-item-action studentSpecific-theme' idTeacher='"+themes.tutorId+"' idTheme='"+themes.id+"'><div class='d-flex w-100 justify-content-between'><h5 class='mb-1'>"+themes.name+"</h5><small class='text-muted'>Tema</small></div><p class='mb-1'>"+themes.description+"</p><small> <button type='button' class='btn btn-outline-secondary Student-homeworkButton'  idTeacher='"+themes.tutorId+"' idTheme='"+themes.id+"' data-toggle='modal' data-target='#exampleModalScrollable'>Subir Tareas</button></small></a>" );  
            })
        }
    })
}


function init_addTheme(){
    $(document).on('click','.globalIndividualTheme',function(){
        var name = $( this ).attr('name');
        console.log(userS);
        globalThemes.forEach(themes =>{
            if(themes.name === name && userS.themes.includes(themes) === false){
                var myRef = firebase.database().ref('Users/' + firebase.auth().currentUser.uid+"/themes").push();
                var key = myRef.key;
                var newData={
                    name: themes.name,
                    description: themes.description,
                    uid: key,
                    teacher: themes.tutorId,
                    video: themes.link,
                    file: themes.file,
                    works: themes._works
                 }
                myRef.set(newData);
            }
        })
    })
}

function init_fileListener(){
    $(document).on('click','.Student-homeworkButton',function(){
        idThemeHelper = $(this).attr("idTheme");
    })
}

function init_themeListener(){
    $(document).on('click','.studentSpecific-theme',function(){
        globalTeacherId = $(this).attr("idTeacher");
        globalThemeId = $(this).attr("idTheme");
    })
    var fileButton = document.getElementById("Student-themeFile");
    fileButton.addEventListener('change', function(e){
        UploadFile(e);
    })

}





function UploadFile(e) {
    var file = e.target.files[0];
    var storageRef = firebase.storage().ref('Homeworks/' + file.name);
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },function(error){

        },
        function(){
            task.snapshot.ref.getDownloadURL().then(function(downloadURL){
                var newhomeworkkey = firebase.database().ref().child('posts').push().key;
                firebase.database().ref('Homeworks/' + newhomeworkkey ).set({
                    urlTrabajo: downloadURL,
                    idAlumno: userS.uid,
                    idTeacher: globalTeacherId,
                    idTheme: globalThemeId,
                    calificacion:0,
                })
            })
        }
    );

}