from google.oauth2 import id_token
from google.auth.transport import requests
from key import CLIENT_ID

# (Receive token by HTTPS POST)
# ...
token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZGU4MGViMWVkZjlmM2JmNDQ4NmRkODc3YzM0YmE0NmFmYmJhMWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxODIxNDMwOTk3MzgtbGt1amRwdDZybDBvb2VkNDlmcHJzdTNmMXJkbmlybTMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxODIxNDMwOTk3MzgtbGt1amRwdDZybDBvb2VkNDlmcHJzdTNmMXJkbmlybTMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTMwMzcwMzU5MzIzODA1NDg3MTMiLCJlbWFpbCI6Im5ld2NyMjAxNzdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJTNDNsdFBIUVVSX0c1ZUtGRnhUMUJRIiwibmFtZSI6Ik1yLiBSIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS8tbkdOelBrek1OUnMvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNIaTNyZjFneTdCZTluT3BldUZyanpyYXR1ekNVMEhvdy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiTXIuIiwiZmFtaWx5X25hbWUiOiJSIiwibG9jYWxlIjoiZW4tR0IiLCJpYXQiOjE1NjI3NzcwMjEsImV4cCI6MTU2Mjc4MDYyMX0.X6Fgmfm5qw8TV_cZHItNGjUaMjf9gtpyKGMYz50traZLoxrrm6Bjr0q6C2A8V3SREREsS8rEYl5gipB6KxFj-dZcu3a3XHUg6F9T7kPnesUgsHsMI9UlPtQfwSTA8LnDGWOPAsWl4kaWcrn1fhQKXxHCdWE3fuJJLZZl8RI2dVDR-CFBcN8UKsc3x6SZeBX9TByWjY_YiQwz6djeoi2_gef-kCn7Zi8BgFRgNm8LcvqaArhxDA5YXKdcmPCUTG7BnBcTHX_tLlAtPWZjvR1yokJo3eK-DJE7m5WzHgLM35TTUe2WpS9Wtq3AE2Q3vOW4JIotVlTqwy39qDG58Y--Nw"
print(CLIENT_ID)
try:
    # Specify the CLIENT_ID of the app that accesses the backend:
    idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)

    # Or, if multiple clients access the backend server:
    # idinfo = id_token.verify_oauth2_token(token, requests.Request())
    # if idinfo['aud'] not in [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]:
    #     raise ValueError('Could not verify audience.')

    if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
        print("wrong issuer")
        raise ValueError('Wrong issuer.')

    # If auth request is from a G Suite domain:
    # if idinfo['hd'] != GSUITE_DOMAIN_NAME:
    #     raise ValueError('Wrong hosted domain.')

    # ID token is valid. Get the user's Google Account ID from the decoded token.
    userid = idinfo['sub']
    print(userid)
except ValueError:
    # Invalid token
    print("exception - invalid token")
except:
    print("general exptn")