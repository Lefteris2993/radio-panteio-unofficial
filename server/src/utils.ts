export class Logger {
  public static info(...data: any) {
    console.log(`\x1b[32m[Timestamp]: ${(new Date).toISOString()} `, ...data , `\x1b[0m`);
  }

  public static warn(...data: any) {
    console.log(`\x1b[33m[Timestamp]: ${(new Date).toISOString()} `, ...data , `\x1b[0m`);
  }

  public static error(...data: any) {
    console.log(`\x1b[31m[Timestamp]: ${(new Date).toISOString()} `, ...data ,` \x1b[0m`);
  }
}

const validNameRegex = new RegExp('^([a-z]*[1-9]*[A-Z]*\\.*\\@*\\-*\\_*)+$');

export const validateName = (name: string | undefined) => {
  if (name === undefined || name === '') return false;
  else return validNameRegex.test(name);
}
