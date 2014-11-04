describe('Sona', function() {
    describe('Loading data', function() {
        var sona,
            spy;

        beforeEach(function () {
            sona = new Sona([{ url: 'assets/sample.mp3', id: 'sample' }]);
            spy = jasmine.createSpy('sneaky');
        });

        it('should execute a callback when data is loaded', function() {
            spyOn(spy, 'callback');
            sona.load(spy.callback);
            expect(spy.callback).toHaveBeenCalled();
        });
    });

    describe('Playing sounds', function() {
        var sona;

        beforeEach(function(done) {
            sona = new Sona([
                { url: 'assets/sample.mp3', id: 'sample' },
                { url: 'assets/test.mp3', id: 'test' },
                { url: 'assets/example.mp3', id: 'example' }
            ]);

            sona.load(function() {
                done();
            });
        });

        it('should have populated a buffer object', function() {
            expect(Object.keys(sona.buffers).length).toBe(3);
        });

        it('should play a sound', function() {
            expect(function () {
                sona.play('sample');
            }).not.toThrow();
        });

        it('should play a looped sound', function() {
            expect(function() {
                sona.loop('sample');
            }).not.toThrow();

            setTimeout(function() {
                sona.stop('sample');
            }, 1000);
        });
    });
});

