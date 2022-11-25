import Head from "next/head";
import s from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={s.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Estacionamiento</title>
        <link rel="stylesheet" href="estacionamiento.css" />
      </Head>

      <div className={s.mainTitle}>Estacionamiento</div>
      <div className={s.disponibles}>
        <div>Lugares Disponibles:&nbsp;</div>
        <div>3</div>
      </div>
      <div className={s.grid}>
        <div className={s.disponible}>1</div>
        <div className={s.ocupado}>2</div>
        <div className={s.disponible}>3</div>
        <div className={s.disponible}>4</div>
      </div>
    </div>
  );
}