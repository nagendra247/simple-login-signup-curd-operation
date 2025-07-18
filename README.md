
# Simple Login & Signup CRUD Operation (Node.js + Express)

This is a basic Node.js and Express.js project that implements simple login, signup, and CRUD operations. It is a beginner-friendly project to understand routing, file system usage, and basic user data handling using JSON files.

## 🔧 Technologies Used

- Node.js
- Express.js
- HTML/CSS (for pages)
- File System (`fs` module)
- JSON file for data persistence (No database)

## 📁 Project Structure

```
simple-login-signup-curd-operation/
│
├── pages/               # Contains HTML pages (login, signup, home, etc.)
├── styles/              # CSS styles
├── node_modules/        # Dependencies
├── user.json            # User data (simulating a database)
├── package.json         # Project metadata and dependencies
├── http.js              # Main server file
├── details.txt          # Sample text data
└── .gitignore           # Ignoring node_modules and other files
```

## 🚀 How to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/nagendra247/simple-login-signup-curd-operation.git
   cd simple-login-signup-curd-operation
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   node http.js
   ```

4. **Visit in Browser**
   ```
   http://localhost:3000
   ```

## 🧠 Features

- User Signup (adds user data to `user.json`)
- User Login (validates against stored JSON data)
- Read and Write operations using `fs` module
- Simple file-based data storage (no DB required)



