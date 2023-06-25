import argparse

import crawler
import models
import utils
import web

logger = utils.get_logger()


def parse():
    parser = argparse.ArgumentParser(
        prog="lyrics", description="Offline song lyrics browser"
    )

    parser.add_argument(
        "-d",
        "--debug",
        help="Display detailed debug",
        action="store_true",
        default=False,
    )

    subparsers = parser.add_subparsers(dest="command")

    subparsers.add_parser("web", help="Run web server")
    subparsers.add_parser("initdb", help="Initialise the database")

    crawl_parser = subparsers.add_parser("crawl", help="Crawl lyrics")

    crawl_parser.add_argument(
        "--nartists",
        help="Number of artists to crawl (Default : %(default)s)",
        type=int,
        default=8,
    )

    crawl_parser.add_argument(
        "--ntracks",
        help="Number of tracks to crawl per artist (Default : %(default)s)",
        type=int,
        default=5,
    )

    args = parser.parse_args()
    return args


def handle_initdb(args):
    db = models.init_db(web.app, "postgresql:///lyrics")
    with web.app.app_context():
        db.drop_all()
        db.create_all()


def handle_crawl(args):
    db = models.init_db(web.app, "postgresql:///lyrics")
    crawler.crawl(
        "https://www.songlyrics.com/top-artists-lyrics.html",
        args.nartists,
        args.ntracks,
    )


def handle_web(args):
    db = models.init_db(web.app, "postgresql:///lyrics")
    web.app.run(host="0.0.0.0", port=8000, debug=True)


def main():
    commands = {
        "initdb": handle_initdb,
        "crawl": handle_crawl,
        "web": handle_web,
    }

    args = parse()
    utils.setup_logger(args.debug)
    commands[args.command](args)


if __name__ == "__main__":
    main()
