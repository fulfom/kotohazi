import { NextPage, InferGetStaticPropsType } from "next";
import ErrorPage from "next/error";
import Footer from '@/components/footer'
import MyNavbar from '@/components/navbar'
import problemsData from '@/data/problems.json'
import Probcard from '@/components/probcard'
// import styles from "@/styles/Content.module.scss";
import { Prob } from 'app/problems/page';
import MyHead from "@/components/head";
import { type } from "os";
import MyBreadcrumb from "@/components/breadcrumb/breadcrumb";

// "https://script.googleapis.com/v1/scripts/AKfycbx0ik-z7o4mi1VxJABGjiOezF_YlJZa0Z0CUBbd3kro5F4rSpTseMp7HeSAZO8i4vyrXw:run"

const getAllProblems = () => { }

// getStaticProps は app router のなって廃止．乗り換え
type PageProp = { prob: Prob }
type StaticProps = { params: { slug: string[] } };
export const getStaticProps = async ({ params }: StaticProps) => {
    // TODO: [id] のようにしたいが，slug にidが含まれていない．データ構造を変えて対応する．
    // contest page と 詳細ページ を分けるべき
    const prob = problemsData[1];
    return {
        props: { prob: prob },
        revalidate: 1,
    };
};

export const getStaticPaths = async () => ({
    // TODO: APIで取得したい
    paths: [
        { params: { slug: ["iol", "2003", "1"] } }
    ],
    fallback: false,
});

const Post: React.FC<PageProp> = ({ prob }) => {
    // const router = useRouter();

    // if (!router.isFallback && !prob) {
    //     // カスタムの 404ページにすべき？
    //     return <ErrorPage statusCode={404} />;
    // }

    return (
        <div>
            <MyNavbar></MyNavbar>
            <main className='px-2 px-md-5 pt-3'>
                {/* この後ろに続きの breadcrumbs をつける */}
                <MyBreadcrumb crumbs={[{ path: "/problems", label: "問題集" }]}></MyBreadcrumb>
                <h1>
                    {prob?.title}
                </h1>
                {/* ここに内容を書く．contest page と 詳細ページ を component で分けるべきかも */}
            </main>
        </div >
    );
};

export default Post;
