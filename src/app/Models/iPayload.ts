import { Rates } from "./iRates";

export interface Payload {
  "base": string,
  "date": string,
  "rates": Rates,
  "success": boolean,
  "timestamp": Number
}