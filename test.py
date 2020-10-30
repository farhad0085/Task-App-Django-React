import requests

def get_user_token(username, password):

    post_data = {
        "username": username,
        "password": password
    }
 
    response = requests.post("http://localhost:8000/api/auth/", data=post_data).json()

    if not 'token' in response:
        print("Wrong credentials")
        return None
    
    return response['token']

username = "farhad"
password = ""
token = get_user_token(username, password)
print("Token", token)