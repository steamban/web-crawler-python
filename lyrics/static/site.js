function update_lyrics(data, status) {
    $("h3.lyrics").html(data.name);
    $("p.lyrics").html(data.lyrics);
}

function click_handler(ev) {
    $("p.lyrics").html("Loading ....");
    $.ajax({url : ev.target.href,
            headers : {"Accept": "application/json"},
            success: update_lyrics
    });
    ev.preventDefault();
    }


function main() {
    $("ol.artists a").on("click", click_handler);
    }

$(main);

