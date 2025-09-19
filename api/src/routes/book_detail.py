from flask import jsonify, request
import requests

open_library_url = "https://openlibrary.org/"


def book_detail_route(app):
    @app.route("/book_detail/<path:path>", methods=["GET"])
    def book_detail(path):
        url = f"{open_library_url}{path}"
        params = dict(request.args)

        try:
            proxy_request = requests.get(url, params=params, timeout=10)

            data = proxy_request.json()
            author_id = data["authors"][0]["author"]["key"].split("/")[-1]
            results = {
                "author_id": author_id,
                "description": data["description"],
                "title": data["title"],
                "cover_id": data["covers"][0],
            }
            return jsonify(results), proxy_request.status_code
        except requests.RequestException:
            return jsonify({"error": "Failed to fetch from OpenLibrary."}), 502
