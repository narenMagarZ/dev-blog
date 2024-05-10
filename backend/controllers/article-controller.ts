import {Request,Response,NextFunction} from 'express'
import { createArticle, findArticles } from '../dal/article-dal';
import AppError from '../app-error';
import uuid from 'short-uuid'
import slug from 'slug'

const print = console.log

function createSlug(prefix:string){
    const sId = uuid.generate()
    const s = slug(prefix+' '+sId)
    return s
}

export async function publishArticle(req:Request,res:Response,next:NextFunction) {
    try{
        const parsedContent = parseRawContent(req.body.content)
        const slug = createSlug(req.body.title)
        print(parsedContent)
        const uId = "663d8072459a37bb7a53bcde"
        const article = await createArticle({
            ...req.body,
            slug,
            tags:req.body.tags.split(','),
            content:parsedContent
        },uId)
        if(article){
            return res.status(200).send("Article published successfully")
        }else return res.status(422).send("Failed to publish article")
    }
    catch(error:any){
        console.error("Error creating article:",error)
        return next(new AppError(error.message,500))
    }
}


function parseRawContent(content: string): string {
    // Replace bold (**text**)
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Replace italic (_text_)
    content = content.replace(/_(.*?)_/g, '<em>$1</em>');

    // Replace heading (# text)
    // content = content.replace(/#\s(.*?)(\n|$)/g, '<h1>$1</h1>');
    content = replaceHeadings(content)

    // replace image
    content = content.replace(/!\[.*?\]\(([^)]*)\)/g,'<Image src="$1" alt="" height={100} width={100} className="" ></Image>')

    // Replace code (`code`)
    content = content.replace(/```(.*?)```/g, '<pre><code>$1</code></pre>');
    content = content.replace(/`(.*?)`/g, '<code>$1</code>');

    // Replace code block (```code```)

    // Replace links ([text](url))
    content = content.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    content = content.replace(/^\*\s(.*?)(\n|$)/gm, '<li>$1</li>');
    content = content.replace(/<\/li><li>/g, '</li><li>');
    content = content.replace(/^(\d+)\.\s(.*?)(\n|$)/gm, '<li>$2</li>');
    content = content.replace(/<\/li><li>/g, '</li><li>');
    content = content.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    content = content.replace(/<ul>(<li>.*?<\/li>)<\/ul>/gs, '<ul>$1</ul>');
    return content;
}


const x = parseRawContent(`**The Impact of Artificial Intelligence on Healthcare**

Artificial intelligence (AI) is revolutionizing the healthcare industry in numerous ways. From diagnostics to personalized treatment plans, AI has the potential to improve patient outcomes and streamline healthcare delivery.

# Diagnostics

One of the most significant applications of AI in healthcare is in diagnostics. Machine learning algorithms can analyze medical images such as X-rays, MRIs, and CT scans with incredible accuracy, assisting radiologists in detecting abnormalities and making diagnoses.

### heading 
##### heading 5
#### heading 4
###### heading 6
## Personalized Treatment

AI enables personalized ![image 1](https://example.com/image1.jpg) treatment plans based on individual patient data and medical history. By analyzing large datasets, AI algorithms can identify patterns and predict patient responses to different treatments, allowing for tailored interventions that optimize outcomes and minimize side effects.
`)

print(x)


function replaceHeadings(content: string): string {
    // Regular expression to match headings of levels 1 to 6
    const regex = /^#{1,6}\s(.*)$/gm;

    // Replace each heading with the corresponding HTML heading tag
    return content.replace(regex, (match, headingText) => {
        // Determine the heading level based on the number of '#' characters
        print(match,'match')
        const headingLevel = match.split(' ')[0].length;
        // Replace with the corresponding HTML heading tag
        return `<h${headingLevel}>${headingText.trim()}</h${headingLevel}>`;
    });
}



export async function createPreview(req:Request,res:Response,next:NextFunction){
    const {
        content
    } = req.body
    try{
        const parsedContent = parseRawContent(content)
        return res.json({processedHTML:parsedContent})
    }
    catch(error:any){
        console.error("Error creating preview:",error)
        return next(new AppError(error.message,500))
    }
}

export async function getArticles(req:Request,res:Response,next:NextFunction){
    try{
        const articles = await findArticles()
        print(articles)
        return res.json(articles)
    }
    catch(error:any){
        console.error("Error getting articles:",error)
        return next(new AppError(error.message,500))
    }
}