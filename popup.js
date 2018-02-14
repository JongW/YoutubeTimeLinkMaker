/**
 * Get the url of the current page
 * @throws if the url does not contain youtube in it
 * @param {function (string)} calback when the url is found
 */
function getCurrentUrl (callback) {

    var queryInfo = {
        active : true,
        currentWindow : true
    };

    chrome.tabs.query(queryInfo, (tabs) => {

        var tab = tabs[0];

        var url = tab.url;

        console.assert(typeof url == 'string', 'tab.url should be a string');

        if(!url.includes('youtube.com')) {
            setBody("This page isn't youtube!");
            throw new Error("A non-youtube page");
        }

        callback(url);
    });
}

/**
 * Copies input onto clipboard
 * @param val - value to be copied
 */
function copyToClipboard(val){
    var dummy = document.createElement('input');

    document.body.appendChild(dummy);

    dummy.setAttribute("id","dummy_id");

    dummy.setAttribute("value",val);

    dummy.select();

    document.execCommand("copy");
    document.body.removeChild(dummy);

}
//simple function for checking if input is number
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

/**
 * @throws if input is not a number
 */
function getMin(){
    var min = document.getElementById('minute').value;

    if(!isNumber(min)){
        setBody("Min & Sec should be a number!");
        throw new Error("Trying to input a non-number");
    }
    return min;
}
/**
 * @throws if input is not a number
 */
function getSec(){
    var sec = document.getElementById('second').value;
    if(!isNumber(sec)){
        setBody("Min & Sec should be a number!");
        throw new Error("Trying to input a non-number");
    }
    return sec;
}

function setBody(val){
    document.getElementsByTagName("body")[0].innerHTML = val;
}

document.addEventListener('DOMContentLoaded', () => {
    getCurrentUrl((url) => {
        var generate = document.getElementById('generate');

        generate.addEventListener('click', () => {

            var min = getMin();

            var sec = getSec();

            var newUrl = url + "#t=" + min + "m" + sec + "s";

            setBody("Copied onto Clipboard");
            copyToClipboard(newUrl);
        });
    });

});
