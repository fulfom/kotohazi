import { FaLightbulb } from 'react-icons/fa'
import type { NextPage } from 'next'
import Image from 'next/image'
import MyNavbar from '../components/navbar'
import MyHead from '../components/head'
import styles from '../styles/Home.module.scss'
import Footer from '../components/footer'


const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <MyHead></MyHead>
      <MyNavbar></MyNavbar>
      <main className={"bg-primary text-white bg-opacity-75 " + styles.main} style={{ position: 'relative' }}>
        <div style={{ zIndex: -1 }}>
          <Image src="/new-background.jpg" layout='fill'></Image>
        </div>

        <Image src="/logo.svg" width={300} height={300}></Image>
        <h1 className={styles.title}>
          ことはじ
        </h1>

        <p className={styles.description}>
          言語学オリンピック愛好家のためのサポートサイト
        </p>

        <div className={styles.grid}>
          <a href="/problems/" className={styles.card}>
            <h2><FaLightbulb className='' />問題集 &rarr;</h2>
            <p>問題が一覧・検索できるデータベース ヒントや解説もまとめていきます</p>
          </a>

          <a href="/learn/" className={styles.card}>
            <h2>ステップアップ講座 &rarr;</h2>
            <p>問題を解きながら解き方のコツを身につけましょう！</p>
          </a>

        </div>
      </main>

      <Footer></Footer>
    </div >
  )
}

export default Home
