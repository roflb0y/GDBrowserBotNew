import chalk from "chalk";

export const info = (msg: any) => {
    console.log(chalk.greenBright(`[${new Date().toLocaleString()}] INFO: ${msg}`));
}

export const debug = (msg: any) => {
    console.log(chalk.magentaBright(`[${new Date().toLocaleString()}] DEBUG: ${msg}`));
}

export const error = (msg: any) => {
    console.log(chalk.redBright(`[${new Date().toLocaleString()}] ERROR: ${msg}`))
}