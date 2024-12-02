const express = require('express');
const router = express.Router();
// Ana sayfa için route
router.get('/', (req, res) => {
    const asciiArt = "                  _..__\r\n                .\' I   \'.\r\n                |.-\"\"\"-.|\r\n               _;.-\"\"\"-.;_\r\n           _.-\' _..-.-.._ \'-._\r\n          \';--.-(_o_I_o_)-.--;\'\r\n           `. | |  | |  | | .`\r\n             `-\\|  | |  |\/-\'\r\n                |  | |  |\r\n                |  \\_\/  |\r\n             _.\'; ._._. ;\'._\r\n        _.-\'`; | \\  -  \/ | ;\'-.\r\n      .\' :  \/  |  |   |  |  \\  \'.\r\n     \/   : \/__ \\  \\___\/  \/ __\\ : `.\r\n    \/    |   \/  \'._\/_\\_.\'  \\   :   `\\\r\n   \/     .  `---;\"\"\"\"\"\'-----`  .     \\\r\n  \/      |      |()    ()      |      \\\r\n \/      \/|      |              |\\      \\\r\n\/      \/ |      |()    ()      | \\      \\\r\n|         |\r\n\\     \\   |][     |   |    ][ |   \/     \/\r\n \\     \\ ;=\"\"=====\'\"\"\"\'====\"\"==; \/     \/\r\n  |\/`\\  \\\/      |()    ()      \\\/  \/`\\|\r\n   |_\/.-\';      |              |`-.\\_|\r\n     \/   |      ;              :   \\\r\n     |__.|      |              |.__|\r\n         ;      |              | \r\n         |      :              ;\r\n         |      :              |\r\n         ;      |              |\r\n         ;      |              ;\r\n         |      :              |\r\n         |      |              ;\r\n         |      |              ;\r\n         \'-._   ;           _.-\'\r\n             `;\"--.....--\";`\r\n              |    | |    |\r\n              |    | |    |\r\n              |    | |    |\r\n              T----T T----T\r\n         _..._L____J L____J _..._\r\n       .` \"-. `%   | |    %` .-\" `.\r\n      \/      \\    .: :.     \/      \\\r\n      \'-..___|_..=:` `-:=.._|___..-\'";
    res.send(`
        <html>
        <head>
            <title>Team10 E-Ticaret</title>
        </head>
        <body style="font-family: monospace; text-align: center;">
            <h1>Team10 E-Ticaret Hoþgeldiniz</h1>
            <pre>${asciiArt}</pre>
        </body>
        </html>
    `);
});



// Diðer rotalar
const authRoutes = require('./authRoutes');
const cartRoutes = require('./cartRoutes');
const categoryRoutes = require('./categoryRoutes');
const commentRoutes = require('./commentRoutes');
const orderRoutes = require('./orderRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');
const wishlistRoutes = require('./wishlistRoutes');
const paymentRoutes = require('./paymentRoutes');

// Rota dosyalarýný baðlayýn
router.use('/auth', authRoutes);
router.use('/carts', cartRoutes);
router.use('/categories', categoryRoutes);
router.use('/comments', commentRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/wishlists', wishlistRoutes);
router.use('/payments', paymentRoutes);

module.exports = router;
