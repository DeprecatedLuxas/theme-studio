import Ajv, { Schema, ValidateFunction } from "ajv";
import VariableSchema from "../../schemas/tstudio-schema.json";
export default class Validation {
  public static ajv: Ajv = new Ajv();

  static validate(data: any) {
    const validate = Validation.getSchema(VariableSchema);

    return validate(data);
  }

  static getSchema(schema: Schema): ValidateFunction<unknown> {
    return this.ajv.compile(schema);
  }
}
