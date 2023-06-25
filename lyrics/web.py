from flask import Flask, render_template, request, jsonify
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
    lyrics = {"name": track.name, "lyrics": track.lyrics}
    return jsonify(lyrics)


@app.route("/api/v1/initdb", methods=["POST"])
def init_db():
    db = models.init_db(app, "postgresql:///lyrics")
    with app.app_context():
        db.drop_all()
        db.create_all()
    return "Initialized the database"


@app.route("/api/v1/crawl", methods=["POST"])
def crawl():
    nartists = request.args.get("nartists", default=8, type=int)
    ntracks = request.args.get("ntracks", default=5, type=int)
    crawler.crawl(
        "https://www.songlyrics.com/top-artists-lyrics.html", nartists, ntracks
    )
    return "Crawled lyrics"
