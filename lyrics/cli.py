import argparse
import logging

import crawler
import db
import utils

logger = utils.get_logger()

def parse():
    parser = argparse.ArgumentParser(
        prog = "lyrics",
        description = "Offline song lyrics browser")
    
    parser.add_argument("-d", "--debug", help = "Display detailed debug", action="store_true", default=False)
    
    subparsers = parser.add_subparsers(dest="command")
    subparsers.add_parser("listartists", help = "List of artists in the system")
    subparsers.add_parser("initdb", help = "Initialise the database")
    crawl_parser = subparsers.add_parser("crawl", help = "Crawl lyrics")

    crawl_parser.add_argument("--nartists", help="Number of artists to crawl (Default : %(default)s)", 
                              type=int, 
                              default=8)

    crawl_parser.add_argument("--ntracks", help="Number of tracks to crawl per artist (Default : %(default)s)",
                              type=int,
                              default=5)

    args = parser.parse_args()
    return args

def handle_listartists(args):
    artists = db.get_artists()
    for idx, name in enumerate(artists, start=1):
        print (f"{idx}. {name}")

def handle_initdb(args):
    db.initdb()

def handle_crawl(args):
    print (args)
    crawler.crawl("https://www.songlyrics.com/top-artists-lyrics.html", 
                    args.nartists, 
                    args.ntracks)

def main():

    commands = {"listartists" : handle_listartists,
                "initdb"  : handle_initdb ,
                "crawl" : handle_crawl}

    args = parse()
    utils.setup_logger(args.debug)
    commands[args.command](args)

if __name__ == "__main__":
    main()
