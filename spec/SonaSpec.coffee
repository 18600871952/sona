describe 'Sona', ->
  sona = null

  beforeEach ->
    sona = new Sona [
      { url: 'assets/sample.mp3', id: 'sample' }
      { url: 'assets/test.mp3', id: 'test' }
      { url: 'assets/example.mp3', id: 'example' }
    ]

  it 'should load data into a buffer object', ->
    sona.load ->
      expect(Object.keys(sona.buffers).length).toBe 3

  it 'should execute a callback when data is loaded', ->
    spy =
      callback: ->
        alert 'Loaded!'

    spyOn spy, 'callback'
    sona.load spy.callback
    expect(spy.callback).toHaveBeenCalled

  it 'should play a loaded sound', ->
    sona.load ->
      expect(sona.play('sample')).not.toThrow()
