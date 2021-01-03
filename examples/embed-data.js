const path = require('path');
const fs = require('fs');
const { embedData } = require('../src/index');

(async () => {
    const buffer = await embedData(
        path.join(__dirname, './images/test.png'), 
        {}
    );

    fs.writeFileSync(
        path.join(__dirname, './images/output.png'),
        buffer
    );
})();