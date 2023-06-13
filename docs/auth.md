# Auth API Spec

## Sign Up API
Endpoint :

    POST /api/auth/signup

Request Body :
```json
{
    "username": "nhmprojekt",
    "password": "secret",
    "name": "NHM Projekt"
}
```

Response Body Succeed :
```json
{
    "data": {
        "name": "NHM Projekt"
    }
}
```

Response Body Failed :
```json
{
    "errors": "username already registered"
}
```

# Sign In API
Endpoint :

    POST /api/auth/signin

Request Body :
```json
{
    "username": "nhmprojekt",
    "password": "secret"
}
```

Response Body Succeed :
```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Response Body Failed :
```json
{
    "errors": "username or password wrong"
}
```

# Sign Out API
Endpoint :

    DELETE /api/auth/signout

Response Body Successed :
```json
{
    "data": {
        "message": "sign out succesed"
    }
}
```

Response Body Failed :
```json
{
    "errors": "unauthorized"
}
```
