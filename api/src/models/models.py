from sqlalchemy import String, VARCHAR, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.db import db
from typing import List


class Users(db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    email: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(VARCHAR(60), nullable=False)
    profile: Mapped["Profiles"] = relationship(back_populates="user")

    def __repr__(self):
        return f"<User {self.user_name}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }


class Profiles(db.Model):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    avatar: Mapped[str] = mapped_column(String(150), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["Users"] = relationship(back_populates="profile")
    recommendation: Mapped["Recommendations"] = relationship(back_populates="profile")
    readinglist: Mapped["ReadingList"] = relationship(back_populates="profile")
    review: Mapped["Reviews"] = relationship(back_populates="profile")
    # follower: Mapped[List["Follows"]] = relationship(back_populates="followed")
    # following: Mapped[List["Follows"]] = relationship(back_populates="follower")

    def __repr__(self):
        return f"<User {self.user_name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "avatar": self.avatar,
            "user_id": self.user_id,
        }


"""
class Follows(db.Model):
    __tablename__ = "follows"

    user_from_id: Mapped[int] = mapped_column(
        ForeignKey("profiles.id"), primary_key=True
    )
    user_to_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"), primary_key=True)
    followed: Mapped["Profiles"] = relationship(back_populates="follower")
    follower: Mapped["Profiles"] = relationship(back_populates="following")

    def __str__(self):
        return f"{self.user_from_id} → {self.user_to_id}"

    def serialize(self):
        return {
            "user_from_id": self.user_from_id,
            "user_to_id": self.user_to_id,
        }
"""


class ReadingList(db.Model):
    __tablename__ = "readinglist"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    book_id: Mapped[str] = mapped_column(String(50), nullable=False)
    profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    profile: Mapped[List["Profiles"]] = relationship(back_populates="readinglist")

    def __repr__(self):
        return f"<Profile {self.profile_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "profile_id": self.profile_id,
        }


class Recommendations(db.Model):
    __tablename__ = "recommendations"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    book_id: Mapped[str] = mapped_column(String(50), nullable=False)
    profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    profile: Mapped[List["Profiles"]] = relationship(back_populates="recommendation")

    def __repr__(self):
        return f"<Profile {self.profile_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "profile_id": self.profile_id,
        }


class Reviews(db.Model):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    text: Mapped[str] = mapped_column(String(500), nullable=False)
    ratings: Mapped[int] = mapped_column(nullable=False)
    book_id: Mapped[str] = mapped_column(String(50), nullable=False)
    profile_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    profile: Mapped[List["Profiles"]] = relationship(back_populates="review")

    def __repr__(self):
        return f"<Profile {self.profile_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "ratings": self.ratings,
            "book_id": self.book_id,
            "profile_id": self.profile_id,
        }
