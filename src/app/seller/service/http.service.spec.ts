import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

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
  const dummyCreateRegister={
    "user": {
        "name": "chandan",
        "_org": {
            "_id": "64894e898314b2229dea6735",
            "name": "angular",
            "email": "chandanf@gmail.com"
        },
        "email": "chandanf@gmail.com",
        "role": "admin",
        "isEmailVerified": false,
        "_id": "64894e898314b2229dea6738",
        "deleted": false,
        "createdAt": "2023-06-14T05:22:17.915Z",
        "updatedAt": "2023-06-14T05:22:17.915Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDg5NGU4OTgzMTRiMjIyOWRlYTY3MzgiLCJpYXQiOjE2ODY3MjAxMzcsImV4cCI6MTY4NjgwNjUzNywidHlwZSI6ImFjY2VzcyJ9.pwDlmAsewhjFa9V9eHsDe1CKNiYsG2erNXBXm5hzWCo",
    "expires": "2023-06-15T05:22:17.943Z"
  }
  it('should create register',()=>{
    const payload={
      email:'vandna@gmail.com',
      password:'sfjsld234',
      name:'vandan',
      company:'angularminds.in',
      captcha:'2r2343'
    }
    service.createRegister(payload).subscribe(res=>{
      expect(res).toEqual(dummyCreateRegister);
    });
    const req=httpMock.expectOne(res=>res.method==='POST' );
    expect(req.request.method).toEqual('POST');
    req.flush(dummyCreateRegister);
  });

  const dummyCreateLogin={
    "user": {
        "_id": "6447662e49ce72c17a340cf0",
        "name": "Vandan",
        "_org": {
            "_id": "6447662e49ce72c17a340ced",
            "name": "AngularMinds.in",
            "email": "vandan@angularminds.in"
        },
        "email": "vandan@angularminds.in",
        "role": "admin",
        "isEmailVerified": true,
        "deleted": false,
        "createdAt": "2023-04-25T05:33:34.881Z",
        "updatedAt": "2023-06-03T11:28:38.135Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDQ3NjYyZTQ5Y2U3MmMxN2EzNDBjZjAiLCJpYXQiOjE2ODY3MjA0MzEsImV4cCI6MTY4NjgwNjgzMSwidHlwZSI6ImFjY2VzcyJ9.O1VOysaP9X7gCw8Kb5yt5TaFlDfY-w_eCWshxmR91MI",
    "expires": "2023-06-15T05:27:11.814Z"
}
  it('should create login',()=>{
    const payload={
      email:'vandan@.com',
      password:'sdfsdfs',
      captcha:'sdfsdf'
    }
    service.createLogin(payload).subscribe(res=>{
      expect(res).toEqual(dummyCreateLogin);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyCreateLogin);
  })

  const dummyFetchUserDetails={
    "_id": "6447662e49ce72c17a340cf0",
    "name": "Vandan",
    "_org": {
        "_id": "6447662e49ce72c17a340ced",
        "name": "AngularMinds.in",
        "email": "vandan@angularminds.in"
    },
    "email": "vandan@angularminds.in",
    "role": "admin",
    "isEmailVerified": true,
    "deleted": false,
    "createdAt": "2023-04-25T05:33:34.881Z",
    "updatedAt": "2023-06-03T11:28:38.135Z"
  }
  it('should fetch user details',()=>{
    
    service.fetchUserDetails().subscribe(res=>{
      expect(res).toEqual(dummyFetchUserDetails);
    });
    const req=httpMock.expectOne(res=>res.method==='GET');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyFetchUserDetails);
  })

  const dummyUpdateUserCompanyDetails={
    "_id": "6447662e49ce72c17a340ced",
    "name": "AngularMinds",
    "email": "vandan@angularminds.in",
    "deleted": false,
    "createdAt": "2023-04-25T05:33:34.877Z",
    "updatedAt": "2023-06-14T05:36:10.971Z"
  }
  it('should update company details',()=>{
    
    service.updateUserCompanyDetails({name:'dsdfsd'}).subscribe(res=>{
      expect(res).toEqual(dummyUpdateUserCompanyDetails);
    });
    const req=httpMock.expectOne(res=>res.method==='PATCH');
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyUpdateUserCompanyDetails);
  })
  const dummyCreateUser={
    "name": "rahul",
    "_org": {
        "_id": "6447662e49ce72c17a340ced",
        "name": "AngularMinds",
        "email": "vandan@angularminds.in"
    },
    "email": "rahul122@gmail.com",
    "role": "user",
    "isEmailVerified": false,
    "_id": "648954cb8314b2229dea6a21",
    "deleted": false,
    "createdAt": "2023-06-14T05:48:59.078Z",
    "updatedAt": "2023-06-14T05:48:59.078Z"
  }
  it('should create user',()=>{
    const payload={
      name:'vandan',
      password:'sdfss',
      email:'vandna@gmail.com',
      role:'admin'
    }
    service.createUser(payload).subscribe(res=>{
      expect(res).toEqual(dummyCreateUser);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyCreateUser);
  })
  const dummyGetUsers={
    "results": [
        {
            "_id": "6447662e49ce72c17a340cf0",
            "name": "Vandan",
            "_org": {
                "_id": "6447662e49ce72c17a340ced",
                "name": "AngularMinds",
                "email": "vandan@angularminds.in"
            },
            "email": "vandan@angularminds.in",
            "role": "admin",
            "isEmailVerified": true,
            "deleted": false,
            "createdAt": "2023-04-25T05:33:34.881Z",
            "updatedAt": "2023-06-03T11:28:38.135Z"
        },
    ],
    "page": 1,
    "limit": 3,
    "totalPages": 8,
    "totalResults": 24
  }
  it('should getUsers',()=>{
    service.getUsers({limit:1}).subscribe(res=>{
      expect(res).toEqual(dummyGetUsers);
    });
    const req=httpMock.expectOne(res=>res.method==='GET');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyGetUsers);
  })
  const dummyDeleteUser={
  }
  it('should delete user',()=>{
    service.deleteUser('sdsdffdgd').subscribe(res=>{
      expect(res).toEqual(dummyDeleteUser);
    });
    const req=httpMock.expectOne(res=>res.method==='DELETE');
    expect(req.request.method).toEqual('DELETE');
    req.flush(dummyDeleteUser);
  })
  const dummyUpdateUserDetails={
    "_id": "644b861549ce72c17a3523b6",
    "name": "sunny",
    "_org": {
        "_id": "6447662e49ce72c17a340ced",
        "name": "AngularMinds",
        "email": "vandan@angularminds.in"
    },
    "email": "sunny1@gmail.com",
    "role": "user",
    "isEmailVerified": false,
    "deleted": false,
    "createdAt": "2023-04-28T08:38:45.045Z",
    "updatedAt": "2023-06-14T06:07:53.059Z"
  }
  it('should update user details',()=>{
    const payload={
      email:'vandna@gmail.com',
      password:'dsddfsf',
      name:'vandna'
    }
    service.updateUserDetails('sdsdffdgd',payload).subscribe(res=>{
      expect(res).toEqual(dummyUpdateUserDetails);
    });
    const req=httpMock.expectOne(res=>res.method==='PATCH');
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyUpdateUserDetails);
  })
  const dummyUpdateUserRole={
    "_id": "644a25f449ce72c17a347d5b",
    "name": "Aniket fadale",
    "_org": "6447662e49ce72c17a340ced",
    "email": "aniketfadale51@gmail.com",
    "role": "admin",
    "isEmailVerified": false,
    "deleted": false,
    "createdAt": "2023-04-27T07:36:20.479Z",
    "updatedAt": "2023-06-14T06:11:10.932Z"
  }
  it('should update user role',()=>{
    service.updateUserRole('sdsdffdgd',{role:'user'}).subscribe(res=>{
      expect(res).toEqual(dummyUpdateUserRole);
    });
    const req=httpMock.expectOne(res=>res.method==='PATCH');
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyUpdateUserRole);
  })
  const dummyChangePassword={
  }
  it('should change password',()=>{
    service.changePassword({old_password:'dsdsd',new_password:'sdsds'}).subscribe(res=>{
      expect(res).toEqual(dummyChangePassword);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyChangePassword);
  })
  const dummyResetPassword={
  }
  it('should reset password',()=>{
    service.resetPassword('dsdfsfl','sdfsds').subscribe(res=>{
      expect(res).toEqual(dummyResetPassword);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyResetPassword);
  })
  const dummyForgetPassword={
  }
  it('should forget password',()=>{
    service.forgotPassword({email:'vandan@gmail.com',captcha:'sdsd'}).subscribe(res=>{
      expect(res).toEqual(dummyForgetPassword);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyForgetPassword);
  })
  const dummyVerifyEmail={
    
  }
  it('should verify email',()=>{
    service.verifyEmail().subscribe(res=>{
      expect(res).toEqual(dummyVerifyEmail);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyVerifyEmail);
  })
  const dummyVerifyAccount={

  }
  it('should verify account',()=>{
    service.verifyAccount('sdsddf').subscribe(res=>{
      expect(res).toEqual(dummyVerifyAccount);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyVerifyAccount);
  })
  const dummyGoogleSignIn={
    user: {
      _id: '64535ac6ba13e684fad2ba2c',
      name: 'dhanashri bhosale',
      _org: {
        _id: '64535ac6ba13e684fad2ba29',
        name: 'AngularMinds',
        email: 'bhosaledhanashri98@gmail.com',
      },
      email: 'bhosaledhanashri98@gmail.com',
      role: 'user',
      isEmailVerified: true,
      deleted: false,
      createdAt: '2023-05-04T07:12:06.391Z',
      updatedAt: '2023-05-08T08:44:48.257Z',
    },
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDUzNWFjNmJhMTNlNjg0ZmFkMmJhMmMiLCJpYXQiOjE2ODY3MjQ1ODYsImV4cCI6MTY4NjgxMDk4NiwidHlwZSI6ImFjY2VzcyJ9.zp-h1OwgbYgLipYRWvI-4jEPSKANk3TTh7Dsx8jZ9nQ',
    expires: '2023-06-15T06:36:26.536Z',
  };
  it('should google signIn',()=>{
    service.googleSignIn({token:'sdfsd',captcha:'sdfsf'}).subscribe(res=>{
      expect(res).toEqual(dummyGoogleSignIn);
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyGoogleSignIn);
  })

  it('should get admin id',()=>{
    spyOn(service,'fetchUserDetails').and.returnValues();
    let result =service.getAdminId();
    expect(service.fetchUserDetails).toHaveBeenCalled();
  })
  const dummyCreateProducts={
    "_org": {
        "_id": "6447662e49ce72c17a340ced",
        "name": "AngularMinds",
        "email": "vandan@angularminds.in"
    },
    "name": "laptop",
    "description": "<p>this is good product</p>",
    "images": [
        {
            "public_id": "training-api/w2p8mvosvxc8xrrtizgn",
            "url": "http://res.cloudinary.com/abs-am/image/upload/v1686738669/training-api/w2p8mvosvxc8xrrtizgn.jpg"
        }
    ],
    "price": 12000,
    "_id": "648996ee8314b2229dea6ef2",
    "deleted": false,
    "createdAt": "2023-06-14T10:31:10.171Z",
    "updatedAt": "2023-06-14T10:31:10.171Z"
}
  it('should create product',()=>{

    const formData = new FormData();
    const file = new File(['test-image'], 'test.jpg', { type: 'image/jpeg' });

    formData.append("name",'sdfsd');
    formData.append("description",'sdfsdf');
    formData.append("images",file);
    formData.append("price",'13453');

    service.createProducts(formData).subscribe(res=>{
      expect(res).toEqual(dummyCreateProducts);

    },err=>{
      expect(err.error.message).toThrowError('404');
    });
    const req=httpMock.expectOne(res=>res.method==='POST');
    expect(req.request.method).toEqual('POST');
    req.flush(dummyCreateProducts);
  })
  const dummyGetProducts={
    "results": [
        {
            "_id": "64648db7cf9849ff1f3e4778",
            "_org": "6447662e49ce72c17a340ced",
            "name": "vivo",
            "description": "good",
            "images": [
                {
                    "public_id": "training-api/z2uukhjpo9akqnlyvwjj",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1685021342/training-api/z2uukhjpo9akqnlyvwjj.jpg"
                },
                {
                    "public_id": "training-api/qcqyhnky59sasknfquh6",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1685021343/training-api/qcqyhnky59sasknfquh6.jpg"
                },
                {
                    "public_id": "training-api/fpes7jmhlawothpjghfz",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1685021343/training-api/fpes7jmhlawothpjghfz.jpg"
                },
                {
                    "public_id": "training-api/lfojfmwmwzlwvu3tdsbs",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1685021694/training-api/lfojfmwmwzlwvu3tdsbs.jpg"
                }
            ],
            "price": 129999,
            "deleted": false,
            "createdAt": "2023-05-17T08:17:59.158Z",
            "updatedAt": "2023-05-25T13:34:55.089Z"
        },            
    ],
    "page": 1,
    "limit": 4,
    "totalPages": 5,
    "totalResults": 19
  }
  it('should get products',()=>{
    service.getProducts({limit:1}).subscribe(res=>{
      expect(res).toEqual(dummyGetProducts);
    });
    const req=httpMock.expectOne(res=>res.method==='GET');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyGetProducts);
  })
  const dummyGetProduct={
    "results": [
        {
            "_id": "64648db7cf9849ff1f3e4778",
            "_org": "6447662e49ce72c17a340ced",
            "name": "vivo",
            "description": "good",
            "images": [
                {
                    "public_id": "training-api/z2uukhjpo9akqnlyvwjj",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1685021342/training-api/z2uukhjpo9akqnlyvwjj.jpg"
                },
                {
                    "public_id": "training-api/qcqyhnky59sasknfquh6",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1685021343/training-api/qcqyhnky59sasknfquh6.jpg"
                },
                {
                    "public_id": "training-api/fpes7jmhlawothpjghfz",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1685021343/training-api/fpes7jmhlawothpjghfz.jpg"
                },
                {
                    "public_id": "training-api/lfojfmwmwzlwvu3tdsbs",
                    "url": "http://res.cloudinary.com/abs-am/image/upload/v1685021694/training-api/lfojfmwmwzlwvu3tdsbs.jpg"
                }
            ],
            "price": 129999,
            "deleted": false,
            "createdAt": "2023-05-17T08:17:59.158Z",
            "updatedAt": "2023-05-25T13:34:55.089Z"
        },            
    ],
    "page": 1,
    "limit": 4,
    "totalPages": 5,
    "totalResults": 19
  }
  it('should get product',()=>{
    service.getProduct('dsdfsdf').subscribe(res=>{
      expect(res).toEqual(dummyGetProduct);
    });
    const req=httpMock.expectOne(res=>res.method==='GET');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyGetProduct);
  })
  const dummyUpdateImage={
    "_id": "6464b04ecf9849ff1f3e71da",
    "_org": "6447662e49ce72c17a340ced",
    "name": "motorola",
    "description": "good quality",
    "images": [
        {
            "public_id": "training-api/hzv2xwr07jqa5jyf6zbr",
            "url": "http://res.cloudinary.com/abs-am/image/upload/v1686739731/training-api/hzv2xwr07jqa5jyf6zbr.jpg"
        },
    ],
    "price": 139999,
    "deleted": false,
    "createdAt": "2023-05-17T10:45:34.454Z",
    "updatedAt": "2023-06-14T10:48:53.291Z"
  }
  it('should update and delete image',()=>{
    const formData = new FormData();
    const file = new File(['test-image'], 'test.jpg', { type: 'image/jpeg' });
    formData.append('new_image',file);
    formData.append('delete','ddfgdfg');
    service.updateImage(formData,'FDFGDG').subscribe(res=>{
      expect(res).toEqual(dummyUpdateImage);
    });
    const req=httpMock.expectOne(res=>res.method==='PATCH');
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyUpdateImage);
  })
  const dummyUpdateProducts={
    "_id": "64648db7cf9849ff1f3e4778",
    "_org": "6447662e49ce72c17a340ced",
    "name": "vivo",
    "description": "<p>good product</p>",
    "images": [
        {
            "public_id": "training-api/z2uukhjpo9akqnlyvwjj",
            "url": "http://res.cloudinary.com/abs-am/image/upload/v1685021342/training-api/z2uukhjpo9akqnlyvwjj.jpg"
        },
    ],
    "price": 129999,
    "deleted": false,
    "createdAt": "2023-05-17T08:17:59.158Z",
    "updatedAt": "2023-06-14T10:57:24.930Z"
  }
  it('should update products',()=>{
    const payload={
      name:'iphone',
      description:'good product',
      price:123223
    }
    service.updateProducts(payload,'sdfsdf').subscribe(res=>{
      expect(res).toEqual(dummyUpdateProducts);
    });
    const req=httpMock.expectOne(res=>res.method==='PATCH');
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyUpdateProducts);
  })
  const dummyDeleteProduct={
  }
  it('should delete product',()=>{
    service.deleteProduct('sdfsdf').subscribe(res=>{
      expect(res).toEqual(dummyDeleteProduct);
    });
    const req=httpMock.expectOne(res=>res.method==='DELETE');
    expect(req.request.method).toEqual('DELETE');
    req.flush(dummyDeleteProduct);
  })
  const dummyOrderList={
    "results": [
        {
            "address": {
                "street": "bhagwatipur",
                "addressLine2": "arwal",
                "city": "patna",
                "state": "bihar",
                "pin": "804419"
            },
            "_id": "647f2914ec6d46ce7b94d7c3",
            "items": [
                {
                    "productId": "64648db7cf9849ff1f3e4778",
                    "name": "vivo",
                    "price": 129999,
                    "qty": 1,
                    "subTotal": 129999,
                    "_id": "647f2914ec6d46ce7b94d7c2"
                }
            ],
            "deliveryFee": 40,
            "total": 129999,
            "paymentStatus": "Refunded",
            "status": "Cancelled",
            "sellerId": "6447662e49ce72c17a340ced",
            "transactionNo": "8W7H6NXA",
            "createdBy": "646df293ec6d46ce7b8f9e25",
            "deleted": false,
            "createdAt": "2023-06-06T12:39:48.823Z",
            "updatedAt": "2023-06-07T07:27:50.513Z",
            "__v": 0
        },
    ],
    "page": 1,
    "limit": 5,
    "totalPages": 3,
    "totalResults": 12
  }
  it('should order list',()=>{
    service.orderList({limit:1}).subscribe(res=>{
      expect(res).toEqual(dummyOrderList);
    });
    const req=httpMock.expectOne(res=>res.method==='GET');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyOrderList);
  });
  const dummyOrderDetails={
    "_id": "64648db7cf9849ff1f3e4778",
    "_org": "6447662e49ce72c17a340ced",
    "name": "vivo",
    "description": "<p>good product</p>",
    "images": [
        {
            "public_id": "training-api/z2uukhjpo9akqnlyvwjj",
            "url": "http://res.cloudinary.com/abs-am/image/upload/v1685021342/training-api/z2uukhjpo9akqnlyvwjj.jpg"
        },
    ],
    "price": 129999,
    "deleted": true,
    "createdAt": "2023-05-17T08:17:59.158Z",
    "updatedAt": "2023-06-14T11:07:43.846Z"
  }
  it('should order details',()=>{
    service.orderDetails('sdfssd').subscribe(res=>{
      expect(res).toEqual(dummyOrderDetails);
    });
    const req=httpMock.expectOne(res=>res.method==='GET');
    expect(req.request.method).toEqual('GET');
    req.flush(dummyOrderDetails);
  });
  const dummyOrderAction={
    "order": {
        "address": {
            "street": "bhagwatipur",
            "addressLine2": "arwal",
            "city": "patna",
            "state": "bihar",
            "pin": "804419"
        },
        "_id": "647f2f94ec6d46ce7b94eaa6",
        "items": [
            {
                "productId": "64671f09cf9849ff1f3f78d9",
                "name": "nokia",
                "price": 1200,
                "qty": 2,
                "subTotal": 2400,
                "_id": "647f2f94ec6d46ce7b94eaa1"
            },
        ],
        "deliveryFee": 40,
        "total": 182417,
        "paymentStatus": "Paid",
        "status": "Dispatched",
        "sellerId": "6447662e49ce72c17a340ced",
        "transactionNo": "KXGZ1HYB",
        "createdBy": "646df293ec6d46ce7b8f9e25",
        "deleted": false,
        "createdAt": "2023-06-06T13:07:32.048Z",
        "updatedAt": "2023-06-14T11:43:07.142Z",
        "__v": 0
    }
}
  it('should order Actions',()=>{
    service.orderActions('cancle','sdfsdfs').subscribe(res=>{
      expect(res).toEqual(dummyOrderAction);
    });
    const req=httpMock.expectOne(res=>res.method==='PATCH');
    expect(req.request.method).toEqual('PATCH');
    req.flush(dummyOrderAction);
  });





});


