import "../setup";


describe('serializer', () =>
{

    test('JSONshot object', () =>
    {
        let obj = {
            key1: "val1"
        };

        expect(obj).toMatchJSONshot();
    });

    test('JSONshot string', () =>
    {
        let obj = "str1";

        expect(obj).toMatchJSONshot();
    });

    test('JSONshot number', () =>
    {
        let num = 1;

        expect(num).toMatchJSONshot();
    });

    test('regular snapshot still works', () =>
    {
        let obj = {
            key1: "val1"
        };

        expect(obj).toMatchSnapshot();
    });

    test('function', () =>
    {

        let func = function()
        {
            return "result1"
        };

        let result = expect(func).toMatchJSONshot;

        expect(result).toThrow();
    });
});