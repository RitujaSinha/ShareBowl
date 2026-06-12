# 🍲 ShareBowl

<p align="center">
  A MERN Stack platform that connects food donors with verified NGOs to reduce food wastage and support communities in need.
</p>

---

# 📖 Project Overview

Food wastage is a major global issue while millions of people continue to face hunger every day. Restaurants, households, events, and businesses often have surplus food that goes unused because there is no efficient way to distribute it.

ShareBowl aims to bridge this gap by providing a platform where donors can easily donate food and groceries to verified NGOs. The platform simplifies donation management, improves transparency, and helps ensure that surplus food reaches people who need it most.

---

# 🚀 Project Description

ShareBowl is a full-stack MERN web application designed to facilitate food donations between donors and NGOs.

Users can register as donors and create food donation posts. NGOs can register on the platform and, after receiving admin approval, access donation requests and manage food collection. The application provides secure authentication, donation tracking, NGO approval workflows, email notifications, and dedicated dashboards for each user role.

The goal of ShareBowl is to reduce food waste and create a sustainable donation ecosystem through technology.

---

# ✨ Features

* 🔐 JWT-Based Authentication
* 👤 Role-Based Access Control (Donor, NGO, Admin)
* 🍱 Food & Grocery Donation Management
* 🏢 NGO Registration & Approval System
* ✅ Donation Acceptance/Rejection Workflow
* 📧 Email Notifications for NGO Approval
* 📊 Donor Dashboard
* 📋 NGO Dashboard
* 🛠️ Admin Management Panel
* 📱 Responsive User Interface

---

# 🏗️ System Workflow

## Donor Workflow

1. Register/Login
2. Create Food Donation
3. Select NGO
4. Submit Donation Request
5. Track Donation Status

## NGO Workflow

1. Register NGO Account
2. Wait for Admin Approval
3. Get Approval Email
4. Login After Approval
5. View Incoming Donations
6. Accept or Reject Donations
7. Coordinate Food Pickup

## Admin Workflow

1. Review NGO Applications
2. Approve or Reject NGOs
3. Monitor Donations
4. Manage Platform Activities

---

# 💻 Tech Stack

## Frontend

* React.js
* Tailwind CSS
* JavaScript
* React Router DOM

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* JWT Authentication
* bcrypt

## Additional Services

* Nodemailer

---

# 📂 Project Structure

```bash
ShareBowl/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/RitujaSinha/ShareBowl.git
cd ShareBowl
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Backend Setup

```bash
cd backend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder and add:

```env
PORT=5000
Use env-example to create env variables
```

---


---

# 🚧 Current Limitations

* Email OTP Verification is not implemented.
* Real-time chat functionality is not available.
* Pickup scheduling is currently handled manually.
* Location-based NGO recommendations are not available.

---

# 🔮 Future Improvements

### 💬 Real-Time Chat System

Enable communication between donors and NGOs.

### 📍 Location-Based NGO Recommendations

Recommend nearby NGOs for quicker food distribution.

### 🚚 Pickup Scheduling

Allow donors and NGOs to schedule pickup timings.

### 🔔 Real-Time Notifications

Instant updates for donation status and approvals.

### 📊 Analytics Dashboard

Track donations, NGO activities, and platform impact.

### 📧 Email Verification

Implement email OTP verification during registration.

### 🌐 Multi-Language Support

Support regional and international languages.

### 🤝 Volunteer Management

Enable volunteers to participate in food collection and delivery.

---

# 🌍 Impact

ShareBowl helps reduce food wastage by connecting food donors with verified NGOs through a transparent and efficient platform. The application promotes sustainable food distribution and contributes to community welfare by ensuring that surplus food reaches those who need it most.

---

# 👨‍💻 Author

* [Rituja Sinha](https://github.com/RitujaSinha)
* [Shivani Kumari](https://github.com/shivani3267)


---

# ⭐ Support

If you found this project useful, please consider giving it a star on GitHub!
