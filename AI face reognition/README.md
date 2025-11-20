# Voter Face Recognition System

Short description

- A small Flask-based voter registration and verification demo that uses OpenCV face detection and simple pixel-based face matching.
- The web UI (in `templates/index.html`) captures images from a visitor's browser camera and sends them to the Flask backend.

Important note: although the project description mentions YOLO, the current codebase uses OpenCV Haar cascades and direct pixel comparison for face detection and verification. See "Notes & Known Issues" below for details and recommended fixes.

## Quick overview

- Web server entrypoint: `app.py` — exposes `/` (UI), `/register` (POST) and `/verify` (POST).
- Frontend: `templates/index.html` — captures webcam frames and posts `voterId` and `faceImage` to the server.
- Utilities: `utils/` contains the primary logic:
  - `face_recognition.py` — `VoterRegistration` class that captures faces using server-side webcam (OpenCV) and saves them to `data/`.
  - `face_verification.py` — `FaceVerification` class that loads saved faces and compares incoming frames (server webcam) to the stored samples.
  - `voting_records.py` — simple persistence for `voted_ids` (`data/voted_ids.pkl`).

Data files (created/used at runtime):
- `data/faces_data.pkl` — stored face arrays
- `data/names.pkl` — voter IDs aligned to faces
- `data/voted_ids.pkl` — set of voter IDs that have already voted

## Requirements

- Python 3.8+ recommended
- Core Python packages used by code:
  - `flask`
  - `opencv-python`
  - `numpy`
  - `scikit-learn` (import present, accuracy_score imported but not used)

Optional / dev tools:
- `pipenv` / `virtualenv` / `venv`

Example `requirements.txt` (minimal):

```
flask
opencv-python
numpy
scikit-learn
```

## Installation (Windows PowerShell)

Open PowerShell in the project directory and run:

```powershell
python -m venv .venv; 
.\.venv\Scripts\Activate.ps1; 
pip install --upgrade pip; 
pip install flask opencv-python numpy scikit-learn
```

## Run the app

From the project root (PowerShell with venv activated):

```powershell
# Start the Flask app
python app.py
```

Open a browser at `http://127.0.0.1:5000/`.

## How the UI workflows map to the backend

- Registration (frontend): `index.html` captures a single frame from the browser camera and performs a `POST /register` with a `FormData` containing `voterId` and `faceImage` (blob).
- Current backend behavior: `app.py` creates `VoterRegistration()` and calls `start_registration(voter_id)` which opens a server-side webcam with OpenCV and records ~51 frames. It does not read the `faceImage` uploaded by the client.

Similarly for verification, the UI sends an uploaded image to `/verify`, but the backend `FaceVerification.verify_voter` opens the server webcam and captures frames for matching instead of using the uploaded file.

## Notes & Known Issues (important)

1. Frontend/backend mismatch:
   - The browser code uploads `faceImage` in the `FormData`, but the backend **ignores** `request.files` and instead uses `cv2.VideoCapture(0)` to open the server's camera. In most deployments (server without webcam) this will fail or behave unexpectedly.
   - Recommended fix: update `app.py` endpoints to read the uploaded image bytes from `request.files['faceImage']`, decode them with OpenCV (e.g., `np.frombuffer` + `cv2.imdecode`), and pass the image(s) to the registration/verification methods. Or modify `VoterRegistration`/`FaceVerification` to accept images instead of opening camera.

2. Face detection & matching method:
   - The repo currently uses Haar cascades (`haarcascade_frontalface_default.xml`) for detection and a naive pixel-level comparison for matching (`np.mean(np.abs(resized_img - stored_face.reshape(1, -1)) < 50)`). This is brittle and not robust across lighting/pose.
   - If you want YOLO-based face detection/recognition, integrate a YOLO detector (Ultralytics/yolov5 or YOLOv8) for face bounding boxes and replace the matching with a proper face embedding model (e.g., `face_recognition` library, `dlib` face embeddings, or deep-learning model like ArcFace).

3. Data handling and concurrency:
   - `data/*.pkl` files are updated directly without file locking; concurrent requests could corrupt data. If you expect concurrent access, use a small database (SQLite) or add file locks.

4. Security & privacy:
   - Stored images and IDs are serialized with `pickle` to local files — this is not encrypted and not safe for production.
   - Use secure storage and encryption for real voter data.

## Suggested code changes (brief)

- Backend should accept uploaded images from `request.files['faceImage']`. Example snippet to decode an uploaded JPEG image in Flask:

```python
from flask import request
file = request.files.get('faceImage')
if file:
    data = file.read()
    arr = np.frombuffer(data, dtype=np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    # Now pass `img` to a registration function that accepts a numpy image

```

- Replace the server-side `cv2.VideoCapture(0)` usage in `VoterRegistration`/`FaceVerification` with functions that accept images or a clear optional flag to use server camera.

## File map and responsibilities

- `app.py`: Flask application, routes for `/`, `/register`, `/verify`.
- `templates/index.html`: Single-page UI — registration & verification tabs. Captures webcam video in browser and uploads images to backend.
- `utils/face_recognition.py`: `VoterRegistration` — captures faces using server webcam and writes to `data/faces_data.pkl` and `data/names.pkl`.
- `utils/face_verification.py`: `FaceVerification` — loads saved faces and performs naive comparison against frames captured from server webcam. Uses `voting_records` to ensure a voter doesn't vote twice.
- `utils/voting_records.py`: `initialize_voting_records`, `has_voted`, `mark_as_voted` using `data/voted_ids.pkl`.

## How to improve / next steps

- Fix frontend/backend image-handling mismatch (most critical).
- Use a proper embedding-based face recognition pipeline (e.g., `face_recognition` or deep learning embeddings + cosine similarity).
- Use YOLO (or another detector) for robust bounding box detection: combine YOLO for face detection and an embedding model for verification.
- Move `data/` storage to SQLite or a small DB and add file locking for reliability.

## Troubleshooting

- If OpenCV cannot open the webcam on the server, either run locally (with webcam) or change code to accept uploaded images rather than opening `cv2.VideoCapture` on the server.
- If `data/` files aren't present, `VoterRegistration` and `voting_records` attempt to create the `data/` folder; ensure the process has write permissions.

## License

This repository contains demo code. Add a proper license file if you plan to publish or distribute it.

---
If you want, I can also:
- update the backend to accept uploaded images (so the browser-captured images are actually used), or
- replace the simple pixel-matching with `face_recognition` embeddings, or
- sketch a plan to integrate YOLO + embedding model for a robust pipeline.

Tell me which improvement I should implement next.
