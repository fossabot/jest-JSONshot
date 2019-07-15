import {toMatchSnapshot} from "jest-snapshot";
import {jsonShot} from "./lib";
import serializer from "./serialize";

declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchJSONshot(): R;
        }
    }
}

export const extension: jest.ExpectExtendMap = {
    toMatchJSONshot(received)
    {
        let snap = jsonShot(received);
        return toMatchSnapshot.call(this, snap);
    }
};

expect.addSnapshotSerializer(serializer);
expect.extend(extension);