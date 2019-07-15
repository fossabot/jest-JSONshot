import {JSONShotSym} from "./lib";

export default {
    test: val => val[JSONShotSym],
    print(val)
    {
        return val[JSONShotSym];
    }
};