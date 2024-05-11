import mongoose from "mongoose";
import Article from "../models/article-model";
import Reaction from "../models/article-like-model";

const print = console.log
export async function createArticle(article:{
    title:string
    coverImage:string
    content:string
    tags:string[],
    slug:string,
    state:'draft'|'publish'
},uId:string){
    try{
        const newArticle = await new Article({
            ...article,
            uId
        }).save()
        return newArticle
    }
    catch(error){
        console.error("Error creating article:",error)
    }

}


export async function findArticles(skip:number){
    try{
        const uId = "663f00419e3d34ccfd17b0ad"
        const articles = await Article.aggregate([
            {
                $match:{
                    state:'publish'
                }
            },

            {
                $lookup:{
                    'from':'users',
                    'foreignField':'_id',
                    'localField':'uId',
                    'as':'user',
                    'pipeline':[
                        {
                            $project:{
                                _id:0,
                                id:{
                                    $toString:'$_id'
                                },
                                name:1,
                                image:1,
                                username:1
                            }
                        }
                    ]
                }
            },
            {
                $lookup:{
                    'from':'likes',
                    'foreignField':'aId',
                    'localField':'id',
                    'as':'likes',
                }
            },
            {
                $addFields:{likeCount:{$size:'$likes'}}
            },
            {
                $lookup:{
                    'from':'comments',
                    'foreignField':'aId',
                    'localField':'id',
                    'as':'comments',
                }
            },
            {
                $addFields:{commentCount:{$size:'$comments'}}
            },
            {
                $unwind:'$user'
            },
            {
                $lookup:{
                    from:'users',
                    as:'savedByUser',
                    let :{aId:'$_id'},
                    pipeline:[
                        {
                            $match:{
                                $expr:{
                                    $and:[
                                        {$in:['$$aId','$savedArticles']},
                                        {$eq:['$_id',new mongoose.Types.ObjectId(uId)]}
                                    ]
                                }
                            }
                        },{$project:{_id:1}}
                    ]
                }
            },
            {
                $addFields:{isSaved:{$gt:[{$size:'$savedByUser'},0]}}
            },
            {
                $project:{
                    user:1,
                    likeCount:1,
                    commentCount:1,
                    isSaved:1,
                    _id:0,
                    id:{
                        $toString:'$_id',
                    },
                    title:1,
                    slug:1,
                    coverImage:1,
                    tags:1,
                    content:1,
                    updatedAt:1,
                    durationToRead:1
                }
            },
            {
                $limit:10
            },
            {
                $skip:skip
            }
        ])
        if(articles){
            articles.forEach((a)=>{
                console.log(a)
            })
        }
        return articles
    }
    catch(error){
        console.error("Error finding articles:",error)
    }
}


export default async function findArticleByUsernameAndSlug(slug:string,username:string){
    try{
        const article = await Article.aggregate([
            {
                $match:{slug}
            },
            {
                $lookup:{
                    from:'users',
                    as:'user',
                    let:{aId:'$_id'},
                    pipeline:[
                        {
                            $match:{
                                username
                            }
                        },
                        {
                            $project:{
                                _id:0,
                                image:1,
                                name:1,
                                username:1,
                                id:{
                                    $toString:'$$aId'
                                },
                            }
                        }
                    ]
                }
            },
            {
                $unwind:'$user'
            },
            {
                $lookup:{
                    'from':'likes',
                    'as':'likes',
                    pipeline:[
                        {
                            $match:{
                                aId:'$_id'
                            }
                        },
                        {
                            $count:'reactCount'
                    }]
                }
            },
            {
                $project:{
                    _id:0,
                    content:1,
                    likes:1,
                    title:1,
                    coverImage:1,
                    updatedAt:1,
                    tags:1,
                    id:{
                        $toString:'$_id'
                    },
                    user:1
                }
            }
        ])
        return article

    }
    catch(error){
        console.error("Error finding article:",error)
    }
}

export async function findReactions(slug:string){
    try{
  
    }
    catch(error:any){
        console.error("Error finding reactions:",error)
        throw new Error(error.message)
    }
}

export async function findComments(){
    try{

    }
    catch(error:any){
        console.error("Error finding comments:",error)
        throw new Error(error.message)
    }
}