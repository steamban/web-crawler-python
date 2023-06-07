-- Creating tables

CREATE TABLE artists (
       id SERIAL,
       name VARCHAR(100),
       PRIMARY KEY (id)
     
);

CREATE TABLE tracks (
       id SERIAL,
       artist_id INTEGER REFERENCES artists(id),
       name VARCHAR(200),
       lyrics TEXT,
       PRIMARY KEY (id)
       );

CREATE TABLE tags (
       id SERIAL,
       name VARCHAR(20)
       );

CREATE TABLE artist_tags (
       artist INTEGER REFERENCES artists(id),
       tag INTEGER REFERENCES tags(id)
       );

INSERT INTO tags (name) VALUES ('dead'), ('rock'), ('80s'), ('90s'), ('pop'), ('rap');


insert into artist_tags (artist, tag) VALUES (1, 1), (1, 3), (1, 5);
insert into artist_tags (artist, tag) VALUES (2, 4), (2, 6);
insert into artist_tags (artist, tag) VALUES (4, 2), (4, 3);                                        
-- Get a given track name, lyrics, artist and tags for the artist

SELECT t.name as "track name", t.lyrics, a.name as "artist name", tg.name from tracks t, artists a, artist_tags at, tags tg WHERE
       t.id = 2 and 
       t.artist_id = a.id and
       a.id = at.artist and
       at.tag = tg.id 
ORDER BY t.name;       

-- Get all songs by artists of the 80s.

SELECT a.name, t.name, t.lyrics from  tracks t, artists a, artist_tags at, tags tg WHERE
       tg.name = '80s' and
       at.tag = tg.id and
       at.artist = a.id and
       t.artist_id = a.id
ORDER BY t.name DESC;       
-- CREATE TABLE tags (
--        id SERIAL), 
--        name VARCHAR(50),
--        PRIMARY KEY (id)
-- );

-- CREATE artist_tags (
--        artist_id INTEGER
--        tag_id  INTe
--        );

INSERT INTO tracks (artist_id, name, lyrics) VALUES (1, 'Bad', 'lyrics for Bad'),(1, 'Smooth Criminal', 'lyrics for Smooth criminal'),(2, 'Eminem Song 1', 'lyrics for Eminem Song 1'),(2, 'Eminem Song 2', 'lyrics for Eminem Song 2'),(4, 'Megadeth', 'Countdown to extinction'),(4, 'Megadeth', 'Hangar 18');

INSERT INTO tracks (artist_id, name, lyrics) VALUES (10, 'Megadeth', 'Hangar 18');


SELECT a.name as artist,t.name as track,t.lyrics as lyrics FROM artists a, tracks t WHERE a.name = 'Michael Jackson' AND t.artist_id = a.id;

SELECT * FROM tracks;



