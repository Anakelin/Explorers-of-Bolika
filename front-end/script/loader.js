document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'interactive') {
        document.getElementById('content').style.display="none";
    } else if (state == 'complete') {
        setTimeout(function(){
            document.getElementById('loader-back').style.display="none";
            document.getElementById('content').style.display="block";
        },500);
    }
}