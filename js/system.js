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

var user = new Student('','','',[],[],'');


class Teacher {
    constructor (cName,cEmail,cUid,cThemes,cType) {
        this._name = cName;
        this._email = cEmail;
        this._uid = cUid;
        this._type = cType
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

var teacher = new Teacher('','','',[],'');