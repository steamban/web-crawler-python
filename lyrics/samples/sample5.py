from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Table, Column, Integer, String, MetaData
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship


md = MetaData()

artists = Table("artists", md, 
                Column("id", Integer, primary_key = True),
                Column("name", String(100)))


class Artists(DeclarativeBase):
    __tablename__ = "artists"
    id = mapped_column(type = Integer, primary_key= True)
    name = mapped_column(type = String(100))






