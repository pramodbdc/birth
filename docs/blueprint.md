# **App Name**: E-BirthRecord

## Core Features:

- Form Input and Submission: Allows users to input birth details such as gender, date of birth, name, and address, then submits the data to Firestore.
- Data Preview: Show formatted birth record on new page with barcode, after data is saved to database.
- Registration Number Generation: Generates a unique registration number based on the date of registration.  Allows user to manually override if desired.
- Record Masking: A tool that obscures part of the aadhar number, except for the final four digits, when previewing and printing.
- Date Formatting Tool: Generate day, month and year, from the the datestring as the LLM displays date in the form of a date, e.g., 'January 21, 2024'
- Wallet Debiting: Subtracts a charge from the user's wallet when they submit the birth details.

## Style Guidelines:

- Primary color: Sky blue (#87CEEB) to represent trust and reliability, which are important for a government service.
- Background color: Light gray (#F0F0F0) to provide a neutral and clean backdrop.
- Accent color: Teal (#008080) for interactive elements to make them easily noticeable.
- Body and headline font: 'Inter', a sans-serif font, for clear readability and a modern aesthetic.
- Use simple and recognizable icons for form fields to guide users.
- Employ a clear and structured form layout to guide users through the input process efficiently.
- Add subtle animations on button hover states to give users assurance their actions are registered.