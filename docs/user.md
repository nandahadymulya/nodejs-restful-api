# User API Spec

## Update Current User API
Endpoint :

    PATCH /api/users/current

Headers :

    Authorization: token

Request Body :

```json
{
    "name": "NHM Projekt Updated", // optional
    "password": "secretupdated" // optional
}
```

Response Body Succeed :
```json
{
    "data": {
        "username": "nhmprojekt"
        "name": "NHM Projekt Updated"
    }
}
```

Response Body Failed :
```json
{
    "errors": "unauthorized"
}
```

# Get Current User API
Endpoint :

    GET /api/users/current

Headers :

    Authorization: token

Response Body Succeed :
```json
{
    "data": {
        "username": "nhmprojekt"
        "name": "NHM Projekt Updated"
    }
}
```

Response Body Failed :
```json
{
    "errors": "unauthorized"
}
```
