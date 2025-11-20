const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Enable CORS for all origins in development
app.use(cors());
app.use(express.json());

// Ensure the slots.json path is correct
const slotsFilePath = path.join(__dirname, 'slots.json');
const votersFilePath = path.join(__dirname, 'voters.json');

// Load or initialize slots and voters
let slots;
let voterBookings = {};

try {
    if (fs.existsSync(slotsFilePath)) {
        slots = JSON.parse(fs.readFileSync(slotsFilePath, 'utf8'));
    } else {
        slots = Array(12).fill().map((_, i) => {
            const startHour = i + 6;
            const endHour = startHour + 1;
            const startTime = `${startHour % 12 || 12}:00 ${startHour < 12 ? 'AM' : 'PM'}`;
            const endTime = `${endHour % 12 || 12}:00 ${endHour < 12 ? 'AM' : 'PM'}`;
            return {
                time: `${startTime} to ${endTime}`,
                booked: 0,
                voters: []
            };
        });
        fs.writeFileSync(slotsFilePath, JSON.stringify(slots, null, 2));
    }

    if (fs.existsSync(votersFilePath)) {
        voterBookings = JSON.parse(fs.readFileSync(votersFilePath, 'utf8'));
    }
    
    console.log('Data loaded successfully');
} catch (error) {
    console.error('Error loading data:', error);
    slots = [];
    voterBookings = {};
}

function saveData() {
    try {
        fs.writeFileSync(slotsFilePath, JSON.stringify(slots, null, 2));
        fs.writeFileSync(votersFilePath, JSON.stringify(voterBookings, null, 2));
        console.log('Data saved successfully');
        return true;
    } catch (error) {
        console.error('Error saving data:', error);
        return false;
    }
}

app.get('/check-booking/:voterId', (req, res) => {
    try {
        const voterId = req.params.voterId;
        console.log('Checking booking for:', voterId);
        
        if (voterBookings[voterId]) {
            const bookedSlot = slots.find(s => s.time === voterBookings[voterId]);
            if (bookedSlot) {
                res.json({
                    status: 'found',
                    time: bookedSlot.time,
                    booked: bookedSlot.booked
                });
                return;
            }
        }
        
        res.json({ status: 'not_found', message: 'No booking found' });
    } catch (error) {
        console.error('Error checking booking:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

app.post('/book', (req, res) => {
    try {
        const { time, voterId } = req.body;
        console.log('Booking attempt:', { time, voterId });

        // Remove previous booking if exists
        if (voterBookings[voterId]) {
            const oldSlot = slots.find(s => s.time === voterBookings[voterId]);
            if (oldSlot) {
                oldSlot.booked -= 1;
                oldSlot.voters = oldSlot.voters.filter(v => v !== voterId);
            }
        }

        const slot = slots.find(s => s.time === time);
        if (slot && slot.booked < 50) {
            slot.booked += 1;
            slot.voters.push(voterId);
            voterBookings[voterId] = time;
            
            if (saveData()) {
                console.log(`Booked slot ${time} for voter ${voterId}`);
                res.json({ status: 'success', message: 'Slot booked successfully' });
            } else {
                res.status(500).json({ status: 'error', message: 'Error saving booking' });
            }
        } else {
            res.status(400).json({ status: 'error', message: 'Slot not available' });
        }
    } catch (error) {
        console.error('Error booking slot:', error);
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

app.get('/slots', (req, res) => {
  try {
    console.log('Sending slots data:', slots.length, 'slots');
    res.json(slots);
  } catch (error) {
    console.error('Error getting slots:', error);
    res.status(500).json({ status: 'error', message: 'Server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
