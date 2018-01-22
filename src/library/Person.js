class Person {
    constructor(name) {
        this._name = name;
    }
  
    get name() {
        return this._name.toUpperCase();
    }
  
    set name(newName) {
        this._name = newName;   // validation could be checked here such as only allowing non numerical values
    }
  
    walk() {
        console.log(this._name + ' is walking.');
    }
}

export default Person