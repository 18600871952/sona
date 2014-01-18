# Sona.js

Simple Web Audio API wrapper.

### Usage

```
var sona = new Sona([
    { url: 'assets/sample.mp3', id: 'sample' },
    { url: 'assets/test.mp3', id: 'test' },
    { url: 'assets/example.mp3', id: 'example' }
]);

sona.load(function () {
    // All sounds loaded when callback is executed
    sona.play('sample');
});
```

### Specs

Load `SpecRunner.html` in a browser window. There may be weirdness, I'm still
trying to figure out async specs in Jasmine 2.0.
