from datetime import datetime
from dotenv import load_dotenv
import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
CORS(app)

load_dotenv()
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')

db_uri = f'postgresql://{db_user}:{db_password}@{db_host}/{db_name}'

app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

def validate_patient_data(patient):
    errors = []

    if not patient['first_name'].strip().isalpha():
        errors.append("First Name")
    if not patient['last_name'].strip().isalpha():
        errors.append("Last Name")
    if not patient['pesel'].strip().isdigit() or len(patient['pesel']) != 11:
        errors.append("PESEL")
    if not patient['post_code'].strip().replace("-", "").isdigit() or len(patient['post_code']) != 6:
        errors.append("Post Code")
    if not patient['city'].strip().isalpha():
        errors.append("City")
    if not patient['street'].strip():
        errors.append("Street")

    return errors

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    pesel = db.Column(db.String(11), unique=True, nullable=False)
    street = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    post_code = db.Column(db.String(6), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return '<Patient %r>' % self.pesel

@app.route('/create', methods=['POST'])
def insert_patient():
    try:
        data = request.json
        validation_errors = validate_patient_data(data)
        if validation_errors:
            return jsonify({'error': 'Validation failed', 'fields': validation_errors}), 400

        new_patient = Patient(
            first_name=data['first_name'],
            last_name=data['last_name'],
            pesel=data['pesel'],
            street=data['street'],
            city=data['city'],
            post_code=data['post_code'],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        db.session.add(new_patient)
        db.session.commit()
        return jsonify({'message': 'Patient created successfully', 'id': new_patient.id, 'created_at': new_patient.created_at, 'updated_at': new_patient.updated_at}), 201
    except IntegrityError as e:
        db.session.rollback()
        error_info = str(e.orig)
        if 'patient_pesel_key' in error_info:
            return jsonify({'error': 'Patient with this PESEL already exists'}), 400
        else:
            return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

@app.route('/edit/<int:id>', methods=['PUT'])
def edit_patient(id):
    try:
        patient = Patient.query.get(id)
        if patient is None:
            return jsonify({'error': 'Patient not found'}), 404

        data = request.json
        validation_errors = validate_patient_data(data)
        if validation_errors:
            return jsonify({'error': 'Validation failed', 'fields': validation_errors}), 400

        patient.first_name = data.get('first_name', patient.first_name)
        patient.last_name = data.get('last_name', patient.last_name)
        patient.pesel = data.get('pesel', patient.pesel)
        patient.street = data.get('street', patient.street)
        patient.city = data.get('city', patient.city)
        patient.post_code = data.get('post_code', patient.post_code)
        patient.updated_at = datetime.utcnow()

        db.session.commit()
        return jsonify({'message': 'Patient updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/patients', methods=['GET'])
def get_patients():
    try:
        patients = Patient.query.all()
        patients_data = []

        for patient in patients:
            patient_data = {
                'id': patient.id,
                'first_name': patient.first_name,
                'last_name': patient.last_name,
                'pesel': patient.pesel,
                'street': patient.street,
                'city': patient.city,
                'post_code': patient.post_code,
                'created_at': patient.created_at,
                'updated_at': patient.updated_at
            }
            patients_data.append(patient_data)

        return jsonify(patients_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_patient(id):
    try:
        patient = Patient.query.get(id)
        if patient is None:
            return jsonify({'error': 'Patient not found'}), 404

        db.session.delete(patient)
        db.session.commit()
        return jsonify({'message': 'Patient deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/search/', methods=['GET'])
def search_patients():
    try:
        first_name = '%' if request.args.get('first_name') is None else request.args.get('first_name')
        last_name = '%' if request.args.get('last_name') is None else request.args.get('last_name')
        pesel = '%' if request.args.get('pesel') is None else request.args.get('pesel')
        street = '%' if request.args.get('street') is None else request.args.get('street')
        city = '%' if request.args.get('city') is None else request.args.get('city')
        post_code = '%' if request.args.get('post_code') is None else request.args.get('post_code')

        patients = Patient.query.filter(
            (Patient.first_name.ilike(f'{first_name}')) &
            (Patient.last_name.ilike(f'{last_name}')) &
            (Patient.pesel.ilike(f'{pesel}')) &
            (Patient.street.ilike(f'{street}')) &
            (Patient.city.ilike(f'{city}')) &
            (Patient.post_code.ilike(f'{post_code}'))
        ).all()

        patients_data = []

        for patient in patients:
            patient_data = {
                'id': patient.id,
                'first_name': patient.first_name,
                'last_name': patient.last_name,
                'pesel': patient.pesel,
                'street': patient.street,
                'city': patient.city,
                'post_code': patient.post_code,
                'created_at': patient.created_at,
                'updated_at': patient.updated_at
            }
            patients_data.append(patient_data)


        return jsonify(patients_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
