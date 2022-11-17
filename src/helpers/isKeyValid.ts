const validKeys = `q w e r t y u i o p a s d f g h j k l z x c v b n m ç`.split(" ").map((o) => o.trim())

export function isKeyValid(key: string) {
    return validKeys.includes(key.toLowerCase())
}