import { allComics } from "../../assets/AllComics.tsx"

interface LibraryData {
    id:number,
    comicid:number,
    title?: string,
    author?:number,
    tag?:string,
    volume?:number,
    description?: string,
    
}

export const library: LibraryData[] = [
        // {id:1, name: "Default", link : "" , description: ""},
        // {id:2, name: "Comic 1", link : "" , description: ""},
        // {id:3, name: "Comic 2", link : "" , description: ""},
        // {id:4, name: "Comic 3", link : "" , description: ""}
        {
        id:1, 
        comicid: allComics[0].id , 
        title: allComics[0].title,  
        tag: allComics[0].tag,
        volume: allComics[0].volume,
        description: allComics[0].description}, 
                {
        id:2, 
        comicid: allComics[1].id , 
        title: allComics[1].title,  
        tag: allComics[1].tag,
        volume: allComics[1].volume,
        description: allComics[1].description}, 
                        {
        id:3, 
        comicid: allComics[2].id , 
        title: allComics[2].title,  
        tag: allComics[2].tag,
        volume: allComics[2].volume,
        description: allComics[2].description}, 
                                {
        id:4, 
        comicid: allComics[3].id , 
        title: allComics[3].title,  
        tag: allComics[3].tag,
        volume: allComics[3].volume,
        description: allComics[3].description},
                                        {
        id:5, 
        comicid: allComics[4].id , 
        title: allComics[4].title,  
        tag: allComics[4].tag,
        volume: allComics[4].volume,
        description: allComics[4].description},
        
        
    ]
    

    export const newComics: LibraryData[] = [
        {
        id:1, 
        comicid: allComics[8].id , 
        title: allComics[8].title,  
        tag: allComics[8].tag,
        volume: allComics[8].volume,
        description: allComics[8].description}, 
                {
        id:2, 
        comicid: allComics[9].id , 
        title: allComics[9].title,  
        tag: allComics[9].tag,
        volume: allComics[9].volume,
        description: allComics[9].description}, 
                        {
        id:3, 
        comicid: allComics[10].id , 
        title: allComics[10].title,  
        tag: allComics[10].tag,
        volume: allComics[10].volume,
        description: allComics[10].description}, 
                                {
        id:4, 
        comicid: allComics[11].id , 
        title: allComics[11].title,  
        tag: allComics[11].tag,
        volume: allComics[11].volume,
        description: allComics[11].description}, 
    ] 
    
    export const hotComics: LibraryData[] = [
        {
        id:1, 
        comicid: allComics[12].id , 
        title: allComics[12].title,  
        tag: allComics[12].tag,
        volume: allComics[12].volume,
        description: allComics[12].description}, 
                {
        id:2, 
        comicid: allComics[13].id , 
        title: allComics[13].title,  
        tag: allComics[13].tag,
        volume: allComics[13].volume,
        description: allComics[13].description}, 
                        {
        id:3, 
        comicid: allComics[14].id , 
        title: allComics[14].title,  
        tag: allComics[14].tag,
        volume: allComics[14].volume,
        description: allComics[14].description}, 

                                {
        id:4, 
        comicid: allComics[15].id , 
        title: allComics[15].title,  
        tag: allComics[15].tag,
        volume: allComics[15].volume,
        description: allComics[15].description}, 
    ]   