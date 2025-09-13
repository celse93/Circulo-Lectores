from flask import request, jsonify
from src.db import db
from src.models.models import Profiles
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)


def profiles_routes(app):
    @app.route("/profiles", methods=["PATCH"])
    @jwt_required()
    def profile():
        data = request.get_json()
        required_fields = ["name", "avatar"]

        if not any(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        name = data["name"]
        avatar = data["avatar"]
        user_id = get_jwt_identity()

        update_profile = db.session.get(Profiles, user_id)
        update_profile.name = name
        update_profile.avatar = avatar
        db.session.commit()

        return jsonify({"message": "Profile updated successfully"}), 201

    @app.route("/profiles/<int:user_id>", methods=["GET"])
    @jwt_required()
    def profile_by_user(user_id):
        response_body = {}
        profile = db.session.get(Profiles, user_id)

        if not profile:
            response_body["error"] = f"Profile ID:{user_id} does not exist."
        else:
            response_body["result"] = profile.serialize()

        return jsonify(response_body), 200
