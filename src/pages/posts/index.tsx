
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client'
import styles from './styles.module.scss'

export default function Posts() {
    return (
        <>
        <Head>
            <title>Posts | Ignews</title>
        </Head>
        <main className={styles.container}>
            <div className={styles.posts}>
                <a href="">
                    <time>
                        12 de março de 2022
                    </time>
                    <strong>Creating a monorepo with lLerna & Yarn Workspaces</strong>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nesciunt delectus quaerat consectetur dolorum error cupiditate inventore architecto cumque voluptates, non aperiam neque accusamus asperiores voluptate molestias tempore dolorem magni.</p>
                </a>
                <a href="">
                    <time>
                        12 de março de 2022
                    </time>
                    <strong>Creating a monorepo with lLerna & Yarn Workspaces</strong>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nesciunt delectus quaerat consectetur dolorum error cupiditate inventore architecto cumque voluptates, non aperiam neque accusamus asperiores voluptate molestias tempore dolorem magni.</p>
                </a>
                <a href="">
                    <time>
                        12 de março de 2022
                    </time>
                    <strong>Creating a monorepo with lLerna & Yarn Workspaces</strong>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium nesciunt delectus quaerat consectetur dolorum error cupiditate inventore architecto cumque voluptates, non aperiam neque accusamus asperiores voluptate molestias tempore dolorem magni.</p>
                </a>
            </div>
        </main>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'publication')
    ], {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
    })

    console.log(JSON.stringify(response, null, 2));

    return {
        props: {

        }
    }
}