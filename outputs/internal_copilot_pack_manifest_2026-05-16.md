# Internal Copilot Pack Manifest

作成日: 2026-05-16

## Purpose

内部環境のCopilotに渡すための外部準備素材一式。公表済みPMDA審査報告書から作成した論点整理、書きぶりパターン、プロンプト、チェックリスト、Excel互換マトリクスを含む。

このパックには、企業申請資料、未公表情報、内部判断、照会事項案、最終審査報告書ドラフトは含めない。

## Included Files

- `outputs/internal_copilot_pack_README.md`
- `prompt_pack/internal_copilot_runbook.md`
- `prompt_pack/internal_copilot_master_prompt.md`
- `prompt_pack/current_product_checklist.md`
- `prompt_pack/section7_clinical_data_prompt.md`
- `patterns/writing_patterns.md`
- `matrices/review_report_analysis_matrix.csv`
- `outputs/excel_compatible/review_report_analysis_matrix_utf8_bom.csv`
- `outputs/excel_compatible/review_report_analysis_matrix.xlsx`
- `outputs/public_report_text_manifest.csv`
- `outputs/initial_corpus_status.md`
- `raw_public_reports/edoxaban-lixiana-2025-review.pdf`
- `raw_public_reports/rivaroxaban-xarelto-2023-review.pdf`
- `raw_public_reports/prasugrel-efient-2021-review.pdf`
- `raw_public_reports/prasugrel-efient-2014-review.pdf`
- `raw_public_reports/apixaban-eliquis-2015-review.pdf`
- `raw_public_reports/clopidogrel-plavix-2012-review.pdf`
- `raw_public_reports/macitentan-tadalafil-yuvanci-2024-review.pdf`

## Notes

- エフィエント2021及びユバンシ2024の本文はmacOS Vision OCRで抽出済み。
- OCR由来テキストには誤認識が残り得るため、正確な引用、数値、試験番号、薬剤名、遺伝子名はPDF原本で確認する。
- 職場PCのExcel向けには、UTF-8 BOM付きCSV又はxlsx版を優先して使う。
- 7項の表、数値の置き方、章立てを確認できるよう、公表審査報告書PDF本体を同梱した。
- 2026-05-13作成の古いzipは `outputs/obsolete/` に退避済みであり、使用しない。
