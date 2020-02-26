const { parser } = require('../src/index.js');
var fs = require('fs');

describe('Test parser', () => {

    it('Should read file', () => {
        const clippings1 = fs.readFileSync('test/clippings1.txt', 'utf-8');
        const data = parser(clippings1);

        expect(data[0].author).toBe('N. K. Jemisin');
        expect(data[0].book).toBe('The Fifth Season');
        expect(data[0].quote).toBe('Binof’s talking differently, Damaya realizes suddenly: her words evenly spaced and voice steady, her manner not so much haughty as grave. As if the world’s fate depends upon her finding the answer to her question. As if she isn’t just some spoiled girl from a powerful family who decided on a whim to do something incredibly stupid.');
        expect(data[0].page).toBe('page 271');
        expect(data[0].location).toBe('Location 4144-4146');
        expect(data[0].dateAdded.toString()).toBe(new Date(Date.parse('Wednesday, December 16, 2015 11:57:19 PM')).toString());


        expect(data[1].author).toBe('Sven Beckert');
        expect(data[1].book).toBe('Empire of Cotton');
        expect(data[1].quote).toBe('The very particular organization of trade, production, and consumption they created exploded the disparate worlds of cotton that had existed for millennia. They animated cotton, invested it with world-changing energy, and then used it as a lever to transform the world.');
        expect(data[1].page).toBe('page 7');
        expect(data[1].location).toBe('Location 95-97');
        expect(data[1].dateAdded.toString()).toBe(new Date(Date.parse('Saturday, December 19, 2015 3:20:11 PM')).toString());


        expect(data[data.length - 1].quote).toBe('Three days later, Burke rose in Parliament to give his famous but futile “On Conciliation with America” speech. “A great empire and little minds go ill together,” he proclaimed.');

    });

    it('should read another file.', () => {
        const clippings5 = fs.readFileSync('test/clippings5.txt', 'utf-8');
        const data = parser(clippings5);
        expect(data.length).toBe(210);

        expect(data[200].author).toBe('Greger, Michael; Stone, Gene');
        expect(data[200].book).toBe('How Not to Die : Discover the Foods Scientifically Proven to Prevent and Reverse Disease');
        expect(data[200].quote).toBe('The culprit compound, cafestol, is found in the oils of coffee beans that become trapped in the paper filter, so drip coffee doesn’t raise cholesterol as much as french press, boiled, or Turkish (“mud”-style) coffee.');
        expect(data[200].page).toBe(undefined);
        expect(data[200].location).toBe('8289-8290 ');
        expect(data[200].dateAdded.toString()).toBe(new Date(Date.parse('Tue Sep 27 2016 15:51:05 GMT+1000 (Australian Eastern Standard Time)')).toString());
    });


});
