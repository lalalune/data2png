const jimp = require("jimp");
const retrieveNextSection = require("./retrieve-section");
const embedSection = require("./embed-section");

let _index = 0;
let _width = 0;
let _height = 0;
let _clone;
let _batch;

/**
 * extracts the embedded data from an image
 * @param {String} imageFileOrBuffer 
 * @returns {Promise<String>} the extracted text data
 */
const retrieveData = (imageFileOrBuffer) => {
  return new Promise((resolve, reject) => {
    jimp.read(imageFileOrBuffer, function (err, image) {
      if (!err) {
        _width = image.getWidth();
        _height = image.getHeight();
        _clone = image;

        const buffer = retrieveNextSection({
          _index,
          _width,
          _height,
          _clone,
        });
        const payloadText = buffer.toString('utf8');
        try {
          const payload = JSON.parse(payloadText);
          resolve(payload);
        }
        catch (err) {
          //console.log({ modifiedPayloadText });
          reject(new Error('Could not decrypt message'));
        }
      } else {
        reject(err);
      }
    });
  });
};

/**
 * embeds text data in an image.
 * @param {String|Buffer} imageFileOrBuffer 
 * @param {String} data the data to be embedded
 * @returns {Promise<Buffer>}
 */
const embedData = (imageFileOrBuffer, data) => {
  const payload = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    jimp.read(imageFileOrBuffer, function (err, image) {
      if (!err) {
        image.clone(function (err, clone) {
          if (!err) {
            _clone = clone;
            _width = clone.getWidth();
            _height = clone.getHeight();
            _batch = clone;

            embedSection(Buffer.from(payload, 'utf8'), { _index, _width, _batch, _clone });

            clone.getBuffer('image/png', function (err, buffer) {
              if (err) reject(err);
              else resolve(buffer);
            });
          } else {
            reject(err);
          }
        });
      } else {
        reject(err);
      }
    });
  });
};

module.exports.retrieveData = retrieveData;
module.exports.embedData = embedData;