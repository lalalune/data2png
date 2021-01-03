# data2png

This tool lets you embed and retrieve text data to/from an image. It's useful when you want to embed data as JSON but want it to have a nice preview image and immutable transmission format.

Heavily influenced by / some code copy and pasted from this project: https://github.com/mykeels/steganography

If you want to add a password to your data and encrypt it, use that library. I needed something that worked in the browser with minimal dependencies or cryptography.

## Use Cases

Watermarking your images, adding metadata for game pieces or collectibles, tickets to your awesome VR club, anything where you want to track the uniqueness or immutability of your source file. I got the idea thinking about how to make a collectible card deck that could contain links to other cards, as well as the card back itself, all in a single file.

## Future Work
Ask me about NAL blocks and data2mp4 :)

### Note for browsers
This package has one dependency, Jimp, which has an open issue with having an fs require in one of it's own dependencies. If you want this to work with webpack, see: https://github.com/oliver-moran/jimp/issues/903

### Embed data
```
    const data = { data: "helloworld" }
    const buffer = await embed(
        path.join(__dirname, './helloworld.png'), 
        data
    );
    fs.writeFileSync(
        path.join(__dirname, './helloworld_withdata.png'),
        buffer
    );
```

### Retrieve data
```
    const data = await retrieveData(
        path.join(__dirname, './helloworld_withdata.png')
    );
    console.log(data);
```
