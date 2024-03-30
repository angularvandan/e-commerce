import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[HttpService]
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);  

  });
    

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const dummyGetAllProducts={
    "results": [
      {
            "_id": "62df6cc0305fe3040d7f652f",
            "_org": {
                "_id": "62c56eeb1f5cc854e966e5e5",
                "name": "AM",
                "email": "prathameshsavant281@gmail.com"
            },
            "name": "Samsung s1",
            "description": "Brand new Samsung S1 series available with 4-64 | 6-128 | 8-128 | 8-256 | 12-256",
            "images": [
                {
                    "public_id": "training-api/sjfl7fftoy3dan1s7lah",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1659069429/training-api/sjfl7fftoy3dan1s7lah.jpg"
                },
                {
                    "public_id": "training-api/knmpalwluvvm3xvq0ple",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1659674942/training-api/knmpalwluvvm3xvq0ple.jpg"
                },
                {
                    "public_id": "training-api/mhhwx2xqob52t1nvrgrd",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1659674943/training-api/mhhwx2xqob52t1nvrgrd.jpg"
                },
                {
                    "public_id": "training-api/iz9tciegtaceaefsww8h",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1659674943/training-api/iz9tciegtaceaefsww8h.jpg"
                }
            ],
            "createdAt": "2022-07-26T04:25:36.968Z",
            "price": 19999,
            "deal": {
                "discount": "8%",
                "price": 18399.08,
                "ends": "2023-06-16T02:43:52.709Z"
            }
        },
      ],
    "page": 1,
    "limit": 1,
    "totalPages": 40,
    "totalResults": 316
  }
  it('should return products details',()=>{
    service.getAllProducts({limit:1}).subscribe(res=>{
      expect(res).toEqual(dummyGetAllProducts);
    });
    const req=httpMock.expectOne(res=>res.method==='GET' );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyGetAllProducts);
  });

  const dummyGetProducts={
    "_id": "62dc3878305fe3040d7f4bcf",
    "_org": {
        "_id": "62dc3282305fe3040d7f4b0b",
        "name": "AM",
        "email": "omi@abc.com"
    },
    "name": "Second Product",
    "description": "good",
    "images": [
        {
            "public_id": "training-api/yiqcdgfiwhpmnmtjxxdu",
            "url": "http://res.cloudinary.com/abs-am/image/upload/v1658599544/training-api/yiqcdgfiwhpmnmtjxxdu.jpg"
        },
        {
            "public_id": "training-api/jdezbnj7iwwj8owesuau",
            "url": "http://res.cloudinary.com/abs-am/image/upload/v1658599544/training-api/jdezbnj7iwwj8owesuau.jpg"
        }
    ],
    "deleted": false,
    "createdAt": "2022-07-23T18:05:44.886Z",
    "updatedAt": "2022-08-24T12:12:54.473Z",
    "__v": 0,
    "price": 1898,
    "deal": {
        "discount": "31%",
        "price": 1309.62,
        "ends": "2023-06-14T06:58:31.660Z"
    }
  }
  it('should return one product',()=>{
    service.getProduct("62dc3878305fe3040d7f4bcf").subscribe(res=>{
      expect(res).toEqual(dummyGetProducts);
    });
    const req=httpMock.expectOne(res=>res.method==='GET' );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyGetProducts);
  });
  const dummyRegister={
    "customer": {
        "name": "chandan",
        "email": "chanda1@gmail.com",
        "picture": "https://i.imgur.com/CR1iy7U.png",
        "_id": "648841e38314b2229dea5e5a",
        "deleted": false,
        "addresses": [],
        "createdAt": "2023-06-13T10:16:03.130Z",
        "updatedAt": "2023-06-13T10:16:03.130Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDg4NDFlMzgzMTRiMjIyOWRlYTVlNWEiLCJpYXQiOjE2ODY2NTEzNjMsImV4cCI6MTY4NjczNzc2MywidHlwZSI6ImFjY2VzcyJ9.u3_xOXspIVxzpEYRBPs1lqJuRS2dvvoYhp95Uh7Nukc",
    "expires": "2023-06-14T10:16:03.160Z"
  }
  it('should register shop',()=>{
    service.register({name:'chandan',email:'chandan@gmail.com',password:'2323kj'}).subscribe(res=>{
      expect(res).toEqual(dummyRegister);
    })
    const req=httpMock.expectOne(res=>res.method==='POST' );
    expect(req.request.method).toEqual('POST');
    req.flush(dummyRegister);
  })
  const dummyLogin={
    "_id": "646df293ec6d46ce7b8f9e25",
    "name": "Vandan",
    "email": "vandan@angularminds.in",
    "picture": "http://res.cloudinary.com/abs-am/image/upload/v1686551064/training-api/wccoak7upra3trhwopuz.jpg",
    "deleted": false,
    "createdAt": "2023-05-24T11:18:43.910Z",
    "updatedAt": "2023-06-12T06:24:24.668Z"
  }
  it('should login shop',()=>{
    service.login({email:'vandan@gmail.com',password:'absdk232'}).subscribe(res=>{
      expect(res).toEqual(dummyLogin);
    });
    const req=httpMock.expectOne(res=>res.method==='POST' );
    expect(req.request.method).toEqual('POST');
    req.flush(dummyLogin);
  })
  const dummySelf={
    "_id": "646df293ec6d46ce7b8f9e25",
    "name": "Vandan",
    "email": "vandan@angularminds.in",
    "picture": "http://res.cloudinary.com/abs-am/image/upload/v1686551064/training-api/wccoak7upra3trhwopuz.jpg",
    "deleted": false,
    "createdAt": "2023-05-24T11:18:43.910Z",
    "updatedAt": "2023-06-12T06:24:24.668Z"
  }
  it('should self shop',()=>{
    service.self().subscribe(res=>{
      expect(res).toEqual(dummySelf);
    })
    const req=httpMock.expectOne(res=>res.method==='GET' );
    expect(req.request.method).toEqual('GET');
    
    req.flush(dummySelf);
  })
  const dummyUpdateProfile={
    "_id": "646df293ec6d46ce7b8f9e25",
    "name": "Vandan",
    "email": "vandan@angularminds.in",
    "picture": "http://res.cloudinary.com/abs-am/image/upload/v1686551064/training-api/wccoak7upra3trhwopuz.jpg",
    "deleted": false,
    "createdAt": "2023-05-24T11:18:43.910Z",
    "updatedAt": "2023-06-12T06:24:24.668Z"
  }
  it('should update profile shop ',()=>{
    service.updateProfile({email:'dsdfs@gmail.com',name:'dfsf2'}).subscribe(res=>{
      expect(res).toEqual(dummyUpdateProfile);
    })
    const req=httpMock.expectOne(res=>res.method==='PATCH' );
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyUpdateProfile);
  })
  const dummyUpdateProfilePicture={
    "picture": "http://res.cloudinary.com/abs-am/image/upload/v1686653349/training-api/esgtdj1h2qvahsqt1g7g.jpg"
  }
  it('should update profile picture',()=>{
    const formData=new FormData();
    const file = new File(['test-image'], 'test.jpg', { type: 'image/jpeg' });

    formData.append('picture',file);
    service.updateProfilePicture(formData).subscribe(res=>{
      expect(res).toEqual(dummyUpdateProfilePicture);
    })
    const req=httpMock.expectOne(res=>res.method==='POST' );
    expect(req.request.method).toEqual('POST');
    req.flush(dummyUpdateProfilePicture);

  })
  const dummyDeleteProfilePicture={
  }
  it('should delete profile picture',()=>{
    
    service.deleteProfilePicture().subscribe(res=>{
      expect(res).toEqual(dummyDeleteProfilePicture);
    })
    const req=httpMock.expectOne(res=>res.method==='DELETE' );
    expect(req.request.method).toEqual('DELETE');
    req.flush(dummyDeleteProfilePicture);
  })
  const dummyGetSavedAddress={
    "street": "bhagwatipur",
    "addressLine2": "arwal",
    "city": "patna",
    "state": "bihar",
    "pin": "804419",
    "_id": "647d8482ec6d46ce7b938857"
  }
  it('should get saved address',()=>{
    service.getSavedAddress().subscribe(res=>{
      expect(res).toEqual(dummyGetSavedAddress);
    })
    const req=httpMock.expectOne(res=>res.method==='GET' );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyGetSavedAddress);
  })
  const dummyGetAddressById={
    "street": "bhagwatipur",
    "addressLine2": "arwal",
    "city": "patna",
    "state": "bihar",
    "pin": "804419",
    "_id": "647d8482ec6d46ce7b938857"
  }
  it('should get address by id',()=>{
    service.getAddressById('sdfsfs').subscribe(res=>{
      expect(res).toEqual(dummyGetAddressById);
    })
    const req=httpMock.expectOne(res=>res.method==='GET' );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyGetAddressById);
  })
  const dummyAddAddress={
    "street": "bhagwatipur",
    "addressLine2": "arwal",
    "city": "patna",
    "state": "bihar",
    "pin": "804419",
    "_id": "647d8482ec6d46ce7b938857"
  }
  it('should add address',()=>{
    const payload={
      street:'bhagwatipur',
      addressLine2:'bhagwatipur',
      city:'patna',
      state:'bihar',
      pin:'804419'
    }
    service.addAddress(payload).subscribe(res=>{
      expect(res).toEqual(dummyAddAddress);
    })
    const req=httpMock.expectOne(res=>res.method==='POST' );
    expect(req.request.method).toEqual('POST');
    req.flush(dummyAddAddress);
  })
  const dummyUpdateAddress={
    "street": "bhagwatipur",
    "addressLine2": "Arwal",
    "city": "patna",
    "state": "bihar",
    "pin": "804419",
    "_id": "647d8482ec6d46ce7b938857"
  }
  it('should update address by id',()=>{
    const payload={
      street:'bhagwatipur',
      addressLine2:'bhagwatipur',
      city:'patna',
      state:'bihar',
      pin:'804419'
    }
    service.updateAddress(payload,'sfsfwesfsf').subscribe(res=>{
      expect(res).toEqual(dummyUpdateAddress);
    })
    const req=httpMock.expectOne(res=>res.method==='PUT' );
    expect(req.request.method).toEqual('PUT');
    req.flush(dummyUpdateAddress);
  })
  const dummyDeleteAddress={
  }
  it('should delete address by id',()=>{
    service.deleteAddress('sfsfwesfsf').subscribe(res=>{
      expect(res).toEqual(dummyDeleteAddress);
    })
    const req=httpMock.expectOne(res=>res.method==='DELETE' );
    expect(req.request.method).toEqual('DELETE');
    req.flush(dummyDeleteAddress);
  })
  const dummyChangePassword={
  }
  it('should change password',()=>{
    service.changePassword('sdf23sd').subscribe(res=>{
      expect(res).toEqual(dummyChangePassword);
    })
    const req=httpMock.expectOne(res=>res.method==='POST' );
    expect(req.request.method).toEqual('POST');
    req.flush(dummyChangePassword);
  })
  const dummyRemoveAccount={
  }
  it('should remove account',()=>{
    service.removeAccount().subscribe(res=>{
      expect(res).toEqual(dummyRemoveAccount);
    })
    const req=httpMock.expectOne(res=>res.method==='DELETE' );
    expect(req.request.method).toEqual('DELETE');
    req.flush(dummyRemoveAccount);
  })
  const dummyCreateOrder={
    "order": {
      "items": [
          {
              "productId": "62de8453305fe3040d7f6277",
              "name": "Jio",
              "price": 10000,
              "qty": 1,
              "subTotal": 10000,
              "_id": "648857458314b2229dea6045"
          },
      ],
      "deliveryFee": 40,
      "total": 2,
      "address": {
          "street": "radha chauk",
          "addressLine2": "baner",
          "city": "pune",
          "state": "maharastra",
          "pin": "410131"
      },
      "paymentStatus": "Pending",
      "status": "Pending",
      "createdBy": "646df293ec6d46ce7b8f9e25",
      "deleted": false,
      "_id": "648857458314b2229dea6044",
      "createdAt": "2023-06-13T11:47:17.425Z",
      "updatedAt": "2023-06-13T11:47:17.425Z",
      "__v": 0
  }
  }
  it('should create order',()=>{
    let payload={
        items:'items',
      deliveryFee:40,
      total:12,
      address:{
        street: 'SDFSFF' ,
        addressLine2: 'SDFSFD' ,
        city: 'sdfsdfs' ,
        state: 'sdfsf', 
        pin: '234239'
      },
    }
    service.createOrder(payload).subscribe(res=>{
      expect(res).toEqual(dummyCreateOrder);
    })
    const req=httpMock.expectOne(res=>res.method==='POST' );
    expect(req.request.method).toEqual('POST');
    req.flush(dummyCreateOrder);
  })
  const dummyConfirmOrder={
    "message": "Your order is successfully placed!!"
  }
  it('should be confirm order',()=>{
    let payload={
      nameOnCard:'VANDAN',
      cardNumber:'2432342',
      expire:'12/2025',
      cvv:232
    }
    service.confirmOrder(payload,'WEIOWOEI2342').subscribe(res=>{
      expect(res).toEqual(dummyConfirmOrder);
    })
    const req=httpMock.expectOne(res=>res.method==='PUT' );
    expect(req.request.method).toEqual('PUT');
    req.flush(dummyConfirmOrder);
  })
  const dummyOrderHistory={
    "results": [
      {
          "address": {
              "street": "bhagwatipur",
              "addressLine2": "arwal",
              "city": "patna",
              "state": "bihar",
              "pin": "804419"
          },
          "_id": "647db536ec6d46ce7b93c32f",
          "items": [
              {
                  "productId": "62dc3744305fe3040d7f4b31",
                  "name": "First Product",
                  "price": 7466,
                  "qty": 2,
                  "subTotal": 14932,
                  "_id": "647db536ec6d46ce7b93c330"
              },
              {
                  "productId": "62de8453305fe3040d7f6277",
                  "name": "Jio",
                  "price": 10000,
                  "qty": 1,
                  "subTotal": 10000,
                  "_id": "647db536ec6d46ce7b93c331"
              },
              {
                  "productId": "62df66c7305fe3040d7f64c5",
                  "name": "Samsung",
                  "price": 21999,
                  "qty": 1,
                  "subTotal": 21999,
                  "_id": "647db536ec6d46ce7b93c332"
              }
          ],
          "deliveryFee": 40,
          "total": 3,
          "paymentStatus": "Pending",
          "status": "Cancelled",
          "createdBy": "646df293ec6d46ce7b8f9e25",
          "deleted": false,
          "createdAt": "2023-06-05T10:13:10.736Z",
          "updatedAt": "2023-06-06T11:29:52.177Z",
          "__v": 0
      },
    ]
  }
  it('should be order history',()=>{
    service.orderHistory({limit:1}).subscribe(res=>{
      expect(res).toEqual(dummyOrderHistory);
    })
    const req=httpMock.expectOne(res=>res.method==='GET' );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyOrderHistory);
  })
  const dummyOrderDetails={
    "_id": "62df66c7305fe3040d7f64c5",
    "_org": {
        "_id": "62c6bd531f5cc854e966f0ed",
        "name": "AM",
        "email": "ahfwpcjgmm_1657175592@tfbnw.net"
    },
    "name": "Samsung",
    "description": "F1",
    "images": [
        {
            "public_id": "training-api/zafac544dezxy84fr9eo",
            "url": "http://res.cloudinary.com/abs-am/image/upload/v1658808006/training-api/zafac544dezxy84fr9eo.jpg"
        }
    ],
    "deleted": false,
    "createdAt": "2022-07-26T04:00:07.334Z",
    "updatedAt": "2022-08-25T11:09:42.103Z",
    "__v": 0,
    "price": 21999,
    "deal": {
        "discount": "30%",
        "price": 15399.3,
        "ends": "2023-06-18T02:24:36.327Z"
    }
  }
  it('should be order details',()=>{
    service.orderDetails('gh555dfgdd5').subscribe(res=>{
      expect(res).toEqual(dummyOrderDetails);
    })
    const req=httpMock.expectOne(res=>res.method==='GET' );
    expect(req.request.method).toEqual('GET');
    req.flush(dummyOrderDetails);
  })
  const dummyCancelOrder={
    "order": {
        "address": {
            "street": "bhagwatipur",
            "addressLine2": "arwal",
            "city": "patna",
            "state": "bihar",
            "pin": "804419"
        },
        "_id": "647dcd66ec6d46ce7b93dff2",
        "items": [
            {
                "productId": "62df66c7305fe3040d7f64c5",
                "name": "Samsung",
                "price": 21999,
                "qty": 1,
                "subTotal": 21999,
                "_id": "647dcd66ec6d46ce7b93dff1"
            }
        ],
        "deliveryFee": 40,
        "total": 21999,
        "paymentStatus": "Paid",
        "status": "Cancelled",
        "sellerId": "62c6bd531f5cc854e966f0ed",
        "transactionNo": "HC7P3TDX",
        "createdBy": "646df293ec6d46ce7b8f9e25",
        "deleted": false,
        "createdAt": "2023-06-05T11:56:22.676Z",
        "updatedAt": "2023-06-13T12:19:03.010Z",
        "__v": 0
    }
}
  it('should be cancel order',()=>{
    service.cancelOrder('gh555dfDgdd5').subscribe(res=>{
      expect(res).toEqual(dummyCancelOrder);
    })
    const req=httpMock.expectOne(res=>res.method==='PATCH' );
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyCancelOrder);
  })
});
