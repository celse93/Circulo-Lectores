import requests
from flask import request, jsonify
from urllib.parse import quote

open_library_url = "https://openlibrary.org/"


def books_search_routes(app):
    @app.route("/books_search/<path:path>", methods=["GET"])
    def search_books(path):
        url = f"{open_library_url}{path}"
        params = dict(request.args)

        try:
            response = requests.get(url, params=params, timeout=10)

            if response.status_code != 200:
                return jsonify(
                    {"error": "Failed to get the information from OpenLibrary"}
                ), 500

            data = response.json()
            results = []

            for book in data.get("docs", []):
                author_names = book.get("author_name", [])
                author = author_names[0] if author_names else "Unknown"
                book_id = book.get("key").split("/")[-1]

                results.append(
                    {
                        "title": book.get("title", "Unknown Title"),
                        "author": author,
                        "first_publish_year": book.get("first_publish_year"),
                        "cover_id": book.get("cover_i"),
                        "openlibrary_id": book_id,
                    }
                )

            return jsonify(results), response.status_code

        except Exception as e:
            return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


# pruebas hechas con https://automatic-fortnight-5g54rgww9xgwh4j7r-5000.app.github.dev/books/search?q=harry+potter - SALIÓ OK
# prueba hecha con https://automatic-fortnight-5g54rgww9xgwh4j7r-5000.app.github.dev/books/search?q=lord%20of%20the%20rings - SALIÓ OK
