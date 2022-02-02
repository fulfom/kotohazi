// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDfw4C1eFhKVAyczmW6SSk2ICOi9dLtb_g",
authDomain: "kotohazi.firebaseapp.com",
projectId: "kotohazi",
storageBucket: "kotohazi.appspot.com",
messagingSenderId: "232129718623",
appId: "1:232129718623:web:51ff9c7e463f46f1c56eea",
measurementId: "G-N1NF5JC93X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(async (user) => {
    if(user){
        console.log("hasuser");
        document.getElementById("user-info").classList.add("hasuser");
        document.getElementById("user-name").innerText = user.name || "ユーザー"
    }
});

function getUrlQueries() {
    const queryStr = window.location.search.slice(1);  // 文頭?を除外
    let queries = {};
    if (!queryStr) {
        return queries;
        }
    
        // クエリ文字列を & で分割して処理
        queryStr.split('&').forEach((queryStr) => {
        // = で分割してkey,valueをオブジェクトに格納
        let queryArr = queryStr.split('=');
        queries[queryArr[0]] = queryArr[1];
    });

    return queries;
}
