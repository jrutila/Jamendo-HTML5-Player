$(document).ready(function() {
    jQuery.support.cors = true;
    $("#start").click(function () {
        getRadioList(function(data) {
            initList($("#radiolist"), data, function() {
                $(this).parents('ul').find('li').removeClass("playing");
                initRadio(this.playdata['id']);
                $(this).parents('li').addClass("playing");
            });
        });
    });
});

function clearList(list)
{
    $("li:not(:first)", list).remove();
    var l = $("li:first", list);
    l.show();
    $(".listname", l).html("loading...");
}

function initList(list, data, playf)
{
    var l = $("li:first", list);
    for (var r in data)
    {
        var n = l.clone()
        //var a = $("a", l).clone();
        //n.append(a);
        var a = $("a", n);
        $(".listname", a).html(data[r]['name']);
        n.removeClass("loading");
        $(list).append(n);
        //var play = $('<a href="#player" class="play ui-btn-corner-all" data-transition="slideup">play!</a>');
        $(a).get(0).playdata = data[r];
        $(a).click(playf);
    }
    l.hide();
}
