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
        await writeData({displayName: user.displayName}, user);
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

const FORM_INPUTs = document.querySelectorAll('.td-content input');
var checkFlag = false;
var onBeforeunloadHandler = function(e) {
    var msg = 'このページから移動すると入力フォームの内容が消えます．';
    e.returnValue = msg;
}
var formAlert = function() {
    if(!checkFlag) {
    window.addEventListener('beforeunload', onBeforeunloadHandler);
    for(var i = 0; i < FORM_INPUTs.length; i++) {
        FORM_INPUTs[i].removeEventListener('input', formAlert);
        FORM_INPUTs[i].removeEventListener('change', formAlert);
    }
    checkFlag = true;
    }
}
for(var i = 0; i < FORM_INPUTs.length; i++) {
    FORM_INPUTs[i].addEventListener('input', formAlert);
    FORM_INPUTs[i].addEventListener('change', formAlert);
}

async function updateDB(){
    let data = {
        // timestamp: firebase.database.ServerValue.TIMESTAMP
    }
    // await firebase.database().ref("/users/" + user.uid).update(data).catch((error)=>{
    //     console.log("更新失敗");
    //     throw error;
    // });
}

async function writeData(data, user = null){
    if(user){
        document.querySelectorAll(".user-name").forEach((elem)=>{
            elem.innerText = user.displayName || "ユーザー";
        });
        document.querySelectorAll(".user-email").forEach((elem)=>{
            elem.innerText = user.email || "";
        })
    }
    for(const [k, v] of Object.entries(data)){
        const elem = document.getElementById("input-user-"+k);
        if(elem) elem.value = v;
    }
}
