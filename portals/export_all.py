import os
from bs4 import BeautifulSoup
import re

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
EXPORT_DIR = os.path.join(ROOT_DIR, "export")

if not os.path.exists(EXPORT_DIR):
    os.makedirs(EXPORT_DIR)

def minify_html(html):
    soup = BeautifulSoup(html, "html.parser")
    minified = soup.prettify(formatter=None)
    minified = re.sub(r">\s+<", "><", minified)  # Odstranit mezery mezi tagy
    minified = re.sub(r"\s+", " ", minified)     # Odstranit přebytečné bílé znaky
    return minified.strip()

for folder in os.listdir(ROOT_DIR):
    folder_path = os.path.join(ROOT_DIR, folder)
    if os.path.isdir(folder_path) and folder != "export":
        export_subfolder = os.path.join(EXPORT_DIR, folder)
        os.makedirs(export_subfolder, exist_ok=True)
        for file in os.listdir(folder_path):
            if file.endswith(".html"):
                input_path = os.path.join(folder_path, file)
                output_path = os.path.join(export_subfolder, file)
                with open(input_path, "r", encoding="utf-8") as f:
                    html = f.read()
                    minified_html = minify_html(html)
                with open(output_path, "w", encoding="utf-8") as f_out:
                    f_out.write(minified_html)