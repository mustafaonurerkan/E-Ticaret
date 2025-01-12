const pool = require('../db');
const nodemailer = require('nodemailer');

const Product = {
    // Yeni �r�n ekleme
    create: async (product) => {
        const query = `
      INSERT INTO products (name, model, serial_number, description, quantity_in_stock, price, warranty_status, distributor_info, category_id, sizes, photo_url, popularity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
        const values = [
            product.name,
            product.model,
            product.serial_number,
            product.description,
            product.quantity_in_stock,
            product.price,
            product.warranty_status,
            product.distributor_info,
            product.category_id,
            product.sizes,
            product.photo_url,
            product.popularity
        ];
        const [result] = await pool.execute(query, values);
        return result.insertId;
    },

    // T�m �r�nleri listeleme
    getAll: async () => {
        const query = 'SELECT * FROM products;';
        const [rows] = await pool.execute(query);
        return rows;
    },
    
    // Belirli bir �r�n� ID�ye g�re bulma
    getById: async (product_id) => {
        const query = 'SELECT * FROM products WHERE product_id = ?;';
        const [rows] = await pool.execute(query, [product_id]);
        return rows[0];
    },

    // �r�n g�ncelleme
    update: async (product_id, product) => {
        const query = `
      UPDATE products
      SET name = ?, model = ?, serial_number = ?, description = ?, quantity_in_stock = ?, price = ?, warranty_status = ?, distributor_info = ?, category_id = ?, sizes = ?, photo_url = ?, popularity = ?
      WHERE product_id = ?;
    `;
        const values = [
            product.name,
            product.model,
            product.serial_number,
            product.description,
            product.quantity_in_stock,
            product.price,
            product.warranty_status,
            product.distributor_info,
            product.category_id,
            product.sizes,
            product.photo_url,
            product.popularity,
            product_id,
        ];
        const [result] = await pool.execute(query, values);
        return result.affectedRows > 0;
    },

    // �r�n silme
    delete: async (product_id) => {
        const query = 'DELETE FROM products WHERE product_id = ?;';
        const [result] = await pool.execute(query, [product_id]);
        return result.affectedRows > 0;
    },

    // Belirli bir kategoriye g�re t�m �r�nler
    getByCategory: async (categoryId) => {
        const query = `
            SELECT p.product_id, p.name, p.price, p.description, p.photo_url, p.popularity
            FROM products p
            JOIN categories c ON p.category_id = c.category_id
            WHERE c.category_id = ?;
        `;
        const [rows] = await pool.execute(query, [categoryId]);
        return rows;
    },

    incrementPopularity: async (id) => {
        const [result] = await pool.execute( // `db.query` yerine `pool.execute` kullanmal�s�n�z.
            'UPDATE products SET popularity = popularity + 0.5 WHERE product_id = ?',
            [id]
        );
        return result.affectedRows > 0;
    },

    searchByKey: async (key) => {
        const query = `
            SELECT product_id, name
            FROM products
            WHERE name LIKE ? OR description LIKE ?
            LIMIT 5; -- Sadece ilk 5 ürünü getir
        `;
        const searchKey = `%${key}%`; // Anahtar kelimeyi içeren ürünleri arar
        const [rows] = await pool.execute(query, [searchKey, searchKey]);
        return rows;
    },

    updateStock: async (product_id, quantity_in_stock) => {
        const query = `
            UPDATE products
            SET quantity_in_stock = ?
            WHERE product_id = ?;
        `;
        try {
            const [result] = await pool.execute(query, [quantity_in_stock, product_id]);
            return result.affectedRows > 0; // Başarılı güncelleme için true döner
        } catch (error) {
            throw new Error(error.message);
        }
    },


    applyDiscount: async (product_id, discount) => {
        console.log('Discount Rate:', discount.discountRate);
        console.log('Product ID:', discount.product_id);

        const query = `
        UPDATE products
        SET price = realprice * (1 - ? / 100)
        WHERE product_id = ?;
    `;

        try {
            // İndirimi ürün üzerinde uygula
            const [result] = await pool.execute(query, [discount.discountRate, discount.product_id]);

            if (result.affectedRows > 0) {
                // İndirimi uygulanan ürünü getir
                const updatedProductQuery = `
                SELECT product_id, name, price
                FROM products
                WHERE product_id = ?;
            `;
                const [updatedProduct] = await pool.execute(updatedProductQuery, [discount.product_id]);

                // Kullanıcıların e-posta adreslerini al
                const wishlistQuery = `
                SELECT DISTINCT u.email
                FROM users u
                JOIN wishlists w ON u.user_id = w.user_id
                WHERE w.product_id = ?;
            `;
                const [emails] = await pool.execute(wishlistQuery, [discount.product_id]);

                // E-posta gönderimi
                if (emails.length > 0) {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'team10proje@gmail.com', // Gmail kullanıcı adı
                            pass: 'hbzx nasf rhgt nzkt', // Gmail şifre
                        },
                    });

                    for (const email of emails) {
                        const mailOptions = {
                            from: 'team10proje@gmail.com',
                            to: email.email, // email.email
                            subject: 'Discount Alert!',
                            text: `Great news! A discount of ${discount.discountRate}% has been applied to a product in your wishlist. Check it out now!`,
                        };

                        await transporter.sendMail(mailOptions);
                        console.log(`Email sent to: ${email.email}`);
                    }
                }

                return updatedProduct[0]; // Güncellenen ürünün bilgileri
            } else {
                throw new Error('Product not found or discount could not be applied');
            }
        } catch (error) {
            console.error('Error in applyDiscount:', error.message);
            throw new Error(error.message);
        }
    },



    applyRaise: async (product_id, raise) => {
        console.log('Raise Rate:', raise.raiseRate);
        console.log('Product ID:', raise.product_id);

        const query = `
        UPDATE products
        SET price = realprice * (1 + ? / 100)
        WHERE product_id = ?;
    `;

        try {
            // İndirimi ürün üzerinde uygula
            const [result] = await pool.execute(query, [raise.raiseRate, raise.product_id]);

            return result.affectedRows > 0;

        } catch (error) {
            console.error('Error in applyRaise:', error.message);
            throw new Error(error.message);
        }
    },


    
    

};

module.exports = Product;