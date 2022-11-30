window.addEventListener("load", function () {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);;
});

let videos = [];

function getVideos() {
    const videoDivs = document.querySelectorAll(".yt_video[data-id]");
    videoDivs.forEach((videoDiv) => {
        videoDiv.style.width = "100%";
        videoDiv.style.height = "100%";

        const videoId = videoDiv.dataset["id"];
        const video = new window.YT.Player(videoDiv, {
            videoId: videoId,
            playerVars: {
                'modestbranding': 1,
            },
            origin: window.location
        });
        videos.push(video);
    });

    window.videos = videos;
}

const event = new Event('loadYTVideos');

// Выполнится после загрузки API автоматически
function onYouTubeIframeAPIReady() {
    getVideos();
    window.dispatchEvent(event);
}