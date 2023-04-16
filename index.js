const download = document.querySelector(".download");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const sizes = document.querySelector(".sizes");


qrText.addEventListener("input", handleQRtext);
sizes.addEventListener("change", handleSize);

const defaultUrl = "hello";
let colorlight = "#fff",
    colordark = "#000",
    text = defaultUrl,
    size = 300;


function handleQRtext(e){
    const value = e.target.value;
    text = value;
    if(!value){
        text = defaultUrl;
    }
    generateQRCode();
}
function handleSize(e){
    size = e.target.value;
    generateQRCode();
}

async function generateQRCode(){
    qrContainer.innerHTML = "";
    new QRCode("qr-code",{
        text,
        height: size,
        width: size,
        colordark,
        colorlight,
    })
    download.href = await resolveDataUrl()
}

function handleSize(e) {
    size = e.target.value;
    generateQRCode();
}

function resolveDataUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const img = document.querySelector("#qr-code img");
            if(img.currentSrc) {
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}
generateQRCode();