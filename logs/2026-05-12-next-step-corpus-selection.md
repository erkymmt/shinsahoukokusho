# 2026-05-12 Next Step: Corpus Selection

## Immediate Next Step

Build the public review report corpus before downloading or deeply extracting PDF text.

The first useful artifact is `matrices/report_selection_matrix.csv`, because it fixes which public PMDA reports should control the internal Copilot.

## Proposed First Corpus

Priority group A: close pharmacology / disease area

- Edoxaban / Lixiana
- Rivaroxaban / Xarelto
- Apixaban / Eliquis
- Prasugrel / Efient
- Ticagrelor / Brilinta
- Clopidogrel / Plavix

Priority group B: recent PMDA style, regardless of drug class

- 2024 to 2025 new active ingredient or major new indication reports
- Circulatory-area reports when available
- Reports with clear safety-risk discussion and postmarketing commitments

## Why This Order

The internal Copilot should not simply imitate the oldest anticoagulant or antiplatelet reports.

Older reports are useful for issue discovery:

- clinical positioning
- comparator logic
- endpoint logic
- bleeding risk
- Japanese population handling
- dose selection

Recent reports are useful for style control:

- section structure
- phrasing of uncertainty
- review conclusion
- postmarketing information-collection language

## Next Work Item

For each selected report:

1. Download the public review report PDF.
2. Extract text.
3. Fill `matrices/review_report_analysis_matrix.csv`.
4. Add reusable expressions to `patterns/writing_patterns.md`.
5. Update the internal Copilot prompt with concrete reference instructions.

