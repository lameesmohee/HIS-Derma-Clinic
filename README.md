# Glow Up Clinic Frontend

## Overview

This project is the frontend for the Glow Up Clinic, a dermatology clinic website. It is built using Next.js and integrates with an Express.js backend. The frontend provides secure login and various features for administrators, clinic staff, doctors, nurses, and patients.

## Video Demo


https://github.com/lameesmohee/HIS-Derma-Clinic/assets/104171516/49b4e564-3e50-4630-ab37-28bb0a3325aa




## Features

### General
- **Secure Login**: Secure login for administrators, clinic staff, doctors, nurses, and patients.
- **User Authentication and Authorization**: Role-based access control (Admin, Clinic Staff, Doctor, Nurse, Patient).

### Patient Features
- **Sign Up**: Register as a new patient.
- **Log In**: Secure login for patients.
- **Get Profile**: View patient profile.
- **Update Patient**: Update patient information.
- **Show Prescription**: View patient prescriptions.
- **Book an Appointment**: Schedule an appointment.
- **Cancel an Appointment**: Cancel a scheduled appointment.
- **Show Available Appointments**: View available appointment slots.
- **Book Service**: Book a service offered by the clinic.
- **Cancel Service**: Cancel a booked service.
- **Show Billing**: View billing information.

### Doctor Features
- **Log In**: Secure login for doctors.
- **Get Profile**: View doctor profile.
- **Add Prescription**: Add prescriptions for patients.
- **Show Booked Appointments**: View appointments booked with the doctor.
- **Cancel Booked Appointments**: Cancel booked appointments.
- **Access Medical Records**: Access patient medical records.

### Nurse Features
- **Admin Features**: Nurses have administrative capabilities similar to the admin role.

### Admin Features
- **Manage Doctors**:
  - Add Doctor
  - Delete Doctor
  - Update Doctor
  - Show All Doctors
- **Manage Nurses**:
  - Add Nurse
  - Delete Nurse
  - Update Nurse
  - Show All Nurses
- **Manage Patients**:
  - Access Patient Records
  - Delete Patient
  - Show All Patients
  - Show Billings
- **Manage Devices**:
  - Add Device
  - Delete Device
  - Update Device
  - Show All Devices
- **Add Payment Method**

## Setup Instructions

### Prerequisites
- Node.js
- npm or yarn

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/glow-up-clinic-frontend.git
    cd glow-up-clinic-frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables**:
    Create a `.env.local` file in the root directory and add the following environment variables:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```

4. **Run the development server**:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application will be available at `http://localhost:3000`.

### Building for Production

1. **Build the project**:
    ```bash
    npm run build
    # or
    yarn build
    ```

2. **Start the production server**:
    ```bash
    npm start
    # or
    yarn start
    ```

### Project Structure

- `components/` - Contains the React components.
- `pages/` - Contains the Next.js pages.
- `styles/` - Contains the CSS styles.
- `public/` - Contains static files.

## Tools Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **CSS**: For styling the components and pages.

## Conclusion

This frontend application for the Glow Up Clinic provides a comprehensive user experience for different roles within the clinic, ensuring secure access and efficient management of clinic operations. The integration with an Express.js backend enables smooth data flow and functionality.

