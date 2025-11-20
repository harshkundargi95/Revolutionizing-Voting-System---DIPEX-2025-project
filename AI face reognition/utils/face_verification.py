import cv2
import pickle
import numpy as np
from sklearn.metrics import accuracy_score
from .voting_records import initialize_voting_records, has_voted, mark_as_voted

class FaceVerification:
    def __init__(self):
        initialize_voting_records()
        # Load the stored face data
        with open('data/faces_data.pkl', 'rb') as f:
            self.faces = pickle.load(f)
        with open('data/names.pkl', 'rb') as f:
            self.voter_ids = pickle.load(f)
            self.voter_ids = np.array(self.voter_ids)

    def verify_voter(self, voter_id):
        try:
            voter_id = int(voter_id)
            
            # Check if voter has already voted
            if has_voted(voter_id):
                return {"success": False, "message": "You have already casted your vote!"}
                
            # Check if voter ID exists
            if voter_id not in self.voter_ids:
                return {"success": False, "message": "Voter ID not found!"}
            
            # Get indices where voter_id matches
            voter_indices = np.where(self.voter_ids == voter_id)[0]
            voter_faces = self.faces[voter_indices]
            
            # Start face verification
            video = cv2.VideoCapture(0)
            facedetect = cv2.CascadeClassifier(cv2.data.haarcascades+'haarcascade_frontalface_default.xml')
            
            match_count = 0
            frame_count = 0
            
            while frame_count < 30:  # Check 30 frames
                ret, frame = video.read()
                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = facedetect.detectMultiScale(gray, 1.3, 5)
                
                for (x, y, w, h) in faces:
                    crop_img = frame[y:y+h, x:x+w]
                    resized_img = cv2.resize(crop_img, (50,50))
                    resized_img = resized_img.reshape(1, -1)
                    
                    # Compare with stored faces
                    for stored_face in voter_faces:
                        similarity = np.mean(np.abs(resized_img - stored_face.reshape(1, -1)) < 50)
                        if similarity > 0.6:  # Threshold for matching
                            match_count += 1
                    
                    cv2.rectangle(frame, (x,y), (x+w, y+h), (50,50,255), 1)
                
                cv2.imshow('Verification', frame)
                frame_count += 1
                
                if cv2.waitKey(1) == ord('q'):
                    break
            
            video.release()
            cv2.destroyAllWindows()
            
            # Check if enough matches were found
            # Modify the success block
            if match_count > 10:  # Threshold for successful verification
                mark_as_voted(voter_id)  # Mark this voter ID as voted
                return {"success": True, "message": "Verification successful"}
            else:
                return {"success": False, "message": "Face verification failed"}
        except ValueError:
            return {"success": False, "message": "Invalid voter ID format"}
        except Exception as e:
            return {"success": False, "message": str(e)}