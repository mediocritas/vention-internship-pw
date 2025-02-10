export const getEnvVar = (name: string): string => {
    const value = process.env[name];
    if (!value) {
      throw new Error(`Error: no value for ${name} `);
    }
    return value;
  }