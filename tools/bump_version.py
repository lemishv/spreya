#!/usr/bin/env python3
"""Підняти версію застосунку в усіх місцях одразу.

    python3 tools/bump_version.py 0.7.1

Оновлює: APP_VERSION в app.js, VERSION у sw.js, ?v= в index.html.
Нова версія в sw.js змушує браузер перекешувати оболонку застосунку,
а ?v= гарантує, що старий index.html ніколи не підтягне новий app.js.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main() -> int:
    if len(sys.argv) != 2 or not re.fullmatch(r"\d+\.\d+\.\d+", sys.argv[1]):
        print(__doc__)
        return 2
    new = sys.argv[1]
    edits = [
        ("app.js", r"var APP_VERSION = '[\d.]+';", f"var APP_VERSION = '{new}';"),
        ("sw.js", r"var VERSION = '[\d.]+';", f"var VERSION = '{new}';"),
        ("index.html", r"\?v=[\d.]+", f"?v={new}"),
    ]
    for name, pattern, repl in edits:
        path = ROOT / name
        text = path.read_text(encoding="utf-8")
        updated, n = re.subn(pattern, repl, text)
        if n == 0:
            print(f"{name}: шаблон не знайдено")
            return 1
        path.write_text(updated, encoding="utf-8")
        print(f"{name}: {n} замін(и)")
    print(f"Версія {new}. Не забудьте запис у CHANGELOG.md.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
