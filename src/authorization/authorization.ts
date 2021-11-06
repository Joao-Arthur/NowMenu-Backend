import { nanoid } from 'nanoid';
import * as md5 from 'md5';

type props = {
    salt: string;
    password: string;
};

export function getHash({ salt, password }: props) {
    return md5(salt + password);
}

export function getSalt() {
    return nanoid(256);
}
