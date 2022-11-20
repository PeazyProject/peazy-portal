import * as express from 'express';
import * as fs from 'fs';
import { createConnection, Brackets, DataSource } from 'typeorm';

// let rawData = fs.readFileSync('server/environment.json').toString();
// const config = JSON.parse(rawData);

// const port = 3000;
// const app: Express.Application = express();

// async function main(envStr: any): Promise<any> {
//   console.log("============environment:" + envStr + "================");

// }
