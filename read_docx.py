import zipfile
import xml.etree.ElementTree as ET
import sys

def get_docx_text(path):
    try:
        document = zipfile.ZipFile(path)
        xml_content = document.read('word/document.xml')
        document.close()
        tree = ET.XML(xml_content)

        PREFIX = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
        paragraphs = []
        for paragraph in tree.iter(PREFIX + 'p'):
            texts = [node.text
                     for node in paragraph.iter(PREFIX + 't')
                     if node.text]
            if texts:
                paragraphs.append(''.join(texts))

        return '\n'.join(paragraphs)
    except Exception as e:
        return str(e)

print("--- SICK CERTIFICATE ---")
print(get_docx_text('public/Sick_Certificate_Template.docx'))
print("\n--- AIRPORT CLEARANCE ---")
print(get_docx_text('public/Airport_Medicine_Clearance_Certificate.docx'))
