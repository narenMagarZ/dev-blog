import app from "./app";
import * as db from './config/db'
const port = process.env.PORT || 5000
db.default()
app.listen(port)