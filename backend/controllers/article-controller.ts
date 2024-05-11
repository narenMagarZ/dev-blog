import {Request,Response,NextFunction} from 'express'
import findArticleByUsernameAndSlug, { createArticle, findArticles } from '../dal/article-dal';
import AppError from '../app-error';
import uuid from 'short-uuid'
import Slug from 'slug'
import _ from 'lodash'
import date from 'date-fns'
const print = console.log

function createSlug(prefix:string){
    const sId = uuid.generate()
    const s = Slug(prefix+' '+sId)
    return s
}
function determineDurationToReadArticle(wordCount:number=0){
    print(wordCount,'word count')
    const averageReadingSpeed = 200
    const estimatedReadingTime = Math.ceil(wordCount/averageReadingSpeed)
    return estimatedReadingTime
}

export async function publishArticle(req:Request,res:Response,next:NextFunction) {
    try{
        const parsedContent = parseRawContent(req.body.content)
        const slug = createSlug(req.body.title)
        print(parsedContent)
        const uId = "663ed862b04e959687727a24"
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
    content = content.replace(/```(.*?)```/g, '<pre className="text-white bg-black rounded-md p-2 flex flex-col gap-y-2"><code>$1</code></pre>');
    content = content.replace(/`(.*?)`/g, '<pre className="text-white bg-black rounded-md p-2 flex flex-col gap-y-2" ><code>$1</code></pre>');

    // Replace code block (```code```)

    // Replace links ([text](url))
    content = content.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" className="text-blue-700 hover:text-blue-800 underline">$1</a>');
    content = content.replace(/^\*\s(.*?)(\n|$)/gm, '<li>$1</li>');
    content = content.replace(/<\/li><li>/g, '</li><li>');
    content = content.replace(/^(\d+)\.\s(.*?)(\n|$)/gm, '<li>$2</li>');
    content = content.replace(/<\/li><li>/g, '</li><li>');
    content = content.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    content = content.replace(/<ul>(<li>.*?<\/li>)<\/ul>/gs, '<ul>$1</ul>');
    return content;
}


function replaceHeadings(content: string): string {
    // Regular expression to match headings of levels 1 to 6
    const regex = /^#{1,6}\s(.*)$/gm;

    // Replace each heading with the corresponding HTML heading tag
    return content.replace(regex, (match, headingText) => {
        // Determine the heading level based on the number of '#' characters
        print(match,'match')
        const headingLevel = match.split(' ')[0].length as 1 || 2 || 3 || 4 || 5 || 6
        const textSizes = {
            "1" : "text-2xl",
            "2" : "text-xl",
            "3" : "text-lg",
            "4" : "",
            "5" : "text-sm",
            "6" : "text-xs"
        }
        
        // Replace with the corresponding HTML heading tag
        return `<h${headingLevel} className="font-semibold ${textSizes[headingLevel]}">${headingText.trim()}</h${headingLevel}>`;
    });
}



export async function createPreview(req:Request,res:Response,next:NextFunction){
    const {
        content
    } = req.body
    try{
        const parsedContent = parseRawContent(content)
        print(parsedContent)
        return res.json({processedHTML:parsedContent})
    }
    catch(error:any){
        console.error("Error creating preview:",error)
        return next(new AppError(error.message,500))
    }
}

export async function getArticles(req:Request,res:Response,next:NextFunction){
    try{
        const skip = 0
        const articles = await findArticles(skip)
        let updatedArticles = _.map(articles,art=>({
            ...art,
            'url':`${art.user.username}/${art.slug}`,
            date:{
                'postedDistanceFromNow':date.formatDistance(art.updatedAt,new Date()),
                'exactDateTime':art.updatedAt
            },
            durationToRead:determineDurationToReadArticle(determineWordCount(art.content))
        }))
        updatedArticles = _.map(updatedArticles,art=>{
            const {slug,content,...rest} = art
            return rest
        })
        _.map(updatedArticles,a=>{
            print(a)
        })
        return res.json(updatedArticles)
    }
    catch(error:any){
        console.error("Error getting articles:",error)
        return next(new AppError(error.message,500))
    }
}

export async function getArticleFromUsernameAndSlug(req:Request,res:Response,next:NextFunction){
    const {username,slug} = req.params
    try{
        print(username,slug)
        const result = await findArticleByUsernameAndSlug(slug,username)
        print(result)
        if(result){
            let article = result[0]
            article["date"] = {
                'postedDistanceFromNow' : date.formatDistance(article.updatedAt,new Date()),
                'updatedAt' : article.updatedAT
            }
            const {updatedAt,...rest} = article

            return res.json(rest)
        }return res.json({})
    }
    catch(error:any){
        console.error("Error getting article:",error)
        return next(new AppError(error.message,500))
    }
}

function determineWordCount(para:string){
    const paragraphWithoutTags = para.replace(/<[^>]+>/g, '')
    const words = paragraphWithoutTags.split(/\s+/)
    return words.length
}