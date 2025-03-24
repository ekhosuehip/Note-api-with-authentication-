import bcrypt from "bcryptjs";

export const doHash = (password: string, salt: number) => {
    const result = bcrypt.hash(password, salt);
    return result
}

export const compareHash = (value: string, hashedPassword: string) => {
    const result = bcrypt.compare(value, hashedPassword);
    return result
}