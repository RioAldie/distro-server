# API SPECIFICATION

## AUTH

### Login

- Endpoint: POST /login
- Request:

```
 {
    'username': string,
    'password': string
 }
```

- Response:

```
{
    status: 200,
    data: {}
}
```

### Register

- Endpoint: POST /register
- Request:

```
 {
    'username': string,
    'password': string,
    'address': string
 }
```

- Response:

```
{
    status: 200,
    data: {}
}
```

## CLOTHES

### GET ALL CLOTHES

- Endpoint: GET /clothes
- Request:

```
 {

 }
```

- Response:

```
{
    status: 200,
    data: [
        {
            id: string,
            title: string,
            stock: int,
            price: float,
            discount: float,
            image: string,
            category: []
        }
    ]
}
```

### ADD NEW CLOTHES

- Endpoint: POST /clothes
- Request Body:

```
 {


            title: string,
            stock: int,
            price: float,
            discount: float,
            image: string,
            category: []
            createAt: date
 }
```

- Response:

```
{
    status: 200,
    data: [
        {
            id: string,
            title: string,
            stock: int,
            price: float,
            discount: float,
            image: string,
            category: []
        }
    ]
}
```

## ORDER

- POST NEW ORDER
- Endpoint: POST /order
- Request Body:

```
 {

            idClothes: string,
            title: string,
            amount: int,
            totalPrice: float,
            discount: float,
            image: string,
            paymentId: string,
            createAt: date
 }
```

- Response:

```
{
    status: 200,
    data: [
        {
            _id: string,
            userId: string,
            clotheId: string,
            title: string,
            amount: int,
            price: float,
            discount: float,
            image: string,
            category: []
        }
    ]
}
```

## PAYMENT
