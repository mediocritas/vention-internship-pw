import { join, parse } from 'path';
import { unlink, copyFile } from 'fs/promises';
import { faker } from '@faker-js/faker';

export const createFilePath = async (path: string): Promise<string> => {
    try {
        const { dir, name, ext } = parse(path);
        const fileName = `${name}_${faker.string.alpha(5)}${ext}`;
        const filePath = join(dir, fileName);
        return filePath;
    } catch (error) {
        console.error(`Incorrect path ${path}`);
        throw error;
    }
}

export const createFileCopy = async (sourcePath: string, targetPath: string): Promise<string> => {
    try {
        await copyFile(sourcePath, targetPath);
        return parse(targetPath).base;
    } catch (error) {
        console.error(`Paths are incorrect`)
        throw error;
    }
}

export const deleteFile = async (path: string) => {
    try {
        await unlink(path);
    } catch {
        console.warn(`Error deleting file ${path}`);
    }
}