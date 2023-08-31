'use strict';

// add event on element

export function addEventOnElem (elem,type,callback){
    if(elem.length>1){
        for(let i=0;i<elem.length;i++){
            elem[i].addEventListener(type,callback);
        }
    }
    else{
        elem.addEventListener(type,callback)
    }
}
