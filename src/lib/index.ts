export const JSONShotSym = Symbol('jest-JSONshot');

export function jsonShot(obj: any)
{
    let str = JSON.stringify(obj,  null, '  ');
    return {[JSONShotSym]: str};
}