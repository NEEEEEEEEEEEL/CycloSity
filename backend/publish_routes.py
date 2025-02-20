from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import pytz

# Create Blueprint and db instance
publish_bp = Blueprint('publish', __name__)
db = SQLAlchemy()

LOCAL_TZ = pytz.timezone("Asia/Kolkata")

# Database Model
class CyclonePrediction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    timestamp = db.Column(db.DateTime, nullable=False, default=lambda: datetime.now(LOCAL_TZ))
    ecp = db.Column(db.Float, nullable=False)
    msw = db.Column(db.Float, nullable=False)
    precautions = db.Column(db.Text)
    location = db.Column(db.String(100))
    severity = db.Column(db.String(50))
    published = db.Column(db.Boolean, default=True)

# Routes
@publish_bp.route("/publish", methods=["POST"])
def publish_prediction():
    data = request.json
    
    prediction = CyclonePrediction(
        ecp=data['ecp'],
        msw=data['msw'],
        precautions=data['precautions'],
        location=data['location'],
        severity=data['severity']
    )
    
    db.session.add(prediction)
    db.session.commit()
    
    return jsonify({"message": "Prediction published successfully", "id": prediction.id})

@publish_bp.route("/predictions", methods=["GET"])
def get_predictions():
    predictions = CyclonePrediction.query.order_by(CyclonePrediction.timestamp.desc()).all()
    return jsonify([{
        'id': p.id,
        'timestamp': p.timestamp.isoformat(),
        'ecp': p.ecp,
        'msw': p.msw,
        'precautions': p.precautions,
        'location': p.location,
        'severity': p.severity
    } for p in predictions])