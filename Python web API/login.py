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
	return "Hello World!"

@app.route("/login", methods=['GET', 'POST'])
def login():
	if request.method == "GET":
		return "wrong request"
	if request.method == "POST":
		data = request.get_json(force = True)
		email = data['email']
		password = data['password']
		print("inside post req ")
		db = MySQLdb.connect("localhost","root","", "pyhon_api")
		cursor = db.cursor()
		sql = "SELECT * FROM `users` WHERE email=%s and password=%s and external_type='email'"
		# print(sql)
		respi = ""
		resp = {'result': False, 'user': None}
		try:
			cursor.execute(sql, (email, password))
			results = cursor.fetchall()

			for row in results:
				print(row[1])
				userr = row[1]
				token = row[4]
				break
			if len(results) == 1:
				resp['result'] = True
				resp['comments'] = "one user found"
				resp['user'] = userr
				resp['token'] = token
			elif len(results) == 0:
				resp['comments'] = "No users"
			else:
				resp['comments'] = "multiple users!!"
		except:
			respi = "exception"
		   # print("Error: unable to fecth data")
		db.close()
		return json.dumps(resp)


@app.route("/signup", methods=['GET', 'POST'])
def register():
	if request.method == "GET":
		return "wrong method"
	if request.method == "POST":
		# todo:
		# first check if email id already exist in db or not.... by select query
		# then do insertion
		db = MySQLdb.connect("localhost","root","", "pyhon_api")
		cursor = db.cursor()
		data = request.get_json(force = True)
		email = data['email'].encode('utf-8')
		password = data['password'].encode('utf-8')
		external_type = 'email'
		# TODO
		# ENCODING PROBLEM FOR EX. IN RUPEE SIGN...ETC
		print(email, password)
		resp = {'result': False, 'code': 0, 'err_log': ""}
#       code - 0 -> fail
#       code - 1 -> done
#       code - 2 -> duplicate entry

		# try:
		sql_test = "SELECT * FROM `users` WHERE email=%s"
		cursor.execute(sql_test, (email,) )
		# cursor.execute(sql_test, (email) ) --> this cant be used, bcoz (email) will be converted to string object implicitly
		results_test = cursor.fetchall()
		if len(results_test) == 0:
			# token = ''.join(random.choices(string.ascii_lowercase + string.digits, k=11))
			print("inside post req of sign upppppp")
			# cursor = db.cursor()
			sql = "INSERT INTO `users`(`email`, `password`, `external_type`) VALUES (%s,%s,%s)"
			# print(sql)
			respi = ""
			# try:
			cursor.execute(sql, (email, password, external_type))
			db.commit()
			resp['result'] = True
			resp['code'] = 1
			# except:
			# 	print("exception... inside")
				# print("Error: unable to fecth data")
		else:
			resp['code'] = 2
		# except:
		# 	print("Error while checking")
		db.close()
		return json.dumps(resp)


@app.route("/googlelogin", methods=['POST'])
def g_login():
	data = request.get_json(force = True)
	email = data['email']
	idToken = data['idToken']
	name = data['name']
	image_url = data['image_url']
	external_type = 'google'
	token = idToken

	resp = {'result': False, 'code': 0, 'err_log': "Fail to insert", 'user': None}

	try:
		idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

		if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
			print("wrong issuer")
			raise ValueError('Wrong issuer.')

		userid = idinfo['sub']
		
		db = MySQLdb.connect("localhost","root","", "pyhon_api")
		cursor = db.cursor()		
		email_to_db = email.encode('utf-8')
		

		sql = "INSERT INTO `users`(`email`, `external_type`, `external_id`) VALUES (%s,%s,%s)"
		respi = ""
		# try:
		cursor.execute(sql, (email_to_db, external_type, userid))
		db.commit()
		resp['result'] = True
		resp['user'] = email
		resp['code'] = 1
		resp['err_log'] = ""
		db.close()
	except ValueError:
		# Invalid token
		print("exception - invalid token")
	except:
		print("general exptn")

	return json.dumps(resp)