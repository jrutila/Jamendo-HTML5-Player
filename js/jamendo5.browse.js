function initAlbumByArtist(artist)
{
    $("#titlealbum").html(artist['name']);
    clearList("#albumlist");
    $.ajax({
        type: "GET",
        url: API+"/id+name/album/json/?artist_id="+artist['id'],
        success: function(data) {
            initList($("#albumlist"), data, function () {
                var album = this.playdata;
                initTracksByAlbum(album);
            });
        },
        error: ajaxError,
        datatype: 'json'
    });
}

function initTracksByAlbum(album)
{
    $("#titletrack").html(album['name']);
    clearList("#tracklist");
    $.ajax({
        type: "GET",
        url: API+"/id+name+stream/track/json/?album_id="+album['id'],
        success: function(data) {
            initList($("#tracklist"), data, function() {
                var track = undefined;
                for (var i in data)
                    if (data[i]['id'] == this.playdata['id'])
                        track = data[i];
                $("#tracklist").find('li').removeClass("playing");
                playSingleTrack(track);
                $(this).parents('li').addClass("playing");
            });
        },
        error: ajaxError,
        datatype: 'json'
    });
}

function playSingleTrack(track)
{
    stopPlayer();
    playTrack(track);
    initPlaylist();
    trackChanged = function()
    {
        if (playlist.length > 0)
            playTrack(playlist.pop());
    };
    playerStopped = function()
    {
    };
}

function initPlaylist()
{
}
