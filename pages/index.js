import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

const env = process.env.NODE_ENV;

export const getServerSideProps = ({ req, res }) => {
    console.log("env", env);
    const partitioned = true;
    let y = 1, x = 1;
    if (!req.headers.cookie) {
        res.setHeader("Set-Cookie", `location=1:1; SameSite=None; Secure; HttpOnly; Path=/; ${partitioned ? "Partitioned;" : ""}`)
    } else {
        console.log(`req.cookie: ${req.headers.cookie}`)
        const params = req.headers.cookie.replace(" ", "").split(";");
        const locationParam = params.find((param) => param.startsWith("location="))
        let [rawy, rawx] = locationParam.split("=")[1].split(":");
        y = parseInt(rawy, 10), x = parseInt(rawx, 10);
        switch (url.searchParams.get("op")) {
            case "up": {
                if (y > 1) y -= 1;
                break;
            }
            case "right": {
                if (x < 3) x += 1;
                break;
            }
            case "down": {
                if (y < 3) y += 1;
                break;
            }
            case "left": {
                if (x > 1) x -= 1;
                break;
            }
            default: {
            }
        }
        res.setHeader("Set-Cookie", `location=${y}:${x}; SameSite=None; Secure; HttpOnly; Path=/; ${partitioned ? "Partitioned;" : ""}`);
    }
    return { props: { x, y } }
}

export default function Home({ x, y }) {
    console.log(x, y)
    return (
        <>
            <Head>
                <title>Simple Map App</title>
                <meta name="description" content="Simple Map App" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

            </Head>
            <style jsx>{`
                    table {
                            margin-top: 10px;
                    }
                    table, td, th {
                        border: 1px solid #595959;
                        border-collapse: collapse;
                    }
                    td, th {
                        padding: 3px;
                        width: 30px;
                        height: 25px;
                    }
                                    th {
                        background: #f0e6cc;
                    }
                                    button {
                        margin: 5px;
                        height: 35px;
                        width: 35px;
                    }
                    `}
            </style>
            <main className={styles.main}>
                <div>
                    <h1>Simple Map App</h1>
                    <form method="GET" action="/">
                        <button name="op" type="submit" value="up">↑</button>
                        <button name="op" type="submit" value="left">←</button>
                        <button name="op" type="submit" value="right">→</button>
                        <button name="op" type="submit" value="down">↓</button>

                        <Script defer dangerouslySetInnerHTML={
                            {
                                __html: `
                                    fetch("/api/location").then((res) => {
                                        return res.json();
                                    }).then((json) => {
                                        console.log(json);
                                        let style = document.createElement("style");
                                        document.head.appendChild(style);
                                        style.sheet.insertRule("#c${y}${x} {background: #ff0000; }")
                                    });
                                    `
                            }
                        }>

                        </Script>


                        <table>
                            <tbody>
                                <tr>
                                    <td id="c11"></td>
                                    <td id="c12"></td>
                                    <td id="c13"></td>
                                </tr>
                                <tr>
                                    <td id="c21"></td>
                                    <td id="c22"></td>
                                    <td id="c23"></td>
                                </tr>
                                <tr>
                                    <td id="c31"></td>
                                    <td id="c32"></td>
                                    <td id="c33"></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </main>
        </>
    )
}
