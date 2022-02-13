import Ajv, { Schema, ValidateFunction } from "ajv";

export default class Validation {
  public static ajv: Ajv = new Ajv();

  static validate(data: any, schema: Schema) {
    const validate = Validation.getSchema(schema);

    return validate(data);
  }

  static getSchema(schema: Schema): ValidateFunction<unknown> {
    return this.ajv.compile(schema);
  }
}
