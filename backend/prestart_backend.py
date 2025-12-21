import subprocess
import sys
import os

def install_backend_requirements():
    req_file = os.path.join("backend", "requirements.txt")
    if not os.path.exists(req_file):
        print("No requirements.txt found in /. Skipping dependency check.")
        return
    print("Installing backend dependencies...")
    subprocess.run([sys.executable, "-m", "pip", "install", "-r", req_file], check=True)

def install_frontend_requirements():
    frontend_dir = os.path.join("frontend")
    pkg_file = os.path.join(frontend_dir, "package.json")

    if not os.path.exists(pkg_file):
        print("No package.json found in /frontend. Skipping frontend setup.")
        return
    print("Installing frontend dependencies...")
    # Use npm.cmd on Windows, npm otherwise
    npm_cmd = "npm.cmd" if os.name == "nt" else "npm"
    subprocess.run([npm_cmd, "install"], cwd=frontend_dir, check=True)

def setup_database():
    db_setup_script = os.path.join("database", "database_setup.py")
    if os.path.exists(db_setup_script):
        print("Setting up and seeding database...")
        subprocess.run([sys.executable, db_setup_script])
    else:
        print("No database setup script found. Skipping.")

if __name__ == "__main__":
    install_backend_requirements()
    #install_frontend_requirements()
    setup_database()
