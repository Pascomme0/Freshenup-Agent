export type User = {
    id: number;
    username: string;
    telephone: string;
    password: string;
    email: string;
    webId: string;
};

export type Notification = {
    id: number;
    message: string;
    webId: string;
};