export default function catchMathJaxError(expression: string, {message}: Error) {
    if (message == "expected )") {
        return expression + ")"
    } else {
        throw new Error(message)
        console.error(message)
        return null
    }
}