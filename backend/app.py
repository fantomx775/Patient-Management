from datetime import datetime
from dotenv import load_dotenv
import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_password = os.getenv('DB_PASSWORD')
db_name = os.getenv('DB_NAME')

db_uri = f'postgresql://{db_user}:{db_password}@{db_host}/{db_name}'

app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    pesel = db.Column(db.String(11), unique=True, nullable=False)
    street = db.Column(db.String(120), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    post_code = db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return '<Patient %r>' % self.pesel

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/create', methods=['POST'])
def insert_patient():
    data = request.json
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
    return jsonify({'message': 'Patient created successfully'}), 201

@app.route('/edit/<int:id>', methods=['PUT'])
def edit_patient(id):
    patient = Patient.query.get(id)
    if patient is None:
        return jsonify({'error': 'Patient not found'}), 404

    data = request.json
    patient.first_name = data.get('first_name', patient.first_name)
    patient.last_name = data.get('last_name', patient.last_name)
    patient.pesel = data.get('pesel', patient.pesel)
    patient.street = data.get('street', patient.street)
    patient.city = data.get('city', patient.city)
    patient.post_code = data.get('post_code', patient.post_code)
    patient.updated_at = datetime.utcnow()

    db.session.commit()
    return jsonify({'message': 'Patient updated successfully'}), 200

@app.route('/patients')
def get_patients():
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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
