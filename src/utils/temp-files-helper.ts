import { join } from 'path';
import { mkdir, unlink, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';

export const createTextFile = async (path: string) => {
    try {
        await mkdir(path, { recursive: true });
        const fileName = `testFile_${faker.string.alpha(5)}.txt`;
        const filePath = join(path, fileName);
        await writeFile(filePath, 'testFile');
        return { fileName, filePath };
    } catch (error) {
        console.error('Error during text file creation');
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

export const createTextFileWithName = async (path: string, fileName: string) => {
    try {
        await mkdir(path, { recursive: true });
        const filePath = join(path, fileName);
        await writeFile(filePath, 'testFile');
        return { fileName, filePath };
    } catch (error) {
        console.error('Error during text file creation');
        throw error;
    }
}