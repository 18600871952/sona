describe('Sona', function () {
    describe('Loading data', function () {
        var sona,
            spy;

        beforeEach(function (done) {
            sona = new Sona([
                { url: 'assets/sample.mp3', id: 'sample' },
                { url: 'obviously/404.mp3', id: 'garbage' }
            ]);

            spy = {
                callback: function () {
                    done();
                }
            };

            spyOn(spy, 'callback').and.callThrough();
            sona.load(spy.callback);
        });

        it('should execute a callback when data is loaded', function () {
            expect(spy.callback).toHaveBeenCalled();
        });
    });

    describe('Playing sounds', function () {
        var sona;

        beforeEach(function (done) {
            sona = new Sona([
                { url: 'assets/sample.mp3', id: 'sample' },
                { url: 'assets/test.mp3', id: 'test' },
                { url: 'assets/example.mp3', id: 'example' }
            ]);

            sona.load(function () {
                done();
            });
        });

        it('should have populated a buffer object', function () {
            expect(Object.keys(sona.buffers).length).toBe(3);
        });

        it('should play a sound', function () {
            expect(function () {
                sona.play('sample');
            }).not.toThrow();
        });

        it('should play a looped sound', function () {
            expect(function () {
                sona.loop('sample');
            }).not.toThrow();

            // To prevent an endless loop on the SpecRunner page
            setTimeout(function () {
                sona.stop('sample');
            }, 1000);
        });
    });
});

