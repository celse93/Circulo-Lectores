from flask import jsonify
import requests


def book_detail_route(app):
    @app.route("/book_detail/<path:path>", methods=["GET"])
    def book_detail(path):
        response_body = {}
        url = f"https://openlibrary.org/works/{path}.json"
        response = requests.get(url)

        if response.status_code == 200:
            data = response.json()
            return jsonify(data), 200
        else:
            response_body["error"] = (
                f"Error retrieving OpenLibrary API data. Code status: {response.status_code}"
            )
            return response_body
