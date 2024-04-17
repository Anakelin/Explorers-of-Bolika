document.onreadystatechange = function () {
    var state = document.readyState;
    const contentId = 'content';
    const loaderId = 'loader-back';

    if (state == 'interactive') {
        document.getElementById(contentId).style.display="none";
    } else if (state == 'complete') {
        setTimeout(function(){
            document.getElementById(loaderId).style.display="none";
            document.getElementById(contentId).style.display="block";
        },500);
    }
}