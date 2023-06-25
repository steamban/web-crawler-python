import logging


def setup_logger(debug):
    l = logging.getLogger("lyrics")
    l.setLevel(logging.DEBUG)
    h = logging.StreamHandler()
    if debug:
        h.setLevel(logging.DEBUG)
    else:
        h.setLevel(logging.INFO)
    h.setFormatter(logging.Formatter("[%(levelname)s] %(filename)s:%(lineno)d : %(message)s"))
    l.addHandler(h)
  
    
def get_logger():
    return logging.getLogger("lyrics")
