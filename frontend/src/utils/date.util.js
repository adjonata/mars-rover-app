import { parse, format } from "date-fns"
export default {
  _format(date) {
    const extract = parse(date, 'yyyy-MM-dd');
    return format(extract, 'yyyy-M-d');
  }
}