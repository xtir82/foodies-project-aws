import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from "xss";
import {S3} from '@aws-sdk/client-s3'

const db = sql('meals.db')

const s3 = new S3({
    region: 'us-east-2'
})

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

    const bufferedImage = await meal.image.arrayBuffer();

    await s3.putObject({
        Bucket: 'ac-foodies-demo-users-image',
        Key: fileName,
        Body: Buffer.from(bufferedImage),
        ContentType: meal.image.type,
    })

    meal.image = `${fileName}`;

    db.prepare(`
    INSERT INTO meals
        (title, slug, image, summary, instructions, creator, creator_email)
    VALUES (@title, @slug, @image, @summary, @instructions, @creator, @creator_email)
    `).run(meal);
}