import pickle
import os

def initialize_voting_records():
    if not os.path.exists('data/'):
        os.makedirs('data/')
    if not os.path.exists('data/voted_ids.pkl'):
        voted_ids = set()
        with open('data/voted_ids.pkl', 'wb') as f:
            pickle.dump(voted_ids, f)

def has_voted(voter_id):
    with open('data/voted_ids.pkl', 'rb') as f:
        voted_ids = pickle.load(f)
    return voter_id in voted_ids

def mark_as_voted(voter_id):
    with open('data/voted_ids.pkl', 'rb') as f:
        voted_ids = pickle.load(f)
    voted_ids.add(voter_id)
    with open('data/voted_ids.pkl', 'wb') as f:
        pickle.dump(voted_ids, f)