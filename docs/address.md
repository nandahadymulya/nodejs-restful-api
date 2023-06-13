# Address API Spec

## Create Address API
Endpoint :

    POST /api/contacts/:contactId/addresses

Headers :

    Authorization: token

Request Body :

```json
{
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "10440"
}
```

Response Body Succeed :
```json
{
    "data": {
        "id": 1,
        "street": "Jalan",
        "city": "Kota",
        "province": "Provinsi",
        "country": "Negara",
        "postal_code": "10440"
    }
}
```

Response Body Failed :
```json
{
    "errors": "country is required"
}
```

# Update Address API
Endpoint :

    PUT /api/contancts/:contactId/:id/addresses/:addressId

Headers :

    Authorization: token

Request Body :

```json
{
    "street": "Jalan",
    "city": "Kota",
    "province": "Provinsi",
    "country": "Negara",
    "postal_code": "10440"
}
```

Response Body Succeed :
```json
{
    "data": {
        "id": 1,
        "street": "Jalan",
        "city": "Kota",
        "province": "Provinsi",
        "country": "Negara",
        "postal_code": "10440"
    }
}
```

Response Body Failed :
```json
{
    "errors": "country is required"
}
```

# Get Contact API
Endpoint :

    GET /api/contacts/:contactId/addresses/:addressId

Headers :

    Authorization: token

Response Body Succeed :
```json
{
    "data": {
        "id": 1,
        "street": "Jalan",
        "city": "Kota",
        "province": "Provinsi",
        "country": "Negara",
        "postal_code": "10440"
    }
}
```

Response Body Failed :
```json
{
    "errors": "contact is not found"
}
```

# List Address API
Endpoint :

    GET /api/contacts/:contactId/addresses

Headers :

    Authorization: token

Response Body Succeed :
```json
{
    "data": [
        {
            "id": 1,
            "street": "Jalan",
            "city": "Kota",
            "province": "Provinsi",
            "country": "Negara",
            "postal_code": "10440"
        },
        {
            "id": 2,
            "street": "Jalan",
            "city": "Kota",
            "province": "Provinsi",
            "country": "Negara",
            "postal_code": "10440"
        }
    ]
}
```

Response Body Failed :
```json
{
    "errors": "contact is not found"
}
```

# Remove Address API
Endpoint :

    DELETE /api/contacts/:contactId/addresses/:addressId

Headers :

    Authorization: token

Response Body Succeed :
```json
{
    "data": {
        "message": "remove address is succeed"
    }
}
```

Response Body Failed :
```json
{
    "errors": "address is not found"
}
```
