import secrets
from http.cookies import SimpleCookie

from .repository import Database

SESSIONS = {}


def authenticate(db: Database, username: str, password: str):
    with db.connect() as conn:
        return conn.execute(
            "SELECT * FROM users WHERE username=? AND password=?",
            (username, password),
        ).fetchone()


def create_session(user_id: int):
    token = secrets.token_urlsafe(24)
    SESSIONS[token] = user_id
    return token


def destroy_session(token: str | None):
    if token and token in SESSIONS:
        del SESSIONS[token]


def get_session_user(handler, db: Database):
    cookie = SimpleCookie(handler.headers.get("Cookie"))
    morsel = cookie.get("platform_session")
    token = morsel.value if morsel else None
    if not token:
        return None
    uid = SESSIONS.get(token)
    if not uid:
        return None
    with db.connect() as conn:
        return conn.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()


def set_preferences(conn, user_id: int, lang: str, theme: str, role: str | None = None):
    conn.execute(
        "INSERT INTO settings(user_id, lang, theme) VALUES (?,?,?) "
        "ON CONFLICT(user_id) DO UPDATE SET lang=excluded.lang, theme=excluded.theme",
        (user_id, lang, theme),
    )
    conn.execute("UPDATE users SET lang=?, theme=? WHERE id=?", (lang, theme, user_id))
    if role:
        conn.execute("UPDATE users SET role=? WHERE id=?", (role, user_id))

