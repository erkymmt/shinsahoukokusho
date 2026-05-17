from pathlib import Path
import csv

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "raw_public_reports"
TEXT_DIR = ROOT / "extracted_text"
MANIFEST = ROOT / "outputs" / "public_report_text_manifest.csv"


def extract_pdf(pdf_path: Path) -> dict:
    text_path = TEXT_DIR / f"{pdf_path.stem}.txt"
    try:
        reader = PdfReader(str(pdf_path))
        parts = []
        for index, page in enumerate(reader.pages, start=1):
            text = page.extract_text() or ""
            parts.append(f"\n\n--- page {index} ---\n\n{text}")

        text_path.write_text("".join(parts).strip() + "\n", encoding="utf-8")
        return {
            "pdf_file": pdf_path.name,
            "text_file": text_path.name,
            "pages": len(reader.pages),
            "characters": len(text_path.read_text(encoding="utf-8")),
            "status": "extracted",
            "error": "",
        }
    except Exception as exc:
        if text_path.exists():
            return {
                "pdf_file": pdf_path.name,
                "text_file": text_path.name,
                "pages": "",
                "characters": len(text_path.read_text(encoding="utf-8")),
                "status": "extracted_by_alternative",
                "error": f"pypdf failed; existing text kept. {type(exc).__name__}: {exc}",
            }
        return {
            "pdf_file": pdf_path.name,
            "text_file": "",
            "pages": "",
            "characters": "",
            "status": "needs_alternative_extraction",
            "error": f"{type(exc).__name__}: {exc}",
        }


def main() -> None:
    TEXT_DIR.mkdir(parents=True, exist_ok=True)
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    rows = [extract_pdf(path) for path in sorted(PDF_DIR.glob("*.pdf"))]
    with MANIFEST.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "pdf_file",
                "text_file",
                "pages",
                "characters",
                "status",
                "error",
            ],
        )
        writer.writeheader()
        writer.writerows(rows)


if __name__ == "__main__":
    main()
