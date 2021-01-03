const path = require('path');
const { retrieveData } = require('../src/index');

(async () => {
    const data = await retrieveData(
        path.join(__dirname, './images/output.png')
    );

    console.log(JSON.toString(data));
})();