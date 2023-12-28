const pets = [
  {
    sku: "PET-SPPW00",
    name: "Phóc trắng đáng yêu",
    stock_quantity: 50,
    price: 1000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_1%2Fphoc-trang-1.jpeg?alt=media&token=7e8376e4-4713-424a-9fed-9269a4e9ecb7",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_1%2Fphoc-trang-2.jpeg?alt=media&token=a834c580-571a-4711-9587-0f90c7d1c66a",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_1%2Fphoc-trang-3.jpeg?alt=media&token=7dcfce2c-2b52-4d5f-8700-bad487bf331e",
    ],
    age: 5,
    isMale: true,
    color: "White",
    weight: 10,
    height: 10,
    birthday: new Date().toISOString(),
    origin: "",
    description: "Adorable and nice looking pet",
    type_id: 3,
  },
  {
    sku: "PET-SPCY00",
    name: "Corgi vàng lùn xinh",
    stock_quantity: 50,
    price: 1000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_2%2Fcorgi-vang-1.jpeg?alt=media&token=5b84efa5-0aca-4b66-94e4-bd26fb3a36c8",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_2%2Fcorgi-vang-2.jpeg?alt=media&token=4ed96d8a-c159-4cd0-b6d2-b15c15565372",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_2%2Fcorgi-vang-3.jpeg?alt=media&token=14f76e74-39e8-4acf-8ca2-6efb86ff1841",
    ],
    age: 5,
    isMale: true,
    color: "Yellow",
    weight: 10,
    height: 10,
    birthday: new Date().toISOString(),
    origin: "",
    description: "Adorable and nice looking pet",
    type_id: 3,
  },
  {
    sku: "PET-SPPY00",
    name: "Poodle vàng mơ xinh",
    stock_quantity: 50,
    price: 1000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_3%2Fpuddle-vang-1.jpeg?alt=media&token=80d97d52-3c15-4c18-9475-b996dd5f407f",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_3%2Fpuddle-vang-2.jpeg?alt=media&token=c1e19972-d2dc-43fc-983f-d8e4d7a3b03d  ",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_3%2Fpuddle-vang-3.jpeg?alt=media&token=9a78cae3-9c64-4a9d-8eb7-84337ffacacd",
    ],
    age: 5,
    isMale: true,
    color: "Yellow",
    weight: 10,
    height: 10,
    birthday: new Date().toISOString(),
    origin: "",
    description: "Adorable and nice looking pet",
    type_id: 3,
  },
  {
    sku: "PET-SPCB00",
    name: "Corgi quấn tai nâu",
    stock_quantity: 50,
    price: 1000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_4%2Fcorgi-quan-tai-nau-1.jpeg?alt=media&token=0cfe654a-9d93-4368-8457-7437d134a7e1",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_4%2Fcorgi-quan-tai-nau-2.jpeg?alt=media&token=2b3ba882-8d74-4ccf-a215-9dedecbd87d5",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_4%2Fcorgi-quan-tai-nau-3.jpeg?alt=media&token=38665415-ddb1-42ea-abca-ce15f8c4447e",
    ],
    age: 5,
    isMale: true,
    color: "Brown",
    weight: 10,
    height: 10,
    birthday: new Date().toISOString(),
    origin: "",
    description: "Adorable and nice looking pet",
    type_id: 3,
  },
  {
    sku: "PET-SPAB00",
    name: "Alaska nâu",
    stock_quantity: 50,
    price: 1000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_5%2Falaska-nau-1.jpeg?alt=media&token=13d18916-1eb8-4247-a7b8-1250aac556f5",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_5%2Falaska-nau-2.jpeg?alt=media&token=767fb3d9-0edf-4678-baf9-dda64bdc87b0",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_5%2Falaska-nau-3.jpeg?alt=media&token=aaf134cd-befd-469d-a06a-98e2cf1713fc",
    ],
    age: 5,
    isMale: false,
    color: "Brown",
    weight: 10,
    height: 10,
    birthday: new Date().toISOString(),
    origin: "",
    description: "Adorable and nice looking pet",
    type_id: 3,
  },
  {
    sku: "PET-SPMG00",
    name: "Mèo xám chân ngắn tai cụp siêu yêu",
    stock_quantity: 50,
    price: 1000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_6%2Fmeo-chan-ngan-xam-1.jpeg?alt=media&token=46a6bf64-358f-4b1c-a6f3-33bc57749924",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_6%2Fmeo-chan-ngan-xam-2.jpeg?alt=media&token=52e43e2d-d546-4a23-87c5-b60bc9ec12eb",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_6%2Fmeo-chan-ngan-xam-3.jpeg?alt=media&token=808a1f62-56f4-40fb-a1e2-6483c3e4d352",
    ],
    age: 5,
    isMale: false,
    color: "Gray",
    weight: 10,
    height: 10,
    birthday: new Date().toISOString(),
    origin: "",
    description: "Adorable and nice looking pet",
    type_id: 4,
  },
  {
    sku: "PET-SPMG01",
    name: "Mèo chân ngắn tai cụp",
    stock_quantity: 50,
    price: 1000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_7%2Fmeo-chan-ngan-tai-cup-xam-1.jpeg?alt=media&token=bb7993a1-fe62-40cb-be38-ab0b7875ae5c",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_7%2Fmeo-chan-ngan-tai-cup-xam-2.jpeg?alt=media&token=afcfaea5-a8b2-4222-a282-7ee3305bbeca",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_7%2Fmeo-chan-ngan-tai-cup-xam-3.jpeg?alt=media&token=1335b9f3-af34-414f-abba-7c463b1b9075",
    ],
    age: 5,
    isMale: true,
    color: "Gray",
    weight: 10,
    height: 10,
    birthday: new Date().toISOString(),
    origin: "",
    description: "Adorable and nice looking pet",
    type_id: 4,
  },
  {
    sku: "PET-SPMB00",
    name: "Mèo xám chân lùn tai cụp cute",
    stock_quantity: 50,
    price: 1000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_8%2Fmeo-chan-ngan-den-1.jpeg?alt=media&token=5c645546-5489-40fe-b905-c79a63399a18",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_8%2Fmeo-chan-ngan-den-2.jpeg?alt=media&token=c80b425e-b761-4a3e-aef9-57a0b373bc60",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_8%2Fmeo-chan-ngan-den-3.jpeg?alt=media&token=3420256d-8ff1-46bd-afcd-a30117a8d71c",
    ],
    age: 5,
    isMale: true,
    color: "Black",
    weight: 10,
    height: 10,
    birthday: new Date().toISOString(),
    origin: "",
    description: "Adorable and nice looking pet",
    type_id: 4,
  },
  {
    sku: "PET-SPMLDB00",
    name: "Mèo lông dài bicolor",
    stock_quantity: 50,
    price: 1000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_9%2Fmeo-long-dai-bicolor-1.jpeg?alt=media&token=1f40f921-c054-43a2-9b72-6665ffa9d3f3",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_9%2Fmeo-long-dai-bicolor-2.jpeg?alt=media&token=c29e340e-113c-42bc-a0b5-d2373fcf3478",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_9%2Fmeo-long-dai-bicolor-3.jpeg?alt=media&token=2dd4d239-3101-48f8-8f1d-f7d8cb94b43a",
    ],
    age: 5,
    isMale: false,
    color: "BiColor",
    weight: 10,
    height: 10,
    birthday: new Date().toISOString(),
    origin: "",
    description: "Adorable and nice looking pet",
    type_id: 4,
  },
  {
    sku: "PET-SPCL00",
    name: "Vẹt Cockatiel Lutino",
    stock_quantity: 50,
    price: 1000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_10%2Fvet-cockatiel-lutino-1.jpeg?alt=media&token=ebb92016-effd-4c77-94cd-7f30b87a66e4",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/pet%2Fpet_10%2Fvet-cockatiel-lutino-2.jpeg?alt=media&token=30b0d7cd-83c6-420a-8cab-a28fda6305fb",
    ],
    age: 5,
    isMale: false,
    color: "Yellow",
    weight: 10,
    height: 10,
    birthday: new Date().toISOString(),
    origin: "",
    description: "Adorable and nice looking pet",
    type_id: 4,
  },
];

