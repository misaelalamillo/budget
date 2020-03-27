let db;
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const request = indexedDB.open("budget", 1);
request.onupgradeneeded = function(event) {
  
    db = event.target.result;
    const objectStore = db.createObjectStore(["pending"], { autoIncrement: true });
    
};

