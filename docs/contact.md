# Contact API Spec

## Create Contact API
Endpoint :

    POST /api/contacts

Headers :

    Authorization: token

Request Body :

```json
{
    "firstname": "Nanda",
    "lastname": "Hady Mulya",
    "email": "email@gmail.com",
    "phone": "082000200300"
}
```

Response Body Succeed :
```json
{
    "data": {
        "id": 1,
        "firstname": "Nanda",
        "lastname": "Hady Mulya",
        "email": "email@gmail.com",
        "phone": "082000200300"
    }
}
```

Response Body Failed :
```json
{
    "errors": "unauthorized"
}
```

# Update Contact API
Endpoint :

    PUT /api/contacts/:id

Headers :

    Authorization: token

Request Body :

```json
{
    "firstname": "Nanda",
    "lastname": "Hady Mulya",
    "email": "email@gmail.com",
    "phone": "082000200300"
}
```

Response Body Succeed :
```json
{
    "data": {
        "id": 1,
        "firstname": "Nanda",
        "lastname": "Hady Mulya",
        "email": "email@gmail.com",
        "phone": "082111200300"
    }
}
```

Response Body Failed :
```json
{
    "errors": "unauthorized"
}
```

# Get Contact API
Endpoint :

    GET /api/contacts/:id

Headers :

    Authorization: token

Response Body Succeed :
```json
{
    "data": {
        "id": 1,
        "firstname": "Nanda",
        "lastname": "Hady Mulya",
        "email": "email@gmail.com",
        "phone": "082000200300"
    }
}
```

Response Body Failed :
```json
{
    "errors": "contact is not found"
}
```

# Remove Contact API
Endpoint :

    DELETE /api/contacts/:id

Headers :

    Authorization: token

Response Body Succeed :
```json
{
    "data": {
        "message": "remove contact is succeed"
    }
}
```

Response Body Failed :
```json
{
    "errors": "contact is not found"
}
```

# Search Contact API
Endpoint :

    GET /api/contacts

Headers :

    Authorization: token

Query Params :

    - name : search by fistname, lastname, using like, optional
    - email : search by email using like, optional
    - phone : search by phone using phone, optional
    - page : number of page, default 1
    - size : size of page, default 10

Response Body Succeed :
```json
{
    "data": [
        {
            "id": 1,
            "firstname": "Nanda",
            "lastname": "Hady Mulya",
            "email": "email@gmail.com",
            "phone": "082000200300"
        },
        {
            "id": 2,
            "firstname": "Nanda",
            "lastname": "Hady Mulya",
            "email": "email@gmail.com",
            "phone": "082000200300"
        }
    ],
    "paging": {
        "page": 1,
        "total_page": 3,
        "total_item": 30
    }
}
```

Response Body Failed :
```json
{
    "errors": "contact is not found"
}
```
