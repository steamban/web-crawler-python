from flask import Flask, Response, render_template

import models

app = Flask("lyrics")


@app.route("/")
def index():
    db = models.init_db(app)
    artists = db.session.execute(db.select(models.Artist)).scalars()
    return render_template("index.html", artists = artists)

@app.route("/artist/<artist_id>")
def artist(artist_id):
    db = models.init_db(app)
    artist = db.session.execute(db.select(models.Artist).filter(models.Artist.id == artist_id)).scalar()
    return render_template("artists.html", artist = artist)


@app.route("/song/<song_id>")
def song(song_id):
    db = models.init_db(app)
    track = db.session.execute(db.select(models.Tracks).filter(models.Tracks.id == song_id)).scalar()
    return render_template("track.html", track = track)




@app.route("/user/<id>")
def users(id):
    return f"You asked for user {id}"

