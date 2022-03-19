import { WebbieStorage } from "../webbie";

export interface WebbieConfig {
  /**
   * The storage type to use.
   * @see {@link priority}
   */
  type: WebbieStorage;

  /**
   * Priority to use when storing data.
   * If first is not supported, use the next in the list.
   * 
   * Exclude the {@link type} from this list.
   */
  priority?: Array<WebbieStorage>;

  /**
   * The name of the database to use.
   * 
   * @default "webbie-{UUID}"
   */
  name?: string;

}
