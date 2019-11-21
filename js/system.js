class Student {
    constructor (cName,cEmail,cUid,cHomeworks,cThemes,cType) {
        this._name = cName;
        this._email = cEmail;
        this._uid = cUid;
        this._type = cType
        this._homeworks = cHomeworks;
        this._themes = cThemes
    }
    
    get name() {
        return this._name
    }
 
    set name( value ) {
        this._name = value;
    }

    get email() {
        return this._email
    }
 
    set email( value ) {
        this._email = value;
    }
    
    get uid() {
        return this._uid
    }
 
    set uid( value ) {
        this._uid = value;
    }

    get homeworks() {
        return this._homeworks
    }
 
    set homeworks( value ) {
        this._homeworks = value;
    }

    get themes() {
        return this._themes
    }
 
    set themes( value ) {
        this._themes = value;
    }

    get type() {
        return this._type
    }
 
    set type( value ) {
        this._types = value;
    }

    
 
}

class Theme {
    constructor(id,nombre,descripcion,trabajos,archivo,link, tutorId){
        this._id=id;
        this._name=nombre;
        this._description=descripcion;
        this._works=trabajos;
        this._file=archivo;
        this._link=link;
    }
}


class Teacher {
    constructor (cName,cEmail,cUid,cThemes,cType) {
        this._name = cName;
        this._email = cEmail;
        this._uid = cUid;
        this._type = cType;
        this._themes = cThemes;
    }
    
    get name() {
        return this._name
    }
 
    set name( value ) {
        this._name = value;
    }

    get email() {
        return this._email
    }
 
    set email( value ) {
        this._email = value;
    }
    
    get uid() {
        return this._uid
    }
 
    set uid( value ) {
        this._uid = value;
    }

    get themes() {
        return this._themes
    }
 
    set themes( value ) {
        this._themes = value;
    }

    get type() {
        return this._type
    }
 
    set type( value ) {
        this._types = value;
    }

    UploadTheme(Name, Description, Link,fileUrl){
        console.log(Name+Description+Link+fileUrl)
        var newthemekey = firebase.database().ref().child('posts').push().key;
        firebase.database().ref('Themes/' + newthemekey).set({
            name: Name,
            description: Description,
            link: Link,
            file:fileUrl,
            teacher: firebase.auth().currentUser.uid
        })

    }

    UploadFile(e) {
        var UploadTheme = document.getElementById("UploadTheme")
        UploadTheme.style.display = "none";
        var file = e.target.files[0];

        var storageRef = firebase.storage().ref('Theme/' + file.name);
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
                    console.log(downloadURL);
                    var Name = $("#exampleFormControlInput1").val();
                    var Description = $("#exampleFormControlInput3").val();
                    var link = $("#exampleFormControlInput2").val();
                    console.log(Name + Description + link)
                    tutor.UploadTheme(Name, Description, link,downloadURL);


                }) 
            }
        );

    }

}

