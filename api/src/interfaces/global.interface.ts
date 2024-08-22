import { Document, Types } from 'mongoose'

interface IUser {
    id: Types.ObjectId
    name: string
    email: string
    password: string
    checkPassword(password: string): Promise<boolean>;
    celular: number
    instruments: string[]
    subteam: string[]
    active: boolean
    role: string
}

interface IChangePassword {
    userPassword: string
    newPassword: string
}

interface IPost extends Document {
    title: string
    description: string
    content: {}
    author: Types.ObjectId | IUser[]
    category: string
    tags: string[]
    createdAt: Date
    updateAt: [Date]
    type: string
    visibility: string
    files: string[]
    comments: Types.ObjectId[]
}

interface IPostFilter {
    title?: string
    author?: string | IUser[]
    category?: string
    tags?: string[]
}

interface IMessage extends Document {
    title: string
    content: string
    author: Types.ObjectId | IUser[]
    sentAt: Date
    recipients: Types.ObjectId[] | IUser[]
    comments: Types.ObjectId[]
    createdAt: Date
}

interface IComment extends Document {
    content: string
    author: Types.ObjectId | IUser[]
    parent: Types.ObjectId
    children: Object[]
    postTypeId: Types.ObjectId
    role: string
    createdAt: Date
    updatedAt: Date
}


export { IUser, IChangePassword, IPost, IPostFilter, IMessage, IComment }