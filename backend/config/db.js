import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv'



dotenv.config()

const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env


export const sql = neon(
    `postgressql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`

)
