import Article from "../models/article-model";

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


export async function findArticles(){
    try{
        const articles = await Article.aggregate([
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
                                image:1
                            }
                        }
                    ]
                }
            },
            {
                $unwind:'$user'
            },
            {
                $project:{
                    user:1,
                    _id:0,
                    id:{
                        $toString:'$_id',
                    },
                    title:1,
                    slug:1,
                    coverImage:1,
                    tags:1,
                    content:1,
                    updatedAt:1
                }
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