import subprocess
import sys
import os

def install_requirements():
    req_file = os.path.join("backend", "requirements.txt")
    if not os.path.exists(req_file):
        print("No requirements.txt found in /. Skipping dependency check.")
        return
    print("Installing Python dependencies...")
    subprocess.run([sys.executable, "-m", "pip", "install", "-r", req_file])


def setup_database():
    db_setup_script = os.path.join("database", "database_setup.py")
    if os.path.exists(db_setup_script):
        print("Setting up and seeding database...")
        subprocess.run([sys.executable, db_setup_script])
    else:
        print("No database setup script found. Skipping.")

if __name__ == "__main__":
    install_requirements()
    setup_database()
