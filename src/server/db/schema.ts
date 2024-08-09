// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import {
    integer,
    pgTable,
    serial, timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const players = pgTable('players',
  {
      idFantacalcio: integer('id_fantacalcio').primaryKey(),
      name: varchar("name", { length: 256 }).notNull(),
      role: varchar("role", { length: 1 }).notNull(),
      squadra: varchar("squadra", { length: 100}).notNull().default('team'),
    });

export const teams = pgTable('teams',
    {
        id: serial('id').primaryKey(),
        name: varchar("name", { length: 100 }).notNull(),
    });

export const players_teams = pgTable('players_teams',
    {
        id: serial('id').primaryKey(),
        idFantacalcio: integer('id_fantacalcio').references(() => players.idFantacalcio).notNull().unique(),
        idTeam: integer('id_team').references(() => teams.id).notNull(),
        price: integer('price').notNull(),
        buyAt: timestamp('buy_at').notNull().defaultNow(),
    });

export const configs = pgTable('configs',
    {
        id: serial('id').primaryKey(),
        name: varchar('name', {length: 100}).notNull(),
        value: integer('value').notNull(),
    }
)