# Dental Clinic Appointment System

A simple, single-page web application to book dental services quickly and easily. Built with **Next.js** for the frontend and **Nest.js** for the backend. The app allows users to select services, enter personal information, view an invoice summary, and book appointments—all without requiring authentication.

---

## Features

- **Service Selection** – Browse available dental services and select multiple services.  
- **Invoice Summary** – Automatically calculates base total, tax, and grand total.  
- **Booking Appointments** – Submit client information and selected services to create an appointment.  
- **User-Friendly Notifications** – Interactive toast notifications for success, errors, and validation feedback using [react-hot-toast](https://github.com/timolins/react-hot-toast).  
- **Responsive UI** – Clean, mobile-friendly interface.

---

## Tech Stack

**Frontend:**  
- [Next.js](https://nextjs.org/) (React framework)  
- TypeScript  
- [react-hot-toast](https://github.com/timolins/react-hot-toast) for notifications  

**Backend:**  
- [Nest.js](https://nestjs.com/) (Node.js framework)  
- PostgreSQL  

---

## Installation

### Prerequisites

- Node.js >= 18  
- npm or yarn  
- PostgreSQL (or your preferred relational database)  

### Clone the repository

```bash
git clone https://github.com/yourusername/dental-appointment.git
cd dental-appointment
