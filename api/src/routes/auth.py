from src.db import db
from flask import request, jsonify
from sqlalchemy import select
from src.models.models import Users, Profiles
import bcrypt
from flask_jwt_extended import (
    create_access_token,
    get_csrf_token,
    set_access_cookies,
    unset_jwt_cookies,
    jwt_required,
    get_jwt_identity,
)


def auth_routes(app):
    @app.route("/register", methods=["POST"])
    def register():
        data = request.get_json()
        required_fields = ["username", "email", "password"]

        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        username = data["username"]
        email = data["email"]
        password = data["password"]

        # Check for existing user
        existing_email = db.session.execute(
            select(Users).where(Users.email == email)
        ).scalar_one_or_none()

        existing_username = db.session.execute(
            select(Profiles).where(Profiles.username == username)
        ).scalar_one_or_none()
        print(existing_email)
        if existing_email:
            return jsonify({"error": "Email already registered"}), 400

        if existing_username:
            return jsonify({"error": "Username already registered"}), 400

        # Hash password
        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

        # Create user
        new_user = Users(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        # Create profile
        new_profile = Profiles(id=new_user.id, username=username)
        db.session.add(new_profile)
        db.session.commit()

        return jsonify({"message": "User registered successfully"}), 201

    @app.route("/login", methods=["POST"])
    def login():
        data = request.get_json()
        required_fields = ["email", "password"]

        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        email = data["email"]
        password = data["password"]

        user = Users.query.filter_by(email=email).first()

        if not user:
            return jsonify({"error": "User not found"}), 400

        if not bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
            return jsonify({"error": "Password not correct"}), 400

        # Create JWT and CSRF token
        access_token = create_access_token(identity=str(user.id))
        csrf_token = get_csrf_token(access_token)

        response = jsonify(
            {
                "msg": "login successful",
                "user": user.serialize(),
                "csrf_token": csrf_token,
            }
        )
        set_access_cookies(response, access_token)
        return response

    @app.route("/logout", methods=["POST"])
    @jwt_required()
    def logout():
        response = jsonify({"msg": "logout successful"})
        unset_jwt_cookies(response)
        return response

    @app.route("/me", methods=["GET"])
    @jwt_required()
    def get_current_user():
        user_id = get_jwt_identity()
        user = db.session.get(Users, user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404

        return jsonify(user.serialize()), 200
