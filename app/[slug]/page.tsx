import { NextPage, InferGetStaticPropsType, ResolvingMetadata } from "next";
// import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { Metadata } from 'next';
import styles from "@/styles/Content.module.scss";
import { getAllPosts, getPostBySlug } from "../api/md/main";
import markdownToHtml from "../api/md/markdownToHtml";
import MyNavbar from "@/components/navbar";

//TODO contentful から読み込むように変更

export async function generateMetadata(
    { post }: Props,
    parent?: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    // const id = params.id

    // fetch data
    // const product = await fetch(`https://.../${id}`).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
        title: post.title,
        //   openGraph: {
        //     images: ['/some-specific-page-image.jpg', ...previousImages],
        //   },
    }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;

/**
 * 記事のパスを取得する
 */
export const getStaticPaths = async () => {
    const posts = getAllPosts(["slug"]);
    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            };
        }),
        fallback: false,
    };
};

/**
 * 記事の内容を取得する
 */
export const getStaticProps = async ({ params }: any) => {
    const post = getPostBySlug(params.slug, ["slug", "title", "date", "content"]);
    // Markdown を HTML に変換する
    const content = await markdownToHtml(post.content);
    // content を詰め直して返す
    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    };
};

const Post: NextPage<Props> = ({ post }) => {
    // const router = useRouter();
    // if (!post?.slug) {
    //     return <ErrorPage statusCode={404} />;
    // }
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <MyNavbar></MyNavbar>
                <article>
                    <h1 className="text-center display-1 mt-0 mt-md-5 pb-4">{post.title}</h1>
                    <div className={styles.grid}>
                        <div>
                            <p>{post.date}</p>
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default Post;