const accessories = [
  {
    // id: "",
    sku: "ACC-BXG01",
    name: "Bóng xương gai",
    stock_quantity: 10,
    price: 19000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_6%2Fbong-gai-do-choi-1.jpeg?alt=media&token=ca389cde-d188-4706-a100-0237fb70fb25",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_6%2Fbong-gai-do-choi-1.jpeg?alt=media&token=ca389cde-d188-4706-a100-0237fb70fb25",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_6%2Fbong-gai-do-choi-1.jpeg?alt=media&token=ca389cde-d188-4706-a100-0237fb70fb25",
    ],
    origin: "Viet Nam",
    description: "Size nhỏ",
    weight: 10,
    type_id: 2,
  },
  {
    // id: "",
    sku: "ACC-XVS01",
    name: "Xịt vệ sinh đúng chỗ",
    stock_quantity: 99,
    price: 55000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_1%2Fxit-ve-sinh-1.jpeg?alt=media&token=c215ffee-71e7-4698-b614-1bbbbd70607b",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_1%2Fxit-ve-sinh-1.jpeg?alt=media&token=c215ffee-71e7-4698-b614-1bbbbd70607b",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_1%2Fxit-ve-sinh-2.jpeg?alt=media&token=ddeee74f-7b5b-4e80-a850-bccc83ef1b9d",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_1%2Fxit-ve-sinh-3.jpeg?alt=media&token=b70b943f-2841-4e1a-9453-6460dd9d9872",
    ],
    origin: "Mỹ",
    description: "xịt vệ sinh cho thú cưng",
    weight: 50,
    type_id: 3,
  },
  {
    // id: "",
    sku: "ACC-NCCM01",
    name: "Nhà cho chó mèo",
    stock_quantity: 14,
    price: 1200000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_4%2Fnha-cho-cho-1.jpg?alt=media&token=e21584e7-844e-4f17-b045-924d64d4db32",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_4%2Fnha-cho-cho-1.jpg?alt=media&token=e21584e7-844e-4f17-b045-924d64d4db32",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_4%2Fnha-cho-cho-2.jpg?alt=media&token=12b87e9d-8e7c-4586-82c6-645d9650e470",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_4%2Fnha-cho-cho-3.jpg?alt=media&token=2dd56ba3-5d5d-4d42-bdf5-a5ba253fb2bd",
    ],
    origin: "Việt Nam",
    description: "Size vừa ( size M )",
    weight: 2500,
    type_id: 5,
  },
  {
    // id: "",
    sku: "ACC-VCN01",
    name: "Vòng cổ nơ kèm chuông",
    stock_quantity: 777,
    price: 60000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_3%2Fvong-co-no-1.jpeg?alt=media&token=5d89ebe2-22a8-4137-baf8-d43faf4dec74",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_3%2Fvong-co-no-1.jpeg?alt=media&token=5d89ebe2-22a8-4137-baf8-d43faf4dec74",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_3%2Fvong-co-no-2.jpeg?alt=media&token=bb036adf-6c23-40be-9765-8d7f88033054",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_3%2Fvong-co-no-3.jpeg?alt=media&token=190ebd75-d600-4df0-bb86-240d3cc71461",
    ],
    origin: "Trung Quốc",
    description: "Size vừa (size M)",
    weight: 10,
    type_id: 4,
  },
  {
    // id: "",
    sku: "ACC-AHTM01",
    name: "Áo hoạ tiết mới cho chó mèo",
    stock_quantity: 9999,
    price: 32000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_5%2Fao-hoa-tiet-moi-1.jpg?alt=media&token=1083ab1c-cf6f-4f26-807c-4fa8dfed2366",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_5%2Fao-hoa-tiet-moi-1.jpg?alt=media&token=1083ab1c-cf6f-4f26-807c-4fa8dfed2366",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_5%2Fao-hoa-tiet-moi-2.jpg?alt=media&token=23f529c6-11e3-4e85-8864-bc044633416b",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_5%2Fao-hoa-tiet-moi-3.jpg?alt=media&token=fc356b96-8fbe-4754-ae86-0f5425865194",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_5%2Fao-hoa-tiet-moi-4.jpg?alt=media&token=2ce0c0b4-0fce-4c8e-889c-9c24fb068309",
    ],
    origin: "Việt Nam",
    description: "Free size",
    weight: 10,
    type_id: 4,
  },
  {
    // id: "",
    sku: "ACC-TVC01",
    name: "Túi bộ",
    stock_quantity: 70,
    price: 250000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_7%2Ftui-bo-1.jpeg?alt=media&token=7be3f69f-7c68-4703-a73e-bdee4c7db6ca",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_7%2Ftui-bo-1.jpeg?alt=media&token=7be3f69f-7c68-4703-a73e-bdee4c7db6ca",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_7%2Ftui-bo-2.jpg?alt=media&token=d3663311-dea0-45a5-8581-836ff7ddbe10",
    ],
    origin: "Việt Nam",
    description: "Free size",
    weight: 10,
    type_id: 4,
  },
  {
    // id: "",
    sku: "ACC-STSOS01",
    name: "Sữa Tắm SOS",
    stock_quantity: 100,
    price: 150000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_8%2Fsua-tam-sos-1.jpeg?alt=media&token=cd3db63d-4a40-48fd-9786-d49586b5e9ce",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_8%2Fsua-tam-sos-1.jpeg?alt=media&token=cd3db63d-4a40-48fd-9786-d49586b5e9ce",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_8%2Fsua-tam-sos-2.jpg?alt=media&token=3d860aa4-0eac-4017-bd4a-b70837853960",
    ],
    origin: "Anh",
    description: "Sữa tắm cho thú cưng",
    weight: 450,
    type_id: 3,
  },
  {
    // id: "",
    sku: "ACC-TACC01",
    name: "Ganador puppy",
    stock_quantity: 100,
    price: 280000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_9%2Fthuc-an-cho-cho-1.jpeg?alt=media&token=cdc56423-a939-4699-8e00-066869049d9b",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_9%2Fthuc-an-cho-cho-1.jpeg?alt=media&token=cdc56423-a939-4699-8e00-066869049d9b",
    ],
    origin: "Pháp",
    description: "Thức ăn có vị sữa và DHA",
    weight: 3000,
    type_id: 6,
  },
  {
    // id: "",
    sku: "ACC-LCTC01",
    name: "Lều hoạ tiết thú cưng xinh xắn",
    stock_quantity: 45,
    price: 400000,
    thumbnail_image:
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_10%2Fleu-tuan-loc-1.jpg?alt=media&token=79617262-100b-42a3-a7a4-071cf4325a36",
    description_images: [
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_10%2Fleu-tuan-loc-2.jpg?alt=media&token=db47109b-3292-4297-85bc-565f975d6303",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_10%2Fleu-tuan-loc-3.jpg?alt=media&token=64079236-2525-471f-a1fe-a9658a3124d6",
      "https://firebasestorage.googleapis.com/v0/b/pet-shop-monito.appspot.com/o/accessory%2Faccessory_10%2Fleu-tuan-loc-4.jpg?alt=media&token=fe58d6a2-0b25-4ac1-9115-6c3e04e60c8d",
    ],
    origin: "Việt Nam",
    description: "Size vừa (size M)",
    weight: 800,
    type_id: 5,
  },
];

const petTypes = [
  // id:1
  {
    name: "pet",
    parent_id: null,
  },
  // id:2
  {
    name: "dog",
    parent_id: 1,
  },
  // id:3
  {
    name: "cat",
    parent_id: 1,
  },
  // id:4
  {
    name: "bird",
    parent_id: 1,
  },
];

const accessoryTypes = [
  {
    name: "accessory",
    parent_id: null,
  },
  {
    name: "toy",
    parent_id: 1,
  },
  {
    name: "liquid",
    parent_id: 1,
  },
  {
    name: "cloth",
    parent_id: 1,
  },
  {
    name: "cage",
    parent_id: 1,
  },
  {
    name: "food",
    parent_id: 1,
  },
];

export { pets, accessories, petTypes, accessoryTypes };
