import {Metadata} from "next";
import {Blog} from "./Blog/Blog";

export const metadata: Metadata = {
    title: "Meta Funding - Blog",
};

const BlogPage = () => {

    return (
        <>
            <Blog/>
        </>
    )
}
export default BlogPage