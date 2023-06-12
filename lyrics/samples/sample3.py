import sqlalchemy as sa


engine = sa.create_engine("postgresql:///lyrics", echo=True)  

conn = engine.connect()
result = conn.execute(sa.text("SELECT * from artists"))
for i in result:
    print (i)
conn.close()


with engine.connect() as conn:
    result = conn.execute(sa.text("INSERT INTO artists (name) VALUES ('Megadeth')"))
    conn.commit() # Without this, the transaction will be rolled back.
                          

with engine.connect() as conn:
    result = conn.execute(sa.text("SELECT * from artists where name = :a"), {"a": "Metallica"})
    for i in result:
        print (i)
