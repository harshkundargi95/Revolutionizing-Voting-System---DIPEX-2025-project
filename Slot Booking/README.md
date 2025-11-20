# Slot Booking - E-Voting System

A web-based slot booking application designed for voters to reserve voting time slots in an e-voting system.

## Project Overview

This application allows voters to log in, check available voting slots, and book a preferred time slot for voting. The system manages slot availability with a maximum capacity of 50 voters per time slot.

## Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Data Storage**: JSON (file-based)
- **API**: RESTful API with CORS support

## Project Structure

```
Slot Booking/
├── backend/
│   ├── package.json          # Node.js dependencies
│   ├── server.js             # Express server and API endpoints
│   ├── slots.json            # Available voting time slots
│   └── voters.json           # Voter bookings data
│
└── frontend/
    ├── index.html            # Main slot booking interface
    └── login.html            # Voter login page
```

## Features

### Frontend

#### Login Page (`login.html`)
- Voter ID input field
- Age verification (10-90 years)
- Demo data buttons for quick testing
- Responsive design with gradient background
- Form validation

#### Booking Page (`index.html`)
- Display all available voting slots (6:00 AM to 5:00 PM)
- Grid-based slot layout (6 columns)
- Real-time slot availability status
- One-click slot booking
- Voter information display
- Change booking functionality
- Responsive design optimized for multiple screen sizes

### Backend

#### API Endpoints

1. **GET `/slots`**
   - Retrieves all available voting slots
   - Returns array of slot objects with timing, booking count, and voter list
   - No authentication required

2. **POST `/book`**
   - Books a time slot for a voter
   - Request body: `{ time: "6:00 AM", voterId: "1234567890" }`
   - Returns: Success/error status
   - Features:
     - Automatic removal of previous booking if voter already booked
     - Capacity check (max 50 voters per slot)
     - Persistent data storage

3. **GET `/check-booking/:voterId`**
   - Checks if a voter has an existing booking
   - Returns booking status and time slot
   - Useful for voters to verify their booking

## Data Structure

### slots.json
```json
[
  {
    "time": "6:00 AM",
    "booked": 1,
    "voters": ["1234567890"]
  },
  ...
]
```

### voters.json
```json
{
  "1234567890": "6:00 AM",
  "1234567891": "7:00 AM",
  ...
}
```

## Installation & Setup

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node server.js
```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Open the application in your browser:
   - For login: Open `login.html`
   - After authentication: Redirects to `index.html`

**Note**: The frontend can be opened directly in the browser (file:// protocol) or served through a local web server.

## Voting Slots

The system provides 12 voting time slots:
- **6:00 AM** to **7:00 PM**
- Each slot is 1 hour duration
- Maximum capacity: **50 voters per slot**

## Usage Guide

### For Voters

1. **Login**: Open `login.html` and enter your voter ID
2. **Verify Age**: Enter your age (between 10-90 years)
3. **View Slots**: See all available slots with current booking status
4. **Book Slot**: Click on a desired slot to book it
5. **Change Booking**: Click on already booked slot to reschedule

### Demo Data

The application includes demo voter IDs for testing:
- `1234567890`
- `9322325362`
- `9322325363`
- And others included in voters.json

## Technical Details

### Key Components

- **CORS Enabled**: Frontend and backend can run on different ports
- **Error Handling**: Comprehensive error handling for all API endpoints
- **Data Persistence**: All bookings saved to JSON files
- **Responsive UI**: Mobile-friendly interface with CSS Grid and Flexbox

### File Management

- Slots are loaded/initialized on server startup
- If `slots.json` doesn't exist, 12 default slots are created automatically
- All changes are immediately persisted to disk

## Styling

The application uses:
- CSS Custom Properties (CSS Variables) for theming
- Gradient backgrounds
- Smooth transitions and animations
- Box shadows for depth
- Mobile-first responsive design

Color Scheme:
- Primary: `#2563eb` (Blue)
- Secondary: `#1e40af` (Dark Blue)
- Success: `#16a34a` (Green)
- Error: `#dc2626` (Red)

## Browser Compatibility

- Chrome/Chromium (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)

## Future Enhancements

- User authentication with hashed passwords
- Database integration (MongoDB, PostgreSQL)
- Email/SMS notifications for booking confirmations
- Admin dashboard for monitoring bookings
- Voting status tracking
- Download booking receipt
- Multiple voting centers support
- Real-time slot availability updates using WebSockets

## Troubleshooting

### Server won't start
- Ensure port 3000 is not in use
- Check if Node.js is installed: `node --version`

### Frontend can't connect to backend
- Verify server is running on `http://localhost:3000`
- Check CORS settings in `server.js`
- Open browser console for network error details

### Data not persisting
- Ensure `slots.json` and `voters.json` are readable/writable
- Check file permissions in the backend directory

## License

This project is part of DIPEX 2025.

## Support

For issues or questions, please refer to the code comments or contact the development team.
