const CHAR64 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
export const to64 = (arr: boolean[]) => {
    let result = '';
    for (let i = 0; i * 6 < arr.length; i++) {
        result += CHAR64.charAt((() => {
            let num = 0;
            for (let j = 0; j < 6; j++) {
                if (arr[i * 6 + j]) {
                    num += 2 ** j;
                }
            }
            return num;
        })());
    }
    return result;
}
export const from64 = (str: string) => {
    let result: boolean[] = [];
    for (let i = 0; i < str.length; i++) {
        let num = CHAR64.indexOf(str.charAt(i));
        for (let j = 0; j < 6; j++) {
            result[i * 6 + j] = num % 2 ** (j + 1) >= 2 ** j;
        }
    }
    return result;
}
export const compress0 = (s: string) => {
    //0の連続を 0n (nは連続数 < 64)に置き換える
    //00はありえなくなる 0 > 01, 00 > 02, 000 > 03, 0が63個 > 0_
    return s.replace(/([0_])\1{0,62}/g, (a, c) => {
        return c + CHAR64.charAt(a.length);
    });
}
export const expand0 = (s: string) => {
    //0n > 000... } n個
    return s.replace(/([0_])(\S)/g, (a, c, n) => {
        return new Array(CHAR64.indexOf(n) + 1).join(c);
    });
}