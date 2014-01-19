describe 'Sona', ->
  sona = null

  describe 'Loading data', ->
    it 'should execute a callback when data is loaded', ->
      sona = new Sona [
        { url: 'assets/sample.mp3', id: 'sample' }
      ]
      
      spy =
        callback: ->
          alert 'Loaded!'

      spyOn spy, 'callback'
      sona.load spy.callback
      expect(spy.callback).toHaveBeenCalled

  describe 'Playing sounds', ->
    beforeEach (done) ->
      sona = new Sona [
        { url: 'assets/sample.mp3', id: 'sample' }
        { url: 'assets/test.mp3', id: 'test' }
        { url: 'assets/example.mp3', id: 'example' }
      ]

      sona.load ->
        done()

    it 'should have populated a buffer object', ->
      expect(Object.keys(sona.buffers).length).toBe 3

    it 'should play a sound', ->
      expect(->
        sona.play('sample')
      ).not.toThrow()

    it 'should play a looped sound', ->
      expect(->
        sona.play('sample', true)
      ).not.toThrow()

      setTimeout ->
        sona.stop('sample')
      , 1000
    