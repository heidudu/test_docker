export function localItem(key,value) {
    if(arguments.length === 1){
        return localStorage.getItem(key);

    }else {
        return localStorage.setItem(key,value);
    }
};

export function  removeItem(key) {
    if (key) {
        return localStorage.removeItem(key);
    }
    return localStorage.removeItem();
}
