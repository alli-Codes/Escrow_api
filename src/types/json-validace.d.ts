declare module "json-validace" {
  export class Schema {
    constructor(object: object);
    validate(object: object): {
      error: object | null;
      data: { [key: string]: any } | null;
    };
  }
}
