import { Post } from "../Post";
import { ServerPost } from "./ServerPost";

export class PostMapper {
    static toPost (data: ServerPost[]): Post[] {
        return data.map((item): Post => {
            return {
                usuarioId: item.userId,
                titulo: item.title,
                cuerpo: item.body
            }
        })
    }
}