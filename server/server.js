import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());  // เพื่อให้สามารถรับข้อมูลจาก body ได้

// เชื่อมต่อ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Yeahh! MongoDB connected"))
  .catch((msg) => console.error(msg));

// สร้าง Schema และ Model สำหรับสินค้า
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
});
const Product = mongoose.model("Product", productSchema);

// หน้าแรก
app.get("/", async (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="th">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>หน้าแรก</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background-color: #f3f3f3;
                }
                h1 {
                    color: #ff4081;
                }
                a {
                    text-decoration: none;
                    color: #007bff;
                    font-weight: bold;
                }
                a:hover {
                    color: #0056b3;
                }
            </style>
        </head>
        <body>
            <h1>ยินดีต้อนรับสู่เว็บไซต์ของเรา!</h1>
            <p>คุณสามารถดูรายการสินค้า <a href="/products">ที่นี่</a></p>
        </body>
        </html>
    `);
});

// หน้าแสดงรายการสินค้า
app.get("/products", async (req, res) => {
    const products = await Product.find();  // ดึงข้อมูลสินค้าทั้งหมดจากฐานข้อมูล
    res.json(products);  // ส่งข้อมูลสินค้าในรูปแบบ JSON
});

// เพิ่มสินค้าใหม่ (ใช้ POST แทน GET เนื่องจากต้องส่งข้อมูลใน body)
app.post("/product", async (req, res) => {
    const { name, price } = req.body;
    const newProduct = new Product({ name, price });
    await newProduct.save();  // บันทึกสินค้าลงฐานข้อมูล
    res.status(201).json(newProduct);  // ส่งสินค้าใหม่กลับ
});

// กำหนดพอร์ต
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
