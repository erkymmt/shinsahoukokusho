import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = path.resolve(import.meta.dirname, "..");
const inputCsv = path.join(root, "matrices", "review_report_analysis_matrix.csv");
const outputDir = path.join(root, "outputs", "excel_compatible");
const bomCsv = path.join(outputDir, "review_report_analysis_matrix_utf8_bom.csv");
const xlsxPath = path.join(outputDir, "review_report_analysis_matrix.xlsx");

await fs.mkdir(outputDir, { recursive: true });

const csvText = await fs.readFile(inputCsv, "utf8");
await fs.writeFile(bomCsv, `\uFEFF${csvText}`, "utf8");

const workbook = await Workbook.fromCSV(csvText, {
  sheetName: "review_report_analysis_matrix",
});

const sheet = workbook.worksheets.getItem("review_report_analysis_matrix");
sheet.showGridLines = false;
sheet.freezePanes.freezeRows(1);

const used = sheet.getUsedRange();
used.format.wrapText = true;
used.format.verticalAlignment = "top";
used.format.font = { name: "Aptos", size: 10 };

const header = sheet.getRange("A1:T1");
header.format = {
  fill: { color: "#1F4E79" },
  font: { color: "#FFFFFF", bold: true, name: "Aptos", size: 10 },
  horizontalAlignment: "center",
  verticalAlignment: "middle",
  wrapText: true,
};
header.format.rowHeightPx = 48;

sheet.tables.add("A1:T8", true, "ReviewReportAnalysisTable");
const table = sheet.tables.getItem("ReviewReportAnalysisTable");
table.style = "TableStyleMedium2";
table.showFilterButton = true;

const columnWidths = [
  180, 120, 100, 130, 180,
  240, 220, 220, 300, 260,
  260, 260, 260, 240, 260,
  260, 260, 320, 300, 130,
];

for (let col = 0; col < columnWidths.length; col += 1) {
  sheet.getRangeByIndexes(0, col, 8, 1).format.columnWidthPx = columnWidths[col];
}

for (let row = 1; row < 8; row += 1) {
  sheet.getRangeByIndexes(row, 0, 1, 20).format.rowHeightPx = 92;
}

const statusRange = sheet.getRange("T2:T8");
statusRange.format = {
  horizontalAlignment: "center",
  verticalAlignment: "middle",
  font: { bold: true },
};

const inspect = await workbook.inspect({
  kind: "table",
  range: "review_report_analysis_matrix!A1:T8",
  include: "values",
  tableMaxRows: 8,
  tableMaxCols: 20,
  tableMaxCellChars: 120,
});
console.log(inspect.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

await workbook.render({
  sheetName: "review_report_analysis_matrix",
  range: "A1:T8",
  scale: 1,
  format: "png",
});

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(xlsxPath);

console.log(JSON.stringify({ bomCsv, xlsxPath }));
