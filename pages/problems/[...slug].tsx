import { NextPage, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Footer from '@/components/footer'
import MyNavbar from '@/components/navbar'
import problemsData from '@/data/problems.json'
import Probcard from '@/components/probcard'
// import styles from "@/styles/Content.module.scss";
import { Prob } from 'pages/problems';
import MyHead from "@/components/head";
import { type } from "os";

// "https://script.googleapis.com/v1/scripts/AKfycbx0ik-z7o4mi1VxJABGjiOezF_YlJZa0Z0CUBbd3kro5F4rSpTseMp7HeSAZO8i4vyrXw:run"

type PageProp = { prob: Prob }
type StaticProps = { params: { slug: string[] } };
export const getStaticProps = async ({ params }: StaticProps) => {
    // TODO: [id] のようにしたいが，slug にidが含まれていない．データ構造を変えて対応する．
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
    const router = useRouter();

    if (!router.isFallback && !prob) {
        return <ErrorPage statusCode={404} />;
    }

    return (
        <div>
            <MyHead></MyHead>
            <MyNavbar></MyNavbar>
            {/* BreadClumb */}
            <main className='px-2 px-md-5 pt-3'>
                <h1>
                    {prob?.title}
                </h1>
                {/* ここに内容を書く */}
            </main>
        </div>
    );
};

export default Post;
