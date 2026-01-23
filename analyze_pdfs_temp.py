import os
import pypdf

def analyze_pdf(filepath):
    try:
        reader = pypdf.PdfReader(filepath)
        text = ""
        # Read first 2 pages max
        for i in range(min(len(reader.pages), 2)):
            page_text = reader.pages[i].extract_text()
            if page_text:
                text += page_text + "\n"
        return text[:1000].replace('\r', '').replace('\n', ' ') 
    except Exception as e:
        return f"Error reading PDF: {e}"

files = [f for f in os.listdir('.') if f.lower().endswith('.pdf')]
files.sort()

with open('pdf_analysis_output.txt', 'w', encoding='utf-8') as outfile:
    outfile.write(f"Found {len(files)} PDF files.\n\n")
    for f in files:
        outfile.write(f"--- FILE: {f} ---\n")
        content = analyze_pdf(f)
        outfile.write(content + "\n")
        outfile.write("-" * 50 + "\n")

print("Analysis complete. Written to pdf_analysis_output.txt")
