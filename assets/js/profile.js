
async function infoSubmit(){
    const user = firebase.auth().currentUser;
    if (!user) return false;
    let data = {}
    document.querySelectorAll("#user-form input").forEach((elem)=>{
        data[elem.getAttribute("data-key")] = elem.value;
    });
    await user.updateProfile(data).catch((error)=>{
        console.log("更新失敗");
        throw error;
    });
    await writeData({}, user);
    SETTINGSUPDATE.disabled = true;
    window.removeEventListener('beforeunload', onBeforeunloadHandler);
    SUCCESS.style.opacity = 1;
}

const SETTINGSUPDATE = document.getElementById("update-info");
const SUCCESS = document.getElementById("success");

document.querySelectorAll("#user-form input").forEach((elem)=>{
    // elem.addEventListener("change", (e) => {
    //     SETTINGSUPDATE.disabled = false;
    // });
    elem.addEventListener("input", (e) => {
        SETTINGSUPDATE.disabled = false;
        SUCCESS.style.opacity = 0;
    });
});
