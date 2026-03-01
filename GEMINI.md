Role: You are a Lead SaaS Architect and Senior Full-Stack Developer.


Objective: Build a high-end, multi-tenant Clinic Management System (CMS) designed for scale. The system must allow multiple healthcare providers to manage appointments, patient records, and WhatsApp-based communications through a unified, premium interface.



1. Multi-Tenant Architecture \& Branding
   Tenant Isolation: Ensure each clinic has its own data workspace.

Dynamic Branding: Clinics must be able to upload their own Logo and select a Primary/Secondary Color Palette that updates the UI globally for their specific instance.

Role-Based Access Control (RBAC):

Super Admin: System-wide management (onboarding new clinics).

Clinic Admin/Doctor: Full access to clinical notes, medicine lists, and reports.

Receptionist: Calendar management, check-ins, and WhatsApp triggers.

Pharmacist/Technician: View-only access to prescriptions for fulfillment.

2. High-Performance Calendar Engine (Google Calendar Style)
   Weekly Grid View: A responsive, drag-and-drop enabled weekly view.

The "Consultation Room" Logic: \* Replace standard "Add" buttons with a "Consultation Room" action.

The Modal: A unified popup to either Block Slots (holidays/breaks) or Book Patients.

Fields: Patient Name, Mobile (with country code), Appointment Notes, and Explicit End-Time Dropdown.

Customization: Allow the Doctor to set a "Default Slot Duration" (e.g., 20, 30, or 60 mins).

Validation: Strict inline field-level error messages for Name, Mobile, and Date. No browser alerts.

3. Electronic Medical Record (EMR) System
   Patient Profile: A 360-degree view of patient history, contact details, and previous visit frequency.

Consultation Page (New Tab): Clicking an appointment opens a workspace containing:

Clinical Notes: Rich-text editor for observations.

Medicine Manager: A searchable "Master Medicine List" where doctors can add items to a "Clinic Favorites" list for one-click prescribing.

Historical Timeline: A vertical timeline of all past prescriptions and notes.

4. Communication \& Automation
   WhatsApp Gateway: Integrate a modular API (Twilio/Interakt/Cloud API).

Trigger Logic:

Booking Request: Auto-reply to patient.

Confirmation: Manual trigger from Reception when a slot is assigned.

Reminder: Scheduled message 2 hours before the appointment.

Data Capture: Ensure the "Mobile Number" field in the modal is always mapped to the WhatsApp trigger.

5. Frontend \& UX Requirements
   Design System: Use a "Professional Healthcare" aesthetic—clean lines, high whitespace, and modern typography (e.g., Outfit or Geist).

Public Landing Page Template: A customizable "Home Page" for each clinic to showcase their specific treatments, team, and a simplified "Appointment Request" form.

Mobile-First: Ensure the Doctor can write notes on a tablet and the Receptionist can manage the calendar via mobile.

6. Technical Stack \& Database Schema
   Schema Requirements:



Tenants (Clinic details, branding, settings).

Users (Linked to Tenant ID and Role).

Patients (Linked to Tenant ID).

Appointments (Linked to Patient and Slot).

Inventory/Medicines (Clinic-specific catalog).

Security: Implement JWT-based authentication and ensure PII (Personally Identifiable Information) encryption.



Deliverable: Provide the boilerplate for a Next.js/React application, a Prisma or SQL schema that supports multi-tenancy, and a sample Tailwind configuration that uses CSS variables for dynamic clinic branding.



\## Self-annealing loop





Errors are learning opportunities. When something breaks:

1\. Fix it

2\. Update the tool

3\. Test tool, make sure it works

4\. Update IMPROVEMENT\_PLAN to include new flow

5\. System is now stronger

