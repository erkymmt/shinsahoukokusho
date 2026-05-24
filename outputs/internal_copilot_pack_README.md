# Internal Copilot Pack README

このzipは、内部環境のCopilotに渡すための外部準備パックです。

公表済みPMDA審査報告書から作成した、7項作成用プロンプト、全体手順書、書きぶりパターン、論点マトリクス、Excel互換ファイルを含みます。

メール受信サイズ制限にかかりにくくするため、公表審査報告書PDF本体はこのzipには含めていません。PDF本体は別ファイル `outputs/reference_public_review_reports_2026-05-24.zip` に分けています。

企業申請資料、未公表データ、内部判断、照会事項案、最終審査報告書ドラフトは含まれていません。

## 最初に使うファイル

### 7項を作る場合

まず `prompt_pack/section7_clinical_data_prompt.md` を内部Copilotに渡してください。

このファイルは、審査報告書の「7. 臨床的有効性及び臨床的安全性に関する資料並びに機構における審査の概略」を作るための専用プロンプトです。

内部Copilotには、申請資料、CTD、試験総括報告書、照会回答等の内部資料を添付した上で、このプロンプトを使わせてください。

期待する出力は、単なる論点抽出ではなく、次を含む7項本体の下書きです。

- 提出された主な臨床試験の概略表
- 各試験の目的、デザイン、対象、選択基準、用法・用量
- 解析対象集団、患者背景、中止例
- 主要評価項目及び副次評価項目の結果
- 有害事象、死亡、重篤な有害事象、投与中止に至った有害事象
- 出血関連事象、頭蓋内出血、脳梗塞/TIA等の注目事象
- 日本人集団、部分集団、外挿性
- 7.Rで議論すべき審査論点

### 全体の作業順を確認する場合

`prompt_pack/internal_copilot_runbook.md` を読んでください。

このファイルには、品目概要、有効性、安全性、用法・用量、日本人データ、製造販売後調査、7項作成、品質チェックの順番をまとめています。

### まず大きく論点を出す場合

`prompt_pack/internal_copilot_master_prompt.md` を使ってください。

ただし、7項の本文を作る場合は、必ず `section7_clinical_data_prompt.md` を優先してください。master promptだけだと、試験データ整理の粒度が不足する可能性があります。

## 参照用ファイル

### 書きぶりと論点の参考

`patterns/writing_patterns.md`

公表済み審査報告書から、出血、用量設定、日本人データ、非劣性未検証、製造販売後調査等の書きぶりを整理したファイルです。

### 報告書ごとの比較表

`matrices/review_report_analysis_matrix.csv`

各公表報告書の対象疾患、薬効、主要論点、参照用途を整理したCSVです。

職場PCのExcelで開く場合は、次のどちらかを優先してください。

- `outputs/excel_compatible/review_report_analysis_matrix.xlsx`
- `outputs/excel_compatible/review_report_analysis_matrix_utf8_bom.csv`

### コーパス状態

`outputs/initial_corpus_status.md`

収集済み公表報告書、OCR状況、現在の解釈、次に使うべきファイルをまとめています。

`outputs/public_report_text_manifest.csv`

各PDFのテキスト抽出状況を一覧にしたファイルです。

### 公表審査報告書PDF本体

別zip: `outputs/reference_public_review_reports_2026-05-24.zip`

7項の章立て、表の作り方、数値の置き方、本文の粒度を原本で確認するための公表PDFです。

特に7項作成時は、次を優先して参照してください。

- `macitentan-tadalafil-yuvanci-2024-review.pdf`: 7項冒頭、主な臨床試験の概略表、第III相試験、主要評価項目表、安全性表、日本人集団。
- `edoxaban-lixiana-2025-review.pdf`: 1試験中心の7項、出血リスク、追加調査なしの整理。
- `prasugrel-efient-2021-review.pdf`: 複数試験、非劣性未検証、CYP2C19、低体重、高齢者、製造販売後調査。
- `rivaroxaban-xarelto-2023-review.pdf`: 少数例、小児、体重別用量、出血、RMP。

## 内部Copilotへの渡し方

1. zipを展開する。
2. まずこのREADMEを読む。
3. 7項を作るなら `prompt_pack/section7_clinical_data_prompt.md` を開く。
4. 内部Copilotに、今回品目の内部資料と `section7_clinical_data_prompt.md` を渡す。
5. 必要に応じて `internal_copilot_runbook.md`、`writing_patterns.md`、`review_report_analysis_matrix.xlsx` を追加参照させる。
6. PDF原本が必要な場合だけ、別zip `reference_public_review_reports_2026-05-24.zip` を展開して追加参照させる。
7. 出力された7項ドラフトについて、根拠資料の有無、数値、試験番号、評価項目、解析対象、安全性分類を人が確認する。

## 注意事項

- 公表済み報告書は、今回品目の事実補完には使わないでください。
- 公表済み報告書は、章立て、表の作り方、論点の拾い方、書きぶりの参考にだけ使ってください。
- PDF本体は公表資料の原本確認用です。PDF内の他品目の試験番号、数値、疾患固有事情を今回品目の事実として混入しないでください。
- 申請資料に根拠がない数値や判断は、本文に混ぜず `要確認事項` に残してください。
- OCR由来テキストには誤認識が残り得るため、正確な引用、数値、試験番号、薬剤名、遺伝子名はPDF原本で確認してください。
- このzipには内部資料や最終ドラフトを入れないでください。
