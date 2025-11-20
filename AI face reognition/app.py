from flask import Flask, render_template, request, jsonify
from utils import VoterRegistration, FaceVerification
from utils.voting_records import *
import cv2
import numpy as np

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    try:
        voter_id = request.form.get('voterId')
        if not voter_id:
            return jsonify({'success': False, 'message': 'Voter ID is required'})
            
        registration = VoterRegistration()
        result = registration.start_registration(voter_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

@app.route('/verify', methods=['POST'])
def verify():
    try:
        voter_id = request.form.get('voterId')
        if not voter_id:
            return jsonify({'success': False, 'message': 'Voter ID is required'})
            
        verification = FaceVerification()
        result = verification.verify_voter(voter_id)
        return jsonify(result)
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)