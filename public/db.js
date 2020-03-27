let db;
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const request = indexedDB.open("budget", 1);
request.onupgradeneeded = function(event) {
  
    db = event.target.result;
    const objectStore = db.createObjectStore(["pending"], { autoIncrement: true });
    
};

request.onsuccess = function(event) {
    db = event.target.result;
    console.log(event);
  
    if (navigator.onLine) {
      checkDatabase();
    }
  };
  
  request.onerror = function(event) {
    console.log("something went wrong with indexedDB");
  };

  function saveRecord(record) {
    const transaction = db.transaction(["pending"], "readwrite");

  const store = transaction.objectStore(["pending"], "readwrite");

  store.add(record)
}
