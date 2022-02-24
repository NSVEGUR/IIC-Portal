import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, './../config.env') });


interface ENV {
	NODE_ENV: string | undefined;
	PORT: number | undefined;
	DBURL: string | undefined;
	DBPASSWORD: string | undefined;
	GOOGLE_CLIENT_ID: string | undefined;
	GOOGLE_CLIENT_SECRET: string | undefined;
}


interface Config {
	NODE_ENV: string;
	PORT: number;
	DBURL: string;
	DBPASSWORD: string;
	GOOGLE_CLIENT_ID: string;
	GOOGLE_CLIENT_SECRET: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
	return {
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
		DBURL: process.env.DBURL,
		DBPASSWORD: process.env.DBPASSWORD,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	};
};



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