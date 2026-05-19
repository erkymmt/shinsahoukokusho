# Public Review Report Corpus Status

作成日: 2026-05-12  
最終更新: 2026-05-16

## Current State

7本の公表済みPMDA審査報告書PDFを `raw_public_reports/` に保存し、全件について `extracted_text/` に本文テキストを用意した。

現時点で、OCR又は別処理が未完了のPDFはない。

## Downloaded PDFs

- `edoxaban-lixiana-2025-review.pdf`
- `rivaroxaban-xarelto-2023-review.pdf`
- `prasugrel-efient-2021-review.pdf`
- `prasugrel-efient-2014-review.pdf`
- `apixaban-eliquis-2015-review.pdf`
- `clopidogrel-plavix-2012-review.pdf`
- `macitentan-tadalafil-yuvanci-2024-review.pdf`

## Text Extraction Status

抽出結果の詳細は `outputs/public_report_text_manifest.csv` に記録した。

通常抽出済み:

- リクシアナ 2025
- エリキュース 2015
- プラビックス 2012
- エフィエント 2014

代替抽出又はOCR済み:

- イグザレルト 2023: pypdfではAES依存関係で失敗したため、既存の代替抽出テキストを保持。
- エフィエント 2021: 画像PDFのため、2026-05-16にmacOS Vision OCRで本文抽出。
- ユバンシ 2024: 当初の抽出テキストが文字化けしていたため、2026-05-16にmacOS Vision OCRで再抽出。

OCR由来のテキストには誤認識が残り得る。正確な引用、数値、試験番号、薬剤名、遺伝子名を使う場合はPDF原本で確認する。

## Current Interpretation

このコーパスは、内部Copilot制御に使う外部準備素材として十分な初期骨格になっている。

近縁薬効・論点抽出:

- リクシアナ 2025: 抗凝固薬、CTEPH、ワルファリン比較、出血、高齢者、用量調整。
- イグザレルト 2023: 抗凝固薬、Fontan術後、少数例、小児、出血、RMP。
- エリキュース 2015: 抗凝固薬、VTE、初期高用量、腎機能、低体重、高齢、日本人PK、併用薬。
- エフィエント 2021: 抗血小板薬、虚血性脳血管障害、クロピドグレル比較、非劣性未検証、CYP2C19、出血、低体重、高齢、急性期/TIA、製造販売後調査。
- プラビックス 2012: 抗血小板薬、虚血性脳血管障害/PAD、海外試験利用、併用薬、出血。
- エフィエント 2014: 抗血小板薬、国内用量設定、アスピリン併用、頭蓋内出血、脳梗塞/TIA既往、肝腎機能障害。

最近文体・章立て:

- リクシアナ 2025
- イグザレルト 2023
- ユバンシ 2024

特殊論点:

- エフィエント 2021: 非劣性未検証でも対象集団を限定して承認可とする場合の整理。
- ユバンシ 2024: 配合剤、固定用量、単剤からの切替え、忍容性確認、日本人少数例、追加調査を行わず適正使用資材で担保する場合の整理。

## Current External Artifacts

内部環境に持ち込む候補:

- `outputs/internal_copilot_pack_2026-05-16.zip`
- `outputs/internal_copilot_pack_manifest_2026-05-16.md`
- `prompt_pack/internal_copilot_runbook.md`
- `prompt_pack/internal_copilot_master_prompt.md`
- `prompt_pack/section7_clinical_data_prompt.md`
- `prompt_pack/current_product_checklist.md`
- `patterns/writing_patterns.md`
- `matrices/review_report_analysis_matrix.csv`
- `outputs/excel_compatible/review_report_analysis_matrix_utf8_bom.csv`
- `outputs/excel_compatible/review_report_analysis_matrix.xlsx`
- `outputs/public_report_text_manifest.csv`

古い成果物:

- 2026-05-13作成の `outputs/internal_copilot_pack.zip` は、2026-05-16に `outputs/obsolete/internal_copilot_pack_2026-05-13_obsolete.zip` へ退避した。
- この古いzipはOCR修正、プロンプト更新、パターン更新を含まないため使用しない。

## Internal Copilot Control Implication

内部Copilotには、企業資料を読ませる前に次を明示する。

1. 公表報告書は、今回品目の事実補完ではなく、7項の章立て、試験データ整理の粒度、論点抽出、書きぶり参照にだけ使う。
2. 古い抗凝固薬・抗血小板薬報告書は論点抽出用。
3. 最近の報告書は章立て・文体・結論表現の参照用。
4. 7項では、提出された主な臨床試験の概略表、各試験の目的、デザイン、対象、用法・用量、解析対象、患者背景、有効性成績、安全性成績を先に整理させる。
5. 脳血管イベント、出血、併用抗血栓薬、高齢者、低体重、腎機能、肝機能、用量設定、日本人データ、非劣性検証の成否、製造販売後調査/RMPを必須抽出項目にする。
6. 根拠が申請資料にないものは、公表報告書から補完して書かせない。

## Next Processing Step

職場PCのExcelで文字化けしにくい成果物として、次を作成済み。

- `outputs/excel_compatible/review_report_analysis_matrix_utf8_bom.csv`
- `outputs/excel_compatible/review_report_analysis_matrix.xlsx`

Excel互換成果物を含む新しい内部投入用パックとして、`outputs/internal_copilot_pack_2026-05-16.zip` を作成済み。

2026-05-19に、7項の臨床試験データ整理用プロンプト `prompt_pack/section7_clinical_data_prompt.md` を追加し、内部投入用パックに含める対象とした。

次は、内部Copilotに `section7_clinical_data_prompt.md` を使わせ、申請資料から7項本体の試験データ整理を作成する。
