import * as jwt from 'jsonwebtoken';

const secret = 'shhhhh';

export const sign = (payload: object) => {
    const token = jwt.sign(payload, secret);

    return token;
};

export const validate = (token: string): boolean => {
    try {
        const decoded = jwt.verify(token, secret);
        return true;
    } catch (err) {
        return false;
    }
};

export const decode = (token: string): unknown => {
    const decoded = jwt.decode(token);

    return decoded;

};
