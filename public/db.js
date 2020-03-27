let db;
const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

const request = indexedDB.open("budget", 1);
request.onupgradeneeded = function(event) {
  
    db = event.target.result;
    const objectStore = db.createObjectStore(["pending"], { autoIncrement: true });
    objectStore.createIndex("transactionIndex", "transaction");
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

function checkDatabase() {
  const transaction = db.transaction(["pending"], "readwrite");

  const store = transaction.objectStore(["pending"], "readwrite");

    const getAll = store.getAll();

  getAll.onsuccess = function() {
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(() => {
      
          const transaction = db.transaction(["pending"], "readwrite");

          const store = transaction.objectStore(["pending"], "readwrite");
 
          store.clear();
      });
    }
  };
}

window.addEventListener("online", checkDatabase);

