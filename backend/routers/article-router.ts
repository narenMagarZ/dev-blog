import express from 'express'
import { createPreview, getArticleFromUsernameAndSlug, getArticles, publishArticle } from '../controllers/article-controller'
import { validate } from '../middlewares'
import joi from 'joi'

const articleRouter = express.Router()


articleRouter.post('/',validate({
    title:joi.string().required(),
    coverImage:joi.string().allow(''),
    content:joi.string().allow(''),
    tags:joi.string().allow(''),
    state:joi.string().allow('draft','publish')
}),publishArticle)

articleRouter.post('/preview',validate({
    content:joi.string()
}),createPreview)
articleRouter.get('/',getArticles) // return articles feed
articleRouter.get('/:username/:slug',getArticleFromUsernameAndSlug) // /api/articles/:username/:slug

export default articleRouter
