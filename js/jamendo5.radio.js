radioPosition = -1;
radioId = -1;

function getRadioList(f)
{
    $.ajax({
        type: "GET",
        url: API+"/id+name/radio/json/?n=all",
        success: f,
        error: ajaxError,
        dataType: 'json'
    });
}

function initRadio(radio)
{
    $.ajax({
        type: "GET",
        url: API+"/radioposition+id+stream+name/track/json/?radioid="+radio+"&radiolisteneridstr="+listenerId+"&radioposition="+(radioPosition+1),
        success: function(data) {
            if (radioId != radio)
            {
                cleanRadio();
            }
            for (var r in data)
            {
                if (data[r]['radioposition'] > radioPosition)
                    radioPosition = data[r]['radioposition'];
                playlist.unshift(data[r]);
            }
            if (radioId == -1)
            {
                radioId = radio;
                startRadio();
            }
        },
        error: ajaxError,
        datatype: 'json'
    });
}

function startRadio()
{
    playTrack(playlist.pop());
    trackChanged = function()
    {
        if (playlist.length == 1)
            initRadio(radioId);
    };
    playerStopped = function()
    {
        stopRadio();
    };
}

function stopRadio()
{
    cleanRadio();
    $(".radiostation").removeClass("playing");
}

function cleanRadio()
{
    radioId = -1;
    radioPosition = -1;
}

function selectRadio(id)
{
    if (id != radioId)
    {
        cleanRadio();
        initRadio(id);
    }
}

//function populateRadioList(node, data)
//{
    //$("li", node).remove();
    //for (var r in data)
        //node.append($('<li></li>').append($('<a href="radio/'+data[r]['id']+'">'+data[r]['name']+'</a>')));
    ////$("a", node).naviLink().click(function() {
        //selectRadio($(this).attr('href').substring(6));
        //return false;
    //});
//}

