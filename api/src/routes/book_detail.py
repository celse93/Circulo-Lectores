from flask import jsonify, request
import requests


from ratelimit import limits, sleep_and_retry


CALLS = 5
PERIOD = 1


@sleep_and_retry
@limits(calls=CALLS, period=PERIOD)
def fetch_openlibrary(url, params):
    return requests.get(url, params=params, timeout=10)


open_library_url = "https://openlibrary.org/"


def book_detail_route(app):
    @app.route("/book_detail/<path:path>", methods=["GET"])
    def book_detail(path):
        url = f"{open_library_url}{path}"
        params = dict(request.args)

        try:
            proxy_request = fetch_openlibrary(url=url, params=params)

            data = proxy_request.json()
            author = data.get("authors")
            author_id = author[0]["author"]["key"].split("/")[-1]
            description = data.get("description")
            cover = data.get("covers")
            cover_id = (
                cover and len(cover) > 0 and cover[0] is not None and cover[0]
            ) or ""

            results = {
                "author_id": author_id,
                "description": description.get("value")
                if isinstance(description, dict)
                else description,
                "title": data["title"],
                "cover_id": cover_id,
                "book_id": data["key"].split("/")[-1],
            }
            return jsonify(results), proxy_request.status_code
        except requests.RequestException:
            return jsonify({"error": "Failed to fetch from OpenLibrary."}), 502
