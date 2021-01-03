# data2png

This tool lets you embed and retrieve text data to/from an image. It's useful when you want to embed data as JSON but want it to have a nice preview image and immutable transmission format.

## Usage

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