export default function process(expr: string) {
    let replaceList = [
        ["π", "" + Math.PI],
        ["ｅ", "" + Math.E],
    ] // "e" is used both as Euler's constant (2.718...) and in scientific notation (1e+8, for example). Fix this error.
    for (let i = 0; i < replaceList.length; i++) {
        expr = expr.replace(replaceList[i][0], replaceList[i][1])
    }
    console.log(expr)
    return expr
}