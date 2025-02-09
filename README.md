# project-HotelSite-playwright-JS
This project contains a Playwright-Javascript-based automation script that performs End to End testing for https://hotel-example-site.takeyaqa.dev/

## Structure
├── data<br>
│   ├── InvalidUserAccount.json<br>
│   ├── ValidUserAccount.json<br>
│   ├── E2E_BookingReservation_TestData.csv<br>
├── pages<br>
│   ├── ConfirmPage.js<br>
│   ├── HomePage.js<br>
│   ├── LoginPage.js<br>
│   ├── MyPage.js<br>
│   ├── PlanPage.js<br>
│   ├── ReservePage.js<br>
└── tests<br>
│   ├── test-login.spec.js<br>
│   ├── test-reserve.spec.js<br>
└── utils<br>
│   ├── csvReader.js<br>
│   ├── jsonReader.js<br>
└── playwright.config.js<br>
└── TestCases.xlsx<br>
└── README.md<br>

# 1. data
Contains test data files for user accounts (both valid and invalid) and reservation details.
- InvalidUserAccount.json: Stores data for testing invalid login scenarios.
- ValidUserAccount.json: Stores data for testing valid login scenarios.
- E2E_BookingReservation_TestData.csv: A CSV file with data for E2E booking reservation tests.

# 2. pages
Contains the page objects for various pages on the site (e.g., HomePage, LoginPage, etc.), which encapsulate the interaction with the web elements.
- ConfirmPage - This class represents the confirmation page.
- HomePage - This class represents the home page of the hotel site, with methods to navigate to the English version of the site and to the login page.
- LoginPage - This class represents the login page of the hotel website. It contains methods and locators to interact with the login form elements. 
- MyPage - This class represents the user's account page on the hotel website. 
- PlanPage - This class represents the page where users can view available plans and select a plan to reserve. 
- ReservePage - This class represents the page where users can select reservation details such as the check-in date, additional options (e.g., breakfast, early check-in, sightseeing), and confirmation method.

# 3. tests
Contains the Playwright test scripts that perform the actual automation of user flows.

- Test Login - The test suite for the login functionality covers the validation of both valid and invalid user logins. It reads data from ValidUserAccount and InvalidUserAccount JSON files and verifies the behavior of the application when different credentials are used.

- Test Reserve - This test suite of for the reservation functionality ensures that the booking and reservation flow on the hotel website works correctly. It uses CSV data (E2E_TestData) to drive multiple test cases, each representing a different scenario for booking a reservation.

# 4. utils
Contains helper functions for reading CSV and JSON files used in the tests.
- CSV Reader - Utility for reading CSV files
- JSON Reader - Utility for reading JSON files

# 5. playwright.config.js
This is the Playwright configuration file. It sets up Playwright-specific configurations, such as browsers, test execution options, and other settings to run tests.

# 6. TestCases.xlsx
This Excel file contains detailed descriptions of the different test cases, including the expected inputs, steps, and outputs for the test scenarios.

