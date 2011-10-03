<?php /*
Copyright 2011 Juho Rutila

    This file is part of Jamendo HTML5 Player

    Jamendo HTML5 Player is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Jamendo HTML5 Player is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

 */?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Jamendo Html5 Player</title>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.6.3.min.js"></script>
        <script src="http://code.jquery.com/mobile/1.0b3/jquery.mobile-1.0b3.min.js"></script>
        <script type="text/javascript" src="js/jquery.jplayer.min.js"></script>
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.0b3/jquery.mobile-1.0b3.min.css" />
        <style>
#nowplaying #cover
{
    width: 100%;
    max-width: 600px;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.play
{
    font-size: smaller;
    padding: 5px;
    padding-left: 7px;
    padding-right: 7px;
    margin-right: 3px;

}

li span.playtext
{
    display: none;
}
li.playing span.playtext
{
    display: inline;
    margin-left: 20px;
    color: gray;
}

.version
{
    font-size: 8pt;
    float: left;
}
        </style>

        <script type="text/javascript">
            API = "http://api.jamendo.com/get2";
            function initApplication()
            {
                return 'abba';
            }
            function ajaxError(jqXHR, textStatus, errorThrown) {
                alert(textStatus + ": " + errorThrown);
            }
        </script>
        <script type="text/javascript" src="js/jamendo5.mobile.js"></script>
        <script type="text/javascript" src="js/jamendo5.player.js"></script>
        <script type="text/javascript" src="js/jamendo5.radio.js"></script>
        <script type="text/javascript" src="js/jamendo5.browse.js"></script>
    </head>
    <body>

        <div data-role="page" id="main">
<?php
    $titles = array( 'radio' => 'Radio', 'album' => 'Album', 'track' => 'Track' );
    function mobileheader($active)
    {
        global $titles;
        $title = $titles[$active];
echo <<<EXCERPT
            <div data-role='header' data-position='fixed' data-id='hhead'>
                <h1 id="title$active">$title</h1>
                <div data-role='navbar'>
                    <ul>
EXCERPT;
print "                        <li><a href='#radio' ".($active == "radio" ? "class='ui-btn-active'" : "").">Radio</a></li>";
print "                        <li><a href='#album' ".($active == "album" ? "class='ui-btn-active'" : "").">Album</a></li>";
print "                        <li><a href='#track' ".($active == "track" ? "class='ui-btn-active'" : "").">Track</a></li>";
echo <<<EXCERPT
                    </ul>
                </div>
            </div><!-- /header -->
EXCERPT;
    }
    mobileheader("main");
?>

            <div data-role="content">
                <a href="#radio" id="start" data-role="button">Click me to start</a>

            </div><!-- /content -->

<?php
    $version = shell_exec('git show --oneline HEAD | head -n 1');
    function mobilefooter($active)
    {
        global $version;
echo <<<EXCERPT
            <div data-role="footer" data-position="fixed">
                <span class='version'>version: $version</span>
EXCERPT;
print "                <a href='#". ($active == "player" ? "back" : "player")."' data-transition='slideup'>". ($active == "player" ? "Back" : "Player")."</a>";
echo <<<EXCERPT
            </div><!-- /header -->
EXCERPT;
    }
    mobilefooter("main");
?>

        </div><!-- /page -->

        <div data-role="page" id="radio">
<?php
    mobileheader("radio");
?>
            <div data-role="content">
                <ul data-role="listview" id="radiolist">
                    <li class="radiostation" data-icon="false"><a href="#player" data-transition="slideup"><span class="listname">loading...</span><span class="playtext">playing...</span></a></li>
                </ul>

            </div><!-- /content -->
<?php
    mobilefooter("radio");
?>
        </div><!-- /page -->

        <div data-role="page" id="album">
<?php
    mobileheader("album");
?>
            <div data-role="content">
                <ul data-role="listview" id="albumlist">
                    <li data-icon="false"><a href="#track"><span class="listname">Search</span><span class="playtext">playing...</span></a></li>
                </ul>

            </div><!-- /content -->
<?php
    mobilefooter("album");
?>
        </div><!-- /page -->

        <div data-role="page" id="track">
<?php
    mobileheader("track");
?>
            <div data-role="content">
                <ul data-role="listview" id="tracklist">
                    <li data-icon="false"><a href="#player" data-transition="slideup"><span class="listname">Search</span><span class="playtext">playing...</span></a></li>
                </ul>

            </div><!-- /content -->
<?php
    mobilefooter("track");
?>
        </div><!-- /page -->


        <div data-role="page" id="player">

            <div data-role="header" data-position="fixed" data-id="hhead" data-theme="b">
                <h1 id="playtitle">Not playing</h1>
                <a href="#" data-rel="back">Back</a>
            </div><!-- /header -->

            <div data-role="content" id="nowplaying">
                <button type="button" class="jp-pause">Pause</button>
                <button type="button" class="jp-play">Play</button>
                <img id="cover" />
                <a href="#album" data-role="button" data-direction="reverse"><span id="artist"></span></a>
                <a href="#track" data-role="button" data-direction="reverse"><span id="album"></span></a>
            </div><!-- /content -->

<?php
    mobilefooter("player");
?>

        </div><!-- /page -->

    <div id='jplayer'></div>

    <script type="text/javascript">
        var listenerId = initApplication();
    </script>
    </body>
</html>
