import { pgTable, serial, text, varchar, timestamp, integer, jsonb } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  subtitle: varchar('subtitle', { length: 255 }),
  categoryId: varchar('category_id', { length: 100 }).default('todos'),
  description: text('description'),
  imageUrl: varchar('image_url', { length: 500 }),
  previewImageUrl: varchar('preview_image_url', { length: 500 }),
  gallery: jsonb('gallery').$type<string[]>(),
  link: varchar('link', { length: 500 }),
  technologies: jsonb('technologies').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }),
  company: varchar('company', { length: 255 }),
  content: text('content').notNull(),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  rating: integer('rating').default(5),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  projectType: varchar('project_type', { length: 100 }),
  message: text('message'),
  status: varchar('status', { length: 50 }).default('nuevo'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  payphoneToken: text('payphone_token'),
  payphoneStoreId: varchar('payphone_store_id', { length: 255 }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
