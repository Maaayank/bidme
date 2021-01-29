import { Injectable } from '@angular/core';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private _username = new BehaviorSubject<String>("");
    username = this._username.asObservable();

    private _wallet = new BehaviorSubject<String>("0")
    wallet = this._wallet.asObservable();

    private _isLoggedIn = new BehaviorSubject<Boolean>(false)
    isLoggedIn = this._isLoggedIn.asObservable();

    private _products = [
        {
            productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
            manufacturer: "X Rocker ",
            price: 108,
            productHighlights: [
                "Dimensions: 27.36L x 22.44W x 19.69H in",
                "Long-lasting plastic frame",
                "Breathable black fabric",
                "Swivel and rocker pedestal base",
                "Bluetooth speakers and subwoofer"
            ],
            productDetails: [
                {
                    "name": "Brand",
                    "value": "X Rocker"
                },
                {
                    "name": "Age Group",
                    "value": "Adult Teen Child"
                },
                {
                    "name": "Features",
                    "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ]
        },
        {
            productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
            manufacturer: "X Rocker ",
            price: 108,
            productHighlights: [
                "Dimensions: 27.36L x 22.44W x 19.69H in",
                "Long-lasting plastic frame",
                "Breathable black fabric",
                "Swivel and rocker pedestal base",
                "Bluetooth speakers and subwoofer"
            ],
            productDetails: [
                {
                    "name": "Brand",
                    "value": "X Rocker"
                },
                {
                    "name": "Age Group",
                    "value": "Adult Teen Child"
                },
                {
                    "name": "Features",
                    "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ]
        },
        {
            productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
            manufacturer: "X Rocker ",
            price: 108,
            productHighlights: [
                "Dimensions: 27.36L x 22.44W x 19.69H in",
                "Long-lasting plastic frame",
                "Breathable black fabric",
                "Swivel and rocker pedestal base",
                "Bluetooth speakers and subwoofer"
            ],
            productDetails: [
                {
                    "name": "Brand",
                    "value": "X Rocker"
                },
                {
                    "name": "Age Group",
                    "value": "Adult Teen Child"
                },
                {
                    "name": "Features",
                    "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ]
        },
        {
            productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
            manufacturer: "X Rocker ",
            price: 108,
            productHighlights: [
                "Dimensions: 27.36L x 22.44W x 19.69H in",
                "Long-lasting plastic frame",
                "Breathable black fabric",
                "Swivel and rocker pedestal base",
                "Bluetooth speakers and subwoofer"
            ],
            productDetails: [
                {
                    "name": "Brand",
                    "value": "X Rocker"
                },
                {
                    "name": "Age Group",
                    "value": "Adult Teen Child"
                },
                {
                    "name": "Features",
                    "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ]
        },
        {
            productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
            manufacturer: "X Rocker ",
            price: 108,
            productHighlights: [
                "Dimensions: 27.36L x 22.44W x 19.69H in",
                "Long-lasting plastic frame",
                "Breathable black fabric",
                "Swivel and rocker pedestal base",
                "Bluetooth speakers and subwoofer"
            ],
            productDetails: [
                {
                    "name": "Brand",
                    "value": "X Rocker"
                },
                {
                    "name": "Age Group",
                    "value": "Adult Teen Child"
                },
                {
                    "name": "Features",
                    "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ]
        },
        {
            productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
            manufacturer: "X Rocker ",
            price: 108,
            productHighlights: [
                "Dimensions: 27.36L x 22.44W x 19.69H in",
                "Long-lasting plastic frame",
                "Breathable black fabric",
                "Swivel and rocker pedestal base",
                "Bluetooth speakers and subwoofer"
            ],
            productDetails: [
                {
                    "name": "Brand",
                    "value": "X Rocker"
                },
                {
                    "name": "Age Group",
                    "value": "Adult Teen Child"
                },
                {
                    "name": "Features",
                    "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ]
        },
        {
            productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
            manufacturer: "X Rocker ",
            price: 108,
            productHighlights: [
                "Dimensions: 27.36L x 22.44W x 19.69H in",
                "Long-lasting plastic frame",
                "Breathable black fabric",
                "Swivel and rocker pedestal base",
                "Bluetooth speakers and subwoofer"
            ],
            productDetails: [
                {
                    "name": "Brand",
                    "value": "X Rocker"
                },
                {
                    "name": "Age Group",
                    "value": "Adult Teen Child"
                },
                {
                    "name": "Features",
                    "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ]
        },
        {
            productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
            manufacturer: "X Rocker ",
            price: 108,
            productHighlights: [
                "Dimensions: 27.36L x 22.44W x 19.69H in",
                "Long-lasting plastic frame",
                "Breathable black fabric",
                "Swivel and rocker pedestal base",
                "Bluetooth speakers and subwoofer"
            ],
            productDetails: [
                {
                    "name": "Brand",
                    "value": "X Rocker"
                },
                {
                    "name": "Age Group",
                    "value": "Adult Teen Child"
                },
                {
                    "name": "Features",
                    "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ]
        },
        {
            productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
            manufacturer: "X Rocker ",
            price: 108,
            productHighlights: [
                "Dimensions: 27.36L x 22.44W x 19.69H in",
                "Long-lasting plastic frame",
                "Breathable black fabric",
                "Swivel and rocker pedestal base",
                "Bluetooth speakers and subwoofer"
            ],
            productDetails: [
                {
                    "name": "Brand",
                    "value": "X Rocker"
                },
                {
                    "name": "Age Group",
                    "value": "Adult Teen Child"
                },
                {
                    "name": "Features",
                    "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ]
        },
        {
            productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
            manufacturer: "X Rocker ",
            price: 108,
            productHighlights: [
                "Dimensions: 27.36L x 22.44W x 19.69H in",
                "Long-lasting plastic frame",
                "Breathable black fabric",
                "Swivel and rocker pedestal base",
                "Bluetooth speakers and subwoofer"
            ],
            productDetails: [
                {
                    "name": "Brand",
                    "value": "X Rocker"
                },
                {
                    "name": "Age Group",
                    "value": "Adult Teen Child"
                },
                {
                    "name": "Features",
                    "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
                },
                {
                    "name": "Color",
                    "value": "Black"
                }
            ]
        }
    ]

    private _data = {
        productTitle: "X Rocker X-Pro 300 Black Pedestal Gaming Chair Rocker with Built-in Speakers",
        manufacturer: "X Rocker ",
        price: 108,
        productHighlights: [
            "Dimensions: 27.36L x 22.44W x 19.69H in",
            "Long-lasting plastic frame",
            "Breathable black fabric",
            "Swivel and rocker pedestal base",
            "Bluetooth speakers and subwoofer"
        ],
        productDetails: [
            {
                "name": "Brand",
                "value": "X Rocker"
            },
            {
                "name": "Age Group",
                "value": "Adult Teen Child"
            },
            {
                "name": "Features",
                "value": "2 speakers for total immersion surround sound Powerful subwoofer Built-in Bluetooth"
            },
            {
                "name": "Color",
                "value": "Black"
            }
        ]
    }

    constructor() {
    }

    changeUsername(username: String) {
        this._username.next(username)
    }

    changeWallet(wallet: String) {
        this._wallet.next(wallet)
    }

    toggleIsLoggedIn(isLoggedIn: Boolean) {
        this._isLoggedIn.next(isLoggedIn)
    }

    getData(){
        return this._data;
    }

    getProducts(){
        return this._products;
    }
}