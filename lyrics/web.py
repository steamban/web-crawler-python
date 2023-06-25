import time

from flask import Flask, Response, render_template, request, jsonify
from flask_cors import CORS

import models
import crawler

app = Flask("lyrics")
CORS(app)


# API endpoints
@app.route("/api/v1/artist")
def api_artists():
    db = models.init_db(app)
    artists = db.session.execute(db.select(models.Artist)).scalars()
    ret = [{"id": i.id, "name": i.name} for i in artists]
    return jsonify(dict(artists=ret))


@app.route("/api/v1/artist/<artist_id>")
def api_artist(artist_id):
    db = models.init_db(app)
    artists = db.session.execute(db.select(models.Artist)).scalars()
    artist = db.session.execute(
        db.select(models.Artist).filter(models.Artist.id == artist_id)
    ).scalar()
    print(dir(artist))
    ret = [{"id": i.id, "name": i.name} for i in artist.tracks]
    return jsonify(dict(tracks=ret))


@app.route("/api/v1/song/<song_id>")
def song(song_id):
    print(request.headers)
    db = models.init_db(app)
    artists = db.session.execute(db.select(models.Artist)).scalars()
    track = db.session.execute(
        db.select(models.Tracks).filter(models.Tracks.id == song_id)
    ).scalar()
    # track.lyrics = track.lyrics.replace("\n", "<br/>")
    lyrics = {"name": track.name, "lyrics": track.lyrics}
    return jsonify(lyrics)


@app.route('/api/v1/initdb', methods=['POST'])
def init_db():
    db = models.init_db(app, "postgresql:///lyrics")
    with app.app_context():
        db.drop_all()
        db.create_all()
    return 'Initialized the database'

# Add route for Crawl command
@app.route('/api/v1/crawl', methods=['POST'])
def crawl():
    nartists = request.args.get('nartists', default=8, type=int)
    ntracks = request.args.get('ntracks', default=5, type=int)
    crawler.crawl("https://www.songlyrics.com/top-artists-lyrics.html", nartists, ntracks)
    return 'Crawled lyrics'

@app.route("/")
def index():
    db = models.init_db(app)
    artists = db.session.execute(db.select(models.Artist)).scalars()
    return render_template("index.html", artists=artists)


@app.route("/artist/<artist_id>")
def artist(artist_id):
    db = models.init_db(app)
    artists = db.session.execute(db.select(models.Artist)).scalars()
    artist = db.session.execute(
        db.select(models.Artist).filter(models.Artist.id == artist_id)
    ).scalar()
    return render_template("artists.html", artists=artists, current=artist)


@app.route("/songs/<artist_id>")
def songs(artist_id):
    db = models.init_db(app)
    artist = db.session.execute(
        db.select(models.Artist).filter(models.Artist.id == artist_id)
    ).scalar()
    tracks = []
    for i in artist.tracks:
        t = {"id": i.id, "name": i.name, "lyrics": i.lyrics}
        tracks.append(t)

    ret = {"current": 0, "tracks": tracks}
    return jsonify(ret)


@app.route("/user/<id>")
def users(id):
    return f"You asked for user {id}"
