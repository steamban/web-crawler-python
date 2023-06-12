import sqlalchemy as sa
from sqlalchemy.orm import Session

engine = sa.create_engine("postgresql:///lyrics", echo=True)  

statement = sa.text("SELECT id,name FROM artists WHERE name = :a")

with Session(engine) as sess:
    results = sess.execute(statement, {"a" : "Metallica"})
    for i in results:
        print (i)
