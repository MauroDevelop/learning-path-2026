# ⚙️ Environment Configuration (Month 01)

> **Note:** For general instructions on cloning the repository and basic execution, please refer to the [Main Repository README](../../../README.md).

This document outlines the specific configurations required to run the advanced modules (Module 28 onwards) and the test suite for Month 01.


## 🔐 Environment Variables

Starting from Module 28, the application requires a connection to a local MySQL database. You must create a `.env` file in the root directory of the `month-01-foundations` folder.

Create the file and add your local MySQL credentials (e.g., using Laragon or XAMPP):

```env
DATABASE_URL="mysql://root:@localhost:3306/my_database"
```

### 📌 Database Setup Checklist:

- **Prerequisite:** Ensure your local MySQL server is currently running.
- **Initialization:** Create the empty database (e.g., `my_database`) in your local environment before executing the project.
- **Security:** Do not commit your `.env` file. It contains sensitive credentials and is already excluded via `.gitignore`.



## 🧪 Running Automated Tests

To verify that your local environment and database are correctly set up, you can run the automated test suite specifically for this month:

```bash
npm run test
```