import http.server
import socketserver
import webbrowser
import threading
import os
import sys
import tkinter as tk
from tkinter import messagebox

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))  # folder script ini

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Server stopped.")

# Jalankan server di thread
threading.Thread(target=start_server, daemon=True).start()

# Buka browser otomatis
url = f"http://localhost:{PORT}/dsrt.html"
try:
    webbrowser.open(url)
except Exception as e:
    print(f"Unable to open browser automatically: {e}\nOpen manually: {url}")

# --- GUI sederhana ---
def stop_server():
    if messagebox.askokcancel("Stop Server", "Stop the DSRT server?"):
        root.destroy()
        sys.exit(0)

root = tk.Tk()
root.title("DSRT Server")
root.geometry("300x120")
root.resizable(False, False)

label = tk.Label(root, text="DSRT server is running...\nBrowser should open automatically.", wraplength=280, justify="center")
label.pack(pady=20)

stop_button = tk.Button(root, text="Stop Server", command=stop_server)
stop_button.pack()

root.protocol("WM_DELETE_WINDOW", stop_server)
root.mainloop()
