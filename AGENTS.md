# New Drug Review Report Copilot Agent Guide

## Mission

This workspace supports external preparation for a new-drug PMDA review report project. It contains public review reports, extracted text, matrices, writing-pattern notes, prompt packs, and placeholders that help control an internal Copilot later.

## Project Boundary

This workspace is only for new-drug review report drafting support.

- Keep SaMD / software-as-a-medical-device regulatory research in `/Users/yamamotoerika/Desktop/SaMD`.
- Do not place SaMD wiki pages, SaMD approved-product matrices, SaMD Q&A summaries, or SaMD internal Copilot packs in this workspace.
- Public pharmaceutical review reports may be used here to extract writing patterns, issue structures, and prompt-control material for the new-drug project.
- For the current project, prioritize anticoagulants, antiplatelet drugs, cerebrovascular-event issues, bleeding, dose setting, Japanese data, renal/hepatic function, elderly patients, concomitant drugs, and post-marketing safety/RMP.
- Do not store company application materials, unpublished data, internal judgments, inquiry drafts, or final confidential review report drafts in this external workspace.

## Directory Policy

- `raw_public_reports/`: public pharmaceutical PMDA review report PDFs.
- `extracted_text/`: extracted text from public PDFs.
- `matrices/`: cross-product pharmaceutical review report matrices.
- `patterns/`: writing patterns and issue structures for pharmaceutical review reports.
- `prompt_pack/`: internal Copilot prompts and checklists derived from public information.
- `internal_only_placeholders/`: blank placeholders for internal-only facts; do not fill them externally.
- `outputs/`: external generated deliverables.
- `logs/`: work history.

## Change Policy

- Keep edits scoped to this new-drug workspace.
- Do not import SaMD artifacts unless the user explicitly asks for a separately labeled cross-project reference.
- If a request sounds like SaMD regulatory research, redirect it to `/Users/yamamotoerika/Desktop/SaMD`.
- Preserve the external/internal boundary: public materials and reusable templates here; confidential facts only inside the internal environment.
