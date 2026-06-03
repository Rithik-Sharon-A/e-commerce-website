export interface AddProductDto {
    name: string;
    description: string;
    price: number;
    category: string;
    subCategory: string;
    sizes: string[];
    bestseller: boolean;
}
export interface UploadedFilePart {
    fieldname: string;
    buffer: Buffer;
}
