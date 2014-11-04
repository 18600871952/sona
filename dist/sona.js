var Sona;

Sona = (function() {
  function Sona(sources) {
    var AudioContext;
    AudioContext = AudioContext || webkitAudioContext;
    this.supported = !!AudioContext;
    if (!this.supported) {
      return;
    }
    this.context = new AudioContext();
    this.sources = sources;
    this.buffers = {};
    this.sounds = {};
  }

  Sona.prototype.load = function(callback) {
    var request, source;
    if (!this.supported) {
      return;
    }
    source = this.sources.shift();
    request = new XMLHttpRequest();
    request.open('GET', source.url, true);
    request.responseType = 'arraybuffer';
    request.onload = (function(_this) {
      return function() {
        return _this.context.decodeAudioData(request.response, function(buffer) {
          _this.buffers[source.id] = buffer;
          if (_this.sources.length) {
            return _this.load(callback);
          } else if (typeof callback === 'function') {
            return callback();
          }
        });
      };
    })(this);
    return request.send();
  };

  Sona.prototype.play = function(id, _loop) {
    if (_loop == null) {
      _loop = false;
    }
    if (!this.supported || this.buffers[id] === void 0) {
      return;
    }
    this.sounds[id] = this.sounds[id] || {};
    this.sounds[id].sourceNode = this.context.createBufferSource();
    this.sounds[id].sourceNode.buffer = this.buffers[id];
    this.sounds[id].sourceNode.loop = _loop;
    if (!this.sounds[id].gainNode) {
      this.sounds[id].gainNode = this.context.createGain();
      this.sounds[id].gainNode.connect(this.context.destination);
    }
    this.sounds[id].sourceNode.connect(this.sounds[id].gainNode);
    return this.sounds[id].sourceNode.start(0);
  };

  Sona.prototype.loop = function(id) {
    return this.play(id, true);
  };

  Sona.prototype.stop = function(id) {
    if (!this.supported || this.sounds[id] === void 0) {
      return;
    }
    return this.sounds[id].sourceNode.stop(0);
  };

  Sona.prototype.getVolume = function(id) {
    if (!this.supported || this.sounds[id] === void 0) {
      return;
    }
    return this.sounds[id].gainNode.gain.value;
  };

  Sona.prototype.setVolume = function(id, volume) {
    if (!this.supported || this.sounds[id] === void 0) {
      return;
    }
    return this.sounds[id].gainNode.gain.value = volume;
  };

  Sona.prototype.getPosition = function(id) {
    if (!this.supported || this.buffers[id] === void 0) {

    }
  };

  Sona.prototype.setPosition = function(id) {
    if (!this.supported || this.buffers[id] === void 0) {

    }
  };

  return Sona;

})();

if (typeof exports !== 'undefined') {
  module.exports = Sona;
} else {
  window.Sona = Sona;
}
