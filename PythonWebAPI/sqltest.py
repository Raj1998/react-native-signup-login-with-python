from flask import Flask, request
app = Flask(__name__)
import MySQLdb
import json
import string
import random
from google.oauth2 import id_token
from google.auth.transport import requests

CLIENT_ID = "182143099738-lkujdpt6rl0ooed49fprsu3f1rdnirm3.apps.googleusercontent.com"

@app.route("/")
def hello():
	db = MySQLdb.connect("localhost","root","password", "python_api")
	return "Hello World!"
