from flask import Flask, request, jsonify
import fitz  # PyMuPDF
from flask_cors import CORS
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return "PDF Form Extraction API is running!"

@app.route('/extract', methods=['POST'])
def extract_pdf():
    try:
        # Check if the 'file' field is in the request
        if 'file' not in request.files:
            app.logger.error("No file part in the request")
            return jsonify({"error": "No file part in the request"}), 400
        
        file = request.files['file']

        # Check if a file was actually selected
        if file.filename == '':
            app.logger.error("No file selected")
            return jsonify({"error": "No file selected"}), 400

        # Attempt to open the PDF
        try:
            # Read file content into memory first
            file_content = file.read()
            
            # Reset file pointer after reading (not strictly necessary here since we use file_content)
            file.seek(0)
            
            # Open PDF using PyMuPDF
            pdf_document = fitz.open(stream=file_content, filetype='pdf')
        except Exception as e:
            app.logger.error(f"Failed to open PDF: {e}")
            return jsonify({"error": f"Failed to open PDF: {str(e)}"}), 500

        extracted_fields = []

        try:
            for page_number in range(len(pdf_document)):
                page = pdf_document.load_page(page_number)
                widgets = page.widgets()
                if widgets:
                    for widget in widgets:
                        field_name = widget.field_name or f"Field_{page_number}_{widget.rect}"
                        field_type = widget.field_type
                        # field_type interpretation:
                        # 0: unknown
                        # 1: text field
                        # 2: checkbox
                        # 3: radio button
                        # 4: combo box
                        # 5: list box

                        # Extract field value
                        # For some fields widget.text works, for others widget.field_value might be needed.
                        raw_value = widget.text if widget.text else widget.field_value

                        if field_type == 2:
                            # Checkbox
                            field_kind = "checkbox"
                            field_value = raw_value if raw_value else "Off"
                        elif field_type == 3:
                            # Radio button
                            field_kind = "radio"
                            field_value = raw_value if raw_value else "Off"
                        else:
                            # Default to text-like field
                            field_kind = "text"
                            field_value = raw_value or ""

                        extracted_fields.append({
                            "name": field_name,
                            "type": field_kind,
                            "value": field_value,
                            "page": page_number + 1
                        })
        except Exception as e:
            app.logger.error(f"Error extracting fields: {e}")
            return jsonify({"error": f"Error extracting fields: {str(e)}"}), 500

        return jsonify(extracted_fields)

    except Exception as e:
        # Catch any unexpected errors
        app.logger.error(f"Unexpected server error: {e}")
        return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    # Run the Flask app
    # debug=True will show detailed error logs in the console if errors occur.
    app.run(debug=True, port=5000)
