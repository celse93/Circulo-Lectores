from flask import jsonify, request
import requests

open_library_url = "https://openlibrary.org/"


def author_detail_route(app):
    @app.route("/author/<path:path>", methods=["GET"])
    def author_detail(path):
        url = f"{open_library_url}{path}"
        params = dict(request.args)

        try:
            proxy_request = requests.get(url, params=params, timeout=10)
            data = proxy_request.json()
            author_name = data.get("name")
            author_bio = data.get("bio")

            results = {
                "author_name": author_name,
                "author_bio": author_bio.get("value")
                if isinstance(author_bio, dict)
                else author_bio,
                "author_id": data["key"].split("/")[-1],
            }

            return jsonify(results), proxy_request.status_code

        except requests.RequestException:
            return jsonify({"error": "Failed to fetch from OpenLibrary."}), 502
