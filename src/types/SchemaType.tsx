export default interface SchemaType {
    id: number;
    name: string;
    time_created: string;
    time_updated: string;
    description: string;
    meta: {
        apps: string[];
        isBase: boolean;
        displayField: string;
        recursive: boolean;
    },
    created_user: string;
}