import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from "xss";
import {BloomFilter as Buffer} from "next/dist/shared/lib/bloom-filter";

const db = sql('meals.db')

export const getMeals = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    //throw new Error('Something went wrong');
    return db.prepare('SELECT * FROM meals').all();
}

export const getMeal = (slug) => {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export const saveMeal = async (meal) => {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);
    const randomChar = Math.random().toString(36).substring(2, 15);

    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}-${randomChar}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`).end(meal.image);
    const bufferedImage = await meal.image.arrayBuffer();

    stream.write(Buffer.from(bufferedImage),(error) => {
        if (error) {
            throw new Error('Saving image failed') ;
        }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
    INSEERT INTO meals
        (title, slug, image, summary, instructions, creator, creator_email)
    VALUES (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)
    `).run(meal);
}