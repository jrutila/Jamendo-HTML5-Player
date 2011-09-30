
$(document).ready(function() {
    $("nav h1").click(function() {
        //$("#nowplaying").hide();
        //$("li", $(this).parent()).show();
        var nav = $(this).parent();
        if (! $("ul", nav).is(":hidden"))
        {
            // Open other menu items too
            if ($(nav).has("li.selected").size() == 1 && $(nav).has("li:hidden").size()> 0)
            {
                $("li", nav).show();
                $("#nowplaying").addClass("hidden");
            }
            else
            {
                // Return to the currently selected mode
                $("ul", nav).hide();
                $("nav li").hide();
                $("nav li.selected").show();
                $("nav ul:has(li.selected)").show();
                $("#nowplaying").removeClass("hidden");
            }
        }
        else
        {
            // Open a closed menu
            $("nav ul").hide();
            $("ul, li", nav).show();
            $("#nowplaying").addClass("hidden");
        }
    });
})

jQuery.fn.naviLink = function()
{
    return this.each(function() {
        $(this).click(function() {
            $("nav li.selected").removeClass("selected");
            $(this).parent().addClass("selected");
            $("nav li:not(.selected)").hide();
            $("#nowplaying").removeClass("hidden");
            return false;
        });
    });
}
