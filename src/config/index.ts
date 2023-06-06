import dotenv from "dotenv";
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
//throw error if .env not found
if(envFound.error){
    throw new Error("Could not find .env file");
}

interface ENV {
    PORT: number | undefined;
}

interface Config {
    PORT: number;
}

const getConfig = (): ENV => {
    return {
      PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    };
  };

//throw error if any field was undefined
const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
      if (value === undefined) {
        throw new Error(`Missing key ${key} in config.env`);
      }
    }
    return config as Config;
  };

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;