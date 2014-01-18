class Sona
  # `sounds` is an array of objects, each with `url` and `id` properties
  # e.g. [{ url: 'path/to/sound.mp3', id: 'mySound' }, { url: 'path/to/sound2.mp3', id: 'myOtherSound' }]
  constructor: (sounds) ->
    # Standardize access to AudioContext object
    window.AudioContext = window.AudioContext || window.webkitAudioContext

    # Determine browser support
    @supported = !!AudioContext
    return if not @supported

    @context = new AudioContext()
    @sounds = sounds

  load: (callback) ->
    return if not @supported

    @buffers = @buffers || {}

    # Current sound to load
    sound = @sounds.shift()

    request = new XMLHttpRequest()
    request.open 'GET', sound.url, true
    request.responseType = 'arraybuffer'

    # Decode loaded audio data
    request.onload = =>
      @context.decodeAudioData request.response, (buffer) =>
        @buffers[sound.id] = buffer

        if @sounds.length then @load callback
        else if typeof callback is 'function' then callback()

    request.send()

  play: (id) ->
    return if @buffers[id] is undefined or not @supported

    source = @context.createBufferSource()
    source.buffer = @buffers[id]
    source.connect @context.destination
    source.start 0

window.Sona = Sona
