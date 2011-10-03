playlist = [];

function playTrack(track)
{
    $("#nowplaying #album, #nowplaying #artist").html("");
    $("#nowplaying #cover").attr("src", "404.jpg");
    $("#nowplaying #track").html(track['name']);
    $("#jplayer").jPlayer('setMedia', { mp3: track['stream'] });
    $("#jplayer").jPlayer('load');
    $("#playtitle").html(track["name"]);
    playPlayer();
    $("#jplayer").get(0).trackId = track['id'];

    // Cover element might be hidden -> Use window width
    var coverWidth = $(window).width();
    if (coverWidth >= 600)
        coverWidth = 600;
    else
        coverWidth = coverWidth + (600 - coverWidth) % 100;

    // Get album
    $.ajax({
        type: 'GET',
        url: API+"/id+name/album/json/?track_id="+track['id'],
        complete: function(data) {
            var album = eval(data.responseText);
            $("#nowplaying #album").html(album[0]['name']);
            $("#jplayer").get(0).album = album[0];
            // Get artist
            $.ajax({
                type: 'GET',
                url: API+"/id+name/artist/json/?album_id="+album[0]['id'],
                complete: function (data) {
                    var artist = eval(data.responseText);
                    $("#nowplaying #artist").html(artist[0]['name']);
                    $("#playtitle").html(artist[0]["name"]+" - "+$("#playtitle").html());
                    $("#jplayer").get(0).artist = artist[0];
                }
            });
            // Get album cover
            $.ajax({
                type: 'GET',
                url: API+"/image/album/json/?id="+album[0]['id']+"&imagesize="+coverWidth,
                complete: function (data) {
                    var imgUrl = eval(data.responseText)[0];
                    $("#nowplaying img").attr('src', imgUrl);
                }
            });
        }
    });
}

function stopPlayer()
{
    $("#jplayer").jPlayer('stop');
    playlist = [];
    playerStopped();
}

function playPlayer()
{
    $("#jplayer").jPlayer('play');
}

function pausePlayer()
{
    $("#jplayer").jPlayer('pause');
}

function paused()
{
    $(".ui-btn:has(.jp-pause)").hide();
    $(".ui-btn:has(.jp-play)").show();
}

function played()
{
    $(".ui-btn:has(.jp-play)").hide();
    $(".ui-btn:has(.jp-pause)").show();
}

function nextTrack()
{
    var track = playlist.pop();
    playTrack(track);
    trackChanged(track);
}

trackChanged = function ()
{
}
playerStopped = function ()
{
}

$(document).ready(function() {
    //$('#toggle').click(function() {
        //togglePlayer();
    //});
    $("#jplayer").jPlayer({
        cssSelectorAncestor: "#nowplaying",
        pause: paused,
        play: played
    });
    paused();
    $("#jplayer").bind($.jPlayer.event.ended + ".jPlayer", nextTrack);

    $('a[href="#track"]:has(#album)').click(function() {
        initTracksByAlbum($("#jplayer").get(0).album);
    });
    $('a[href="#album"]:has(#artist)').click(function() {
        initAlbumByArtist($("#jplayer").get(0).artist);
    });
});
