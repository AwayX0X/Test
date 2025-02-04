// config.js
const CONFIG = {
    webhookURL: "https://discord.com/api/webhooks/1336359040279642155/6UmXrbgYbpckblVHNHBWQc4BqoO77x92gDlqwfYp1o-c2Km9N_7WvTZpvxa0jFNBmMbx",

    // โลโก้ของบอท & Embed
    botAvatar: "https://i.imgur.com/hPKDRdO.png",
    embedThumbnail: "https://i.imgur.com/hPKDRdO.png",

    // Role IDs (เปลี่ยนเป็น Role ID จริงของเซิร์ฟเวอร์)
    roles: [
        { id: "1336362254311886970", name: "@ADMIN " }
        //{ id: "987654321098765432", name: "@Moderator" },
        //{ id: "543210987654321098", name: "@Member" }
    ]
};

const products = {
    "mountain-bikes": [
        { 
            name: "จักรยานเสือภูเขา รุ่น X", 
            price: 5500, 
            description: "จักรยานเสือภูเขาสำหรับผู้ที่ชื่นชอบการผจญภัย โครงสร้างแข็งแรง พร้อมโช๊คอัพที่ช่วยลดแรงกระแทก",
            colors: ["แดง", "น้ำเงิน", "ดำ"], 
            colorImages: {
                "แดง": "https://cdn.discordapp.com/attachments/1334512680009994301/1335978935351119892/0547d6e0-3bc5-438b-8672-c33c465b548c_3.png?ex=67a2cb97&is=67a17a17&hm=24c05fb85e3f3c8bcd83c77e9a20ec09253beb7859fc9317beb3def580e6fe04&",
                "น้ำเงิน": "https://cdn.discordapp.com/attachments/1334512680009994301/1335978934499672178/0547d6e0-3bc5-438b-8672-c33c465b548c_1.png?ex=67a2cb97&is=67a17a17&hm=45eaea8674722a46454907d0fae74308543bd6d9f9a91781a068178188c0cab3&",
                "ดำ": "https://cdn.example.com/mountain-black.jpg"
            },
            images: [
                "https://cdn.discordapp.com/attachments/1334512680009994301/1335978934499672178/0547d6e0-3bc5-438b-8672-c33c465b548c_1.png?ex=67a2cb97&is=67a17a17&hm=45eaea8674722a46454907d0fae74308543bd6d9f9a91781a068178188c0cab3&",
                "https://cdn.discordapp.com/attachments/1334512680009994301/1335978934499672178/0547d6e0-3bc5-438b-8672-c33c465b548c_1.png?ex=67a2cb97&is=67a17a17&hm=45eaea8674722a46454907d0fae74308543bd6d9f9a91781a068178188c0cab3&"
            ],
            imageDescriptions: [
                "จักรยานเสือภูเขาสีแดงด้านข้าง",
                "จักรยานสีแดงพร้อมโช๊คอัพพิเศษ"
            ],
            alt: "จักรยานเสือภูเขา"
        },
        { 
            name: "จักรยานเสือภูเขา รุ่น X", 
            price: 5500, 
            description: "จักรยานเสือภูเขาสำหรับผู้ที่ชื่นชอบการผจญภัย โครงสร้างแข็งแรง พร้อมโช๊คอัพที่ช่วยลดแรงกระแทก",
            colors: ["แดง", "น้ำเงิน", "ดำ"], 
            colorImages: {
                "แดง": "https://cdn.discordapp.com/attachments/1334512680009994301/1335978935351119892/0547d6e0-3bc5-438b-8672-c33c465b548c_3.png?ex=67a2cb97&is=67a17a17&hm=24c05fb85e3f3c8bcd83c77e9a20ec09253beb7859fc9317beb3def580e6fe04&",
                "น้ำเงิน": "https://cdn.discordapp.com/attachments/1334512680009994301/1335978934499672178/0547d6e0-3bc5-438b-8672-c33c465b548c_1.png?ex=67a2cb97&is=67a17a17&hm=45eaea8674722a46454907d0fae74308543bd6d9f9a91781a068178188c0cab3&",
                "ดำ": "https://cdn.example.com/mountain-black.jpg"
            },
            images: [
                "https://cdn.discordapp.com/attachments/1334512680009994301/1335978934499672178/0547d6e0-3bc5-438b-8672-c33c465b548c_1.png?ex=67a2cb97&is=67a17a17&hm=45eaea8674722a46454907d0fae74308543bd6d9f9a91781a068178188c0cab3&",
                "https://cdn.discordapp.com/attachments/1334512680009994301/1335978934499672178/0547d6e0-3bc5-438b-8672-c33c465b548c_1.png?ex=67a2cb97&is=67a17a17&hm=45eaea8674722a46454907d0fae74308543bd6d9f9a91781a068178188c0cab3&"
            ],
            imageDescriptions: [
                "จักรยานเสือภูเขาสีแดงด้านข้าง",
                "จักรยานสีแดงพร้อมโช๊คอัพพิเศษ"
            ],
            alt: "จักรยานเสือภูเขา"
        },
		
    ],
    "road-bikes": [
        { 
            name: "จักรยานเสือหมอบ รุ่น X", 
            price: 7500, 
            description: "จักรยานเสือหมอบสำหรับนักปั่นที่ต้องการความเร็ว โครงสร้างเบาพิเศษ",
            colors: ["ขาว", "ดำ", "น้ำเงิน"], 
            colorImages: {
                "ขาว": "https://cdn.example.com/road-white.jpg",
                "ดำ": "https://cdn.example.com/road-black.jpg",
                "น้ำเงิน": "https://cdn.example.com/road-blue.jpg"
            },
            images: [
                "https://cdn.example.com/road-white1.jpg",
                "https://cdn.example.com/road-white2.jpg"
            ],
            imageDescriptions: [
                "จักรยานเสือหมอบสีขาวด้านข้าง",
                "จักรยานเสือหมอบดีไซน์ลู่ลม"
            ],
            alt: "จักรยานเสือหมอบ"
        }
    ],
    "electric-bikes": [
        { 
            name: "จักรยานไฟฟ้า รุ่น X", 
            price: 15000, 
            description: "จักรยานไฟฟ้าอัจฉริยะ ระบบช่วยปั่น แบตเตอรี่ลิเธียม 48V",
            colors: ["เขียว", "ดำ", "เทา"], 
            colorImages: {
                "เขียว": "https://cdn.example.com/electric-green.jpg",
                "ดำ": "https://cdn.example.com/electric-black.jpg",
                "เทา": "https://cdn.example.com/electric-gray.jpg"
            },
            images: [
                "https://cdn.example.com/electric-green1.jpg",
                "https://cdn.example.com/electric-green2.jpg"
            ],
            imageDescriptions: [
                "จักรยานไฟฟ้าสีเขียวขับขี่สบาย",
                "จักรยานไฟฟ้าพร้อมแบตเตอรี่ทนทาน"
            ],
            alt: "จักรยานไฟฟ้า"
        }
    ]
};
