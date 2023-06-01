import os

import crawler

def test_get_popular_artists():
    data_file = os.path.join(os.path.dirname(__file__), "data", "top-artists-lyrics.html")
    with open(data_file) as f:
        data = f.read()
    artists = crawler.get_artists(data)
    name0, link0 = artists[0]
    name1, link1 = artists[1]
    name99, link99 = artists[98]
    name100, link100 = artists[99]

    assert len(artists) == 100

    assert name0 == "Hillsong"
    assert link0 == "https://www.songlyrics.com/hillsong-lyrics/"
    assert name1 == "Eminem"
    assert link1 == "https://www.songlyrics.com/eminem-lyrics/"

    assert name99 == "Skrillex"
    assert link99 == "https://www.songlyrics.com/skrillex-lyrics/"

    assert name100 == "Shakira"
    assert link100 == "https://www.songlyrics.com/shakira-lyrics/"

    
