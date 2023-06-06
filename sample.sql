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

-- CREATE TABLE tags (
--        id SERIAL,
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



