from flask import request, jsonify
from src.db import db
from src.models.models import Profiles
from sqlalchemy import select
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
)


def profiles_routes(app):
    @app.route("/profiles", methods=["PATCH", "GET"])
    @jwt_required()
    def profile():
        # method for updating profile
        if request.method == "PATCH":
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

        # method to get profiles by name
        elif request.method == "GET":
            data = request.get_json()
            name = data["name"]
            profiles = (
                db.session.execute(select(Profiles).where(Profiles.name == name))
                .scalars()
                .all()
            )
            if not profiles:
                return jsonify({"error": f'Profile with name "{name}" was not found.'})

            response_body = [profile.serialize() for profile in profiles]

            return jsonify(response_body), 200
