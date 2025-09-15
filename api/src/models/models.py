from sqlalchemy import String, VARCHAR, ForeignKey, Date
from datetime import date
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
        return f"<User: {self.email}>"

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }


class Follows(db.Model):
    __tablename__ = "follows"

    id: Mapped[int] = mapped_column(primary_key=True)
    follower_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    following_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))

    def serialize(self):
        return {
            "follower_id": self.follower_id,
            "following_id": self.following_id,
        }


class Profiles(db.Model):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), primary_key=True, nullable=False
    )
    name: Mapped[str] = mapped_column(String(50), nullable=True)
    avatar: Mapped[str] = mapped_column(String(150), nullable=True)
    user: Mapped["Users"] = relationship(back_populates="profile")
    recommendation: Mapped["Recommendations"] = relationship(back_populates="profile")
    readinglist: Mapped["ReadingList"] = relationship(back_populates="profile")
    review: Mapped["Reviews"] = relationship(back_populates="profile")
    quote: Mapped["Quotes"] = relationship(back_populates="profile")

    # Relationship for "followings": people this profile follows
    followings: Mapped[List["Profiles"]] = relationship(
        secondary="follows",
        primaryjoin=Follows.follower_id == id,
        secondaryjoin=Follows.following_id == id,
        back_populates="followers",
    )

    # Relationship for "followers": people who follow this profile
    followers: Mapped[List["Profiles"]] = relationship(
        secondary="follows",
        primaryjoin=Follows.follower_id == id,
        secondaryjoin=Follows.following_id == id,
        back_populates="followings",
    )

    def __repr__(self):
        return f"<User: {self.name}>"

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "avatar": self.avatar,
        }


class ReadingList(db.Model):
    __tablename__ = "readinglist"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    book_id: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    created_at: Mapped[date] = mapped_column(Date, default=date.today)
    profile: Mapped[List["Profiles"]] = relationship(back_populates="readinglist")

    def __repr__(self):
        return f"<Profile {self.id} for user {self.user_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat(),
        }


class Recommendations(db.Model):
    __tablename__ = "recommendations"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    book_id: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    created_at: Mapped[date] = mapped_column(Date, default=date.today)
    profile: Mapped[List["Profiles"]] = relationship(back_populates="recommendation")

    def __repr__(self):
        return f"<Profile: {self.user_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "book_id": self.book_id,
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat(),
        }


class Reviews(db.Model):
    __tablename__ = "reviews"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    text: Mapped[str] = mapped_column(String(500), nullable=False)
    ratings: Mapped[int] = mapped_column(nullable=False)
    book_id: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    created_at: Mapped[date] = mapped_column(Date, default=date.today)
    profile: Mapped[List["Profiles"]] = relationship(back_populates="review")

    def __repr__(self):
        return f"<Profile: {self.user_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "ratings": self.ratings,
            "book_id": self.book_id,
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat(),
        }


class Quotes(db.Model):
    __tablename__ = "quotes"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    text: Mapped[str] = mapped_column(String(500), nullable=False)
    book_id: Mapped[str] = mapped_column(String(50), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("profiles.id"))
    created_at: Mapped[date] = mapped_column(Date, default=date.today)
    profile: Mapped[List["Profiles"]] = relationship(back_populates="quote")

    def __repr__(self):
        return f"<Profile: {self.user_id}>"

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "book_id": self.book_id,
            "user_id": self.user_id,
            "created_at": self.created_at.isoformat(),
        }
