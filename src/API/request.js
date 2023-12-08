import { Post } from "./API";

export const Upload = async (data) => {
    return await Post('/upload', data);
}