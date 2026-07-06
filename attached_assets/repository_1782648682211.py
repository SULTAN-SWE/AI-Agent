import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "enterprise_platform.db"


class Database:
    def __init__(self, path: Path | str = DB_PATH):
        self.path = Path(path)

    def connect(self):
        conn = sqlite3.connect(self.path)
        conn.row_factory = sqlite3.Row
        return conn


def init_database(schema_sql: str):
    db = Database()
    with db.connect() as conn:
        conn.executescript(schema_sql)
    return db
