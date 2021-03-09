export interface Product {
    pid: Number,
    productTitle: String;
    productHiglight: String[];
    productFeatures: JSON[];
    auctionAmount: Number;
    price: String;
    manufacturer: String;
    productDescription: String;
    images: String[];
    productImages: Image[]
    image: String;
    pickup_address: Address;
    startsAt: Number;
    endsAt: Number;
    prevBid: number
}

export interface Details {
    auctionAmount: Number;
    startsAt: Date;
    endsAt: Date;
    title: String;
}

export interface Image {
    url: String,
    path: String
}

export interface Address {
    lat: Number,
    lon: Number
}

export interface Bid {
    username: String,
    timestamp: Number,
    bid: Number
}