import AppKit
import Foundation
import PDFKit
import Vision

func usage() -> Never {
    fputs("Usage: swift scripts/ocr_pdf_with_vision.swift input.pdf output.txt\n", stderr)
    exit(2)
}

guard CommandLine.arguments.count == 3 else {
    usage()
}

let inputURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])

guard let document = PDFDocument(url: inputURL) else {
    fputs("Failed to open PDF: \(inputURL.path)\n", stderr)
    exit(1)
}

let request = VNRecognizeTextRequest()
request.recognitionLevel = .accurate
request.usesLanguageCorrection = true
request.recognitionLanguages = ["ja-JP", "en-US"]

var output: [String] = []

for pageIndex in 0..<document.pageCount {
    guard let page = document.page(at: pageIndex) else {
        continue
    }

    let bounds = page.bounds(for: .mediaBox)
    let scale: CGFloat = 2.0
    let imageSize = NSSize(width: bounds.width * scale, height: bounds.height * scale)
    let image = NSImage(size: imageSize)

    image.lockFocus()
    NSColor.white.setFill()
    NSRect(origin: .zero, size: imageSize).fill()

    guard let context = NSGraphicsContext.current?.cgContext else {
        image.unlockFocus()
        continue
    }

    context.saveGState()
    context.scaleBy(x: scale, y: scale)
    page.draw(with: .mediaBox, to: context)
    context.restoreGState()
    image.unlockFocus()

    guard let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
        continue
    }

    let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
    do {
        try handler.perform([request])
    } catch {
        output.append("\n\n--- page \(pageIndex + 1) ---\n\n[OCR failed: \(error)]")
        continue
    }

    let lines = (request.results ?? []).compactMap { observation in
        observation.topCandidates(1).first?.string
    }

    output.append("\n\n--- page \(pageIndex + 1) ---\n\n\(lines.joined(separator: "\n"))")
    fputs("page \(pageIndex + 1)/\(document.pageCount): \(lines.count) lines\n", stderr)
}

try output.joined().trimmingCharacters(in: .whitespacesAndNewlines)
    .appending("\n")
    .write(to: outputURL, atomically: true, encoding: .utf8)
