export type payloadType = {
    id: string;
    name: string;
};

export function getJWTPayload(jwtFromHeader: string): payloadType {
    const [, content] = jwtFromHeader.split('Bearer ');
    const [, contentPayload] = content.split('.');
    return JSON.parse(Buffer.from(contentPayload, 'base64').toString());
}
