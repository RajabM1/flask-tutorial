# Project Setup

## Backend Setup

### Step 1: Navigate to the Backend Directory

```bash
cd backend
```

### Step 2: Set up Virtual Environment

- **For Windows:**

  ```bash
  python -m venv .venv
  .venv\Scripts\activate
  ```

- **For macOS/Linux:**
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  ```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Run the Backend

```bash
python run.py
```

### Step 5: Deactivate the Virtual Environment

To deactivate the virtual environment:

```bash
deactivate
```

---

## Frontend Setup

### Step 1: Navigate to the Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm i
```

### Step 3: Run the Frontend

```bash
npm run dev
```

---

## Server URLs

- **Backend:**
  - Runs on: `http://localhost:5000`
- **Frontend:**
  - Runs on: `http://localhost:5173`
