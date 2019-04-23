from flask import Flask, request
app = Flask(__name__)
import MySQLdb
import json
import string
import random

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
		sql = "SELECT * FROM `users` WHERE email=%s and password=%s"
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
			token = ''.join(random.choices(string.ascii_lowercase + string.digits, k=11))
			print("inside post req of sign upppppp")
			# cursor = db.cursor()
			sql = "INSERT INTO `users`(`email`, `password`, `auth_token`) VALUES (%s,%s,%s)"
			# print(sql)
			respi = ""
			# try:
			cursor.execute(sql, (email, password, token))
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
