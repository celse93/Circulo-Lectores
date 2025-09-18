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
            author = data["authors"][0]["author"]["key"]
            results = {
                "author": author,
                "description": data["description"],
                "title": data["title"],
            }
            return jsonify(results), proxy_request.status_code
        except requests.RequestException:
            return jsonify({"error": "Failed to fetch from OpenLibrary."}), 502
