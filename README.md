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
	// All sounds have loaded when this callback is executed

    // Play a sound once at default volume
    sona.play('sample');

    // Play a looping sound
    sona.play('sample', true);

    // Get volume of sound
    sona.getVolume('sample');	// == 1

    // Change volume to 50%
    sona.setVolume('sample', 0.5);

    // Stop the loop
    sona.stop('sample');
});
```

### Compatibility

Not supported in Internet Explorer. See [caniuse.com](http://caniuse.com/#feat=audio-api).

### Specs

Load `SpecRunner.html` in a browser window. There may be weirdness, I'm still
trying to figure out async specs in Jasmine 2.0.
